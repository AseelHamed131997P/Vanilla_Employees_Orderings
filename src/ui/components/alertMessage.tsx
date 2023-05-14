import * as React from "react";

import Alert from "@material-ui/lab/Alert";
import { makeStyles, Snackbar } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import { css, mq, styled } from "ui/utils";

const StyleSnackbar = styled(Snackbar)(
  () => css`
    ${mq({
      bottom: ["40px", "8px"],
    })};
  `
);

interface Props {
  open: boolean;
  setOpen: any;
  error?: any;
  filter?: any;
}
const AlertMessage: React.FunctionComponent<Props> = ({
  open,
  setOpen,
  error,
  filter,
  ...props
}) => {
  const useStyles = makeStyles(() => ({
    alert: {
      "& .MuiAlert-standardSuccess": {
        backgroundColor: "#EDF7ED",
      },
      "& .MuiAlert-message": {
        color: "#448b47",
        fontSize: "17px",
      },
    },

    alertError: {
      "& .MuiAlert-standardSuccess": {
        backgroundColor: "#EDF7ED",
      },
      "& .MuiAlert-message": {
        color: "red",
        fontSize: "17px",
      },
    },
  }));
  const classes = useStyles();

  return (
    <StyleSnackbar
      className={error?classes.alertError:classes.alert}
      message="Here is snackbar message"
      open={open}
      autoHideDuration={1000}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Alert severity={error?"error":"success"}>
        {/* <AlertTitle>Error</AlertTitle> */}
       {error? "Please, fill the form":"Data was sent successfully"}
      </Alert>
    </StyleSnackbar>
  );
};

export default AlertMessage;
