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

import AcceptRedeem from "../../../components/Transactions/AcceptRedeem/AcceptRedeem";
import ConfirmCancel from "../../../components/Transactions/CancelRedeem/Confirm";

import { useSelector } from "react-redux/es/hooks/useSelector";

import { getPendingRedeem } from "../../../apis/transaction/purchase";
import { Header } from "../../../components";

const columns = (handleAcceptClick, handleCancelClick) => [
  {
    field: "fullName",
    headerName: "Người dùng",
    headerAlign: "center",
    flex: 2,
    align: "center",
    sortable: false,
  },
  {
    field: "paymentMethod",
    headerName: "Phương thức",
    headerAlign: "center",
    flex: 2,
    align: "center",
    sortable: false,
  },
  {
    field: "point",
    headerName: "Điểm",
    type: "number",
    headerAlign: "center",
    flex: 1,
    align: "center",
    sortable: false,
  },
  {
    field: "amount",
    headerName: "Tiền",
    headerAlign: "center",
    minWidth: 80,
    flex: 2,
    align: "center",
    sortable: false,
  },
  {
    field: "date",
    headerName: "Ngày",
    headerAlign: "center",
    minWidth: 160,
    flex: 4,
    align: "center",
    sortable: false,
  },
  {
    field: "sourceAccount",
    headerName: "Tài khoản nguồn",
    headerAlign: "center",
    flex: 2.5,
    align: "center",
    sortable: false,
  },
  {
    field: "destinationAccount",
    headerName: "Tài khoản đích",
    headerAlign: "center",
    flex: 2.5,
    align: "center",
    sortable: false,
  },
  {
    field: "purchaseCode",
    headerName: "Mã giao dịch",
    headerAlign: "center",
    flex: 3,
    align: "center",
    sortable: false,
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
        color="primary"
        sx={{ width: 100 }}
      />
    ),
    sortable: false,
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
    sortable: false,
  },
];

export default function Redeem() {
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
    setLoading(true);
    fetchData(page, size, setData, setMessage, setTotalRecord, setLoading);
  }, [page, size, reload]);

  return (
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
      {/* <div className="m-2 md:m-10 mt- p-2 md:p-10 bg-white rounded-3xl"> */}
      <Header title="Yêu cầu đổi điểm" category="" />
      <AcceptRedeem
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
                amount: `${formatNumber(+transaction.amount)} ${transaction.currency}`,
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
              disableColumnMenu = {true}
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
  try {
    const data = await getPendingRedeem(
      page !== undefined ? page + 1 : 0,
      size || 5
    );

    setTotalRecord(data?.totalRecords || 0);
    setData(data?.results || []);
    setLoading(false);
  } catch (error) {
    if (error.response) {
      if (error.response.data.title) {
        setMessage(error.response?.data?.title || "Undefined.");
      } else {
        setMessage(error.response?.data?.message || "Undefined.");
      }
    } else {
      setMessage(error.message);
    }
  }
};

function formatNumber(number) {
  const numberString = String(number);
  const parts = [];

  for (let i = numberString.length - 1, j = 0; i >= 0; i--, j++) {
    if (j !== 0 && j % 3 === 0) {
      parts.unshift(".");
    }
    parts.unshift(numberString[i]);
  }

  return parts.join("");
}
