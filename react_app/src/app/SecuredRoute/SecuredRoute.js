import React from "react";
import { Navigate } from "react-router-dom";

import AuthHelper from "../Helpers/Auth";

const SecuredRoute = ({ children }) => {
  const authHelper = new AuthHelper();
  const isAuthenticated = authHelper.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default SecuredRoute;
