import React, { useEffect, useState } from "react";

import TransactionsTable from "../../../components/Transactions/TransactionTable";
import { getTransactionHistory } from "../../../apis/transactions";
import { Header } from "../../../components";

function TransactionHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionHistory(
          null,
          null,
          null,
          null,
          null,
          1,
          10
        );
        setData(response.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  });

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Transactions History" />
      {loading ? <p>Loading data...</p> : <TransactionsTable data={data} />}
    </div>
  );
}
export default TransactionHistory;
