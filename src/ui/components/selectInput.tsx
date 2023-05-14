import React, { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { api } from "ui/utils";
import { useDispatch } from "hooks";
import { verifyToken } from "ui/utils";

const useStyles = makeStyles((theme) => ({
  styleList: {
    "& .css-26l3qy-menu": {
      zIndex: 50,
    },
  },
}));

const defaultValues = {
  Select: "",
};

interface Props {
  selectedOption: any;
  handleChange: any;
  formik: any;
}

const SelectInput: FunctionComponent<Props> = ({
  selectedOption,
  handleChange,
  formik,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<any>([
    { value: "", label: "", user_id: "" },
  ]);

  useEffect(() => {
    verifyToken(dispatch);

    let user = null;
    const localUser = localStorage.getItem("userInfo");

    if (localUser) {
      user = JSON.parse(localUser);
    }

    api
      .get("/getEmployees.php?serial_number=" + user[0].serial_number)
      .then(({ data }) => {
        let employees: any = [];
        data.map((value: any) => {
          employees.push({
            value: value.employee_name,
            label: value.employee_name,
            user_id: value.user_id,
          });
        });

        setValues(employees);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);

  const classes = useStyles();
  const { control } = useForm({ defaultValues });

  return (
    <div style={{ width: "95%" }}>
     
            <Select
              className={classes.styleList}
            
              value={selectedOption}
              onChange={handleChange}
              options={values}
              placeholder="Select employee..."
            />
          
      

      {formik.errors.selectValue && formik.touched.selectValue ? (
        <div
          style={{
            color: "#fa554f",
            fontSize: "12.5px",
            padding: "3px 0px 0px 13px",
          }}
        >
          {formik.errors.selectValue}
        </div>
      ) : null}
    </div>
  );
};

export default SelectInput;
