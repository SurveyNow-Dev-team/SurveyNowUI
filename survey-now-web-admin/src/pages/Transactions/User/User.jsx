import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { Chip } from "@mui/material";
import { Col, Row } from "antd";

import { getAllUsers } from "../../../apis/users";
// import { getUserById } from "../../../apis/users";
import { Header } from "../../../components";

const columns = [
  {
    field: "fullName",
    headerName: "Tên",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    flex: 3,
    align: "center",
  },
  {
    field: "gender",
    headerName: "Giới tính",
    headerAlign: "center",
    minWidth: 80,
    flex: 1,
    align: "center",
  },
  {
    field: "role",
    headerName: "Vai trò",
    headerAlign: "center",
    minWidth: 160,
    flex: 1,
    align: "center",
  },
  {
    field: "dateOfBirth",
    headerName: "Ngày sinh",
    headerAlign: "center",
    flex: 2,
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  // {
  //   field: "purchaseCode",
  //   headerName: "Mã giao dịch",
  //   headerAlign: "center",
  //   flex: 2,
  //   align: "center",
  // },
  // {
  //   field: "status",
  //   headerName: "Trạng thái",
  //   headerAlign: "center",
  //   align: "center",
  //   minHeight: 100,
  //   flex: 2,
  //   renderCell: (params) => (
  //     <Chip
  //       label={params.value === "Pending" ? "Đang chờ" : ""}
  //       color="warning"
  //     />
  //   ),
  // },
];

export default function User() {
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(`Page: ${page}`);
    console.log(`Size: ${size}`);
    fetchData(page, size, setData, setMessage, setTotalRecord, setLoading);
  }, [page, size]);
  ``;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //   const fetchGetUserByIdData = async () => {
  //     try {
  //       // Fetch data from another API
  //       const additionalData = await getUserById(
  //         page !== undefined ? page + 1 : 0,
  //         size || 5
  //       );

  //       // Process and use additional data as needed
  //       console.log("Additional Data:", additionalData);
  //     } catch (error) {
  //       console.error("Error fetching additional data", error);
  //     }
  //   };

  return (
    // <Row>
    //   <Col span={5} className="col-3"></Col>
    //   <Col span={19} className="col-18">
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
     {/* <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white rounded-3xl"> */}
      <Header title="Người dùng" category="" />
      {loading ? (
        <p>Tải yêu cầu...</p>
      ) : (
        <div style={{ minHeight: 400, width: "100%" }}>
          <div style={{ display: "block", width: "100%" }}>
            <DataGrid
              rows={data.map((users) => ({
                fullName: users.fullName,
                email: users.email,
                // amount: `${transaction.amount} ${transaction.currency}`,
                gender: users.gender,
                role: users.role,
                dateOfBirth: formatDate(users.dateOfBirth),
                status: users.status,
              }))}
              getRowId={(row) => row.email}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: page, pageSize: size },
                },
              }}
              pagination
              paginationMode="server"
              paginationModel={{ page: page, pageSize: size }}
              onPaginationModelChange={(newPage) => {
                setPage(newPage.page);
                setSize(newPage.pageSize);
              }}
              rowSelection={false}
              rowCount={totalRecord}
              pageSizeOptions={[5, 10, 15, 20]}
              sx={{ maxWidth: "100%" }}

              // checkboxSelection
            />
          </div>
        </div>
      )}
    </div>
    //   </Col>
    //   <Col span={0} className="col-3"></Col>
    // </Row>
  );
}

const fetchData = async (
  page,
  size,
  setData,
  setMessage,
  setTotalRecord,
  setLoading
) => {
  console.log("Call fetch function");
  try {
    const data = await getAllUsers(
      page !== undefined ? page + 1 : 0,
      size || 5
    );

    console.log(JSON.stringify(data, null, 5));
    console.log(data.results);
    setTotalRecord(data?.totalRecords || 0);
    setData(data?.results || []);
    setLoading(false);
  } catch (error) {
    console.log(JSON.stringify(error.response.data, null, 2));
    if (error.response) {
      if (error.response.data.title) {
        console.log(error.response?.data?.title || "Undefined.");
        setMessage(error.response?.data?.title || "Undefined.");
      } else {
        console.log(error.response?.data?.Message || "Undefined.");
        setMessage(error.response?.data?.Message || "Undefined.");
      }
    } else {
      console.log(error.message);
      setMessage(error.message);
    }
  }
};
