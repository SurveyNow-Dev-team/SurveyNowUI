import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TransactionSortOrderSelect({
  sortOrder,
  handleSortOrderChange,
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortOrder === null ? "DateDescending" : sortOrder}
          label="Sort Order"
          onChange={handleSortOrderChange}
        >
          <MenuItem value={"DateDescending"}>Mới - Cũ</MenuItem>
          <MenuItem value={"DateAscending"}>Cũ - Mới</MenuItem>
          <MenuItem value={"AmountDescending"}>Tiền giảm dần</MenuItem>
          <MenuItem value={"AmountAscending"}>Tiền tăng dần</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
