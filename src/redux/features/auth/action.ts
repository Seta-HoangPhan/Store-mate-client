import { createAction } from "@reduxjs/toolkit";
import type { User } from "@typings/redux";

export const fetchUser = createAction("user/fetch");
export const fetchUserSuccess = createAction<User>("user/fetch/success");
export const fetchUserFailed = createAction("user/fetch/failed");

export const login = createAction<{
  phone: string;
  password: string;
}>("login");
export const loginSuccess = createAction<User>("login/success");
export const loginFailed = createAction("login/failed");

export const logout = createAction("logout");
