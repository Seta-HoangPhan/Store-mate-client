import * as actions from "@redux/features/product/action";
import type { InitialState as ProductState } from "@redux/features/product/reducer";
import { selectProductDetail } from "@redux/features/product/selector";
import type { ApiResponse } from "@typings/apiResponse";
import type { Product } from "@typings/redux";
import { all, call, delay, put, select, takeEvery } from "redux-saga/effects";
import * as service from "./service";

export default function* productSaga() {
  yield all([
    watchFetchProducts(),
    watchCreateProduct(),
    watchFetchProductDetail(),
    watchToggleEditDrawer(),
    watchEditProduct(),
  ]);
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

function* watchToggleEditDrawer() {
  yield takeEvery(
    actions.toggleOpenEditProductDrawer,
    handleFetchProductDetail
  );
}

function* watchFetchProductDetail() {
  yield takeEvery(actions.fetchProductById, handleFetchProductDetail);
}

function* handleFetchProductDetail({
  payload: id,
}: ReturnType<
  typeof actions.fetchProductById | typeof actions.toggleOpenEditProductDrawer
>) {
  if (!id) return;
  const [data, err]: ApiResponse<Product> = yield call(
    service.fetchProductById,
    id
  );

  yield delay(1000);

  if (data) {
    yield put(actions.fetchProductByIdSuccess(data));
  } else if (err) {
    yield put(actions.fetchProductByIdFailed(err));
  }
}

function* watchCreateProduct() {
  yield takeEvery(actions.createProduct, handleCreateProduct);
}

function* handleCreateProduct({
  payload,
}: ReturnType<typeof actions.createProduct>) {
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

function* watchEditProduct() {
  yield takeEvery(actions.editProduct, handleEditProduct);
}

function* handleEditProduct({
  payload,
}: ReturnType<typeof actions.editProduct>) {
  const { data: product }: ProductState["productDetail"] = yield select(
    selectProductDetail
  );

  if (!product) {
    // todo: add snackbar and put toggle close drawer
    return;
  }

  const [data, err]: ApiResponse<Product> = yield call(
    service.editProduct,
    product.id,
    payload
  );

  yield delay(1000);

  if (data) {
    yield put(actions.editProductSuccess(data));
  } else if (err) {
    yield put(actions.editProductFailed(err));
  }
}
