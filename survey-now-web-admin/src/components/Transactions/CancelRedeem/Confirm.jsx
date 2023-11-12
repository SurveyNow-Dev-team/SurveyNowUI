import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


import { Alert } from "@mui/material";
import { cancelPendingRedeem } from "../../../apis/transaction/purchase";

export default function ConfirmCancel({
  state,
  setState,
  setPage,
  reload,
  setReload,
}) {
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    // setMessage("");
    setState({ ...state, open: false });
  };

  const handleConfirm = async (event) => {
    try {
      event.preventDefault();

      const data = await cancelPendingRedeem({
        id: state.transactionId,
      });

      setState({ ...state, open: false });
      setPage(0);
      setReload(!reload);
    } catch (error) {
      if (error.response) {
        if (error.response.data.title) {
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          setMessage(error.response?.data?.message || "Undefined.");
        }
      } else {
        setMessage(error.message);
      }
    }
  };

  return (
    <Dialog
      open={state.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Hủy giao dịch"}</DialogTitle>
      <DialogContent>
        {message !== "" && (
          <Alert variant="outlined" severity="error">
            {`Lỗi: ${message}`}
          </Alert>
        )}
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc muốn hủy giao dịch?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Quay về</Button>
        <Button onClick={handleConfirm} autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
