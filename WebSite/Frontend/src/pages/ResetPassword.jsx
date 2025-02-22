<<<<<<< HEAD
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css"; //styling
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { token } = useParams();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post(
        "http://localhost:8081/resetpassword",
        { password: values.password },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Password reset successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="resetpassword-container">
      <form onSubmit={handleSubmit} className="resetpassword-form">
        <h2>Reset Password</h2>

        <div className="mb-3">
          <label className="password">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="confirm-password">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            name="confirmPassword"
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="resetpassword-btn">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
=======
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css"; //styling
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { token } = useParams();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post(
        "http://localhost:8081/resetpassword",
        { password: values.password },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Password reset successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="resetpassword-container">
      <form onSubmit={handleSubmit} className="resetpassword-form">
        <h2>Reset Password</h2>

        <div className="mb-3">
          <label className="password">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            name="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="confirm-password">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            name="confirmPassword"
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="resetpassword-btn">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
