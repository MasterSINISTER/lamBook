import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAccounts = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if(isAuthenticated){
    return children;
  }
  else{
    alert("Please Login First");
    return <Navigate to="/dashboard" /> 
  }
//   return isAuthenticated ? children : 
//   <Navigate to="/" />;
};

export default PrivateRouteAccounts;
