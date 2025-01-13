import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, InputLabel, MenuItem, Button, Menu } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "../styles/Dashboard.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import BasicMenu from "../components/Menu";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  background: "rgba(41, 10, 10, 0.35)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.10)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  p: 4,
  transition: "transform 0.3s ease-in-out",
};
function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  const fetchEntries = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/book", {
        headers: {
          method: "GET",
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setEntries(data);
      } else if (response.status === 404) {
        setError("Start Adding Entries");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("Failed to fetch entries. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch entries. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("authToken");
      const apiURL = isEditing
        ? `http://localhost:8080/book/update/${formData.entryID}`
        : `http://localhost:8080/book`;
      const method = isEditing ? "PUT" : "POST";

      const requestBody = {
        title: formData.title,
        description: formData.description,
        tag: formData.tag,
      };

      const response = await fetch(apiURL, {
        method,
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (isEditing) {
        requestBody.entryID = formData.entryID;
      }

      console.log(requestBody);
      if (response.status === 201 || response.status === 200) {
        fetchEntries();
        setShowModal(false); // Close modal
        setIsEditing(false); // Reset editing state
        setFormData({ title: "", description: "", tag: "" }); // Clear form data
      } else {
        setError("Failed to add entry. Please try again later.");
        setTimeout(() => {
          setError(""); // Clear error message after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to add entry. Please try again later.");
      setTimeout(() => {
        setError(""); // Clear error message after 3 seconds
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      console.log(id);
      const response = await fetch(`http://localhost:8080/book/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        fetchEntries();
      } else {
        console.log(response);
        setError("Entry Deleted Succesfully");
        fetchEntries();
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to delete entry. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleEdit = (entry) => {
    setShowModal(true);
    setIsEditing(true);
    setFormData(entry.toString());
  };

  const handleAdd = () => {
    setShowModal(true);
    setIsEditing(false);
    setFormData({ title: "", description: "", tag: "", entryID: "" });
  };

  const styleLogOutButton = {
    fontFamily: "Major Mono Display",
    fontWeight: "bold",
    fontSize: "19px",
    color: "white",
    borderRadius: "40px",
    marginLeft: "80%",
    padding: "10px 20px",
    backgroundColor: "red",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
  };

  const handleNavigateToAccounts = () => {
    navigate("/account");
  };

  const handleDarkMode = () => {
    const body = document.body;
    body.classList.toggle("dashboard-dark-mode");
  };

  return (
    <div className="dashboard">
      <div
        className="header-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          className="top-right-container"
          style={{ marginLeft: "87%", marginBottom: "10px" }}
        >
          <BasicMenu
            title={localStorage.getItem("username") || "User"}
            onLogout={handleLogout}
            onAccount={handleNavigateToAccounts}
          ></BasicMenu>
        </div>
      </div>
      <h1>
        Welcome to DashBoard {localStorage.getItem("username").toUpperCase()}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <EditNoteIcon sx={{ fontSize: 35, margin: 0 }}></EditNoteIcon>
      <button
        onClick={handleAdd}
        className="add-entry-button"
        style={{
          color: "#D84040",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "Chakra Petch",
          fontWeight: "bold",
          fontSize: "20px",
          margin: "10px",
        }}
      >
        Add New Entry
      </button>
      {entries.length > 0 ? (
        <div className="cards-container">
          {entries.map((entry) => (
            <div className="card" key={entry.id}>
              <h2
                className="card-title"
                style={{ fontFamily: "Playwrite AU SA" }}
              >
                {entry.title}
              </h2>
              <p
                className="card-content"
                style={{ fontFamily: "Playwrite AU SA" }}
              >
                {entry.description}
              </p>
              <p className="card-tag" style={{ fontFamily: "Playwrite AU SA" }}>
                {entry.tag}
              </p>
              <button
                onClick={() => handleEdit(entry.entryID)}
                className="ed-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.entryID)}
                className="ed-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No entries found.</p>
      )}

      {/* Modal for Adding or Editing Entries */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Major Mono Display",
              fontSize: "250%",
              fontWeight: "900",
              color: "#D84040",
              paddingBottom: "20px",
            }}
          >
            {isEditing ? "Edit Entry" : "Add New Entry"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <label
              style={{
                color: "#D84040",
                fontFamily: "Major Mono Display",
                fontSize: "150%",
                fontWeight: "bold",
              }}
            >
              <br></br>
              Title:
              <br></br>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                style={{
                  maringTop: "10px",
                  width: "100%",
                  height: "50px",
                  fontSize: "100%",
                  fontFamily: "Playwrite AU SA",
                }}
              />
            </label>
            <br></br>
            <br></br>
            <label
              style={{
                color: "#D84040",
                fontFamily: "Major Mono Display",
                fontSize: "150%",
                fontWeight: "bold",
              }}
            >
              Description:
              <br></br>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  height: "200px",
                  resize: "none",
                  borderRadius: "10px",
                  fontSize: "100%",
                  fontFamily: "Playwrite AU SA",
                }}
              ></textarea>
            </label>
            <br></br>
            <br></br>
            <label
              style={{
                fontFamily: "Major Mono Display",
                fontSize: "150%",
                fontWeight: "bold",
                color: "#D84040",
              }}
            >
              Tag:
              <InputLabel id="tag-select-label"></InputLabel>
              <Select
                style={{
                  value: "Please Select Tag",
                  width: "20%",
                  height: "50px",
                  fontSize: "80%",
                  fontFamily: "Chakra Petch",
                  backgroundColor: "#8E1616",
                }}
                placeholder="Select Tag"
                labelId="tag-select-label"
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                required
              >
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="personal">Personal</MenuItem>
                <MenuItem value="important">Important</MenuItem>
                <MenuItem value="shopping">Shopping</MenuItem>
              </Select>
            </label>
            <br></br>
            <br></br>
            <br></br>

            <button type="submit" className="add-entry-btn">
              {isEditing ? "Update" : "Add"} Entry
            </button>
            <button
              className="add-entry-btn"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
