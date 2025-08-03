import CategoryForm from "@components/CategoryForm";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";
import {
  toggleOpenCreateCategoryDrawer,
  toggleOpenEditCategoryDrawer,
} from "@redux/features/category/action";
import {
  selectIsOpenCreateCategoryDrawer,
  selectIsOpenEditCategoryDrawer,
} from "@redux/features/category/selector";
import { useEffect, useState, type ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { selectOpenCreareProductDrawer } from "@redux/features/product/selector";
import ProductForm from "@components/ProductForm";
import { toggleOpenCreateProductDrawer } from "@redux/features/product/action";

const DRAWER_WIDTH = 400;
const titles = {
  createCategory: "Tạo mới loại sản phẩm",
  editCategory: "Chỉnh sửa loại sản phẩm",
  createProduct: "Tạo mới sản phẩm",
} as const;
type Title = keyof typeof titles;

export default function LayoutDrawer() {
  const dispatch = useDispatch();

  const isOpenCreateCategory = useSelector(selectIsOpenCreateCategoryDrawer);
  const isOpenEditCategory = useSelector(selectIsOpenEditCategoryDrawer);

  const isOpenCreateProduct = useSelector(selectOpenCreareProductDrawer);

  const [title, setTitle] = useState<Title>("createCategory");
  const [component, setComponent] = useState<ReactElement | null>(null);

  const open =
    isOpenCreateCategory || isOpenEditCategory || isOpenCreateProduct;

  useEffect(() => {
    switch (true) {
      case isOpenCreateCategory:
        setTitle("createCategory");
        setComponent(
          <CategoryForm isCreate handleCloseDrawer={handleCloseDrawer} />
        );
        break;
      case isOpenEditCategory:
        setTitle("editCategory");
        setComponent(<CategoryForm handleCloseDrawer={handleCloseDrawer} />);
        break;
      case isOpenCreateProduct:
        setTitle("createProduct");
        setComponent(
          <ProductForm isCreate handleCloseDrawer={handleCloseDrawer} />
        );
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenCreateCategory, isOpenEditCategory, isOpenCreateProduct]);

  const handleCloseDrawer = () => {
    switch (true) {
      case isOpenCreateCategory:
        dispatch(toggleOpenCreateCategoryDrawer());
        break;
      case isOpenEditCategory:
        dispatch(toggleOpenEditCategoryDrawer());
        break;
      case isOpenCreateProduct:
        dispatch(toggleOpenCreateProductDrawer());
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer}
      slotProps={{
        paper: {
          sx: { width: DRAWER_WIDTH },
        },
      }}
    >
      <div className="drawer-wrapper">
        <div className="drawer-header">
          <div className="drawer-header__title">{titles[title]}</div>
          <IconButton
            className="drawer-header__close-icon"
            onClick={handleCloseDrawer}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="drawer-main-container">{component}</div>
      </div>
    </Drawer>
  );
}
