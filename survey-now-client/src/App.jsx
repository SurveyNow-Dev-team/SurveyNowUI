import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainComponent from "./components/MainComponent/MainComponent";

import "./App.css";
import PrivateRoute from "./components/Route/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        {/* <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<PrivateRoute page="login" component={<p>Hello</p>} />}
        /> */}

        {/* dashboard  */}
        <Route
          path="/login"
          element={
            <PrivateRoute
              page="login"
              component={<MainComponent child={<p>Hello</p>} />}
            />
          }
        />

        {/* pages  */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
