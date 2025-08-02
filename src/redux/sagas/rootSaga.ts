import { all } from "redux-saga/effects";
import categorySaga from "./category/saga";
import appBooting from "./booting/saga";
import authSaga from "./auth/saga";

export default function* rootSaga() {
  yield all([appBooting(), categorySaga(), authSaga()]);
}
