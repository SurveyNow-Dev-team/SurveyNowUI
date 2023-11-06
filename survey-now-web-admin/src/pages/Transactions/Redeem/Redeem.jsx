import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

import { getPendingRedeem } from "../../../apis/transaction/purchase";
import { Header } from "../../../components";

const columns = [
  {
    field: "paymentMethod",
    headerName: "Phương thức",
    headerAlign: "center",
    flex: 2,
    align: "center",
  },
  {
    field: "point",
    headerName: "Điểm",
    type: "number",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "amount",
    headerName: "Tiền",
    headerAlign: "center",
    minWidth: 80,
    flex: 2,
    align: "center",
  },
  {
    field: "date",
    headerName: "Ngày",
    headerAlign: "center",
    minWidth: 160,
    flex: 4,
    align: "center",
  },
  {
    field: "sourceAccount",
    headerName: "Tài khoản nguồn",
    headerAlign: "center",
    flex: 3,
    align: "center",
  },
  {
    field: "destinationAccount",
    headerName: "Tài khoản đích",
    headerAlign: "center",
    flex: 3,
    align: "center",
  },
  {
    field: "Mã giao dịch",
    headerName: "Purchase Code",
    headerAlign: "center",
    flex: 2,
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    headerAlign: "center",
    align: "center",
    minHeight: 100,
    flex: 2,
    renderCell: (params) => <Chip label={params.value === "Pending" ? "Đang chờ" : ""} color="warning" />,
  }
];

export default function Redeem() {
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

  return (
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
      {/* <div className="m-2 md:m-10 mt- p-2 md:p-10 bg-white rounded-3xl"> */}
      <Header title="Yêu cầu đổi điểm" category="" />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div style={{ minHeight: 400, width: "100%" }}>
          <div style={{ display: "block", width: "100%" }}>
            <DataGrid
              rows={data.map((transaction) => ({
                id: transaction.id,
                paymentMethod: transaction.paymentMethod,
                point: transaction.point,
                amount: `${transaction.amount} ${transaction.currency}`,
                date: transaction.date,
                sourceAccount: transaction.sourceAccount,
                destinationAccount: transaction.destinationAccount,
                status: transaction.status
              }))}
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
    const data = await getPendingRedeem(
      page !== undefined ? page + 1 : 0,
      size || 5
    );

    console.log(JSON.stringify(data, null, 2));
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
