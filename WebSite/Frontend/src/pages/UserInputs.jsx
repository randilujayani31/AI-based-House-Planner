<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/userInput.css";
import Header from "../components/Header";

function App() {
  const [formData, setFormData] = useState({
    number_of_room: "",
    land_width: "",
    land_length: "",
    floor_angle: "0",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number_of_room" && (value > 5 || value < 0)) {
      showToast("error", "Number of rooms must be between 0 and 5");
      return;
    }
    if ((name === "land_width" || name === "land_length") && (value < 0 || value > 50)) {
      showToast("error", `${name.replace("_", " ")} must be between 0 and 50 Feet`);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/user-inputs",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("New property added:", response.data);
        showToast("success", "Property added successfully!");
        setFormData({ number_of_room: "", land_width: "", land_length: "", floor_angle: "0" });
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error adding property:", error.response?.data || error.message);
      showToast("error", "Failed to add property");
    }
  };

  const handleGenerate2DPlan = () => {
    navigate("/uploadImagePage");
  };

  const showToast = (type, message) => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  if (!storedAuth) return null;

  return (
    <div className="user-input-container">
      <Header />
      <div className="container">
        <h2>Add your plan data</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Number of Rooms (Only bedrooms you want):
            <input type="number" name="number_of_room" value={formData.number_of_room} onChange={handleChange} required />
          </label>
          <label>
            Land Width (by Feet):
            <input type="number" name="land_width" value={formData.land_width} onChange={handleChange} required />
          </label>
          <label>
            Land Length (by Feet):
            <input type="number" name="land_length" value={formData.land_length} onChange={handleChange} required />
          </label>
          <label>
            Land Angle (Have or Not):
            <select name="floor_angle" value={formData.floor_angle} onChange={handleChange} required>
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
          </label>
          <button type="submit">Submit</button>
          {submitted && (
            <button type="button" onClick={handleGenerate2DPlan}>
              Next Step
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/userInput.css";
import Header from "../components/Header";

function App() {
  const [formData, setFormData] = useState({
    number_of_room: "",
    land_width: "",
    land_length: "",
    floor_angle: "0",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number_of_room" && (value > 5 || value < 0)) {
      showToast("error", "Number of rooms must be between 0 and 5");
      return;
    }
    if ((name === "land_width" || name === "land_length") && (value < 0 || value > 50)) {
      showToast("error", `${name.replace("_", " ")} must be between 0 and 50 Feet`);
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/user-inputs",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("New property added:", response.data);
        showToast("success", "Property added successfully!");
        setFormData({ number_of_room: "", land_width: "", land_length: "", floor_angle: "0" });
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error adding property:", error.response?.data || error.message);
      showToast("error", "Failed to add property");
    }
  };

  const handleGenerate2DPlan = () => {
    navigate("/uploadImagePage");
  };

  const showToast = (type, message) => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  if (!storedAuth) return null;

  return (
    <div className="user-input-container">
      <Header />
      <div className="container">
        <h2>Add your plan data</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Number of Rooms (Only bedrooms you want):
            <input type="number" name="number_of_room" value={formData.number_of_room} onChange={handleChange} required />
          </label>
          <label>
            Land Width (by Feet):
            <input type="number" name="land_width" value={formData.land_width} onChange={handleChange} required />
          </label>
          <label>
            Land Length (by Feet):
            <input type="number" name="land_length" value={formData.land_length} onChange={handleChange} required />
          </label>
          <label>
            Land Angle (Have or Not):
            <select name="floor_angle" value={formData.floor_angle} onChange={handleChange} required>
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
          </label>
          <button type="submit">Submit</button>
          {submitted && (
            <button type="button" onClick={handleGenerate2DPlan}>
              Next Step
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
