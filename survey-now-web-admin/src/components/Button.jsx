import React from "react";

import { useDispatch } from "react-redux";
import { setIsClicked } from "../store/slices/state.slice";
import { useNavigate } from "react-router-dom";

import { setAuthentication } from "../store/slices/auth.slice";
import { LocalSeeOutlined } from "@mui/icons-material";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  isLogOut,
}) => {
  const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setIsClicked(initialState));

    if (isLogOut) {
      localStorage.clear();
      dispatch(setAuthentication(false));
      navigate("/login");
    }
  };

  return (
    <button
      type="button"
      // onClick={() => dispatch(setIsClicked(initialState))}
      onClick={handleLogout}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
