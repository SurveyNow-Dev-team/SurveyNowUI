import instance from "../baseApi";

export const getPendingPurchase = async (page, size) => {
  const pageFilter = page === undefined ? "" : `Page=${page}&`;

  const sizeFilter = size === undefined ? "" : `RecordsPerPage=${size}`;
  const response = await instance.get(
    `/api/v1/transaction/point-purchase/pending?${pageFilter}${sizeFilter}`
  );
  return response.data;
};
