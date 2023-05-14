import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { api, mq, styled } from "ui/utils";
import { useDispatch } from "hooks";
import { verifyToken } from "ui/utils";
import { FormControl, InputLabel } from "@material-ui/core";

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
  onChange: any;
  placeholder: any;
  id?: any;
  name?: any;
  values: any;
}

const SelectInputBranch: FunctionComponent<Props> = ({
  selectedOption,
  onChange,
  placeholder,
  id,
  name,
  values,
}) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const { control } = useForm({ defaultValues });

  return (
    <div style={{ width: "95%" }}>
      <InputLabel style={{ marginBottom: "5px" }} id="demo-simple-select-label">
        Branch
      </InputLabel>
     
            <Select
              id={id}
              name={name}
              className={classes.styleList}
              value={selectedOption}
              onChange={onChange}
              options={values}
              placeholder={placeholder}
          
        />
    </div>
  );
};

export default SelectInputBranch;
