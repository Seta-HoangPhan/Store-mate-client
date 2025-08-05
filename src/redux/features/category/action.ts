import { createAction } from "@reduxjs/toolkit";
import type { Category } from "@typings/redux";

export const fetchCategories = createAction("categoty/fetchAll");
export const fetchCategoriesSuccess = createAction<Category[]>(
  "categoty/fetchAll/success"
);
export const fetchCategoriesFailed = createAction<string>(
  "categoty/fetchAll/failed"
);

export const toggleOpenCreateCategoryDrawer = createAction(
  "category/drawer/create"
);

export const toggleOpenEditCategoryDrawer = createAction<number | undefined>(
  "category/drawer/edit"
);
export const fetchCategorySuccess = createAction<Category>(
  "categoty/fetchOne/success"
);
export const fetchCategoryFailed = createAction<string>(
  "categoty/fetchOne/failed"
);

export const createCategory = createAction<{
  name: string;
  description?: string;
}>("category/create");
export const createCategorySuccess = createAction<Category>(
  "category/create/success"
);
export const createCategoryFailed = createAction<string>(
  "category/create/failed"
);

export const editCategory = createAction<{
  id: number;
  name?: string;
  description?: string;
}>("category/edit");
export const editCategorySuccess = createAction<Category>(
  "category/edit/success"
);
export const editCategoryFailed = createAction<string>("category/edit/failed");

export const deleteCategory = createAction<number>("category/delete");
export const deleteCategorySuccess = createAction<{ id: number }>(
  "category/delete/success"
);
export const deleteCategoryFailed = createAction<string>(
  "category/delete/failed"
);
