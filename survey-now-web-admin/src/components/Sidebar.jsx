import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../store/slices/state.slice";
import { Link, NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import Logo from "../assets/images/transparent-logo.png";

import { links } from "../data/dummy";

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.state.currentColor);
  const activeMenu = useSelector((state) => state.state.activeMenu);
  const screenSize = useSelector((state) => state.state.screenSize);


  // const handleCloseSideBar = () => {
  //   if (activeMenu !== undefined && screenSize <= 900) {
  //     dispatch(setActiveMenu(false));
  //   }
  // };

  const handleCloseSideBar = () => {
    setActiveMenu(false);
  }


  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
        <div className="main-content-scaled">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              {/* <Avatar
                sx={{ my: 2, bgcolor: "white", width: 40, height: 40 }}
                alt="SurveyNow Logo"
                src={Logo}
              ></Avatar> */}
              <span style={{ color: "#00B14F" }}>Survey Now</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => dispatch(setActiveMenu(!activeMenu))}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">
                      {link?.value || link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
