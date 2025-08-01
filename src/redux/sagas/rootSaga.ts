import { all } from "redux-saga/effects";
import categorySaga from "./category/saga";
import AppBooting from "./booting/saga";

export default function* rootSaga() {
  yield all([AppBooting(), categorySaga()]);
}
