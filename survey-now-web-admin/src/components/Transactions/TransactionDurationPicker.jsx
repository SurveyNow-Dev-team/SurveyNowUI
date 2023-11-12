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
  const dateValue = [
    duration[0] === "" ? dayjs() : duration[0],
    duration[1] === "" ? dayjs() : duration[1],
  ];
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
        <DemoItem label="Thời Gian" component="DateRangePicker">
          <DateRangePicker
            format="DD/MM/YYYY"
            value={dateValue}
            onChange={(e) => handleDurationChange(e)}
            calendars={2}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
