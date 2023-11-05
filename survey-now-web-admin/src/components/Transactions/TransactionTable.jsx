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
  { field: "transactionType", headerName: "Transaction Type", width: 150 },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "point",
    headerName: "Point Amount",
    type: "number",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "Money Amount",
    type: "number",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    headerAlign: "center",
    headerAlign: "center",
    align: "center",
  },
];

export default function TransactionTable({ data }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
