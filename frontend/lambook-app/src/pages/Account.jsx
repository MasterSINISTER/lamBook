import { Button } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Accounts.css";
import { Form } from "react-router-dom";

function Account() {
  return (
    <>
      <ArrowBackIcon
        sx={{ color: "white", cursor: "pointer" }}
        onClick={() => window.history.back()}
      />
      <h1>Manage Your Profile</h1>
      
    </>
  );
}

export default Account;
