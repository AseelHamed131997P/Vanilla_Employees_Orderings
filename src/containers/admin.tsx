import { FunctionComponent, useState, useEffect } from "react";
import { AdminTable, BoxForm, Row, Table } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css, mqWithSmallDevice } from "ui/utils";
import { Icon } from "ui/components";
import { useDispatch } from "hooks";
import { logout } from "actions/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { verifyToken } from "ui/utils";
import BoxFormsSuperAdmin from "ui/components/boxFormsSuperAdmin";

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

const TableWrapper = styled.div`
  width: 1000px;
  border: 1px solid black;
  overflow-x: auto;
`;

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
  layoutTable: {
    width: "100%",
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
}));

const Admin: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  const [tableParams, setTableParams] = useState<any>({
    dateFrom: new Date().toLocaleString("en"),
    dateTo: new Date().toLocaleString("en"),
    serialNumber: "All",
    user_id: "All"
  });

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
      <BoxFormsSuperAdmin
        setTableParams={setTableParams}
        submit={submit}
        setSubmit={setSubmit}
      />
      <Icon.Layout />

      <AdminTable tableParams={tableParams} setSubmit={setSubmit} />
    </>
  );
};
export default Admin;
