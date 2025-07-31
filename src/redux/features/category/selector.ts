import type { RootState } from "@redux/store";
import { removeAccents } from "@utils/removeAccents";
import { createSelector } from "reselect";

export const selectCategories = (state: RootState) => state.category.categories;

export const selectFilterCategories = (state: RootState) =>
  state.category.filterCategories;

export const selectFilterCategorySearch = (state: RootState) =>
  state.category.filterCategorySearch;

export const selectIsOpenCreateCategoryDrawer = (state: RootState) =>
  state.category.isOpenCreateCategoryDrawer;

export const selectIsOpenEditCategoryDrawer = (state: RootState) =>
  state.category.isOpenEditCategoryDrawer;

export const selectCategoryDetail = (state: RootState) =>
  state.category.categoryDetail;

export const selectCategoryBySearch = createSelector(
  selectCategories,
  selectFilterCategorySearch,
  ({ data: categories }, search) =>
    categories.filter((cat) =>
      removeAccents(cat.name)
        .toLowerCase()
        .includes(removeAccents(search).toLowerCase())
    )
);
