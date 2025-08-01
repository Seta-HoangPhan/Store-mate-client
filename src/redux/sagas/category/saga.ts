import * as action from "@redux/features/category/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { Category } from "@typings/redux";
import { all, call, delay, put, takeEvery } from "redux-saga/effects";
import * as service from "./service";

export default function* categorySaga() {
  yield all([
    watchFetchCategories(),
    watchToggleEditCategory(),
    watchCreateCategory(),
    watchEditCategory(),
    watchDeleteCategory(),
  ]);
}

function* watchFetchCategories() {
  yield takeEvery(action.fetchCategories, handleFetchCategories);
}

function* handleFetchCategories() {
  const [data, err]: ApiResponse<Category[]> = yield call(
    service.fetchAllCategories
  );
  if (data) {
    yield put(action.fetchCategoriesSuccess(data));
  } else if (err) {
    yield put(action.fetchCategoriesFailed(err));
  }
}

function* watchToggleEditCategory() {
  yield takeEvery(
    action.toggleOpenEditCategoryDrawer,
    handleToggleEditCategory
  );
}

function* handleToggleEditCategory({
  payload,
}: ReturnType<typeof action.toggleOpenEditCategoryDrawer>) {
  const catId = payload;
  if (!catId) return;

  const [data, err]: ApiResponse<Category> = yield call(
    service.fetchCategoryById,
    catId
  );

  yield delay(1000);

  if (data) {
    yield put(action.fetchCategorySuccess(data));
  } else if (err) {
    yield put(action.fetchCategoryFailed(err));
  }
}

function* watchCreateCategory() {
  yield takeEvery(action.createCategory, handleCreateCategory);
}

function* handleCreateCategory({
  payload,
}: ReturnType<typeof action.createCategory>) {
  const [data, err]: ApiResponse<Category> = yield call(
    service.createCategory,
    payload
  );

  yield delay(1000);

  if (data) {
    yield put(action.createCategorySuccess(data));
  } else if (err) {
    yield put(action.createCategoryFailed(err));
  }
}

function* watchEditCategory() {
  yield takeEvery(action.editCategory, handleEditCategory);
}

function* handleEditCategory({
  payload: { id, description, name },
}: ReturnType<typeof action.editCategory>) {
  const [data, err]: ApiResponse<Category> = yield call(
    service.editCategory,
    id,
    {
      name,
      description,
    }
  );

  yield delay(1000);

  if (data) {
    yield put(action.editCategorySuccess(data));
  } else if (err) {
    yield put(action.editCategoryFailed(err));
  }
}

function* watchDeleteCategory() {
  yield takeEvery(action.deleteCategory, handleDeleteCategory);
}

function* handleDeleteCategory({
  payload: id,
}: ReturnType<typeof action.deleteCategory>) {
  const [data, err]: ApiResponse<Category> = yield call(
    service.deleteCategory,
    id
  );

  yield delay(1000);

  if (data) {
    yield put(action.deleteCategorySuccess(data));
  } else if (err) {
    yield put(action.deleteCategoryFailed(err));
  }
}
