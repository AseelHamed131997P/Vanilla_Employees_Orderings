import { connectRouter } from "connected-react-router";
import { History } from "history";
import { ApplicationState } from "types";
import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";

const rootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    router: connectRouter(history),
    auth,
    message,
  });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
