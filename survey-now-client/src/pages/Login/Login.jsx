import * as React from "react";

import {
  setRole,
  setAvatarUrl,
  setEmail,
  setFullName,
} from "../../store/slice/auth.slice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login } from "../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setActiveNav } from "../../store/slice/state.slice";

import Logo from "../../assets/images/logo/logo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
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
  const currentColor = "#00B14F";

  const [email, setEmailForm] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState(undefined);
  const [passError, setPassError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleEmailChange = (e) => {
    setEmailForm(e.target.value || "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value || "");
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      let valid = true;

      if (email.trim() === "") {
        setEmailError(`Email is required.`);
        valid = false;
      } else {
        setEmailError("");
      }
      if (password.trim() === "") {
        setPassError(`Password is required. `);
        valid = false;
      } else {
        setPassError("");
      }

      if (!valid) {
        setMessage(undefined);
        return;
      }

      setLoading(true);

      const data = await login({
        email: email,
        password: password,
      });

      // const roleData = data?.role;
      // if (roleData !== "Admin") {
      //   setMessage("Cút");
      //   return;
      // }

      //Call action to update data in store (redux)
      dispatch(setRole(data.role || ""));
      dispatch(setAvatarUrl(data.avatarUrl || ""));
      dispatch(setFullName(data.fullName || ""));
      dispatch(setEmail(data.email || ""));

      //Store token
      const token = data?.token || "";
      localStorage.setItem("token", JSON.stringify(token));

      const user = {
        role: data.role,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
        email: data.email,
      };

      localStorage.setItem("user", JSON.stringify(user));

      setMessage(undefined);
      let pageUrl = "khao-sat";
      dispatch(setActiveNav(pageUrl));
      navigate(`/${pageUrl}`);
    } catch (error) {
      if (error.response) {
        if (error.response.data.title) {
          setMessage(error.response?.data?.title || "Undefined.");
        } else {
          setMessage(error.response?.data?.message || "Undefined.");
        }
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
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
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress sx={{ color: currentColor }} />
              </Box>
            ) : (
              message && (
                <Alert variant="outlined" severity="error">
                  {`Lỗi: ${message}`}
                </Alert>
              )
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
