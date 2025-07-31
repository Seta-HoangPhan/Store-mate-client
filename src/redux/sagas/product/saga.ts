import {
  fetchProducts,
  fetchProductsFailed,
  fetchProductsSuccess,
} from "@redux/features/product/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { Product } from "@typings/redux";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchAllProducts } from "./service";

export default function* productSaga() {
  yield all([watchFetchProducts()]);
}

function* watchFetchProducts() {
  yield takeEvery(fetchProducts, handleFetchProducts);
}

function* handleFetchProducts() {
  const [data, err]: ApiResponse<Product[]> = yield call(fetchAllProducts);
  if (data) {
    yield put(fetchProductsSuccess(data));
  } else if (err) {
    yield put(fetchProductsFailed(err));
  }
}
