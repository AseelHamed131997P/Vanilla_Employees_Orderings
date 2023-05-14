import { FunctionComponent, useRef } from "react";
import { useState } from "react";
import { FlexBox, TextField } from "ui/components";
import { Row } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "hooks";
import { styled, mq, css } from "ui/utils";
import backgroundImage from "images/backgroundImage.jpg";
import { login } from "actions/auth";
import ClipLoader from "react-spinners/ClipLoader";
import logo from "../images/logo.png";

const BoxForm = styled(Row)(
  () => css`
    height: 310px;
    ${mq({
      width: ["95%", "60%", "50%", "50%", "900px", "900px"],
    })};
  `
);

const ButtonStyle = styled.button(
  () => css`
    &:active {
      background: #b0bde2;
    }
    width: 100px;
    height: 35px;
    color: white;
    background: #00144a;
    border: 1px solid #00144a;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
  `
);

const Title2 = styled.p(
  ({ theme: { colors } }) => css`
    font-size: 18px;
  `
);

const override = css`
  border-width: 4px;
`;
const StyleError = styled(FlexBox)(
  () => css`
    justify-content: flex-end;
    color: red;
    width: 100%;
  `
);

const useStyles = makeStyles((theme) => ({
  imageStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(0, 0, 0,0.8)",
  },
  Layout: {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  Box: {
    borderRadius: "20px",
    background: "white",
  },
  Container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },

  flexBoxStyle: {
    columnGap: "10px",
  },
}));

const Login: FunctionComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorPIN, setErrorPIN] = useState(false);
  const [errorCatch, setErrorCatch] = useState(false);
  const [PIN, setPIN] = useState(new Array(4).fill(""));
  const inputRefs = useRef<any[]>([]);

  const handleChange = (element: any, index: any) => {
    if (isNaN(element.value)) return false;

    setPIN([...PIN.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (index + 1 < PIN.length) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <>
      <Row className={classes.Layout}>
        <FlexBox className={classes.imageStyle}>
          <BoxForm className={classes.Box}>
            <FlexBox className={classes.Container}>
              <img src={logo} alt="Vanilla System" width="190" height="150" />
              <Title2>Enter the your PIN Number</Title2>
              <FlexBox className={classes.flexBoxStyle}>
                {PIN.map((data, index) => {
                  return (
                    <TextField
                      width={"12%"}
                      inputRef={(ref) => (inputRefs.current[index] = ref)}
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      name="PIN"
                      inputProps={{ maxLength: 1 }}
                      key={index}
                      value={data}
                      onChange={(e: any) => handleChange(e.target, index)}
                    />
                  );
                })}
              </FlexBox>
              {!errorPIN && !errorCatch && <p>PIN Entered - {PIN.join("")}</p>}

              <p>
                {errorPIN ? (
                  <StyleError>The PIN number is not correct</StyleError>
                ) : null}
              </p>

              <p>
                {errorCatch ? (
                  <StyleError>something is error,try again!!</StyleError>
                ) : null}
              </p>
              <FlexBox>
                <ButtonStyle onClick={(e) => setPIN([...PIN.map((v) => "")])}>
                  Clear
                </ButtonStyle>
                <Row width={"10px"} />
                <ButtonStyle
                  onClick={(e) => {
                    setLoading(true);
                    console.log(typeof PIN.join(""));
                    setErrorPIN(false);
                    setErrorCatch(false);

                    dispatch(
                      login({
                        PIN: PIN.join(""),
                        setLoading: setLoading,
                        setErrorCatch: setErrorCatch,
                        setErrorPIN: setErrorPIN,
                      })
                    );
                  }}
                >
                  {loading ? (
                    <ClipLoader css={override} color={"white"} size={20} />
                  ) : (
                    "Login"
                  )}
                </ButtonStyle>
              </FlexBox>
            </FlexBox>
          </BoxForm>
        </FlexBox>
      </Row>
    </>
  );
};

export default Login;
