import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children,adminroute,isAdmin }) => {
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
    }
    return children?children:<Outlet />
};

export default ProtectedRoute;