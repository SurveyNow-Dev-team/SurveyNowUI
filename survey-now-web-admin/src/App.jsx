import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login/Login";
import TransactionsHistory from "./pages/Transactions/History/TransactionsHistory";
import Purchase from "./pages/Transactions/Purchase/Purchase";
import { PurchaseDetail } from "./pages/Transactions/Purchase/Detail/PurchaseDetail";

import Redeem from "./pages/Transactions/Redeem/Redeem";

import { MainComponent } from "./components/MainComponent/MainComponent";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";
import "./App.css";
import PrivateRoute from "./components/Route/PrivateRoute";
import User from "./pages/Transactions/User/User";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<PrivateRoute page="login" component={<Login />} />}
        />

        {/* dashboard  */}
        <Route
          path="/ecommerce"
          element={
            <PrivateRoute
              page="ecommerce"
              component={<MainComponent child={<Ecommerce />} />}
            />
          }
        />

        {/* pages  */}
        <Route
          path="/orders"
          element={
            <PrivateRoute
              page="orders"
              component={<MainComponent child={<Orders />} />}
            />
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute
              page="employees"
              component={<MainComponent child={<Employees />} />}
            />
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute
              page="customers"
              component={<MainComponent child={<Customers />} />}
            />
          }
        />
        

        {/* apps  */}
        <Route
          path="/kanban"
          element={
            <PrivateRoute
              page="kanban"
              component={<MainComponent child={<Kanban />} />}
            />
          }
        />
        <Route
          path="/editor"
          element={
            <PrivateRoute
              page="editor"
              component={<MainComponent child={<Editor />} />}
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute
              page="calendar"
              component={
                <MainComponent child={<MainComponent child={<Calendar />} />} />
              }
            />
          }
        />
        <Route
          path="/color-picker"
          element={
            <PrivateRoute
              page="color-picker"
              component={
                <MainComponent
                  child={<MainComponent child={<ColorPicker />} />}
                />
              }
            />
          }
        />

        {/* charts  */}
        <Route
          path="/line"
          element={
            <PrivateRoute
              page="line"
              component={<MainComponent child={<Line />} />}
            />
          }
        />
        <Route
          path="/area"
          element={
            <PrivateRoute
              page="area"
              component={<MainComponent child={<Area />} />}
            />
          }
        />
        <Route
          path="/bar"
          element={
            <PrivateRoute
              page="bar"
              component={<MainComponent child={<Bar />} />}
            />
          }
        />
        <Route
          path="/pie"
          element={
            <PrivateRoute
              page="pie"
              component={<MainComponent child={<Pie />} />}
            />
          }
        />
        <Route
          path="/financial"
          element={
            <PrivateRoute
              page="financial"
              component={<MainComponent child={<Financial />} />}
            />
          }
        />
        <Route
          path="/color-mapping"
          element={
            <PrivateRoute
              page="color-mapping"
              component={<MainComponent child={<ColorMapping />} />}
            />
          }
        />
        <Route
          path="/pyramid"
          element={
            <PrivateRoute
              page="pyramid"
              component={<MainComponent child={<Pyramid />} />}
            />
          }
        />
        <Route
          path="/stacked"
          element={
            <PrivateRoute
              page="stacked"
              component={<MainComponent child={<Stacked />} />}
            />
          }
        />
        {/* transactions  */}
        <Route
          path="/transactions/purchase"
          element={
            <PrivateRoute
              page="transactions-purchase"
              component={<MainComponent child={<Purchase />} />}
            />
          }
        />
        <Route
          path="/transactions/purchase/detail"
          element={
            <PrivateRoute
              page="purchase-detail"
              component={<MainComponent child={<PurchaseDetail />} />}
            />
          }
        />
        <Route
          path="/transactions/redeem"
          element={
            <PrivateRoute
              page="transactions-redeem"
              component={<MainComponent child={<Redeem />} />}
            />
          }
        />
        <Route
          path="/transactions/history"
          element={
            <PrivateRoute
              page="transactions-history"
              component={<MainComponent child={<TransactionsHistory />} />}
            />
          }
        />
         <Route
          path="/user"
          element={
            <PrivateRoute
              page="user"
              component={<MainComponent child={<User />} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
