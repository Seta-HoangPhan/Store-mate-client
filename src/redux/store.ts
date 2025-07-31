import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import categoryReducer from "./features/category/reducer";
import rootSaga from "./sagas/rootSaga";
import productReducer from "./features/product/reducer";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
