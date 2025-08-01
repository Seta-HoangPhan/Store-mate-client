import { createReducer } from "@reduxjs/toolkit";
import type { APIStatus, User } from "@typings/redux";
import {
  fetchUserFailed,
  fetchUserSuccess,
  login,
  loginFailed,
  loginSuccess,
} from "./action";

interface InitialState {
  profile?: User;
  login: {
    status: APIStatus;
  };
}

const initialState: InitialState = {
  login: {
    status: "idle",
  },
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserSuccess, (state, { payload: user }) => {
      state.profile = user;
    })
    .addCase(fetchUserFailed, (state) => {
      state.profile = undefined;
    })

    // login
    .addCase(login, (state) => {
      state.login.status = "loading";
    })
    .addCase(loginSuccess, (state, { payload: user }) => {
      state.login.status = "completed";
      state.profile = user;
    })
    .addCase(loginFailed, (state) => {
      state.login.status = "rejected";
      state.profile = undefined;
    });
});

export default authReducer;
