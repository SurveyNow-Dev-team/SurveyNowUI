import React, { useEffect, useState } from "react";

import TransactionsTable from "../../../components/Transactions/TransactionTable";
import { getTransactionHistory } from "../../../apis/transactions";
import { Header } from "../../../components";
import TransactionTypeSelect from "../../../components/Transactions/TransactionTypeSelect";
import TransactionStatusSelect from "../../../components/Transactions/TransactionStatusSelect";
import TransactionDurationPicker from "../../../components/Transactions/TransactionDurationPicker";
import TransactionSortOrderSelect from "../../../components/Transactions/TransactionSortOrderSelect";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

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

  const currentColor = useSelector((state) => state.state.currentColor);

  const handleTypeFilterChange = (event) => {
    setPage(0);
    handleTypeChange(
      setTransactionType,
      setData,
      setLoading,
      event,
      transactionStatus,
      duration,
      sortOrder,
      page,
      size,
      setTotalRecord
    );
  };

  function handleStatusFilterChange(event) {
    setPage(0);
    handleStatusChange(
      setTransactionStatus,
      setData,
      setLoading,
      event,
      transactionType,
      duration,
      sortOrder,
      page,
      size,
      setTotalRecord
    );
  }

  const handleDurationFilterChange = (event) => {
    setPage(0);
    handleDurationChange(
      setDuration,
      setData,
      setLoading,
      event,
      transactionType,
      transactionStatus,
      sortOrder,
      page,
      size,
      setTotalRecord
    );
  };

  const handleSortOrderFilterChange = (event) => {
    setPage(0);
    handleSortOrderChange(
      setSortOrder,
      setData,
      setLoading,
      event,
      transactionType,
      transactionStatus,
      duration,
      page,
      size,
      setTotalRecord
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchData(
      setData,
      setLoading,
      transactionType,
      transactionStatus,
      duration,
      sortOrder,
      page,
      size,
      setTotalRecord
    );
  }, [page, size]);

  return (
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
      <Header category="" title="Lịch Sử Giao Dịch" />
      <div className="filter-container">
        <div>
          <TransactionTypeSelect
            type={transactionType}
            handleTypeChange={handleTypeFilterChange}
          />
        </div>
        <div>
          <TransactionStatusSelect
            status={transactionStatus}
            handleStatusChange={handleStatusFilterChange}
          />
        </div>
        <div>
          <TransactionDurationPicker
            duration={duration}
            handleDurationChange={handleDurationFilterChange}
          />{" "}
        </div>
        <div>
          <TransactionSortOrderSelect
            sortOrder={sortOrder}
            handleSortOrderChange={handleSortOrderFilterChange}
          />
        </div>
      </div>

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
  duration,
  sortOrder,
  page,
  size,
  setTotalRecord
) => {
  setLoading(true);
  const value = event.target.value;
  setTransactionType(value === "All" ? null : value);
  fetchData(
    setData,
    setLoading,
    value,
    transactionStatus,
    duration,
    sortOrder,
    page,
    size,
    setTotalRecord
  );
};

const handleStatusChange = (
  setTransactionStatus,
  setData,
  setLoading,
  event,
  transactionType,
  duration,
  sortOrder,
  page,
  size,
  setTotalRecord
) => {
  setLoading(true);
  const value = event.target.value;
  setTransactionStatus(value === "All" ? null : value);
  fetchData(
    setData,
    setLoading,
    transactionType,
    value,
    duration,
    sortOrder,
    page,
    size,
    setTotalRecord
  );
};

const handleDurationChange = (
  setDuration,
  setData,
  setLoading,
  event,
  transactionType,
  transactionStatus,
  sortOrder,
  page,
  size,
  setTotalRecord
) => {
  const value = event;
  setLoading(true);
  setDuration(value);
  fetchData(
    setData,
    setLoading,
    transactionType,
    transactionStatus,
    value,
    sortOrder,
    page,
    size,
    setTotalRecord
  );
};

const handleSortOrderChange = (
  setSortOrder,
  setData,
  setLoading,
  event,
  transactionType,
  transactionStatus,
  duration,
  page,
  size,
  setTotalRecord
) => {
  setLoading(true);
  console.log(event.target);
  const value = event.target.value;
  setSortOrder(value === "DateDescending" ? null : value);
  fetchData(
    setData,
    setLoading,
    transactionType,
    transactionStatus,
    duration,
    value,
    page,
    size,
    setTotalRecord
  );
};

const fetchData = async (
  setData,
  setLoading,
  typeFilter,
  statusFilter,
  duration,
  sortOrder,
  page,
  size,
  setTotalRecord
) => {
  try {
    const type = typeFilter === "All" ? null : typeFilter;
    const status = statusFilter === "All" ? null : statusFilter;
    var fromDate = duration[0] === "" ? null : duration[0].format("DD/MM/YYYY");
    var toDate = duration[1] === "" ? null : duration[1].format("DD/MM/YYYY");
    if (fromDate === toDate) {
      fromDate = null;
      toDate = null;
    }
    const sort = sortOrder === "DateDescending" ? null : sortOrder;
    const pageNum = page !== undefined ? page + 1 : 0;
    const pageSize = size || 10;
    const response = await getTransactionHistory(
      type,
      status,
      fromDate,
      toDate,
      sort,
      pageNum,
      pageSize
    );
    setData(response.results);
    setTotalRecord(response.totalRecords || 0);
    setLoading(false);
    console.log(`Current Page: ${page}; Size: ${size}`);
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

export default TransactionHistory;
