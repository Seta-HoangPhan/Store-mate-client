import * as action from "@redux/features/auth/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { User } from "@typings/redux";
import { getAccessTokenLS } from "@utils/localStorage/token";
import { all, call, put } from "redux-saga/effects";
import * as service from "./service";

export default function* AppBooting() {
  yield all([getUserProfile()]);
}

function* getUserProfile() {
  const token = getAccessTokenLS();
  if (token) {
    const [data, err]: ApiResponse<User> = yield call(service.getProfile);
    if (data) {
      yield put(action.fetchUserSuccess(data));
    } else if (err) {
      yield put(action.fetchUserFailed);
    }
  }
}
