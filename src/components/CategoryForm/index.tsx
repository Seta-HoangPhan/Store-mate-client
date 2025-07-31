import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { selectCategoryDetail } from "@redux/features/category/selector";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import "./index.scss";

interface CategoryForm {
  name: string;
  description?: string;
}

interface Props {
  isCreate?: boolean;
  handleCloseDrawer: () => void;
}

export default function CategoryForm({ isCreate, handleCloseDrawer }: Props) {
  const { data: categoryDetail, status } = useSelector(selectCategoryDetail);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<CategoryForm>({
    defaultValues: { name: "", description: "" },
  });

  const name = useWatch({ control, name: "name" });
  const enableSubmitBtn = (isCreate && name) || (!isCreate && isDirty && name);

  useEffect(() => {
    if (!isCreate && status === "completed" && categoryDetail) {
      reset({
        name: categoryDetail.name,
        description: categoryDetail.description,
      });
    }
  }, [categoryDetail, status, isCreate, reset]);

  const onSubmit = (data: CategoryForm) => console.log("check12 data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="category-form">
      <div className="category-form-wrapper">
        <div className="category-form__main-content">
          {status === "loading" ? (
            <div className="category-form__main-content__loading">
              <CircularProgress />
            </div>
          ) : (
            <>
              <FormControl fullWidth>
                <FormLabel className="category-form__main-content__label">
                  Tên loại sản phẩm: <span className="field-required">*</span>
                </FormLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      className="category-form__main-content__text-field"
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel className="category-form__main-content__label">
                  Mô tả loại sản phẩm:
                </FormLabel>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      slotProps={{
                        input: { endAdornment: <ArrowDropUpIcon /> },
                      }}
                      className="category-form__main-content__text-area"
                    />
                  )}
                />
              </FormControl>
            </>
          )}
        </div>
        <div className="category-form__footer">
          <Button className="drawer-footer__button" onClick={handleCloseDrawer}>
            Thoát
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!enableSubmitBtn}
            className="drawer-footer__button"
          >
            {isCreate ? "Tạo Mới" : "Lưu Thay Đổi"}
          </Button>
        </div>
      </div>
    </form>
  );
}
