import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import {
  selectCategoryCreate,
  selectCategoryDetail,
  selectCategoryEdit,
} from "@redux/features/category/selector";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import "./index.scss";
import { useDispatch } from "react-redux";
import { createCategory, editCategory } from "@redux/features/category/action";

interface CategoryForm {
  name: string;
  description?: string;
}

interface Props {
  isCreate?: boolean;
  handleCloseDrawer: () => void;
}

export default function CategoryForm({ isCreate, handleCloseDrawer }: Props) {
  const dispatch = useDispatch();

  const { data: categoryDetail, status: statusDetail } =
    useSelector(selectCategoryDetail);
  const { status: statusCreate } = useSelector(selectCategoryCreate);
  const { status: statusEdit } = useSelector(selectCategoryEdit);

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
    if (!isCreate && statusDetail === "completed" && categoryDetail) {
      reset({
        name: categoryDetail.name,
        description: categoryDetail.description,
      });
    }
  }, [categoryDetail, statusDetail, isCreate, reset]);

  useEffect(() => {
    const isClose =
      (statusCreate !== "loading" && isCreate) ||
      (!isCreate && statusEdit !== "loading");

    if (isClose) {
      handleCloseDrawer();
    }
  }, [statusCreate, handleCloseDrawer, isCreate, statusEdit]);

  const onSubmit = (data: CategoryForm) => {
    if (isCreate) {
      dispatch(createCategory(data));
      return;
    }

    if (categoryDetail) {
      dispatch(
        editCategory({
          id: categoryDetail?.id,
          ...data,
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="category-form">
      <div className="category-form-wrapper">
        <div className="category-form__main-content">
          {statusDetail === "loading" ? (
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
