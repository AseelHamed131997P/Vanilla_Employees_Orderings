import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import rootReducer from "reducers";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { errorMiddleware } from "./middlewares";

export const history = createBrowserHistory();

const persistConfig = {
  key: "ngn-tickets-store",
  storage: storageSession,
  whitelist: ["params"],
};

const store = () => {
  const initialState = {};
  const middlewares = [routerMiddleware(history), errorMiddleware, thunk];
  const enhancers = [];

  if (process.env.NODE_ENV === "development") {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window as any;

    if (typeof __REDUX_DEVTOOLS_EXTENSION__ === "function") {
      enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const store = createStore(persistedReducer, initialState, composedEnhancers);
  const persistor = persistStore(store);

  return { store, persistor };
};

export default store;
