import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../styles/Accounts.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

function Account() {
  const [showUsernameModal, setShowUsernameModal] = React.useState(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);
  const [currUsername, setCurrUsername] = React.useState("");
  const [currPassword, setCurrPassword] = React.useState("");

  // Modal Handlers
  const handleOpenUsernameModal = () => setShowUsernameModal(true);
  const handleCloseUsernameModal = () => setShowUsernameModal(false);

  const handleOpenPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => setShowPasswordModal(false);

  // Update Username
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:8080/users",
        { userName: currUsername },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Username Updated Successfully");
        localStorage.setItem("username", currUsername); // Update localStorage
        handleCloseUsernameModal(); // Close modal
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert(error.response?.data?.message || "Server error occurred");
    }
  };

  // Update Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://localhost:8080/users",
        { password: currPassword },
        {
          headers: {
            Authorization: `Basic ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Password Updated Successfully");
        handleClosePasswordModal(); // Close modal
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert(error.response?.data?.message || "Server error occurred");
    }
  };

  return (
    <>
      <ArrowBackIcon
        sx={{ color: "white", cursor: "pointer" }}
        onClick={() => window.history.back()}
      />
      <h1>Manage Your Profile</h1>
      <div className="profile-container">
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="Profile Avatar"
            src="https://cdn-icons-png.freepik.com/512/2945/2945506.png?ga=GA1.1.1759710920.1736686962"
            sx={{ width: 156, height: 156 }}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
            }}
          />
        </Stack>

        <h2 className="profile-username">
          Username: {localStorage.getItem("username")} &nbsp;&nbsp;&nbsp;
          <Button
            sx={{ color: "white", borderRadius: "100px" }}
            onClick={handleOpenUsernameModal}
          >
            <ModeEditIcon />
          </Button>
        </h2>
        <h2 className="profile-username">
          Password: ******** &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            sx={{ color: "white", borderRadius: "100px" }}
            onClick={handleOpenPasswordModal}
          >
            <ModeEditIcon />
          </Button>
        </h2>
      </div>

      {/* Modal for Editing Username */}
      <Dialog open={showUsernameModal} onClose={handleCloseUsernameModal}>
        <DialogTitle>Edit Username</DialogTitle>
        <form onSubmit={handleUpdateUsername}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="New Username"
              type="text"
              fullWidth
              variant="outlined"
              value={currUsername}
              onChange={(e) => setCurrUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUsernameModal} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal for Editing Password */}
      <Dialog open={showPasswordModal} onClose={handleClosePasswordModal}>
        <DialogTitle>Edit Password</DialogTitle>
        <form onSubmit={handleUpdatePassword}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="New Password"
              type="password"
              fullWidth
              variant="outlined"
              value={currPassword}
              onChange={(e) => setCurrPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePasswordModal} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Account;
