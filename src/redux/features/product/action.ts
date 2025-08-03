import { createAction } from "@reduxjs/toolkit";
import type { Product } from "@typings/redux";

export const fetchProducts = createAction("product/fetchAll");
export const fetchProductsSuccess = createAction<Product[]>(
  "product/fetchAll/success"
);
export const fetchProductsFailed = createAction<string>(
  "product/fetchAll/failed"
);

export const toggleOpenCreateProductDrawer = createAction(
  "product/drawer/create"
);
