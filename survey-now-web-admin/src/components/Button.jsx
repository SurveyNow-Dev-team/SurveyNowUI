import React from "react";

import { useDispatch } from "react-redux";
import { setIsClicked } from "../store/slices/state.slice";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  };

  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(setIsClicked(initialState))}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
