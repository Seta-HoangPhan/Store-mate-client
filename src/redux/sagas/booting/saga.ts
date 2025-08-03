import * as action from "@redux/features/auth/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { User } from "@typings/redux";
import { getAccessTokenLS } from "@utils/localStorage/token";
import { all, call, delay, put } from "redux-saga/effects";
import * as service from "./service";

export default function* appBooting() {
  yield all([getUserProfile()]);
}

function* getUserProfile() {
  yield put(action.fetchUser());
  yield delay(500);

  const token = getAccessTokenLS();
  if (token) {
    let reTry = 0;

    while (reTry < 3) {
      console.log("check12 re", reTry);
      const [data]: ApiResponse<User> = yield call(service.getProfile);
      if (data) {
        yield put(action.fetchUserSuccess(data));
        return;
      }
      reTry++;
    }

    yield put(action.fetchUserFailed());
    return;
  }

  yield put(action.fetchUserFailed());
}
