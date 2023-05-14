import React, { FunctionComponent, useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  styleDatePicker: {
    "& .MuiInputBase-root": {
      fontFamily: "montserrat",
    },
  },
}));
interface Props {
  columnDef: any;
  onFilterChanged: any;
}

const DatePicker: FunctionComponent<Props> = ({
  columnDef,
  onFilterChanged,
}) => {
  const [date, setDate] = useState(new Date().toLocaleString("en"));
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        InputProps={{ readOnly: true }}
        className={classes.styleDatePicker}
        margin="normal"
        id="date-picker-dialog"
        label="Filter by date"
        format="dd/MM/yyyy"
        clearable
        value={date}
        onChange={(event: any) => {
          setDate(event);
          onFilterChanged(columnDef.tableData.id, event);
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
