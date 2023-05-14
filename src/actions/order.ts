import { InsertPayload } from "types";
import { Dispatch } from "redux";
import { api } from "ui/utils";
import moment from "moment";

export const inserTheOrder =
  ({
    selectValue,
    price,
    description,
    setError,
    setOpen,
    changeState,
  }: InsertPayload) =>
  (dispatch: Dispatch) => {
    let user = null;
    const localUser = localStorage.getItem("userInfo");

    if (localUser) {
      user = JSON.parse(localUser);
    }
    api
      .get(
        "/insertOrderingUsers.php?user_id=" +
          selectValue.user_id +
          "&serial_number=" +
          user[0].serial_number +
          "&username=" +
          selectValue.value +
          "&price=" +
          price.trim() +
          "&description=" +
          description
      )
      .then(({ data }) => {
        api
          .post(
            "/updateMonthlyValuesForEmployeesOrders.php?user_id=" +
              selectValue.user_id +
              "&date=" +
              moment().utc().format("YYYY-MM-01") +
              "&payslip=" +
              0 +
              "&holidays=" +
              0
          )
          .then(({ data }) => {
            console.log("successed");
            setOpen(true);
            changeState();

            return Promise.resolve();
          })
          .catch((error) => {
            console.log("err", error);
            console.log("failed");
            setError(true);
            return Promise.reject();
          });

        return Promise.resolve();
      })
      .catch((error) => {
        console.log("err", error);
        setError(true);
        return Promise.reject();
      });
  };
