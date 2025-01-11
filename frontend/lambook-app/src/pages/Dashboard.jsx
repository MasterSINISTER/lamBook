import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, InputLabel, MenuItem } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import "../styles/Dashboard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "rgba(255, 255, 255, 0.75)", // Semi-transparent background
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.10)", // Custom box shadow
  backdropFilter: "blur(4px)", // Blurring effect for the background
  WebkitBackdropFilter: "blur(4px)", // For Safari support
  borderRadius: "10px", // Rounded corners
  border: "1px solid rgba(255, 255, 255, 0.18)", // Light border with transparency // This can be used if you want the background to match the theme color
  p: 4, // Padding
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
          Authorization: `Basic ${authToken}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setEntries(data);
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
        ? `http://localhost:8080/book/update/${formData.id}`
        : `http://localhost:8080/book`;
      const method = isEditing ? "PUT" : "POST";
      const response = await fetch(apiURL, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          Authorization: `Basic ${authToken}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          tag: formData.tag,
        }),
      });
      if (response.status === 201 || response.status === 200) {
        fetchEntries();
        setShowModal(false);
        setIsEditing(false);
        setFormData({ title: "", description: "", tag: "" });
      } else {
        setError("Failed to add entry. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to add entry. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/book/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Basic ${authToken}`,
          },
        }
      );
      if (response.status == 200) {
        fetchEntries();
      } else {
        setError("Failed to delete entry. Please try again later.");
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
    setFormData(entry);
  };

  const handleAdd = () => {
    setShowModal(true);
    setIsEditing(false);
    setFormData({ title: "", description: "", tag: "" });
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

  return (
    <div className="dashboard">
      <button onClick={handleLogout} style={styleLogOutButton}>
        Logout
      </button>
      <h1>
        Welcome to DashBoard {localStorage.getItem("username").toUpperCase()}
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <EditNoteIcon sx={{ fontSize: 35, margin: 0 }}></EditNoteIcon>
      <button
        onClick={handleAdd}
        className="add-entry-button"
        style={{
          color: "royalblue",
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
              <button onClick={() => handleEdit(entry)}>Edit</button>
              <button onClick={() => handleDelete(entry.id.toString())}>
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
              fontWeight: "bold",
              color: "royalblue",
              paddingBottom: "20px",
            }}
          >
            {isEditing ? "Edit Entry" : "Add New Entry"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <label
              style={{
                fontFamily: "Major Mono Display",
                fontSize: "150%",
                fontWeight: "bold",
              }}
            >
              <br></br>
              Title:
              <br></br>
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
            <br></br>
            <label
              style={{
                fontFamily: "Major Mono Display",
                fontSize: "150%",
                fontWeight: "bold",
              }}
            >
              Description:
              <br></br>
              <br></br>
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
            <br></br>

            <label
              style={{
                fontFamily: "Major Mono Display",
                fontSize: "150%",
                fontWeight: "bold",
              }}
            >
              Tag:
              <br></br>
              <br></br>
              <InputLabel id="tag-select-label"></InputLabel>
              <Select
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

            <button
              type="submit"
              style={{ fontSize: "150%", fontFamily: "Major Mono Display" }}
            >
              {isEditing ? "Update" : "Add"} Entry
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
