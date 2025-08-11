import TextField from "@components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import { createSupplier } from "@redux/features/supplier/action";
import {
  selectSupplierCreate,
  selectSupplierDetail,
  selectSupplierEdit,
} from "@redux/features/supplier/selector";
import { useEffect, type ChangeEvent } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  type ControllerRenderProps,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import "./index.scss";

interface SupplierForm {
  name: string;
  phones: Phone[];
  email?: string;
  address: string;
}

interface Phone {
  id: string;
  phone: string;
}

interface Props {
  isCreate?: boolean;
  handleCloseDrawer: () => void;
}

const schema: yup.ObjectSchema<SupplierForm> = yup.object().shape({
  name: yup.string().required("Tên nhà cung cấp không để trống"),
  phones: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        phone: yup
          .string()
          .required("Số điện thoại không để trống")
          .matches(
            /^[35789]/,
            "Số điện thoại phải bắt đầu bằng 3, 5, 7, 8 hoặc 9"
          )
          .matches(/^\d{9}$/, "Số điện thoại phải có đúng 9 chữ số"),
      })
    )
    .default([])
    .test(
      "unique-phone",
      "Số điện thoại bị trùng",
      (phones) => new Set(phones.map((p) => p.phone)).size === phones.length
    ),
  email: yup.string().email("Email không hợp lệ").optional(),
  address: yup.string().required("Địa chỉ nhà cung cấp không để trống"),
});

export default function SupplierForm({ isCreate, handleCloseDrawer }: Props) {
  const dispatch = useDispatch();

  const { data: supplierDetail, status: statusDetail } =
    useSelector(selectSupplierDetail);
  const { status: statusCreate } = useSelector(selectSupplierCreate);
  const { status: statusEdit } = useSelector(selectSupplierEdit);

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm<SupplierForm>({
    defaultValues: {
      name: "",
      phones: [{ id: uuidv4(), phone: "" }],
      address: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const {
    fields: phoneFields,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    control,
    name: "phones",
  });

  // update when form is edit
  useEffect(() => {
    if (!isCreate && statusDetail === "completed" && supplierDetail) {
      const phoneDetails: Phone[] = [];
      for (const phone of supplierDetail.phones) {
        const id = `phone-${phone.id}`;
        phoneDetails.push({ id, phone: phone.phone });
      }
      reset({
        name: supplierDetail.name,
        phones: phoneDetails,
        email: supplierDetail.email,
        address: supplierDetail.address,
      });
    }
  }, [statusDetail, isCreate, reset, supplierDetail]);

  useEffect(() => {
    const isClose =
      (isCreate &&
        (statusCreate === "completed" || statusCreate === "rejected")) ||
      (!isCreate && (statusEdit === "completed" || statusEdit === "rejected"));

    if (isClose) {
      handleCloseDrawer();
    }
  }, [statusCreate, handleCloseDrawer, isCreate, statusEdit]);

  const handleAddPhone = () => {
    const id = uuidv4();
    phoneAppend({ id, phone: "" });
  };

  const handleChangeField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<SupplierForm>,
    name: keyof SupplierForm
  ) => {
    field.onChange(e.target.value);
    clearErrors(name);
  };

  const onSubmit = (data: SupplierForm) => {
    if (isCreate) {
      const formData = {
        ...data,
        phones: data.phones.map((p) => p.phone),
      };
      dispatch(createSupplier(formData));
      return;
    }

    // if (supplierDetail) {
    //   dispatch(
    //     editSupplier({
    //       id: supplierDetail.id,
    //       ...data,
    //       phones: phoneListEdit,
    //     })
    //   );
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="supplier-form">
      <div className="supplier-form-wrapper">
        <div className="supplier-form__main-content">
          {statusDetail === "loading" ? (
            <div className="supplier-form__main-content__loading">
              <CircularProgress />
            </div>
          ) : (
            <>
              <FormControl fullWidth>
                <FormLabel className="supplier-form__main-content__label">
                  Tên nhà cung cấp: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      onChange={(e) => handleChangeField(e, field, "name")}
                      error={!!errors["name"]}
                      helperText={errors["name"]?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="supplier-form__main-content__label">
                  Danh sách số điện thoại:
                </FormLabel>
                <div className="supplier-form__main-content__phone-list">
                  {phoneFields.map((field, index) => (
                    <div
                      className="supplier-form__main-content__phone-item"
                      key={field.id}
                    >
                      <TextField
                        {...register(`phones.${index}.phone`)}
                        fullWidth
                        phone
                        height="35px"
                        value={field.phone}
                        error={!!errors.phones?.[index]?.phone}
                        helperText={errors.phones?.[index]?.phone?.message}
                      />
                      <IconButton onClick={() => phoneRemove(index)}>
                        <RemoveCircleOutlineOutlinedIcon color="error" />
                      </IconButton>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outlined"
                  className="supplier-form__main-content__phone-add-btn"
                  onClick={handleAddPhone}
                >
                  <AddIcon />
                </Button>
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="supplier-form__main-content__label">
                  Email:
                </FormLabel>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      onChange={(e) => handleChangeField(e, field, "email")}
                      error={!!errors["email"]}
                      helperText={errors["email"]?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="supplier-form__main-content__label">
                  Địa chỉ: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      onChange={(e) => handleChangeField(e, field, "address")}
                      error={!!errors["address"]}
                      helperText={errors["address"]?.message}
                    />
                  )}
                />
              </FormControl>
            </>
          )}
        </div>
        <div className="supplier-form__footer">
          <Button className="drawer-footer__button" onClick={handleCloseDrawer}>
            Thoát
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="drawer-footer__button"
            disabled={!isCreate && !isDirty}
          >
            {statusCreate === "loading" || statusEdit === "loading" ? (
              <CircularProgress color="inherit" size={30} />
            ) : isCreate ? (
              "Tạo Mới"
            ) : (
              "Lưu Thay Đổi"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
