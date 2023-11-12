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
import CircularProgress from "@mui/material/CircularProgress";

import { acceptPendingRedeem } from "../../../apis/transaction/purchase";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AcceptRedeem({
  state,
  setState,
  setPage,
  reload,
  setReload,
}) {
  const currentColor = useSelector((state) => state.state.currentColor);

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
  const [loading, setLoading] = useState(false);

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

      let valid = true;

      if (inputs.momoTransactionId.trim() === "") {
        setTransactionError(`Mã giao dịch không được để trống.`);
        valid = false;
      } else {
        setTransactionError("");
      }

      if (!valid) {
        setMessage("");
        return;
      }

      setLoading(true);
      const data = await acceptPendingRedeem({
        id: state.transactionId,
        momoTransactionId: inputs.momoTransactionId,
      });

      //   message = data.reposne?.data?.message || "Thành công";
      handleUpdate();
    } catch (error) {
      if (error.response) {
        if (error.response.data.title) {
          setSeverity("error");
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          setSeverity("error");
          setMessage(error.response?.data?.message || "Undefined.");
        }
      } else {
        setSeverity("error");
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={state.open} onClose={handleClose}>
      <DialogTitle>Xử lý rút điểm</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nhập thông tin giao dịch để xác nhận
        </DialogContentText>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            message !== "" && (
              <Alert variant="outlined" severity="error">
                {`Lỗi: ${message}`}
              </Alert>
            )
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
