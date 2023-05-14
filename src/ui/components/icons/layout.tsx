import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { styled } from "ui/utils";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "images/vanilla.jpg";

const Svg = styled.svg`
  cursor: pointer;
  position: relative;
`;

const useStyles = makeStyles((theme) => ({
    Image:{
        height: "100vh",
        width: "100%",
       
        // zIndex:-1,
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
  customShapeDividerBottom1664184616: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    overflow: "hidden",
    lineHeight: "0",

  },

  svg: {
    position: "relative",
    display: "block",
    width: "calc(190% + 1.3px)",
    height: "800px",
    
  },
  shapeFill: {
    fill:"rgb(0,0,1,.96)"
    // fill:"rgb(221,130,111,.98)"
  },
}));
const Layout: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.Image}>
    <div className={classes.customShapeDividerBottom1664184616}>
      <svg
        className={classes.svg}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="50 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M598.97 114.72L0 0 0 120 1200 120 2500 0 598.97 114.72z"
          className={classes.shapeFill}
        ></path>
      </svg>
    </div>
    </div>
  );
};
Layout.defaultProps = {
  className: "",
  color: "#333",
};

export default Layout;
