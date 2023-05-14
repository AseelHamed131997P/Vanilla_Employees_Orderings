import { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Col,
  FlexBox,
  Row,
  TextField,
  AlertMessage,
  DatePickers,
  SelectInput,
} from "ui/components";
import { styled, mq, css, mqWithSmallDevice, api } from "ui/utils";
import ClipLoader from "react-spinners/ClipLoader";
import Select from "react-select";
import "./boxForm.css";
import { useDispatch } from "hooks";
import { verifyToken } from "ui/utils";
import SelectInputBranch from "./selectInputBranch";
import { FormControl, InputLabel } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

const override = css`
  border-width: 4px;
`;

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

const defaultValues = {
  Select: "",
};

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
  setTableParams?: any;
  submit: any;
  setSubmit: any;
}

const BoxFormsSuperAdmin: FunctionComponent<Props> = ({
  setTableParams,
  submit,
  setSubmit,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { control } = useForm({ defaultValues });
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<any>([
    { value: "All", label: "All", user_id: "All" },
  ]);

  useEffect(() => {
    verifyToken(dispatch);
    api
      .get("/getEmployees.php?serial_number=" + "All")
      .then(({ data }) => {
        console.log("empployeeeees");
        console.log(data);
        let employees: any = [{ value: "All", label: "All", user_id: "All" }];
        data.map((value: any) => {
          employees.push({
            value: value.employee_name,
            label: value.employee_name,
            user_id: value.user_id,
          });
        });

        setValues(employees);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  }, []);

  const [selectedEmployeeOption, setSelectedEmployeeOption] = useState<any>({
    value: "All",
    label: "All",
    user_id: "All",
  });

  const handleChangeEmployee = (option: any) => {
    console.log("here my option employee");
    console.log(option);
    setSelectedEmployeeOption(option);
  };

  const [branches, setBranches] = useState<any>([
    {
      label: "All",
      value: "All",
      serial_number: "All",
    },
  ]);

  useEffect(() => {
    verifyToken(dispatch);
    api
      .get("/getAllBranches.php")
      .then(({ data }) => {
        let newData: any = [];
        data.map((value: any) => {
          newData.push({
            value: value.branch_name,
            label: value.branch_name,
            serial_number: value.serial_number,
          });
        });

        setBranches(newData);
      })
      .catch((err) => {
        console.log("ssddSd");
        console.log(err);
      });
  }, []);

  const [selectedBranchOption, setSelectedBranchOption] = useState({
    label: "All",
    value: "All",
    serial_number: "All",
  });

  const handleChangeBranch = (option: any) => {
    console.log("here my option");
    console.log(option);
    setSelectedBranchOption(option);
  };
  const [dateFrom, setDateFrom] = useState(new Date().toLocaleString("en"));
  const [dateTo, setDateTo] = useState(new Date().toLocaleString("en"));
  console.log("to test date");
  console.log(dateFrom);

  return (
    <FlexBox className={classes.flexBoxStyle}>
      <BoxStyle>
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
            <FlexBox style={{ width: "50%" }}>
              <SelectInputBranch
                values={branches}
                selectedOption={selectedBranchOption}
                onChange={(e: any) => handleChangeBranch(e)}
                placeholder={"select branch"}
              />
            </FlexBox>
            <FlexBox style={{ width: "50%" }}>
              <div style={{ width: "95%" }}>
                <InputLabel
                  style={{ marginBottom: "5px" }}
                  id="demo-simple-select-label"
                >
                  Employee
                </InputLabel>

                <Select
                  value={selectedEmployeeOption}
                  onChange={(e: any) => handleChangeEmployee(e)}
                  options={values}
                  placeholder="Select employee..."
                />
              </div>
            </FlexBox>
          </FlexBox>
          <FlexBox
            style={{
              width: "100%",
              height: "72.5px",
            }}
          >
            <DatePickers
              value={dateFrom}
              onChange={(e: any) =>
                setDateFrom(e ? e.toLocaleString("en") : null)
              }
              label={"date from"}
            />
          </FlexBox>
          <FlexBox
            style={{
              width: "100%",
              height: "72.5px",
              paddingTop: "7px",
            }}
          >
            <DatePickers
              value={dateTo}
              onChange={(e: any) =>
                setDateTo(e ? e.toLocaleString("en") : null)
              }
              label={"date to"}
              minDate={dateFrom}
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
            <ButtonStyle
              className="button-54"
              onClick={() => {
                if (dateFrom === null || dateTo === null) {
                  setOpen(true);
                } else {
                  setSubmit(true);
                  setTableParams({
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    serialNumber: selectedBranchOption.serial_number,
                    user_id: selectedEmployeeOption.user_id,
                  });
                }
              }}
            >
              {submit ? (
                <ClipLoader css={override} color={"black"} size={30} />
              ) : (
                "Submit"
              )}
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
      </BoxStyle>
      <AlertMessage open={open} setOpen={setOpen} error={"error"} />
    </FlexBox>
  );
};

export default BoxFormsSuperAdmin;
