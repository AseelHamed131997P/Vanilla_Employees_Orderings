import { SET_MESSAGE, CLEAR_MESSAGE } from "actions/types";
import { AnyAction } from "redux";

const initialState = {};

const message = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
};

export default message;
