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
        <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type === null ? "All" : type}
          label="Transaction Type"
          onChange={handleTypeChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"PurchasePoint"}>Purchase Point</MenuItem>
          <MenuItem value={"RedeemGift"}>Redeem Gift</MenuItem>
          <MenuItem value={"RefundMoney"}>Refund Money</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
