import * as React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Stack,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Link,
  Chip,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";

import { blue } from "@mui/material/colors";

import Logo from "../../assets/images/logo/logo-dense.png";
import { useSelector } from "react-redux";

const pages = [
  { page: "Trang chủ", link: "#" },
  { page: "Về chúng tôi", link: "#" },
  { page: "Trợ giúp", link: "#" },
  { page: "Khảo sát", link: "khao-sat" },
];
const settings = ["Hồ sơ", "Tài khoản", "Đăng xuất"];

const activeLink =
  "d-flex align-items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
const normalLink =
  "d-flex align-items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const activeNav = useSelector((state) => state.state.activeNav);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/dang-nhap");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#00B14F" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={`/${page.link}`}
                    key={page.link}
                    className={
                      activeNav === page.link ? activeLink : normalLink
                    }
                  >
                    <span className="capitalize ">
                      {page?.page || page.link}
                    </span>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Link
            href="#"
            variant="body2"
            color={"white"}
            underline="none"
            sx={{ display: { xs: "none", md: "flex" }, marginRight: 20 }}
          >
            <Stack direction="row" spacing={2} alignItems={"center"}>
              <Avatar
                alt="Survey now logo"
                src={Logo}
                title="Survey now logo"
              />
              <Typography variant="h5" color={"white"}>
                SurveyNow
              </Typography>
            </Stack>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Mở cài đặt">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                  <Avatar
                    alt="Avatar"
                    title="Avatar"
                    src="/broken-image.jpg"
                    sx={{ bgcolor: blue[500] }}
                  />
                  <Typography variant="body1" color={"white"}>
                    Admin
                  </Typography>
                </Stack>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                width: "300px",
                left: "auto",
                right: "calc(100% - 310px)",
                borderRadius: "20px",
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

              <MenuItem onClick={handleCloseUserMenu} alignItems="center">
                <Chip
                  color="default"
                  disabled={false}
                  size="medium"
                  variant="filled"
                  clickable={true}
                  label={
                    <MenuItemCustom
                      name={"Đăng xuất"}
                      icon={<LogoutIcon fontSize={"small"} color={"#00B14F"} />}
                    />
                  }
                  onClick={() => handleLogout()}
                  sx={{
                    borderRadius: "4px",
                    width: 260,
                    "& .MuiChip-label": {
                      display: "inline-flex",
                      width: "90%",
                    },
                  }}
                />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

const MenuItemCustom = ({ name, icon }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Typography variant="body2">{name}</Typography>
      <Typography variant="body2" color={"#00B14F"}>
        {icon}
      </Typography>
    </Stack>
  );
};
