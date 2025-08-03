import AddButton from "@components/AddButton";
import MultiSelect from "@components/MultiSelect";
import Table, { type Column } from "@components/Table";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { FormControl, FormLabel, IconButton } from "@mui/material";
import {
  fetchCategories,
  removeFilterCategories,
  setFilterCategories,
  setFilterCategorySearch,
} from "@redux/features/category/action";
import {
  selectCategoryBySearch,
  selectFilterCategories,
} from "@redux/features/category/selector";
import { toggleOpenCreateProductDrawer } from "@redux/features/product/action";
import { selectProducts } from "@redux/features/product/selector";
import type { Product } from "@typings/redux";
import { convertToOptions } from "@utils/convertToOptions";
import { formatVnd } from "@utils/formatVnd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";

export type ProductView = "list" | "grid";

const columns: Column<Product>[] = [
  {
    id: "name",
    header: "Loại sản phẩm",
    render: (value) =>
      typeof value === "string" && (
        <div className="product-table__cell">
          <span>{value}</span>
        </div>
      ),
    width: "15%",
  },
  {
    id: "description",
    header: "Mô tả chi tiết",
    render: (value) =>
      typeof value === "string" && (
        <div className="product-table__cell product-description">
          <span>{value}</span>
        </div>
      ),
    width: "25%",
  },
  {
    id: "unitPrice",
    header: "Giá nhập (VND)",
    render: (value) =>
      typeof value === "number" && <span>{formatVnd(value)}</span>,
    width: "20%",
    align: "center",
  },
  {
    id: "sellingPrice",
    header: "Giá bán (VND)",
    render: (value) =>
      typeof value === "number" && <span>{formatVnd(value)}</span>,
    width: "20%",
    align: "center",
  },
  {
    id: "quantity",
    header: "Số lượng",
    render: (value) => typeof value === "number" && <span>{value}</span>,
    width: "10%",
    align: "center",
  },
];

export default function Product() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategoryBySearch);
  const selectedCategories = useSelector(selectFilterCategories);
  const { data: products } = useSelector(selectProducts);

  const [productView, setProductView] = useState<ProductView>("list");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelectCategory = (catId: string) => {
    dispatch(setFilterCategories(catId));
  };

  const handleUnselectCategory = (catId: string) => {
    dispatch(removeFilterCategories(catId));
  };

  const handleSearchCategory = (search: string) => {
    dispatch(setFilterCategorySearch(search));
  };

  const handleToggleProductView = () => {
    setProductView((prev) => (prev === "list" ? "grid" : "list"));
  };

  const handleOpenCreateProductDrawer = () => {
    dispatch(toggleOpenCreateProductDrawer());
  };

  const hasAction = {
    onDelete: () => {},
    onEdit: () => {},
  };

  return (
    <div className="product-wrapper">
      <div className="product-header">
        <AddButton onClick={handleOpenCreateProductDrawer} />
        <div className="product-header__right">
          <FormControl className="product-header__category-filter">
            <FormLabel>Loại sản phẩm:</FormLabel>
            <MultiSelect
              options={convertToOptions(categories)}
              selectedOptions={convertToOptions(selectedCategories)}
              onSelect={handleSelectCategory}
              onUnselect={handleUnselectCategory}
              onSearch={handleSearchCategory}
            />
          </FormControl>
          <div className="product-header__icon-view">
            <IconButton
              className="icon-button"
              onClick={handleToggleProductView}
            >
              {productView === "list" ? (
                <ListOutlinedIcon />
              ) : (
                <GridViewOutlinedIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
      <Table<Product> data={products} columns={columns} hasAction={hasAction} />
    </div>
  );
}
