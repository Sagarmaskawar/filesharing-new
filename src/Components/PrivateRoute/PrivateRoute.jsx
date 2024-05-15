import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const login = localStorage.getItem("loggedIn")
    ? localStorage.getItem("loggedIn")
    : false;
  return login ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
