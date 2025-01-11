import {
    Button,
    Modal,
    Box,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  import "../styles/AdminDashboard.css";
  import axios from "axios";
  
  function AdminDashboard() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
      username: "",
      password: "",
      confirmPassword: "",
    });
    const [message, setMessage] = React.useState("");
    const [showCreateAdminModal, setShowCreateAdminModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [showViewUsersModal, setShowViewUsersModal] = React.useState(false); // State for View Users modal
    const [deleteUser, setDeleteUser] = React.useState({
      username: "",
    });
    const [users, setUsers] = React.useState([]);
  
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      navigate("/admin");
    };
  
    const handleOpenCreateAdminModal = () => setShowCreateAdminModal(true);
    const handleCloseCreateAdminModal = () => setShowCreateAdminModal(false);
    const handleOpenDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleOpenViewUsersModal = () => {
      fetchUsers(); // Fetch users when the modal is opened
      setShowViewUsersModal(true);
    };
    const handleCloseViewUsersModal = () => setShowViewUsersModal(false);
  
    const handleDeleteUser = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.delete(
          `http://localhost:8080/admin/delete-user/${deleteUser.username}`,
          {
            headers: {
              Authorization: `Basic ${authToken}`,
            },
          }
        );
  
        if (response.status === 200) {
          setMessage("User deleted successfully");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          handleCloseDeleteModal(); // Close the delete modal on success
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        return;
      }
  
      const token = localStorage.getItem("authToken");
  
      try {
        const response = await axios.post(
          "http://localhost:8080/admin/create-admin",
          {
            userName: formData.username,
            password: formData.password,
          },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          setMessage("Admin created successfully");
          setTimeout(() => {
            setMessage("");
          }, 3000);
          handleCloseCreateAdminModal();
        }
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleDeleteInputChange = (e) => {
      const { name, value } = e.target;
      setDeleteUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const fetchUsers = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:8080/admin/all-users",
          {
            headers: {
              Authorization: `Basic ${authToken}`,
            },
          }
        );
  
        if (response.status === 200) {
          setUsers(response.data); // Set the users data
        }
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch users");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    };
  
    const modalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 600,
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: 2,
      p: 4,
    };
  
    return (
      <div>
        <Button onClick={handleLogout}>Logout</Button>
        <h1>Admin Dashboard</h1>
        <br />
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Chakra Petch",
            fontSize: "50px",
            color: "DarkBlue",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          POWERS
        </h2>
        {message && <p>{message}</p>}
        <div className="services" style={{ textAlign: "center" }}>
          <Button
            className="button-power"
            sx={{ fontSize: "20px", padding: "10px 20px" }}
            onClick={handleOpenViewUsersModal} // Open View Users Modal
          >
            View All Users
          </Button>
          <br />
          <Button
            className="button-power"
            onClick={handleOpenCreateAdminModal}
            sx={{ fontSize: "20px", padding: "10px 20px" }}
          >
            Create New Admin
          </Button>
          <br />
          <Button
            className="button-power"
            sx={{ fontSize: "20px", padding: "10px 20px" }}
            onClick={handleOpenDeleteModal} // Open Delete Modal
          >
            Delete Users
          </Button>
          <br />
          <Button
            className="button-power"
            sx={{ fontSize: "20px", padding: "10px 20px" }}
          >
            Give Permissions to Users
          </Button>
          <br />
        </div>
  
        {/* View All Users Modal */}
        <Modal open={showViewUsersModal} onClose={handleCloseViewUsersModal}>
          <Box sx={modalStyle} style={{ width: "800px" }}>
            <h2 style={{ fontFamily: "Chakra Petch", color: "DarkBlue" }}>
              All Users and Their Entries
            </h2>
            {message && (
              <p style={{ color: "yellow", fontFamily: "Chakra Petch" }}>
                {message}
              </p>
            )}
  
            {/* Table to display users and their entries */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Entry ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <>
                      {/* Displaying user information */}
                      {user.entries.map((entry, index) => (
                        <TableRow key={entry.id.timestamp}>
                            <TableCell>{index + 1}</TableCell>
                          <TableCell>{user.userName}</TableCell>
                          <TableCell>{entry.id.timestamp}</TableCell>{" "}
                          {/* Displaying timestamp as entry ID */}
                          <TableCell>{entry.title}</TableCell>
                          <TableCell>{entry.tag}</TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell>{user.roles.join(", ")}</TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
  
        {/* Create New Admin Modal */}
        <Modal open={showCreateAdminModal} onClose={handleCloseCreateAdminModal}>
          <Box sx={modalStyle}>
            <h2 style={{ fontFamily: "Chakra Petch", color: "DarkBlue" }}>
              Create New Admin
            </h2>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Submit
              </Button>
              <Button
                onClick={handleCloseCreateAdminModal}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "16px", marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>
  
        {/* Delete User Modal */}
        <Modal open={showDeleteModal} onClose={handleCloseDeleteModal}>
          <Box sx={modalStyle}>
            <h2 style={{ fontFamily: "Chakra Petch", color: "DarkBlue" }}>
              Delete User
            </h2>
            <form>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={deleteUser.username}
                onChange={handleDeleteInputChange}
              />
              <Button
                onClick={handleDeleteUser}
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Delete User
              </Button>
              <Button
                onClick={handleCloseDeleteModal}
                variant="outlined"
                color="secondary"
                style={{ marginTop: "16px", marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
  
  export default AdminDashboard;
  