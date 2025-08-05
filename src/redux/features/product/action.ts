import { createAction } from "@reduxjs/toolkit";
import type { Product } from "@typings/redux";

export const setFilterCategoryIds = createAction<number>(
  "product/filter-category/set"
);
export const removeFilterCategoryIds = createAction<number>(
  "product/filter-category/remove"
);
export const setFilterCategorySearch = createAction<string>(
  "product/filter-category/search"
);

export const fetchProducts = createAction<number[]>("product/fetchByCategory");
export const fetchProductsSuccess = createAction<Record<string, Product[]>>(
  "product/fetchAll/success"
);
export const fetchProductsFailed = createAction<string>(
  "product/fetchAll/failed"
);

export const toggleOpenCreateProductDrawer = createAction(
  "product/drawer/create"
);

export const createProduct = createAction<FormData>("product/create");
export const createProductSuccess = createAction<Product>(
  "product/create/success"
);
export const createProductFailed = createAction<string>(
  "product/create/failed"
);
