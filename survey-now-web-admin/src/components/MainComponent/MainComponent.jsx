import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentColor,
  setCurrentMode,
  setThemeSettings,
} from "../../store/slices/state.slice";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../../components";

export const MainComponent = ({ child }) => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.state.currentColor);
  const currentMode = useSelector((state) => state.state.currentMod);
  const activeMenu = useSelector((state) => state.state.activeMenu);
  const themeSettings = useSelector((state) => state.state.themeSettings);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      dispatch(setCurrentColor(currentThemeColor));
      dispatch(setCurrentMode(currentThemeMode));
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => dispatch(setThemeSettings(true))}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            {child}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
