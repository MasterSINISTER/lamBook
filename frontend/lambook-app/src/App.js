import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./service/PrivateRoute";
import AdminPortal from "./pages/AdminPortal";
import PrivateRouteAdmin from "./service/PrivateRouteAdmin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  // const express = require("express");
  // const cors = require("cors");
  // const app = express();
  // app.use(cors({ origin: true, credentials: true }));
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard />{" "}
              </PrivateRoute>
            }
          />

          <Route
            path="/admindash"
            element={
              <PrivateRouteAdmin>
                <AdminDashboard />
              </PrivateRouteAdmin>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
