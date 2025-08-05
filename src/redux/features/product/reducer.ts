import * as catActions from "@redux/features/category/action";
import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Category, Product } from "@typings/redux";
import {
  getFilterCategoriesLS,
  setFilterCategoriesLS,
} from "@utils/localStorage/filterCategories";
import * as actions from "./action";

interface InitialState {
  products: {
    status: APIStatus;
    data: Record<string, Product[]>;
    error?: string;
  };
  categories: Category[];
  filterCategoryIds: number[];
  filterCategorySearch: string;
  isOpenCreateProductDrawer: boolean;
  isOpenEditProductDrawer: boolean;
  productCreate: {
    status: APIStatus;
    data?: Product;
    error?: string;
  };
}

const initialState: InitialState = {
  products: {
    status: "idle",
    data: {},
  },
  categories: [],
  filterCategoryIds: getFilterCategoriesLS(),
  filterCategorySearch: "",
  isOpenCreateProductDrawer: false,
  isOpenEditProductDrawer: false,
  productCreate: {
    status: "idle",
  },
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    // fetch categories
    .addCase(catActions.fetchCategoriesSuccess, (state, { payload }) => {
      state.categories = payload;
    })
    .addCase(catActions.fetchCategoriesFailed, (state) => {
      state.categories = [];
    })

    // filter prods by catId
    .addCase(actions.setFilterCategoryIds, (state, { payload: id }) => {
      const filterCat = state.categories.find((cat) => cat.id === id);
      if (!filterCat) {
        return;
      }
      state.filterCategoryIds = [...state.filterCategoryIds, filterCat.id];
      setFilterCategoriesLS(state.filterCategoryIds);
    })
    .addCase(actions.removeFilterCategoryIds, (state, { payload }) => {
      state.filterCategoryIds = state.filterCategoryIds.filter(
        (id) => id !== payload
      );
      setFilterCategoriesLS(state.filterCategoryIds);
    })
    .addCase(actions.setFilterCategorySearch, (state, { payload: search }) => {
      state.filterCategorySearch = search;
    })

    .addCase(actions.fetchProducts, (state) => {
      state.products.status = "loading";
    })
    .addCase(actions.fetchProductsSuccess, (state, { payload }) => {
      state.products.status = "completed";
      state.products.data = payload;
      state.products.error = undefined;
    })
    .addCase(actions.fetchProductsFailed, (state, action) => {
      state.products.status = "rejected";
      state.products.error = action.payload;
      state.products.data = {};
    })

    .addCase(actions.toggleOpenCreateProductDrawer, (state) => {
      state.isOpenCreateProductDrawer = !state.isOpenCreateProductDrawer;
    })

    // create
    .addCase(actions.createProduct, (state) => {
      state.productCreate.status = "loading";
    })
    .addCase(actions.createProductSuccess, (state, { payload: product }) => {
      state.productCreate.status = "completed";
      state.productCreate.data = product;

      const copyProducts = {
        ...state.products.data,
      };
      copyProducts[`${product.id}`] = [
        product,
        ...copyProducts[`${product.id}`],
      ];
      state.products.data = copyProducts;
      state.productCreate.error = undefined;
    })
    .addCase(actions.createProductFailed, (state, { payload: err }) => {
      state.productCreate.status = "rejected";
      state.productCreate.data = undefined;
      state.productCreate.error = err;
    });
});

export default productReducer;
