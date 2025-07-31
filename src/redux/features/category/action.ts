import { createAction } from "@reduxjs/toolkit";
import type { Category } from "@typings/redux";

export const fetchCategories = createAction("categoty/fetchAll");
export const fetchCategoriesSuccess = createAction<Category[]>(
  "categoty/fetchAll/success"
);
export const fetchCategoriesFailed = createAction<string>(
  "categoty/fetchAll/failed"
);

export const setFilterCategories = createAction<string>("category/set-filter");
export const removeFilterCategories = createAction<string>(
  "category/remove-filter"
);
export const setFilterCategorySearch = createAction<string>(
  "category/filter/search"
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
