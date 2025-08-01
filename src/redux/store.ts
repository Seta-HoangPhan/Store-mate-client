import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import authReducer from "./features/auth/reducer";
import categoryReducer from "./features/category/reducer";
import productReducer from "./features/product/reducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
