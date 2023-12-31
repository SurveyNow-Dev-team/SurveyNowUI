import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveMenu,
  setScreenSize,
  handleClick,
} from "../store/slices/state.slice";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.state.currentColor);
  const activeMenu = useSelector((state) => state.state.activeMenu);
  const isClicked = useSelector((state) => state.state.isClicked);
  const screenSize = useSelector((state) => state.state.screenSize);
  const user = JSON.parse(localStorage.getItem("user"));
  const fullName = user.fullName;
  const avatarUrl = user.avatarUrl;

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false));
    } else {
      dispatch(setActiveMenu(true));
    }
  }, [screenSize]);

  const handleActiveMenu = () => dispatch(setActiveMenu(!activeMenu));

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => dispatch(handleClick("cart"))}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => dispatch(handleClick("chat"))}
          color={currentColor}
          icon={<BsChatLeft />}
        /> */}
        <NavButton
          title="Thông báo"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => dispatch(handleClick("notification"))}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Hồ sơ" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => dispatch(handleClick("userProfile"))}
          >
            <img
              className="rounded-full w-8 h-8"
              src={(avatarUrl == undefined || avatarUrl == null || avatarUrl == "") ? avatar : avatarUrl}
              alt="Ảnh đại diện"
            />
            <p>
              <span className="text-gray-400 text-14">Xin chào,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {fullName}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
