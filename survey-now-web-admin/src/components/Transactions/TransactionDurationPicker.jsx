import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function TransactionDurationPicker({
  duration,
  handleDurationChange,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
        <DemoItem label="Duration" component="DateRangePicker">
          <DateRangePicker
            format="DD/MM/YYYY"
            value={duration}
            onChange={(e) => handleDurationChange(e)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
