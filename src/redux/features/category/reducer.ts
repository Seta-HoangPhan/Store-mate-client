import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Category } from "@typings/redux";
import {
  getFilterCategoriesLS,
  setFilterCategoriesLS,
} from "@utils/localStorage/filterCategories";
import {
  createCategory,
  createCategoryFailed,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailed,
  deleteCategorySuccess,
  editCategory,
  editCategoryFailed,
  editCategorySuccess,
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
  categoryCreate: {
    status: APIStatus;
    data?: Category;
    error?: string;
  };
  categoryEdit: {
    status: APIStatus;
    data?: Category;
    error?: string;
  };
  categoryDelete: {
    status: APIStatus;
    data?: { id: number };
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
  categoryCreate: {
    status: "idle",
  },
  categoryEdit: {
    status: "idle",
  },
  categoryDelete: {
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

    // fetch one
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
    })

    // create
    .addCase(createCategory, (state) => {
      state.categoryCreate.status = "loading";
    })
    .addCase(createCategorySuccess, (state, { payload: category }) => {
      state.categoryCreate.status = "completed";
      state.categoryCreate.data = category;
      state.categories.data = [
        state.categoryCreate.data,
        ...state.categories.data,
      ];
    })
    .addCase(createCategoryFailed, (state, { payload: error }) => {
      state.categoryCreate.status = "rejected";
      state.categoryDetail.error = error;
    })

    // edit
    .addCase(editCategory, (state) => {
      state.categoryEdit.status = "loading";
    })
    .addCase(editCategorySuccess, (state, { payload: category }) => {
      state.categoryEdit.status = "completed";
      state.categoryEdit.data = category;
      state.categories.data = state.categories.data.map((cat) => {
        if (cat.id !== category.id) return cat;
        return category;
      });
    })
    .addCase(editCategoryFailed, (state, { payload: error }) => {
      state.categoryEdit.status = "rejected";
      state.categoryEdit.error = error;
    })

    // delete
    .addCase(deleteCategory, (state) => {
      state.categoryDelete.status = "loading";
    })
    .addCase(deleteCategorySuccess, (state, { payload: category }) => {
      state.categoryDelete.status = "completed";
      state.categoryDelete.data = category;
      state.categories.data = state.categories.data.filter(
        (cat) => cat.id !== category.id
      );
    })
    .addCase(deleteCategoryFailed, (state, { payload: error }) => {
      state.categoryDelete.status = "rejected";
      state.categoryDelete.error = error;
    });
});

export default categoryReducer;
