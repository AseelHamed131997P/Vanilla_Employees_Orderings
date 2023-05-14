import { FunctionComponent, useState, useEffect } from "react";
import { BoxForm, Row, Table } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css, mqWithSmallDevice } from "ui/utils";
import { Icon } from "ui/components";
import { useDispatch } from "hooks";
import { logout } from "actions/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { verifyToken } from "ui/utils";

const TitleOfBigScreen = styled.p(
  () => css`
    ${mqWithSmallDevice({
      top: ["60px", "10px", "10px", "100px", "100px", "100px", "100px"],
      left: ["18px", "30px", "10px", "10px", "40px", "50px", "50px"],
      fontSize: ["35px", "50px"],
      display: ["block", "none", "none", "none", "block", "block"],
      color: ["#0699a3", "#00324B", "#00324B", "#00324B", "white", "white"],
      // color: ["#0699a3", "#00324B", "#00324B", "#00324B", "#00324B", "#00324B"],
    })};
  `
);

const TitleOfSmallScreen = styled.p(
  () => css`
    font-size: 30px;

    ${mqWithSmallDevice({
      top: ["80px", "13px", "13px", "13px", "100px", "100px", "100px"],
      left: ["70px", "30px", "60px", "50px", "70px", "70px", "70px"],
      display: ["none", "block", "block", "block", "none", "none"],
      color: ["#0699a3", "white", "white", "white", "#00324B", "#00324B"],
      // color: ["#0699a3", "#00324B", "#00324B", "#00324B", "#00324B", "#00324B"],
    })};
  `
);

const useStyles = makeStyles((theme) => ({
  TitlePage: {
    position: "absolute",
    zIndex: 1,
    fontWeight: "bold",
    // fontFamily: "'Lobster', cursive",
    fontFamily: "montserrat",
    // letterSpacing: "10px",
  },

  ButtonStyle: {
    fontFamily: "montserrat",
    border: "1px solid black",
    backgroundColor: "white",
    color: "black",
    position: "absolute",
    zIndex: 100,
    top: "10px",
    right: "10px",
    width: "110px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    cursor: "pointer",
  },
}));

const Main: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pushOrder, setPushOrder] = useState(false);

  const changeState = () => {
    setPushOrder((previousState) => {
      return !previousState;
    });
  };


  

  useEffect(() => {
    verifyToken(dispatch);
  }, []);

  return (
    <>
      <p className={classes.ButtonStyle} onClick={() => dispatch(logout())}>
        Log out &nbsp;
        <LogoutIcon style={{ color: "black" }} />
      </p>
      <TitleOfBigScreen className={classes.TitlePage}>
        {" "}
        Vanilla <br />
        <br /> &nbsp; &nbsp; System
      </TitleOfBigScreen>
      <TitleOfSmallScreen className={classes.TitlePage}>
        {" "}
        Vanilla System
      </TitleOfSmallScreen>
      <BoxForm changeState={changeState} />
      <Icon.Layout />

      <Table pushOrder={pushOrder} />
    
    </>
  );
};
export default Main;
