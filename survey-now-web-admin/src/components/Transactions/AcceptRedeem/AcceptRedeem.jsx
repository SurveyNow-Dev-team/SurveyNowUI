import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { Alert } from "@mui/material";
import Box from "@mui/material/Box";

import { acceptPendingRedeem } from "../../../apis/transaction/purchase";
import { useState } from "react";

export default function AcceptRedeem({
  state,
  setState,
  setPage,
  reload,
  setReload,
}) {
  const handleClose = () => {
    setInputs({
      momoTransactionId: "",
    });
    setTransactionError("");
    setMessage("");
    setState({ ...state, open: false });
  };

  const handleUpdate = () => {
    setInputs({
      momoTransactionId: "",
    });
    setTransactionError("");
    setMessage("");
    setState({ ...state, open: false });
    setPage(0);
    setReload(!reload);
  };

  const [transactionError, setTransactionError] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [inputs, setInputs] = useState({
    momoTransactionId: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (inputs.momoTransactionId.trim() === "") {
        setTransactionError(`Mã giao dịch không được để trống.`);
      } else {
        setTransactionError("");
      }

      if (transactionError !== "") {
        setMessage("");
        return;
      }

      const data = await acceptPendingRedeem({
        id: state.transactionId,
        momoTransactionId: inputs.momoTransactionId,
      });

      //   message = data.reposne?.data?.message || "Thành công";
      handleUpdate();
    } catch (error) {
      // console.log(JSON.stringify(error.response.data, null, 2));
      if (error.response) {
        if (error.response.data.title) {
          console.log(error.response?.data?.title || "Undefined.");
          setSeverity("error");
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          console.log(error.response?.data?.message || "Undefined.");
          setSeverity("error");
          setMessage(error.response?.data?.message || "Undefined.");
        }
      } else {
        console.log(error.message);
        setSeverity("error");
        setMessage(error.message);
      }
    }
  };

  console.log(`Modal id: ${state.transactionId}`);

  return (
    <Dialog open={state.open} onClose={handleClose}>
      <DialogTitle>Xử lý rút điểm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nhập thông tin giao dịch để xác nhận
        </DialogContentText>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {message !== "" && (
            <Alert variant="outlined" severity="error">
              {`Lỗi: ${message}`}
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="momoTransactionId"
            label="Mã giao dịch"
            type="text"
            id="momoTransactionId"
            autoComplete="Mã giao dịch"
            value={inputs.momoTransactionId || ""}
            onChange={handleInputChange}
            error={transactionError === "" ? false : true}
            helperText={transactionError}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Quay về</Button>
        <Button onClick={handleSubmit}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
