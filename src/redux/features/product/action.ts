import { createAction } from "@reduxjs/toolkit";
import type { Product, ProductDetail } from "@typings/redux";

export const setFilterCategoryIds = createAction<number>(
  "product/filter-category/set"
);
export const removeFilterCategoryIds = createAction<number>(
  "product/filter-category/remove"
);
export const setFilterCategorySearch = createAction<string>(
  "product/filter-category/search"
);

export const fetchProducts = createAction<{
  filterCatIds: number[];
  isCreate?: boolean;
}>("product/fetchByCategory");
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

export const toggleOpenEditProductDrawer = createAction<number | undefined>(
  "product/drawer/edit"
);
export const fetchProductById = createAction<number>("product/fetch-by-id");
export const fetchProductByIdSuccess = createAction<ProductDetail>(
  "product/fetch-by-id/success"
);
export const fetchProductByIdFailed = createAction<string>(
  "product/fetch-by-id/failed"
);

export const editProduct = createAction<FormData>("product/edit");
export const editProductSuccess = createAction<Product>("product/edit/success");
export const editProductFailed = createAction<string>("product/edit/failed");
