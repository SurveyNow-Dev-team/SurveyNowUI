import { useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({ page, component: Component }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (page == null) {
    return <Navigate to="/error404" state={{ from: location }} replace />;
  } else {
    if (!user) {
      if (/*page !== "forgotPassword" &&*/ page !== "login") {
        return <Navigate to="/login" state={{ from: location }} replace />;
      } else {
        return Component;
      }
    } else {
      if (/*page === "forgotPassword" ||*/ page === "login") {
        return <Navigate to="/ecommerce" state={{ from: location }} replace />;
      } else {
        return Component;
      }
    }
  }
};

export default PrivateRoute;
