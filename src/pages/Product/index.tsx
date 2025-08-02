import MultiSelect from "@components/MultiSelect";
import Table from "@components/Table";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { FormControl, FormLabel, IconButton } from "@mui/material";
import {
  fetchCategories,
  removeFilterCategories,
  setFilterCategories,
  setFilterCategorySearch,
  toggleOpenCreateCategoryDrawer,
} from "@redux/features/category/action";
import {
  selectCategoryBySearch,
  selectFilterCategories,
} from "@redux/features/category/selector";
import { convertToOptions } from "@utils/convertToOptions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import AddButton from "@components/AddButton";

export type ProductView = "list" | "grid";

export default function Product() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategoryBySearch);
  const selectedCategories = useSelector(selectFilterCategories);

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

  const handleOpenCreateCategoryDrawer = () => {
    dispatch(toggleOpenCreateCategoryDrawer());
  };

  return (
    <div className="product-wrapper">
      <div className="product-header">
        <AddButton onClick={handleOpenCreateCategoryDrawer} />
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
      {/* <Table /> */}
    </div>
  );
}
