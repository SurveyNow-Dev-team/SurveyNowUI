import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = ({ page, component: Component }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  if (page == null) {
    return <Navigate to="/error404" state={{ from: location }} replace />;
  } else {
    if (!user) {
      if (page !== "dang-ky" && page !== "dang-nhap") {
        return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
      } else {
        return Component;
      }
    } else {
      if (page === "dang-ky" || page === "dang-nhap") {
        return <Navigate to="/khao-sat" state={{ from: location }} replace />;
      } else {
        return Component;
      }
    }
  }
};

export default PrivateRoute;
