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
import { useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./index.scss";

interface FormValue {
  name: string;
  description: string;
  thumbnail: File;
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
  const { data: categories } = useSelector(selectCategories);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValue>();
  const enableSubmitBtn = (isCreate && name) || (!isCreate && isDirty && name);

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

  const onSubmit = (data: FormValue) => {
    const productData = {
      ...data,
      thumbnail,
    };
    console.log("check12 formdata", productData);
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
                  render={({ field }) => <TextField {...field} fullWidth />}
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
                  render={({ field }) => <TextField {...field} />}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Giá bán: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="sellingPrice"
                  render={({ field }) => <TextField {...field} />}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="product-form-control__label">
                  Số lượng: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => <TextField {...field} />}
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
            {!isCreate ? (
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
