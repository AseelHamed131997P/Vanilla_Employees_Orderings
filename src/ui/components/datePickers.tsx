import React, { FunctionComponent, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  styleDatePicker: {
    width: "100%",
    "& .MuiInputBase-root": {
      fontFamily: "montserrat",
    },
    "& .MuiFormControl-root": {
      //  height: "100px",
      //  width:"calc(100%/4)"
    },
    "& .MuiOutlinedInput-input": {
      padding: "13px",
      // height:"10px"
    },
    "& .MuiIconButton-root": {
      padding: "0px",
    },
  },
}));
interface Props {
  value: any;
  onChange: any;
  label: any;
  minDate?: any;
  id?: any;
  name?: any;
}

const DatePickers: FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  minDate,
  id,
  name,
}) => {
  const classes = useStyles();

  return (
    <div style={{ width: "95%" }}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          InputProps={{ readOnly: true }}
          id={id}
          name={name}
          className={classes.styleDatePicker}
          autoOk
          variant="inline"
          inputVariant="outlined"
          InputAdornmentProps={{ position: "start" }}
          minDate={minDate && minDate}
          // margin="normal"

          label={label}
          format="yyyy-MM-dd"
          clearable
          value={value}
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePickers;

// <MuiPickersUtilsProvider utils={DateFnsUtils}>
// <KeyboardDatePicker
//   className={classes.root}
//   format="dd/MM/yyyy"
//   value={selectedDate}
//   InputAdornmentProps={{ position: "end" }}
//   onChange={onValueChange}
//   DialogProps={{ className: classes.datePicker }}
// />
// </MuiPickersUtilsProvider>
