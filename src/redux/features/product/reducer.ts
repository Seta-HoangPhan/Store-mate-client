import * as catActions from "@redux/features/category/action";
import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Category, Product } from "@typings/redux";
import {
  getFilterCategoriesLS,
  setFilterCategoriesLS,
} from "@utils/localStorage/filterCategories";
import * as actions from "./action";

export interface InitialState {
  products: {
    status: APIStatus;
    data: Record<string, Product[]>;
    error?: string;
  };
  productDetail: {
    status: APIStatus;
    data?: Product;
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
  productEdit: {
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
  productDetail: {
    status: "idle",
  },
  categories: [],
  filterCategoryIds: getFilterCategoriesLS(),
  filterCategorySearch: "",
  isOpenCreateProductDrawer: false,
  isOpenEditProductDrawer: false,
  productCreate: {
    status: "idle",
  },
  productEdit: {
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

    // fetch all product by filtr cat list
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

    // toggle create drawer
    .addCase(actions.toggleOpenCreateProductDrawer, (state) => {
      state.isOpenCreateProductDrawer = !state.isOpenCreateProductDrawer;
      if (state.isOpenCreateProductDrawer) {
        state.productCreate = {
          status: "idle",
        };
      }
    })

    // create
    .addCase(actions.createProduct, (state) => {
      state.productCreate.status = "loading";
    })
    .addCase(actions.createProductSuccess, (state, { payload: product }) => {
      state.productCreate.status = "completed";
      state.productCreate.data = product;
      state.productCreate.error = undefined;

      const copyProducts = {
        ...state.products.data,
      };
      const key = product.category?.id || "cat";
      copyProducts[key] = [product, ...copyProducts[key]];
      state.products.data = copyProducts;
    })
    .addCase(actions.createProductFailed, (state, { payload: err }) => {
      state.productCreate.status = "rejected";
      state.productCreate.data = undefined;
      state.productCreate.error = err;
    })

    // toggle edit drawer
    .addCase(actions.toggleOpenEditProductDrawer, (state, { payload }) => {
      state.isOpenEditProductDrawer = !!payload;
      if (payload) {
        state.productDetail.status = "loading";
        state.productEdit = {
          status: "idle",
        };
      }
    })

    // fetch one product by id
    .addCase(actions.fetchProductById, (state) => {
      state.productDetail.status = "loading";
    })
    .addCase(actions.fetchProductByIdSuccess, (state, { payload: product }) => {
      state.productDetail.status = "completed";
      state.productDetail.data = product;
      state.productDetail.error = undefined;
    })
    .addCase(actions.fetchProductByIdFailed, (state, { payload: err }) => {
      state.productDetail.status = "rejected";
      state.productDetail.data = undefined;
      state.productDetail.error = err;
    })

    // edit
    .addCase(actions.editProduct, (state) => {
      state.productEdit.status = "loading";
    })
    .addCase(actions.editProductSuccess, (state, { payload: product }) => {
      state.productEdit.status = "completed";
      state.productEdit.data = product;
      state.productEdit.error = undefined;

      const copyProducts = {
        ...state.products.data,
      };
      const key = product.category?.id || "cat";
      copyProducts[key] = copyProducts[key].map((prod) => {
        if (prod.id === product.id) return product;
        return prod;
      });
      state.products.data = copyProducts;
    })
    .addCase(actions.editProductFailed, (state, { payload: err }) => {
      state.productEdit.status = "rejected";
      state.productEdit.data = undefined;
      state.productEdit.error = err;
    });
});

export default productReducer;
