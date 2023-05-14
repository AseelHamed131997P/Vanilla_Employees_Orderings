import { ThunkDispatch } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import { ApplicationState } from "types";
import { RootAction } from "reducers/types";

export const useDispatch = () =>
  useDispatchBase<ThunkDispatch<ApplicationState, any, RootAction>>();
export const useSelector: TypedUseSelectorHook<ApplicationState> =
  useSelectorBase;
