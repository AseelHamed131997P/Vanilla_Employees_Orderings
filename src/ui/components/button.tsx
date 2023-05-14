import React, { FunctionComponent, ButtonHTMLAttributes } from "react";
import { styled, css, mq } from "ui/utils";
import { Button as ButtonComponent } from "@material-ui/core";

const StyledButton = styled(ButtonComponent)<Props>(
  ({ width, height }) => css`
    /* padding: 3%;
    border-radius: 30px !important ;
    font-weight: bold !important;
    font-family: Segoe UI; */
    ${mq({ height, width })}
  `
);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  height?: string | string[];
  width?: string | string[];
  onClick?: any;
}

const Button: FunctionComponent<Props> = ({
  children,
  className,
  height,
  width,
  onClick,
  ...props
}) => (
  <StyledButton
    variant="contained"
    className={className}
    height={height}
    width={width}
    onClick={onClick}
    {...props}
    color="primary"
  >
    {children}
  </StyledButton>
);

export default Button;
