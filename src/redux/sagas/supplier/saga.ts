import * as action from "@redux/features/supplier/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { Supplier } from "@typings/redux";
import { all, call, delay, put, takeEvery } from "redux-saga/effects";
import * as service from "./service";

export default function* supplierSaga() {
  yield all([
    watchFetchSuppliers(),
    watchToggleEditSupplier(),
    watchCreateSupplier(),
    watchEditSupplier(),
    watchDeleteSupplier(),
  ]);
}

function* watchFetchSuppliers() {
  yield takeEvery(action.fetchSuppliers, handleFetchSuplliers);
}

function* handleFetchSuplliers() {
  const [data, err]: ApiResponse<Supplier[]> = yield call(
    service.fetchAllSuppliers
  );
  if (data) {
    yield put(action.fetchSuppliersSuccess(data));
  } else if (err) {
    yield put(action.fetchSuppliersFailed(err));
  }
}

function* watchToggleEditSupplier() {
  yield takeEvery(
    action.toggleOpenEditSupplierDrawer,
    handleToggleEditSupplier
  );
}

function* handleToggleEditSupplier({
  payload,
}: ReturnType<typeof action.toggleOpenEditSupplierDrawer>) {
  const supId = payload;
  if (!supId) return;

  const [data, err]: ApiResponse<Supplier> = yield call(
    service.fetchSupplierById,
    supId
  );

  yield delay(1000);

  if (data) {
    yield put(action.fetchSupplierSuccess(data));
  } else if (err) {
    yield put(action.fetchSupplierFailed(err));
  }
}

function* watchCreateSupplier() {
  yield takeEvery(action.createSupplier, handleCreateSupplier);
}

function* handleCreateSupplier({
  payload,
}: ReturnType<typeof action.createSupplier>) {
  const [data, err]: ApiResponse<Supplier> = yield call(
    service.createSupplier,
    payload
  );

  yield delay(1000);

  if (data) {
    yield put(action.createSupplierSuccess(data));
  } else if (err) {
    yield put(action.createSupplierFailed(err));
  }
}

function* watchEditSupplier() {
  yield takeEvery(action.editSupplier, handleEditSupplier);
}

function* handleEditSupplier({
  payload,
}: ReturnType<typeof action.editSupplier>) {
  const [data, err]: ApiResponse<Supplier> = yield call(
    service.editSupplier,
    payload
  );

  yield delay(1000);

  if (data) {
    yield put(action.editSupplierSuccess(data));
  } else if (err) {
    yield put(action.editSupplierFailed(err));
  }
}

function* watchDeleteSupplier() {
  yield takeEvery(action.deleteSupplier, handleDeleteSupplier);
}

function* handleDeleteSupplier({
  payload: id,
}: ReturnType<typeof action.deleteSupplier>) {
  const [data, err]: ApiResponse<Supplier> = yield call(
    service.deleteCategory,
    id
  );

  yield delay(1000);

  if (data) {
    yield put(action.deleteSupplierSuccess(data));
  } else if (err) {
    yield put(action.deleteSupplierFailed(err));
  }
}
