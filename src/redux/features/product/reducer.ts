import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Product } from "@typings/redux";
import {
  fetchProducts,
  fetchProductsFailed,
  fetchProductsSuccess,
} from "./action";

interface InitialState {
  products: {
    status: APIStatus;
    data: Product[];
    error?: string;
  };
}

const initialState: InitialState = {
  products: {
    status: "idle",
    data: [],
  },
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProducts, (state) => {
      state.products.status = "loading";
    })
    .addCase(fetchProductsSuccess, (state, action) => {
      state.products.status = "completed";
      state.products.data = action.payload;
    })
    .addCase(fetchProductsFailed, (state, action) => {
      state.products.status = "rejected";
      state.products.error = action.payload;
    });
});

export default productReducer;
