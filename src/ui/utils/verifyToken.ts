

import jwt from "jsonwebtoken";
import { general } from "data";
import { logout } from "actions/auth";


const verifyToken =
  (dispatch: any)=> {
 
    const valuetoken = localStorage.getItem("usertoken");
    if (valuetoken) {
      jwt.verify(
        valuetoken,
        general.validators.secret,
        function (err, decoded) {
          if (err) {

            dispatch(logout())
          } else {
            console.log(decoded);
          }

        }
      );
    }
  };

  export default verifyToken;

