import instance from "../baseApi";

export const getPendingPurchase = async (page, size) => {
  const pageFilter = page === undefined ? "" : `Page=${page}&`;

  const sizeFilter = size === undefined ? "" : `RecordsPerPage=${size}`;
  const response = await instance.get(
    `/api/v1/transaction/point-purchase/pending?${pageFilter}${sizeFilter}`
  );
  return response.data;
};

export const getPendingPurchaseById = async (id) => {
  const idFilter = id === undefined ? "" : `id=${id}&`;
  const response = await instance.get(
    `/api/v1/transaction/point-purchase/pending?${idFilter}Page=1&RecordsPerPage=1`
  );
  return response.data;
};

export const getPendingRedeem = async (page, size) => {
  const pageFilter = page === undefined ? "" : `Page=${page}&`;

  const sizeFilter = size === undefined ? "" : `RecordsPerPage=${size}`;
  const response = await instance.get(
    `/api/v1/transaction/point-redeem/pending?${pageFilter}${sizeFilter}`
  );
  return response.data;
};

export const acceptPendingPurchase = async ({
  id,
  eWalletTransactionId,
  sourceAccount,
}) => {
  const response = await instance.put(
    `/api/v1/transaction/point-purchase/${id}/process`,
    { eWalletTransactionId: eWalletTransactionId, sourceAccount: sourceAccount }
  );
  return response.data;
};

export const cancelPendingPurchase = async ({
  id
}) => {
  const response = await instance.put(
    `/api/v1/transaction/point-purchase/${id}/cancel`,
    { }
  );
  return response.data;
};
