import {
  fetchCategories,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
  fetchCategoryFailed,
  fetchCategorySuccess,
  toggleOpenEditCategoryDrawer,
} from "@redux/features/category/action";
import type { ApiResponse } from "@typings/apiResponse";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchAllCategories, fetchCategoryById } from "./service";
import type { Category } from "@typings/redux";

export default function* categorySaga() {
  yield all([watchFetchCategories(), watchToggleEditCategorie()]);
}

function* watchFetchCategories() {
  yield takeEvery(fetchCategories, handleFetchCategories);
}

function* handleFetchCategories() {
  const [data, err]: ApiResponse<Category[]> = yield call(fetchAllCategories);
  if (data) {
    yield put(fetchCategoriesSuccess(data));
  } else if (err) {
    yield put(fetchCategoriesFailed(err));
  }
}

function* watchToggleEditCategorie() {
  yield takeEvery(toggleOpenEditCategoryDrawer, handleToggleEditCategorie);
}

function* handleToggleEditCategorie(
  action: ReturnType<typeof toggleOpenEditCategoryDrawer>
) {
  const catId = action.payload;
  if (!catId) return;

  const [data, err]: ApiResponse<Category> = yield call(
    fetchCategoryById,
    catId
  );
  if (data) {
    yield put(fetchCategorySuccess(data));
  } else if (err) {
    yield put(fetchCategoryFailed(err));
  }
}
