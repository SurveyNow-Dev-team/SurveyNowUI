import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TransactionTypeSelect({ type, handleTypeChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Loại Giao Dịch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type === null ? "All" : type}
          label="Transaction Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={"All"}>Tất cả</MenuItem>
          <MenuItem value={"PurchasePoint"}>Nạp điểm</MenuItem>
          <MenuItem value={"RedeemGift"}>Đổi quà</MenuItem>
          <MenuItem value={"RefundMoney"}>Hoàn tiền</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
