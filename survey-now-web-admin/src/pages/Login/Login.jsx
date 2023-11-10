import * as React from "react";
import {
  setRole,
  setAvatarUrl,
  setEmail,
  setFullName,
  setGender,
  setPoint,
  setAuthentication,
} from "../../store/slices/auth.slice";
import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Troubleshoot } from "@mui/icons-material";

import Logo from "../../assets/images/logo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" >
        Survey Now
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmailForm] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState(undefined);
  const [passError, setPassError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const handleEmailChange = (e) => {
    setEmailForm(e.target.value || "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value || "");
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log(`Email error: ${emailError}`);
      console.log(`Password error: ${passError}`);

      if (email.trim() === "") {
        setEmailError(`Email is required.`);
      } else {
        setEmailError("");
      }
      if (password.trim() === "") {
        setPassError(`Password is required. `);
      } else {
        setPassError("");
      }

      if (emailError !== "" || passError !== "") {
        setMessage(undefined);
        return;
      }

      console.log(`Valid data.`);

      const data = await login({
        email: email,
        password: password,
      });

      //log data
      console.log(JSON.stringify(data, null, 2));

      const roleData = data?.role;
      if (roleData !== "Admin") {
        setMessage("Cút");
        return;
      }
      //Call action to update data in store (redux)
      dispatch(setRole(data.role || ""));
      dispatch(setAvatarUrl(data.avatarUrl || ""));
      dispatch(setFullName(data.fullName || ""));
      dispatch(setEmail(data.email || ""));
      dispatch(setGender(data.gender || ""));
      dispatch(setPoint(data.point || ""));
      dispatch(setAuthentication(true));

      //Store token
      const token = data?.token || "";
      console.log(JSON.stringify(token));
      localStorage.setItem("token", JSON.stringify(token));

      const user = {
        role: data.role,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
        email: data.email,
        gender: data.gender,
        point: data.point,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setMessage(undefined);

      navigate("/ecommerce");
    } catch (error) {
      console.log(JSON.stringify(error.response.data, null, 2));
      if (error.response) {
        if (error.response.data.title) {
          console.log(error.response?.data?.title || "Undefined.");
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          console.log(error.response?.data?.message || "Undefined.");
          setMessage(error.response?.data?.message || "Undefined.");
        }
      } else {
        console.log(error.message);
        setMessage(error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ my: 2, bgcolor: "white", width: 90, height: 90 }}
            alt="SurveyNow Logo"
            src={Logo}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {message && (
              <Alert variant="outlined" severity="error">
                {`Lỗi: ${message}`}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email || ""}
              onChange={handleEmailChange}
              error={emailError === "" ? false : true}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password || ""}
              onChange={handlePasswordChange}
              error={passError === "" ? false : true}
              helperText={passError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
