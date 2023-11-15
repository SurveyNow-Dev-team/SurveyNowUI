import React from "react";
import { Grid, Link, Box, Typography } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color={"white"} align="center" {...props}>
      {"Copyright © "}
      <Link color={"white"} href="https://mui.com/" underline="hover">
        Survey Now
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return (
    <div className="w-100 px-5 py-4" style={{ backgroundColor: "#00B14F" }}>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Trang chủ
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Về chúng tôi
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Tạo khảo sát
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Đăng nhập
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Đăng ký
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} color={"white"}>
              Facebook
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Survey now
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Liên hệ: (+84) 32 756 9437
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="body2" color={"white"} underline="hover">
                Email: surveynow2023@gmail.com
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr style={{color: "white"}}/>
          <Copyright sx={{ mx: 1 }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
