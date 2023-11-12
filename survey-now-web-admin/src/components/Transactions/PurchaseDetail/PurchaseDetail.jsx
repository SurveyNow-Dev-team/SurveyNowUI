import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { getPendingPurchaseById } from "../../../apis/transaction/purchase";
import { useState } from "react";
import { useEffect } from "react";

export default function PurchaseDetailComponent({
  id,
  data,
  setData,
  setMessage,
}) {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchData(id, setData, setMessage, setLoading);
  }, []);

  return (
    <div style={{ minHeight: 500, width: "100%" }}>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Item>
                <p className="text-danger">Hello world</p>
              </Item>
            </Grid>
            <Grid xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const fetchData = async (id, setData, setMessage, setLoading) => {
  try {
    const data = await getPendingPurchaseById(id);

    setData(data?.results[0] || {});
    setLoading(false);
  } catch (error) {
    if (error.response) {
      if (error.response.data.title) {
        setMessage(error.response?.data?.title || "Undefined.");
      } else {
        setMessage(error.response?.data?.Message || "Undefined.");
      }
    } else {
      setMessage(error.message);
    }
  }
};
