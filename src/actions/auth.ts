import { LOGOUT } from "./types";
import { LoginPayload } from "types";
import { Dispatch } from "redux";
import { api } from "ui/utils";
import jwt from "jsonwebtoken";
import { general } from "data";

export const login =
  ({ PIN, setLoading, setErrorCatch, setErrorPIN }: LoginPayload) =>
  (dispatch: Dispatch) => {
    console.log(PIN);

    api
      .get("/login.php?PIN=" + PIN)
      .then(({ data }) => {
        console.log(data);
        if (data.length == 0) {
          setLoading(false);
          setErrorPIN(true);
        } else {
          const token = jwt.sign(
            { id: data[0].id },
            general.validators.secret,
            {
              expiresIn: "1h",
            }
          );
          localStorage.setItem("usertoken", token);

          localStorage.setItem("userInfo", JSON.stringify(data));
          console.log("herer logindfsdf")
            window.location.href = "/main";
         
        }
        return Promise.resolve();
      })
      .catch((error) => {
        setLoading(false);
        console.log("err", error);
        setErrorCatch(true);
        return Promise.reject();
      });
  };

export const logout = () => (dispatch: Dispatch<any>) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("usertoken");
  window.location.href = "/login";
  dispatch({
    type: LOGOUT,
  });
};
