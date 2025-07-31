import AddButton from "@components/AddButton";
import Table, { type Column } from "@components/Table";
import {
  fetchCategories,
  toggleOpenCreateCategoryDrawer,
  toggleOpenEditCategoryDrawer,
} from "@redux/features/category/action";
import { selectCategories } from "@redux/features/category/selector";
import type { Category } from "@typings/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

const columns: Column<Category>[] = [
  {
    id: "name",
    header: "Loại sản phẩm",
    render: (value) => <span>{value}</span>,
    width: "30%",
  },
  {
    id: "description",
    header: "Mô tả chi tiết",
    render: (value) => <span>{value}</span>,
    width: "50%",
  },
];

export default function Category() {
  const dispatch = useDispatch();

  const { data: categories } = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenCreateCategoryDrawer = () => {
    dispatch(toggleOpenCreateCategoryDrawer());
  };

  const handleEditCategory = (catId: number) => {
    console.log("check12 cat", catId);
    dispatch(toggleOpenEditCategoryDrawer(catId));
  };

  const handleDeleteCategory = (catId: number) => {
    console.log(catId);
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
    </div>
  );
}
