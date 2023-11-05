import React, { useEffect, useState } from "react";

import TransactionsTable from "../../../components/Transactions/TransactionTable";
import { getTransactionHistory } from "../../../apis/transactions";
import { Header } from "../../../components";
import TransactionTypeSelect from "../../../components/Transactions/TransactionTypeSelect";
import TransactionStatusSelect from "../../../components/Transactions/TransactionStatusSelect";
import TransactionDurationPicker from "../../../components/Transactions/TransactionDurationPicker";
import TransactionSortOrderSelect from "../../../components/Transactions/TransactionSortOrderSelect";
import dayjs from "dayjs";

function TransactionHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionType, setTransactionType] = useState("All");
  const [transactionStatus, setTransactionStatus] = useState("All");
  const [duration, setDuration] = useState([dayjs(), dayjs()]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [sortOrder, setSortOrder] = useState("DateDescending");

  const handleTypeFilterChange = (event) => {
    handleTypeChange(
      setTransactionType,
      setData,
      setLoading,
      event,
      transactionStatus,
      duration
    );
  };

  function handleStatusFilterChange(event) {
    handleStatusChange(
      setTransactionStatus,
      setData,
      setLoading,
      event,
      transactionType,
      duration
    );
  }

  const handleDurationFilterChange = (event) => {
    handleDurationChange(
      setDuration,
      setData,
      setLoading,
      event,
      transactionType,
      transactionStatus
    );
  };

  useEffect(() => {
    fetchData(
      setData,
      setLoading,
      "All",
      "All",
      ["", ""],
      page,
      size,
      setTotalRecord
    );
  }, [page, size]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Transactions History" />
      <TransactionTypeSelect
        type={transactionType}
        handleTypeChange={handleTypeFilterChange}
      />
      <TransactionStatusSelect
        status={transactionStatus}
        handleStatusChange={handleStatusFilterChange}
      />
      <TransactionDurationPicker
        duration={duration}
        handleDurationChange={handleDurationFilterChange}
      />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <TransactionsTable
          data={data}
          page={page}
          size={size}
          totalRecord={totalRecord}
          setPage={setPage}
          setSize={setSize}
        />
      )}
    </div>
  );
}

const handleTypeChange = (
  setTransactionType,
  setData,
  setLoading,
  event,
  transactionStatus,
  duration
) => {
  const value = event.target.value;
  setTransactionType(value === "All" ? null : value);
  fetchData(setData, setLoading, value, transactionStatus, duration);
};

const handleStatusChange = (
  setTransactionStatus,
  setData,
  setLoading,
  event,
  transactionType,
  duration
) => {
  const value = event.target.value;
  setTransactionStatus(value === "All" ? null : value);
  fetchData(setData, setLoading, transactionType, value, duration);
};

const handleDurationChange = (
  setDuration,
  setData,
  setLoading,
  event,
  transactionType,
  transactionStatus
) => {
  const value = event;
  setDuration(value);
  fetchData(setData, setLoading, transactionType, transactionStatus, value);
};

const fetchData = async (
  setData,
  setLoading,
  typeFilter,
  statusFilter,
  duration,
  page,
  size,
  setTotalRecord
) => {
  try {
    const response = await getTransactionHistory(
      typeFilter === "All" ? null : typeFilter,
      statusFilter === "All" ? null : statusFilter,
      duration[0] === "" ? null : duration[0].format("DD/MM/YYYY"),
      duration[1] === "" ? null : duration[1].format("DD/MM/YYYY"),
      null,
      page !== undefined ? page + 1 : 0,
      size || 10
    );
    setData(response.results);
    setTotalRecord(response.totalRecords || 0);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

export default TransactionHistory;
