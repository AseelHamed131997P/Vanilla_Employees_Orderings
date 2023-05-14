import { FunctionComponent } from "react";
import { styled, css, mq } from "ui/utils";
import {
  TextField as TextFieldComponent,
  BaseTextFieldProps,
} from "@material-ui/core";

const StyledTextField = styled(TextFieldComponent)<Props>(
  ({ width, height }) => css`
    ${mq({ height, width })};
  `
);

interface Props extends BaseTextFieldProps {
  className?: string;
  height?: string | string[];
  width?: string | string[];
  onChange?: any;
  name?: string;
  id?: any;
  value?: any;
  inputProps?: any;
}

const TextField: FunctionComponent<Props> = ({
  children,
  onChange,
  id,
  name,
  value,
  inputProps,
  ...props
}) => (
  <StyledTextField
    color="primary"
    id={id}
    name={name}
    onChange={onChange}
    value={value}
    inputProps={inputProps}
    {...props}
  >
    {children}
  </StyledTextField>
);

export default TextField;
