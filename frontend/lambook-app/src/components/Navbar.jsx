import React from "react";
import "../styles/Navbar.css";
import { Button } from "@mui/material";
function Navbar() {
  return (
    <>
      <nav>
        <ul className="nav-links">
            <div className="btn-container">
          <Button className="btn-links">
            <a href="#" className="btn-names">Home</a>
          </Button>
          <Button className="btn-links">
            <a href="#" className="btn-names">Home</a>
          </Button>
          <Button className="btn-links">
            <a href="#" className="btn-names">Home</a>
          </Button>
          <Button className="btn-links">
            <a href="#" className="btn-names">Home</a>
          </Button>
          </div>
        </ul>
        
      </nav>
    </>
  );
}

export default Navbar;
