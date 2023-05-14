import "./App.css";
import { Redirect, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "components";
import { Login, Main, Admin } from "containers";
//import { Drawer } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
  },
  toolbar: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // ...theme.mixins.toolbar,
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  const localUser = localStorage.getItem("userInfo");
  
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <PublicRoute path="/login" component={Login} />
      <React.Fragment>
        <div className={classes.root}>
        <PrivateRoute path="/main" component={localUser && JSON.parse(localUser)[0].pin === '6666'?Admin:Main}/>
        </div>
      </React.Fragment>
    </Switch>
  );
}

export default App;
