import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          color: "white",
          fontSize: "23px",
          fontFamily: "Chakra Petch",
          fontWeight: "bold",
          letterSpacing: "0.1em",
          transition: "all 1s ease",
        }}
      >
        {props.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{
          background: "rgba(41, 10, 10, 0.35)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.10)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          borderRadius: "10px",
          transition: "all 1s ease",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {" "}
        <MenuItem
          onClick={props.onAccount}
          style={{ fontFamily: "Chakra Petch" }}
        >
          My Account
        </MenuItem>
        <MenuItem
          onClick={props.onLogout}
          style={{ fontFamily: "Chakra Petch" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
