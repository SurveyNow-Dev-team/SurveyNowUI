import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "transactionType",
    headerName: "Loại Giao Dịch",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "paymentMethod",
    headerName: "Phương Thức",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "point",
    headerName: "Điểm",
    type: "number",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "Tiền",
    type: "number",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "date",
    headerName: "Thời Gian",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng Thái",
    width: 150,
    headerAlign: "center",
    headerAlign: "center",
    align: "center",
  },
];

export default function TransactionTable({
  data,
  page,
  size,
  totalRecord,
  setPage,
  setSize,
}) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
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
        rowCount={totalRecord}
        pageSizeOptions={[5, 10, 15, 20]}
        // checkboxSelection
      />
    </div>
  );
}
