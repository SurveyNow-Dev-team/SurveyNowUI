import React, { useEffect, useState } from "react";

import TransactionsTable from "../../../components/Transactions/TransactionTable";
import { getTransactionHistory } from "../../../apis/transactions";
import { Header } from "../../../components";
import TransactionTypeSelect from "../../../components/Transactions/TransactionTypeSelect";
import TransactionStatusSelect from "../../../components/Transactions/TransactionStatusSelect";
import TransactionDurationPicker from "../../../components/Transactions/TransactionDurationPicker";
import TransactionSortOrderSelect from "../../../components/Transactions/TransactionSortOrderSelect";
import dayjs from "dayjs";
import { Col, Row } from "antd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

function TransactionHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionType, setTransactionType] = useState("All");
  const [transactionStatus, setTransactionStatus] = useState("All");
  const [duration, setDuration] = useState(["", ""]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [sortOrder, setSortOrder] = useState("DateDescending");

  const [filter, setFilter] = useState(false);

  const currentColor = useSelector((state) => state.state.currentColor);

  const handleFilterClick = () => {
    setFilter(!filter);
  };

  const handleResetDuration = () => {
    setPage(0);
    setDuration(["", ""]);
  };

  const handleTypeFilterChange = (event) => {
    setPage(0);
    const value = event.target.value;
    setTransactionType(value === "All" ? null : value);
  };

  function handleStatusFilterChange(event) {
    setPage(0);
    const value = event.target.value;
    setTransactionStatus(value === "All" ? null : value);
  }

  const handleDurationFilterChange = (event) => {
    setPage(0);
    const value = event;
    setDuration(value);
  };

  const handleSortOrderFilterChange = (event) => {
    setPage(0);
    const value = event.target.value;
    setSortOrder(value === "DateDescending" ? null : value);
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
  }, [page, size, transactionType, transactionStatus, duration, sortOrder]);

  return (
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
      <Header category="" title="Lịch Sử Giao Dịch" />
      <div className="filter-container">
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <IconButton aria-label="Lọc" onClick={handleFilterClick}>
            {filter ? <FilterListOffIcon /> : <FilterListIcon />}
          </IconButton>
        </div>
        {filter && (
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="start"
            alignItems="center"
          >
            <Grid item md={4}>
              <div>
                <TransactionTypeSelect
                  type={transactionType}
                  handleTypeChange={handleTypeFilterChange}
                />
              </div>
            </Grid>
            <Grid item md={4}>
              <div>
                <TransactionStatusSelect
                  status={transactionStatus}
                  handleStatusChange={handleStatusFilterChange}
                />
              </div>
            </Grid>
            <Grid item md={4}>
              <div>
                <TransactionSortOrderSelect
                  sortOrder={sortOrder}
                  handleSortOrderChange={handleSortOrderFilterChange}
                />
              </div>
            </Grid>
            <Grid item>
              <div style={{ marginBottom: 16 }}>
                <TransactionDurationPicker
                  duration={duration}
                  handleDurationChange={handleDurationFilterChange}
                />{" "}
              </div>
            </Grid>
            <Grid item marginTop={3} alignItems="center" md={4}>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<RefreshIcon />}
                  onClick={handleResetDuration}
                >
                  Đặt lại thời gian
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
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
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};

export default TransactionHistory;
