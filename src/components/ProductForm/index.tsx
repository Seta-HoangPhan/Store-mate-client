import { productImage } from "@assets/images";
import Select from "@components/Select";
import TextArea from "@components/TextArea";
import TextField from "@components/TextField";
import UploadBtn from "@components/UploadBtn";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
} from "@mui/material";
import { selectCategories } from "@redux/features/category/selector";
import { createProduct } from "@redux/features/product/action";
import { selectProductCreate } from "@redux/features/product/selector";
import { cleanFormFieldValue } from "@utils/convertToNumberObj";
import { formatVnd } from "@utils/formatVnd";
import { useState, type ChangeEvent } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type ControllerRenderProps,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

interface FormValue {
  name: string;
  description: string;
  unitPrice: number;
  sellingPrice: number;
  quantity: number;
  categoryId: number;
}

interface Props {
  isCreate?: boolean;
  handleCloseDrawer: () => void;
}

export default function ProductForm({ isCreate, handleCloseDrawer }: Props) {
  const dispatch = useDispatch();

  const { data: categories } = useSelector(selectCategories);
  const { status: statusCreate } = useSelector(selectProductCreate);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormValue>();
  const [name, unitPrice, sellingPrice, quantity] = useWatch({
    control,
    name: ["name", "unitPrice", "sellingPrice", "quantity"],
  });
  const enableSubmitBtn =
    (isCreate &&
      name &&
      unitPrice &&
      unitPrice > 0 &&
      sellingPrice &&
      sellingPrice > 0 &&
      quantity &&
      quantity > 0) ||
    (!isCreate && isDirty && name);

  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setThumbnail(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
  };

  const handleChangeNumberInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormValue>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    field.onChange(formatVnd(Number(value)));
  };

  const handleBlurCurrencyInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FormValue>
  ) => {
    let value = Number(e.target.value);
    if (value < 1000) {
      value = value * 1000;
    }
    field.onChange(formatVnd(Number(value)));
  };

  const onSubmit = (data: FormValue) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, cleanFormFieldValue(value));
    });

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    dispatch(createProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <div className="product-form-wrapper">
        <div className="product-form__main-content">
          {!isCreate ? (
            <div className="product-form__main-content__loading">
              <CircularProgress />
            </div>
          ) : (
            <>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Tên sản phẩm: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Mô tả sản phẩm:
                </FormLabel>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => <TextArea {...field} />}
                />
              </FormControl>
              <div className="product-form__upload-image">
                <FormControl fullWidth className="product-form-control__image">
                  <FormLabel className="product-form-control__label">
                    Hình ảnh chi tiết:
                  </FormLabel>
                  <UploadBtn onChange={handleChangeThumbnail} />
                </FormControl>
                <div className="product-form__upload-image__preview">
                  <img src={thumbnailPreview || productImage} alt="123" />
                  {thumbnail && (
                    <IconButton onClick={handleRemoveThumbnail}>
                      <CloseIcon />
                    </IconButton>
                  )}
                </div>
              </div>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Giá nhập: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="unitPrice"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => handleChangeNumberInput(e, field)}
                      onBlur={(e) => handleBlurCurrencyInput(e, field)}
                      currency
                      error={!!errors.unitPrice}
                      helperText={errors.unitPrice?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Giá bán: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => handleChangeNumberInput(e, field)}
                      onBlur={(e) => handleBlurCurrencyInput(e, field)}
                      currency
                      error={!!errors.sellingPrice}
                      helperText={errors.sellingPrice?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Số lượng: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => handleChangeNumberInput(e, field)}
                      error={!!errors.quantity}
                      helperText={errors.quantity?.message}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Loại sản phẩm:
                </FormLabel>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select {...field}>
                      {categories.map(({ id, name }) => (
                        <MenuItem key={`product-form-select-${id}`} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </>
          )}
        </div>
        <div className="product-form__footer">
          <Button className="drawer-footer__button" onClick={handleCloseDrawer}>
            Thoát
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!enableSubmitBtn}
            className="drawer-footer__button"
          >
            {statusCreate === "loading" ? (
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
