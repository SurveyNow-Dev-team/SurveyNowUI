import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { getPendingPurchase } from "../../../apis/transaction/purchase";
import { Header } from "../../../components";
import { useSelector } from "react-redux";

import AcceptPurchaseModal from "../../../components/Transactions/AcceptPurchase/AcceptPurchaseModal";
import ConfirmCancel from "../../../components/Transactions/DeclinePurchase/Confirm.";

const columns = (handleAcceptClick, handleCancelClick) => [
  {
    field: "fullName",
    headerName: "Người dùng",
    headerAlign: "center",
    flex: 2,
    align: "center",
  },
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
    flex: 2.5,
    align: "center",
  },
  {
    field: "destinationAccount",
    headerName: "Tài khoản đích",
    headerAlign: "center",
    flex: 2.5,
    align: "center",
  },
  {
    field: "purchaseCode",
    headerName: "Mã giao dịch",
    headerAlign: "center",
    flex: 3,
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    flex: 2,
    renderCell: (params) => (
      <Chip
        label={params.value === "Pending" ? "Đang chờ" : ""}
        color="warning"
      />
    ),
  },

  {
    field: "id",
    headerName: "",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    flex: 1.5,
    renderCell: (params) => (
      <Stack direction="row" spacing={0.5}>
        <IconButton
          aria-label="Chấp nhận"
          onClick={() => handleAcceptClick(params.value)}
        >
          <CheckCircleIcon color="success" />
        </IconButton>
        <IconButton
          aria-label="Từ chối"
          onClick={() => handleCancelClick(params.value)}
        >
          <CancelSharpIcon sx={{ color: red[900] }} />
        </IconButton>
      </Stack>
    ),
  },
];

export default function Purchase() {
  const currentColor = useSelector((state) => state.state.currentColor);

  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [reload, setReload] = React.useState(true);

  //Purchase modal
  const [acceptState, setAcceptState] = React.useState({
    open: false,
    transactionId: 0,
  });
  const [cancelState, setCancelState] = React.useState({
    open: false,
    transactionId: 0,
  });

  const handleAcceptClick = (id) => {
    setAcceptState((values) => ({ ...values, open: true, transactionId: id }));
  };

  const handleCancelClick = (id) => {
    setCancelState((values) => ({ ...values, open: true, transactionId: id }));
  };

  React.useEffect(() => {
    console.log(`Page: ${page}`);
    console.log(`Size: ${size}`);
    setLoading(true);
    fetchData(page, size, setData, setMessage, setTotalRecord, setLoading);
  }, [page, size, reload]);

  return (
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
      {/* <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white rounded-3xl"> */}
      <Header title="Yêu cầu mua điểm" category="" />
      <AcceptPurchaseModal
        state={acceptState}
        setState={setAcceptState}
        setPage={setPage}
        reload={reload}
        setReload={setReload}
      />
      <ConfirmCancel
        state={cancelState}
        setState={setCancelState}
        setPage={setPage}
        reload={reload}
        setReload={setReload}
      />
      {/* <AcceptModal state={acceptState} setState={setAcceptState} /> */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: currentColor }} />
        </Box>
      ) : (
        <div style={{ minHeight: 400, width: "100%" }}>
          <div style={{ display: "block", width: "100%" }}>
            <DataGrid
              rows={data.map((transaction) => ({
                id: transaction.id,
                fullName: transaction.fullName,
                paymentMethod: transaction.paymentMethod,
                point: transaction.point,
                amount: `${transaction.amount} ${transaction.currency}`,
                date: transaction.date,
                status: transaction.status,
                purchaseCode: transaction.purchaseCode,
              }))}
              columns={columns(handleAcceptClick, handleCancelClick)}
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
    const data = await getPendingPurchase(
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
        console.log(error.response?.data?.message || "Undefined.");
        setMessage(error.response?.data?.message || "Undefined.");
      }
    } else {
      console.log(error.message);
      setMessage(error.message);
    }
  }
};
