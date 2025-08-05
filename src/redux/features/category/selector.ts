import type { RootState } from "@redux/store";

export const selectCategories = (state: RootState) => state.category.categories;

export const selectIsOpenCreateCategoryDrawer = (state: RootState) =>
  state.category.isOpenCreateCategoryDrawer;

export const selectIsOpenEditCategoryDrawer = (state: RootState) =>
  state.category.isOpenEditCategoryDrawer;

export const selectCategoryDetail = (state: RootState) =>
  state.category.categoryDetail;

export const selectCategoryCreate = (state: RootState) =>
  state.category.categoryCreate;

export const selectCategoryEdit = (state: RootState) =>
  state.category.categoryEdit;

export const selectCategoryDelete = (state: RootState) =>
  state.category.categoryDelete;
