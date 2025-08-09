import { all } from "redux-saga/effects";
import categorySaga from "./category/saga";
import appBooting from "./booting/saga";
import authSaga from "./auth/saga";
import productSaga from "./product/saga";
import supplierSaga from "./supplier/saga";

export default function* rootSaga() {
  yield all([
    appBooting(),
    categorySaga(),
    authSaga(),
    productSaga(),
    supplierSaga(),
  ]);
}
