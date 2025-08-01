import * as action from "@redux/features/auth/action";
import type { ApiResponse } from "@typings/apiResponse";
import type { User } from "@typings/redux";
import { setAccessTokenLS, setRefreshTokenLS } from "@utils/localStorage/token";
import { all, call, put, takeEvery } from "redux-saga/effects";
import * as service from "./service";

export default function* AppBooting() {
  yield all([watchLogin()]);
}

function* watchLogin() {
  yield takeEvery(action.login, handleLogin);
}

function* handleLogin({ payload }: ReturnType<typeof action.login>) {
  const [data, err]: ApiResponse<{
    accessToken: string;
    refreshToken: string;
    admin: User;
  }> = yield call(service.login, payload);

  if (data) {
    setAccessTokenLS(data.accessToken);
    setRefreshTokenLS(data.refreshToken);
    yield put(action.loginSuccess(data.admin));
  } else if (err) {
    yield put(action.loginFailed);
  }
}
