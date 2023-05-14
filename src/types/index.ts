import { RouterState } from "connected-react-router";

export interface ApplicationState {
  router: RouterState;
  auth: AuthState;
  message: any;
}

export interface LoginPayload {
  PIN: string;
  setLoading: any;
  setErrorCatch: any;
  setErrorPIN: any;
}

export interface InsertPayload {
  selectValue: any;
  price: string;
  description: string;
  setError: any;
  setOpen: any;
  changeState: any;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: any;
}
