import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import rootReducer from "../reducers/index";

const isDev = process.env.NODE_ENV === "development";
const createStore = () => {
  // const middleware = getDefaultMiddleware();
  // if (isDev) {
  //   middleware.push(logger);
  // }
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore);

export default wrapper;
