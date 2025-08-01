import AddButton from "@components/AddButton";
import Table, { type Column } from "@components/Table";
import {
  deleteCategory,
  fetchCategories,
  toggleOpenCreateCategoryDrawer,
  toggleOpenEditCategoryDrawer,
} from "@redux/features/category/action";
import {
  selectCategories,
  selectCategoryDelete,
} from "@redux/features/category/selector";
import type { Category } from "@typings/redux";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import ConfirmDialog from "@components/ConfirmDialog";

const columns: Column<Category>[] = [
  {
    id: "name",
    header: "Loại sản phẩm",
    render: (value) => typeof value === "string" && <span>{value}</span>,
    width: "30%",
  },
  {
    id: "description",
    header: "Mô tả chi tiết",
    render: (value) => typeof value === "string" && <span>{value}</span>,
    width: "50%",
  },
];

export default function Category() {
  const dispatch = useDispatch();

  const { data: categories } = useSelector(selectCategories);
  const { status: statusDelete } = useSelector(selectCategoryDelete);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [categoryDeleteId, setCategoryDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const catProducts = useMemo(() => {
    const cat = categories.find((cat) => cat.id === categoryDeleteId);
    if (!cat) return [];
    return cat.products;
  }, [categories, categoryDeleteId]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (statusDelete !== "loading" && deleteLoading) {
      handleCloseDeleteDialog();
    }
  }, [statusDelete, categoryDeleteId, deleteLoading]);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCategoryDeleteId(null);
    setDeleteLoading(false);
  };

  const handleOpenCreateCategoryDrawer = () => {
    dispatch(toggleOpenCreateCategoryDrawer());
  };

  const handleEditCategory = (catId: number) => {
    dispatch(toggleOpenEditCategoryDrawer(catId));
  };

  const handleDeleteCategory = (catId: number) => {
    setCategoryDeleteId(catId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryDeleteId) {
      dispatch(deleteCategory(categoryDeleteId));
      setDeleteLoading(true);
    }
  };

  const hasAction = {
    onEdit: handleEditCategory,
    onDelete: handleDeleteCategory,
  };

  return (
    <div className="category-wrapper">
      <div className="category-header">
        <AddButton onClick={handleOpenCreateCategoryDrawer} />
      </div>
      <Table data={categories} columns={columns} hasAction={hasAction} />
      <ConfirmDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={confirmDeleteCategory}
        title="Xóa Loại Sản Phẩm"
        confirmBtn={{
          text: "Xóa",
          color: "error",
          loading: deleteLoading,
        }}
      >
        <div className="category-delete-confirm">
          {!!catProducts.length && (
            <p>
              Loại sản phẩm này hiện đang có <b>{catProducts.length}</b> sản
              phẩm. Sau khi xóa các sản phẩm sẽ được đánh dấu là không thuộc về
              loại sản phẩm nào.
            </p>
          )}
          <p>Bạn có chắc muốn xóa loại sản phẩm này không?</p>
        </div>
      </ConfirmDialog>
    </div>
  );
}
