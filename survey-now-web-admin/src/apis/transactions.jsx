import instance from "./baseApi";

export const getTransactionHistory = async (
  transactionType,
  status,
  fromDate,
  toDate,
  sortingOrder,
  page,
  recordsPerPage
) => {
  const pageFilter = page == null ? "" : `page=${page}&`;
  const recordsPerPageFilter =
    recordsPerPage == null ? "" : `recordsPerPage=${recordsPerPage}&`;
  const typeFilter =
    transactionType == null ? "" : `transactionType=${transactionType}&`;
  const statusFilter = status == null ? "" : `status=${status}&`;
  const fromDateFilter = fromDate == null ? "" : `fromDate=${fromDate}&`;
  const toDateFilter = toDate == null ? "" : `toDate=${toDate}&`;
  const sortOrder = sortingOrder == null ? "" : `sortingOrder=${sortingOrder}&`;

  const response = await instance.get(
    `api/v1/transaction/history?${typeFilter}${statusFilter}${fromDateFilter}${toDateFilter}${sortOrder}${pageFilter}${recordsPerPageFilter}`
  );
  return response.data;
};
