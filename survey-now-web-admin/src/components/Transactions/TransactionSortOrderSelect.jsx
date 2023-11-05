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
        <InputLabel id="demo-simple-select-label">Sort Order</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortOrder === null ? "DateDescending" : sortOrder}
          label="Sort Order"
          onChange={handleSortOrderChange}
        >
          <MenuItem value={"DateDescending"}>Date Descending</MenuItem>
          <MenuItem value={"DateAscending"}>Date Ascending</MenuItem>
          <MenuItem value={"AmountDescending"}>Point Descending</MenuItem>
          <MenuItem value={"AmountAscending"}>Point Ascending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
