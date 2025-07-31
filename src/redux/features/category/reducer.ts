import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Category } from "@typings/redux";
import {
  getFilterCategoriesLS,
  setFilterCategoriesLS,
} from "@utils/localStorage/filterCategories";
import {
  fetchCategories,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
  fetchCategoryFailed,
  fetchCategorySuccess,
  removeFilterCategories,
  setFilterCategories,
  setFilterCategorySearch,
  toggleOpenCreateCategoryDrawer,
  toggleOpenEditCategoryDrawer,
} from "./action";

interface InitialState {
  categories: {
    status: APIStatus;
    data: Category[];
    error?: string;
  };
  filterCategories: Category[];
  filterCategorySearch: string;
  isOpenCreateCategoryDrawer: boolean;
  isOpenEditCategoryDrawer: boolean;
  categoryDetail: {
    status: APIStatus;
    data?: Category;
    error?: string;
  };
}

const initialState: InitialState = {
  categories: {
    status: "idle",
    data: [],
  },
  filterCategories: getFilterCategoriesLS(),
  filterCategorySearch: "",
  isOpenCreateCategoryDrawer: false,
  isOpenEditCategoryDrawer: false,
  categoryDetail: {
    status: "idle",
  },
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCategories, (state) => {
      state.categories.status = "loading";
    })
    .addCase(fetchCategoriesSuccess, (state, action) => {
      state.categories.status = "completed";
      state.categories.data = action.payload;
    })
    .addCase(fetchCategoriesFailed, (state, action) => {
      state.categories.status = "rejected";
      state.categories.error = action.payload;
    })
    .addCase(setFilterCategories, (state, action) => {
      const filterCat = state.categories.data.find(
        (cat) => cat.id.toString() === action.payload
      );
      if (!filterCat) {
        return;
      }
      state.filterCategories = [...state.filterCategories, filterCat];
      setFilterCategoriesLS(state.filterCategories);
    })
    .addCase(removeFilterCategories, (state, action) => {
      state.filterCategories = state.filterCategories.filter(
        (cat) => cat.id.toString() !== action.payload
      );
      setFilterCategoriesLS(state.filterCategories);
    })
    .addCase(setFilterCategorySearch, (state, { payload: search }) => {
      state.filterCategorySearch = search;
    })
    .addCase(toggleOpenCreateCategoryDrawer, (state) => {
      state.isOpenCreateCategoryDrawer = !state.isOpenCreateCategoryDrawer;
    })
    .addCase(toggleOpenEditCategoryDrawer, (state, { payload: catId }) => {
      state.isOpenEditCategoryDrawer = !state.isOpenEditCategoryDrawer;
      if (catId) {
        state.categoryDetail.status = "loading";
      }
    })
    .addCase(fetchCategorySuccess, (state, { payload: category }) => {
      state.categoryDetail.status = "completed";
      state.categoryDetail.data = category;
    })
    .addCase(fetchCategoryFailed, (state, { payload: error }) => {
      state.categoryDetail.status = "rejected";
      state.categoryDetail.error = error;
    });
});

export default categoryReducer;
