import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const Check_aurh = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/signin" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/homeshop" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/signin") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to="/auth/signup" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/signin") ||
      location.pathname.includes("/signup"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/homeshop" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default Check_aurh;
