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
          Transaction Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status === null ? "All" : status}
          label="Transaction Status"
          onChange={handleStatusChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Success"}>Success</MenuItem>
          <MenuItem value={"Fail"}>Fail</MenuItem>
          <MenuItem value={"Pending"}>Pending</MenuItem>
          <MenuItem value={"Cancel"}>Cancel</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
