import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { getPendingPurchase } from "../../../apis/transaction/purchase";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "paymentMethod", headerName: "Method", width: 100 },
  {
    field: "point",
    headerName: "Point",
    type: "number",
    width: 90,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 150,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [size, setSize] = React.useState(5);
  const [data, setData] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [totalRecord, setTotalRecord] = React.useState(0);

  React.useEffect(() => {
    console.log(`Page: ${page}`);
    console.log(`Size: ${size}`);
    fetchData(page, size, setData, setMessage, setTotalRecord);
  }, [page, size]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data.map((transaction) => ({
          id: transaction.id,
          transactionType: transaction.transactionType,
          paymentMethod: transaction.paymentMethod,
          point: transaction.point,
          amount: `${transaction.amount} ${transaction.currency}`,
          date: transaction.date,
          sourceAccount: transaction.sourceAccount,
          destinationAccount: transaction.destinationAccount,
          purchaseCode: transaction.purchaseCode,
          status: transaction.status,
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
        rowCount={totalRecord}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
      />
    </div>
  );
}

const fetchData = async (page, size, setData, setMessage, setTotalRecord) => {
  console.log("Call fetch function");
  try {
    const data = await getPendingPurchase(
      page !== undefined ? page + 1 : 0,
      size || 5
    );

    console.log(JSON.stringify(data, null, 2));
    setTotalRecord(data?.totalRecords || 0);
    setData(data?.results || []);
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
