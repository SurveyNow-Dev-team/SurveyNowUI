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
      <div className=" relative dark:bg-main-dark-bg">
        <div className="d-block" style={{ position: "relative" }}>
          <div className="fixed right-4 bottom-4">
            <TooltipComponent content="Cài đặt" position="Top">
              <button
                type="button"
                onClick={() => dispatch(setThemeSettings(true))}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-2xl text-white p-2 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {activeMenu ? (
            <div
              className="sidebar dark:bg-secondary-dark-bg bg-white "
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: 300,
                minHeight: "100vh",
                zIndex: 100000,
              }}
            >
              <Sidebar />
            </div>
          ) : (
            <div
              className="dark:bg-secondary-dark-bg"
              style={{ display: "none" }}
            >
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full"
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen "
            }
          >
            <div>
              <div className="md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
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
      </div>
    </div>
  );
};
