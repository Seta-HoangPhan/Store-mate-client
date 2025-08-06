import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, Category } from "@typings/redux";
import * as actions from "./action";

interface InitialState {
  categories: {
    status: APIStatus;
    data: Category[];
    error?: string;
  };
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
    .addCase(actions.fetchCategories, (state) => {
      state.categories.status = "loading";
    })
    .addCase(actions.fetchCategoriesSuccess, (state, action) => {
      state.categories.status = "completed";
      state.categories.data = action.payload;
    })
    .addCase(actions.fetchCategoriesFailed, (state, action) => {
      state.categories.status = "rejected";
      state.categories.error = action.payload;
    })
    .addCase(actions.toggleOpenCreateCategoryDrawer, (state) => {
      state.isOpenCreateCategoryDrawer = !state.isOpenCreateCategoryDrawer;
      if (state.isOpenCreateCategoryDrawer) {
        state.categoryCreate = {
          status: "idle",
        };
      }
    })

    // fetch one
    .addCase(
      actions.toggleOpenEditCategoryDrawer,
      (state, { payload: catId }) => {
        state.isOpenEditCategoryDrawer = !state.isOpenEditCategoryDrawer;
        if (catId) {
          state.categoryDetail.status = "loading";
          state.categoryEdit = {
            status: "idle",
          };
        }
      }
    )
    .addCase(actions.fetchCategorySuccess, (state, { payload: category }) => {
      state.categoryDetail.status = "completed";
      state.categoryDetail.data = category;
    })
    .addCase(actions.fetchCategoryFailed, (state, { payload: error }) => {
      state.categoryDetail.status = "rejected";
      state.categoryDetail.error = error;
    })

    // create
    .addCase(actions.createCategory, (state) => {
      state.categoryCreate.status = "loading";
    })
    .addCase(actions.createCategorySuccess, (state, { payload: category }) => {
      state.categoryCreate.status = "completed";
      state.categoryCreate.data = category;
      state.categories.data = [
        state.categoryCreate.data,
        ...state.categories.data,
      ];
    })
    .addCase(actions.createCategoryFailed, (state, { payload: error }) => {
      state.categoryCreate.status = "rejected";
      state.categoryDetail.error = error;
    })

    // edit
    .addCase(actions.editCategory, (state) => {
      state.categoryEdit.status = "loading";
    })
    .addCase(actions.editCategorySuccess, (state, { payload: category }) => {
      state.categoryEdit.status = "completed";
      state.categoryEdit.data = category;
      state.categories.data = state.categories.data.map((cat) => {
        if (cat.id !== category.id) return cat;
        return category;
      });
    })
    .addCase(actions.editCategoryFailed, (state, { payload: error }) => {
      state.categoryEdit.status = "rejected";
      state.categoryEdit.error = error;
    })

    // delete
    .addCase(actions.deleteCategory, (state) => {
      state.categoryDelete.status = "loading";
    })
    .addCase(actions.deleteCategorySuccess, (state, { payload: category }) => {
      state.categoryDelete.status = "completed";
      state.categoryDelete.data = category;
      state.categories.data = state.categories.data.filter(
        (cat) => cat.id !== category.id
      );
    })
    .addCase(actions.deleteCategoryFailed, (state, { payload: error }) => {
      state.categoryDelete.status = "rejected";
      state.categoryDelete.error = error;
    });
});

export default categoryReducer;
