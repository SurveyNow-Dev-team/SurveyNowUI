import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

const columns = (convertStatus, convertTransactionType) => [
  {
    field: "fullName",
    headerName: "Người dùng",
    headerAlign: "center",
    flex: 2,
    align: "center",
    sortable: false,
  },
  {
    field: "transactionType",
    headerName: "Loại",
    headerAlign: "center",
    flex: 2,
    minWidth: 90,
    align: "center",
    renderCell: (params) => {
      const object = convertTransactionType(params.value);
      return (
        <Chip label={object.label} color={object.color} sx={{ width: 90 }} />
      );
    },
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
    flex: 1.5,
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
    renderCell: (params) => {
      const object = convertStatus(params.value);
      return (
        <Chip label={object.label} color={object.color} sx={{ width: 100 }} />
      );
    },
    sortable: false,
  },
];

const convertTransactionType = (value) => {
  if (value === "Reddem Gift") return { label: "Đổi điểm", color: "info" };
  if (value === "Purchase Point")
    return { label: "Mua điểm", color: "success" };
  if (value === "Refund Money") return { label: "Hoàn tiền", color: "warning" };
};

const convertStatus = (value) => {
  if (value === "Pending") return { label: "Đang chờ", color: "primary" };
  if (value === "Success") return { label: "Thành công", color: "success" };
  if (value === "Fail") return { label: "Thất bại", color: "error" };
  if (value === "Cancel") return { label: "Hủy", color: "warning" };
};

export default function TransactionTable({
  data,
  page,
  size,
  totalRecord,
  setPage,
  setSize,
}) {
  const isDataEmpty = data.length === 0;

  return (
    <div style={{ minHeight: 400, width: "100%" }}>
      {isDataEmpty ? (
        <h3 style={{ textAlign: "center" }}>
          Không có dữ liệu lịch sử giao dịch
        </h3>
      ) : (
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
            transactionType: transaction.transactionType,
            sourceAccount: transaction.sourceAccount,
            destinationAccount: transaction.destinationAccount,
          }))}
          columns={columns(convertStatus, convertTransactionType)}
          initialState={{
            pagination: {
              paginationModel: { page: page, pageSize: size },
            },
          }}
          pagination
          paginationMode="server"
          paginationModel={{ page: page || 0, pageSize: size || 0 }}
          onPaginationModelChange={(newPage) => {
            setPage(newPage.page);
            setSize(newPage.pageSize);
          }}
          rowSelection={false}
          disableColumnMenu = {true}
          rowCount={totalRecord}
          pageSizeOptions={[5, 10, 15, 20]}
          // checkboxSelection
        />
      )}
    </div>
  );
}

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
