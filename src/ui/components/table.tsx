import React, { FunctionComponent, useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { api } from "ui/utils";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./table.css";
import { DatePicker } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";
import { styled, mq, css, mqWithSmallDevice } from "ui/utils";
import { useDispatch } from "hooks";
import { verifyToken } from "ui/utils";
//
import * as XLSX from "xlsx";
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
  pushOrder: any;
}
const Table: FunctionComponent<Props> = ({ pushOrder }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<any>([]);

  const columns: any = [
    {
      title: "User",
      field: "username",
      filterPlaceholder: "Filter by name",
      cellStyle: {
        // backgroundColor: "#00324B",
        backgroundColor: "#202527",
        color: "#FFF",
        textAlign: "center",
      },
    },
    {
      title: "Description",
      field: "description",
      filterPlaceholder: "Filter by description",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Price",
      field: "price",
      filterPlaceholder: "Filter by  price",
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Date",
      field: "create_date",
      defaultFilter: new Date(),
      type: "date",
      dateSetting: { locale: "en-GB" },
      filterComponent: (props: any) => <DatePicker {...props} />,
      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  useEffect(() => {
    setLoading(true);

    verifyToken(dispatch);

    let user1 = null;
    const localUser = localStorage.getItem("userInfo");

    if (localUser) {
      user1 = JSON.parse(localUser);
    }
    api
      .get("/getAllOrderingUsers.php?serial_number=" + user1[0].serial_number)
      .then(({ data }) => {
        // console.log("all values");
        // console.log(data);

        let newData = data.map((obj: any) => {
          return {
            ...obj,
            create_date: obj.create_date.split(".")[0],
          };
        });

        setTableData(newData);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [pushOrder]);

  // const downloadExcel = () => {
  //   const newData = tableData.map((row: any) => {
  //     delete row.tableData;
  //     return row;
  //   });
  //   const workSheet = XLSX.utils.json_to_sheet(newData);
  //   const workBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workBook, workSheet, "students");
  //   //Buffer
  //   let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //   //Binary string
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //   //Download
  //   XLSX.writeFile(workBook, "StudentsData.xlsx");
  // };
  return (
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
                fontSize: "30px",
                height: "100px",
                display: "flex",
                alignItems: "center",
                // color:"white" ,
              }}
            >
              Orderings
            </p>
          }
          columns={columns}
          data={tableData}
          // actions={[
          //   {
          //     icon: () => <button>Export</button>, // you can pass icon too
          //     tooltip: "Export to Excel",
          //     onClick: () => downloadExcel(),
          //     isFreeAction: true,
          //   },
            
          // ]}
          options={{
            filtering: true,
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
            },
          }}
          components={{
            Toolbar: (props) => (
              <div
                style={{
                  width: "100%",

                  fontSize: "30px",
                  backgroundColor: "white",
                  //  backgroundColor: "black",
                }}
              >
                <MTableToolbar {...props} />
                <p
                  style={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "20px",
                    height: "40px",
                    paddingLeft: "10px",
                    backgroundColor: "#E5E5E5",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    // color: "#00324B",
                  }}
                >
                  {tableData.length !== 0
                    ? tableData[0]?.branch_name
                        .replace("_", " ")
                        .concat(" Branch")
                    : "Branch"}
                </p>
              </div>
            ),
          }}
        />
      )}
    </div>
  );
};

export default Table;
