import React, { FunctionComponent, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { api } from "ui/utils";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./table.css";
import { AlertMessage, DatePicker } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, mq, css, mqWithSmallDevice } from "ui/utils";
import { useDispatch } from "hooks";
import { verifyToken } from "ui/utils";

import * as XLSX from "xlsx";
import { toolbarClasses } from "@mui/material";
const MaterialTableStyle = styled(MaterialTable)(
  () => css`
    & .muitablebody-root .muitablerow-root:first-of-type : {
      background: #6abac9;
    }
  `
);

const useStyles = makeStyles((theme) => ({
  styleFilter: {
    "& .MuiInputBase-inputTypeSearch ": {
      fontSize: "50px",
      fontFamily: "montserrat",
    },
  },
}));
interface Props {
  tableParams: any;
  setSubmit: any;
}
const AdminTable: FunctionComponent<Props> = ({ tableParams, setSubmit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any>();

  const columns: any = [
    {
      title: "User",
      field: "user",
      cellStyle: {
        color: "black",
        textAlign: "center",
      },
    },
    {
      title: "Branch",
      field: "branch",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Withdrew",
      field: "withdrew",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Slips",
      field: "slips",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Date",
      field: "date",
      filterPlaceholder: "Filter by  date",
      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    verifyToken(dispatch);
    console.log("all values to send for get table");
    console.log(tableParams);

    api
      .get(
        "/getSlipsAndWithdrew.php?dateFrom=" +
          tableParams.dateFrom +
          "&dateTo=" +
          tableParams.dateTo +
          "&serialNumber=" +
          tableParams.serialNumber +
          "&user_id=" +
          tableParams.user_id
      )
      .then(({ data }) => {
        console.log("all values for table");
        console.log(data);

        setTableData(data);
        setSubmit(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ssddSd");
        console.log(err);
        setLoading(false);
      });
  }, [tableParams]);

  const downloadExcelSlips = () => {
    const newData = tableData.map((row: any) => {
      return {
        user: row.user,
        branch: row.branch,
        slips: row.slips,
        date: row.date,
      };
    });

    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "slips");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "SlipsData.xlsx");
  };
  const downloadExcelWithdrews = () => {
    const newData = tableData.map((row: any) => {
      return {
        user: row.user,
        branch: row.branch,
        withdrew: row.withdrew,
        date: row.date,
      };
    });

    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "withdrews");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "WithdrewsData.xlsx");
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          paddingBottom: "20px",
        }}
        className="App"
      >
        {loading === true ? (
          <p style={{ marginTop: "30px" }}>
            <PropagateLoader color={"#00324B"} size={20} />
          </p>
        ) : (
          <MaterialTableStyle
            title={
              <p
                style={{
                  fontFamily: "montserrat",
                  fontWeight: "bold",
                  fontSize: "29px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  // color:"white" ,
                }}
              >
                Withdrew And Slips
              </p>
            }
            columns={columns}
            data={tableData}
            actions={[
              {
                icon: () => <button>Export Slips</button>, // you can pass icon too
                tooltip: "Export Slips",
                onClick: () => downloadExcelSlips(),
                isFreeAction: true,
              },
              {
                icon: () => <button>Export Withdrews</button>, // you can pass icon too
                tooltip: "Export Withdrews",
                onClick: () => downloadExcelWithdrews(),
                isFreeAction: true,
              },
            ]}
            options={{
              // filtering: true,
              exportAllData: true,
              search: false,
              headerStyle: {
                // color: "#00324B",
                color: "black",
                backgroundColor: "#E5E5E5",
                textAlign: "center",
                fontSize: "22px",
                fontFamily: "montserrat",
              },
              rowStyle: {
                fontSize: 19,
                fontFamily: "montserrat",
                backgroundColor: "white",
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default AdminTable;
