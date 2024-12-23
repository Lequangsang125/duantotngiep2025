import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Check_aurh = ({ isAuthenticated, user, isLoading, children }) => {
  const location = useLocation();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("currentPath:", location.pathname);
  console.log("is",isLoading)

  // Đợi đến khi trạng thái tải xong
  if (isLoading) {
    console.log(1)
    return <div>Loading...</div>; // Hiển thị màn hình loading tạm thời
  }

  // Điều hướng người dùng chưa đăng nhập về trang signin
  if (!isAuthenticated) {
    if (
      !(
        location.pathname.includes("/signin") ||
        location.pathname.includes("/signup")
      )
    ) {
      return <Navigate to="/auth/signin" />;
    }
  }

  // Điều hướng người dùng đã đăng nhập nhưng cố truy cập signin/signup
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

  // Ngăn người dùng thông thường truy cập admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Ngăn admin vào shop
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Điều hướng từ trang gốc "/"
  if (location.pathname === "/") {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/homeshop" />;
    }
  }

  // Mặc định render children
  return <>{children}</>;
};

export default Check_aurh;
