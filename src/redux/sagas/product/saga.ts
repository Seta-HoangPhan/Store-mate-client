import * as actions from "@redux/features/product/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { Product } from "@typings/redux";
import { all, call, put, takeEvery } from "redux-saga/effects";
import * as service from "./service";

export default function* productSaga() {
  yield all([watchFetchProducts(), watchCreateProduct()]);
}

function* watchFetchProducts() {
  yield takeEvery(actions.fetchProducts, handleFetchProducts);
}

function* handleFetchProducts({
  payload,
}: ReturnType<typeof actions.fetchProducts>) {
  const [data, err]: ApiResponse<Record<string, Product[]>> = yield call(
    service.fetchProducts,
    payload
  );
  if (data) {
    yield put(actions.fetchProductsSuccess(data));
  } else if (err) {
    yield put(actions.fetchProductsFailed(err));
  }
}

function* watchCreateProduct() {
  yield takeEvery(actions.createProduct, handleCreateProduct);
}

function* handleCreateProduct({
  payload,
}: ReturnType<typeof actions.createProduct>) {
  for (const [key, val] of payload.entries()) {
    console.log(key, val);
  }
  const [data, err]: ApiResponse<Product> = yield call(
    service.createProduct,
    payload
  );
  if (data) {
    yield put(actions.createProductSuccess(data));
  } else if (err) {
    yield put(actions.createProductFailed(err));
  }
}
