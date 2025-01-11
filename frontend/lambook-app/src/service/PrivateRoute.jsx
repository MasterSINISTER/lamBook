import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if(isAuthenticated){
    return children;
  }
  else{
    alert("Please Login First");
    return <Navigate to="/" /> 
  }
//   return isAuthenticated ? children : 
//   <Navigate to="/" />;
};

export default PrivateRoute;
