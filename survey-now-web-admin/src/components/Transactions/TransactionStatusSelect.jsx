import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TransactionStatusSelect({
  status,
  handleStatusChange,
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Trạng Thái Giao Dịch
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status === null ? "All" : status}
          label="Transaction Status"
          onChange={handleStatusChange}
        >
          <MenuItem value={"All"}>Tất cả</MenuItem>
          <MenuItem value={"Success"}>Thành công</MenuItem>
          <MenuItem value={"Fail"}>Thất bại</MenuItem>
          <MenuItem value={"Cancel"}>Đã hủy</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
