import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if(isAuthenticated){
    return children;
  }
  else{
    alert("Please Login First");
    return <Navigate to="/admin" /> 
  }
//   return isAuthenticated ? children : 
//   <Navigate to="/" />;
};

export default PrivateRouteAdmin;
