import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainComponent from "./components/MainComponent/MainComponent";
import Login from "./pages/Login/Login";

import "./App.css";
import PrivateRoute from "./components/Route/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Navigate to="/dang-nhap" />} />
        <Route
          path="/dang-nhap"
          element={<PrivateRoute page="dang-nhap" component={<Login />} />}
        />

        {/* khao sat */}
        <Route
          path="/khao-sat"
          element={
            <PrivateRoute
              page="khao-sat"
              component={<MainComponent child={<p>Khảo sát</p>} />}
            />
          }
        />

        {/* pages  */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
