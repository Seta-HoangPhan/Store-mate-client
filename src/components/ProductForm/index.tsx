import { productImage } from "@assets/images";
import Select from "@components/Select";
import TextArea from "@components/TextArea";
import TextField from "@components/TextField";
import UploadBtn from "@components/UploadBtn";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { selectCategories } from "@redux/features/category/selector";
import { createProduct, editProduct } from "@redux/features/product/action";
import {
  selectProductCreate,
  selectProductDetail,
  selectProductEdit,
} from "@redux/features/product/selector";
import { cleanFormFieldValue } from "@utils/convertToNumberObj";
import { formatVnd } from "@utils/formatVnd";
import { useEffect, useState, type ChangeEvent } from "react";
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
  drawerRef?: React.RefObject<null>;
}

export default function ProductForm({ isCreate, handleCloseDrawer }: Props) {
  const dispatch = useDispatch();

  const { data: categories } = useSelector(selectCategories);
  const { status: statusCreate } = useSelector(selectProductCreate);
  const { data: productDetail, status: statusDetail } =
    useSelector(selectProductDetail);
  const { status: statusEdit } = useSelector(selectProductEdit);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [isChangeThumbnail, setIsChangeThumbnail] = useState<boolean>(false);
  const [thumnailMenuAnchor, setThumbnailMenuAnchor] = useState<Element | null>(
    null
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormValue>();
  const [name, unitPrice, sellingPrice, quantity] = useWatch({
    control,
    name: ["name", "unitPrice", "sellingPrice", "quantity"],
  });

  const isValidRequireField =
    name &&
    unitPrice &&
    unitPrice > 0 &&
    sellingPrice &&
    sellingPrice > 0 &&
    quantity &&
    quantity > 0;
  const enableSubmitBtn =
    (isCreate && isValidRequireField) ||
    (!isCreate && (isDirty || isChangeThumbnail) && isValidRequireField);

  useEffect(() => {
    if (!isCreate && productDetail) {
      reset({
        name: productDetail.name,
        description: productDetail.description,
        unitPrice: productDetail.unitPrice,
        sellingPrice: productDetail.sellingPrice,
        quantity: productDetail.quantity,
        categoryId: productDetail.category?.id,
      });
      setThumbnailPreview(productDetail.thumbnail || productImage);
    }
  }, [isCreate, productDetail, reset]);

  useEffect(() => {
    const isClose =
      (isCreate &&
        (statusCreate === "completed" || statusCreate === "rejected")) ||
      (!isCreate && (statusEdit === "completed" || statusEdit === "rejected"));

    if (isClose) {
      handleCloseDrawer();
    }
  }, [statusCreate, handleCloseDrawer, isCreate, statusEdit]);

  const handleCloseThumbnailMenu = () => setThumbnailMenuAnchor(null);

  const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setThumbnail(file);
    setIsChangeThumbnail(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview("");
    handleCloseThumbnailMenu();
    setIsChangeThumbnail(true);
  };

  const handleBackDetailThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(productDetail?.thumbnail || productImage);
    handleCloseThumbnailMenu();
    setIsChangeThumbnail(false);
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

    dispatch(isCreate ? createProduct(formData) : editProduct(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <div className="product-form-wrapper">
        <div className="product-form__main-content">
          {statusDetail === "loading" ? (
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
                  {thumbnail && isCreate && (
                    <IconButton onClick={handleRemoveThumbnail}>
                      <CloseIcon />
                    </IconButton>
                  )}
                  {!isCreate && (
                    <>
                      <IconButton
                        onClick={(e) => setThumbnailMenuAnchor(e.currentTarget)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        open={!!thumnailMenuAnchor}
                        anchorEl={thumnailMenuAnchor}
                        onClose={handleCloseThumbnailMenu}
                      >
                        {thumbnailPreview && (
                          <MenuItem onClick={handleRemoveThumbnail}>
                            Loại bỏ hình ảnh
                          </MenuItem>
                        )}
                        {thumbnailPreview !== productDetail?.thumbnail && (
                          <MenuItem onClick={handleBackDetailThumbnail}>
                            Giữ hình ảnh ban đầu
                          </MenuItem>
                        )}
                      </Menu>
                    </>
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
