import { createAction } from "@reduxjs/toolkit";
import type { User } from "@typings/redux";

export const fetchUserSuccess = createAction<User>("user/fetch/success");
export const fetchUserFailed = createAction("user/fetch/failed");

export const login = createAction<{
  phone: string;
  password: string;
}>("login");
export const loginSuccess = createAction<User>("login/success");
export const loginFailed = createAction("login/failed");
