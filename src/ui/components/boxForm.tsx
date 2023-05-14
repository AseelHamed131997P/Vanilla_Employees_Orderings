import { FunctionComponent, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Col,
  FlexBox,
  Row,
  TextField,
  SelectInput,
  AlertMessage,
} from "ui/components";
import { styled, mq, css, mqWithSmallDevice } from "ui/utils";
import { useFormik } from "formik";
import * as yup from "yup";
import "./boxForm.css";
import { inserTheOrder } from "actions/order";
import { useDispatch } from "hooks";
import { general } from "data";
import { verifyToken } from "ui/utils";

const TextFieldStyle = styled(TextField)(
  () => css`
    width: 95%;
  `
);

const Title = styled.h2(
  ({ theme: { colors } }) => css`
    font-weight: bold;
    font-family: 'montserrat',
    color: black;
    /* color: #00324b; */
    ${mqWithSmallDevice({
      fontSize: ["22px", "20px", "25px", "25px", "25px", "25px", "25px"],
    })};
  `
);

const BoxStyle = styled(FlexBox)(
  () => css`
    height: 450px;
    border: 1px solid white;
    border-radius: 20px;
    background: white;
    flex-direction: column;
    box-shadow: 4px 5px 10px 5px rgba(0, 0, 0, 0.2),
      0px 6px 15px 0 rgba(0, 0, 0, 0.2);
    ${mqWithSmallDevice({
      width: ["80%", "60%", "60%", "50%", "45%", "597px", "600px"],
    })};
  `
);

const Circle = styled(Row)(
  () => css`
    border-radius: 10px;
    position: relative;
  `
);

const ButtonStyle = styled.button(
  () => css`
    ${mq({
      width: ["190px", "200px"],
    })};
  `
);

const useStyles = makeStyles(() => ({
  rowStyle: {
    width: "100%",
    height: "290px",
  },
  flexBoxStyle: {
    width: "100%",
    height: "100vh",
    position: "absolute",
    zIndex: 1,
  },
  buttonStyle: {
    width: "120px",
    height: "40px",
    color: "white",
    background: "#153255",
    border: "1px solid #153255",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
  },
  circle: {
    width: "35px",
    height: "20px",
  },
  circle1: {
    width: "35px",
    height: "20px",
    borderRadius: "10px",
    position: "relative",
    top: "20px",
    left: "-17.5px",
    background: "white",
  },
  circle2: {
    width: "35px",
    height: "20px",
    top: "40px",
    left: "-53px",
    background: "rgb(0,0,0,1)",
    // background: "rgb(221,130,111,1)",
  },
  circle3: {
    width: "40px",
    height: "20px",
    top: "60px",
    left: "-95px",
    background: "white",
  },

  circle4: {
    width: "35px",
    height: "20px",
    top: "38px",
    left: "calc(100% - 15px)",
    marginLeft: " 100%",
    background: "white",
  },

  circle5: {
    width: "35px",
    height: "20px",
    top: "18px",
    left: "calc(100% - 50px)",
    background: "rgb(0,0,0,1)",
    // background: "rgb(221,130,111,1)",
  },
  circle6: {
    width: "40px",
    height: "21px",
    top: "-3px",
    left: "calc(100% - 85px)",
    background: "white",
  },
}));

interface Props {
  changeState: any;
}

const validationSchema = yup.object({
  selectValue: yup.string().required("The field is required").nullable(),
  description: yup
    .string()
    .matches(/^[a-zA-Z0-9@, ]+$/, general.validators.description)
    .required(general.validators.required),
  price: yup
    .string()
    .matches(/^[0-9]+$/, general.validators.number)
    .required(general.validators.required),
});

const BoxForm: FunctionComponent<Props> = ({ changeState }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (option: any) => {
    console.log("here my option");
    console.log(option);
    formik.setFieldValue("selectValue", option);
  };



  const formik = useFormik({
    initialValues: {
      selectValue: null,
      description: "",
      price: "",
      setError: setError,
      setOpen: setOpen,
      changeState: changeState,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError(false);
      console.log(values);

      verifyToken(dispatch);

      dispatch(inserTheOrder(values));
      formik.resetForm();
    },
  });

  return (
    <FlexBox className={classes.flexBoxStyle}>
      <BoxStyle>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          style={{ width: "100%" }}
        >
          <Row width={"100%"} height={"80px"}>
            <FlexBox
              style={{
                marginLeft: "35px",
                height: "76px",
                position: "absolute",
              }}
            >
              <Title>Employees Orders Form</Title>
            </FlexBox>

            <Circle className={classes.circle1} />
            <Circle className={classes.circle2} />
            <Circle className={classes.circle3} />
          </Row>

          <Col className={classes.rowStyle}>
            <FlexBox
              style={{
                width: "100%",
                height: "72.5px",
              }}
            >
              <SelectInput
                selectedOption={formik.values.selectValue}
                handleChange={handleChange}
                formik={formik}
              />
            </FlexBox>
            <FlexBox
              style={{
                width: "100%",
                height: "72.5px",
              }}
            >
              <TextFieldStyle
                id="outlined-basic"
                variant="outlined"
                label="Description"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </FlexBox>
            <FlexBox
              style={{
                width: "100%",
                height: "72.5px",
                paddingTop: "7px",
              }}
            >
              <TextFieldStyle
                id="outlined-basic"
                variant="outlined"
                label="Price"
                type="text"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </FlexBox>
            <FlexBox
              style={{
                width: "100%",
                height: "65px",
                paddingTop: "30px",
                flexDirection: "column",
              }}
            >
              <ButtonStyle type="submit" className="button-54">
                Submit
              </ButtonStyle>
              {error ? (
                <div
                  style={{
                    color: "#fa554f",
                    fontSize: "14px",
                    marginTop: "13px",
                  }}
                >
                  something is error, please try again!
                </div>
              ) : null}
            </FlexBox>
          </Col>
          <Row width={"100%"} height={"80px"}>
            <Circle className={classes.circle4} />
            <Circle className={classes.circle5} />
            <Circle className={classes.circle6} />
          </Row>
        </form>
      </BoxStyle>
      <AlertMessage open={open} setOpen={setOpen} />
    </FlexBox>
  );
};

export default BoxForm;
