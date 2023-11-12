import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Grow from "@mui/material/Grow";

import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

import { acceptPendingPurchase } from "../../../apis/transaction/purchase";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AcceptPurchaseModal({
  state,
  setState,
  setPage,
  reload,
  setReload,
}) {
  const currentColor = useSelector((state) => state.state.currentColor);

  const handleClose = () => {
    setInputs({
      transactionId: "",
      sourceAccount: "",
    });
    setTransactionError("");
    setSourceAccountError("");
    setMessage("");
    setState({ ...state, open: false });
  };

  const handleUpdate = () => {
    setInputs({
      transactionId: "",
      sourceAccount: "",
    });
    setTransactionError("");
    setSourceAccountError("");
    setMessage("");
    setState({ ...state, open: false });
    setPage(0);
    setReload(!reload);
  };

  const [transactionError, setTransactionError] = useState("");
  const [sourceAccountError, setSourceAccountError] = useState("");
  const [message, setMessage] = useState("");
  const [openSnakeBar, setOpenSnakeBar] = useState(false);
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    transactionId: "",
    sourceAccount: "",
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

      if (inputs.transactionId.trim() === "") {
        setSourceAccountError(`Tài khoản nguồn không được để trống. `);
        valid = false;
      } else {
        setSourceAccountError("");
      }

      if (inputs.transactionId.trim() === "") {
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
      const data = await acceptPendingPurchase({
        id: state.transactionId,
        eWalletTransactionId: inputs.transactionId,
        sourceAccount: inputs.sourceAccount,
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
      <DialogTitle>Xử lý điểm</DialogTitle>
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
            name="sourceAccount"
            label="Tài khoản nguồn"
            type="text"
            id="sourceAccount"
            autoComplete="Tài khoảng nguồn"
            value={inputs.sourceAccount || ""}
            onChange={handleInputChange}
            error={sourceAccountError === "" ? false : true}
            helperText={sourceAccountError}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="transactionId"
            label="Mã giao dịch"
            type="text"
            name="transactionId"
            autoComplete="Mã giao dịch"
            autoFocus
            value={inputs.transactionId || ""}
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

// const Progress = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <CircularProgress sx={{ color: currentColor }} />
//     </Box>
//   );
// };

// const SnakeBar = ({ message, open, setOpen, severity }) => {
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Snackbar
//         nchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         open={open}
//         autoHideDuration={4000}
//         TransitionComponent={Grow}
//         onClose={handleClose}
//         key={message}
//       >
//         <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };
