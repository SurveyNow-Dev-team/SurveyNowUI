import { useState } from "react";
import { Header } from "../../../../components";
import PurchaseDetailComponent from "../../../../components/Transactions/PurchaseDetail/PurchaseDetail";
import { useLocation } from "react-router-dom";

export const PurchaseDetail = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  console.log(`id: ${id}`)

  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  console.log("Call purchase detail page.")

  return (
    <div className="mx-4 md:m-10 mt-5 p-6 md:p-6 bg-white rounded-3xl">
      <Header title="Transaction Detail" category="" />
      <PurchaseDetailComponent
        id={id}
        data={data}
        setData={setData}
        message={message}
        setMessage={setMessage}
      />
      <></>
    </div>
  );
};

