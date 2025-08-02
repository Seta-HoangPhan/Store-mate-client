import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, User } from "@typings/redux";
import {
  fetchUser,
  fetchUserFailed,
  fetchUserSuccess,
  login,
  loginFailed,
  loginSuccess,
  logout,
} from "./action";

interface InitialState {
  profile: {
    status: APIStatus;
    data?: User;
  };
}

const initialState: InitialState = {
  profile: {
    status: "idle",
  },
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUser, (state) => {
      state.profile.status = "loading";
    })
    .addCase(fetchUserSuccess, (state, { payload: user }) => {
      state.profile.status = "completed";
      state.profile.data = user;
    })
    .addCase(fetchUserFailed, (state) => {
      state.profile.status = "rejected";
      state.profile.data = undefined;
    })

    // login
    .addCase(login, (state) => {
      state.profile.status = "loading";
    })
    .addCase(loginSuccess, (state, { payload: user }) => {
      state.profile.status = "completed";
      state.profile.data = user;
    })
    .addCase(loginFailed, (state) => {
      state.profile.status = "rejected";
      state.profile.data = undefined;
    })

    // logout
    .addCase(logout, (state) => {
      state.profile.status = "idle";
      state.profile.data = undefined;
    });
});

export default authReducer;
