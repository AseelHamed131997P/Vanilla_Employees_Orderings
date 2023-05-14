import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, BISAN_FAIL } from "actions/types";
import { AnyAction } from "redux";

let user = null;
const localUser = localStorage.getItem("userInfo");

if (localUser) {
  user = JSON.parse(localUser);
}

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const auth = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case BISAN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default auth;
