<<<<<<< HEAD
import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [values, setValue] = useState({
    email: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/forgotpassword", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Email sent! Please check your inbox.");
          //toast.success("Email sent! Please check your inbox")
          navigate("/signin");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="forgotpassword-container">
      <Header />
      <form onSubmit={handleSubmit} className="forgotpassword-form">
        <h2>Forgot Password</h2>

        <div className="mb-3">
          <label className="email">Enter your Email.</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={(e) => setValue({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="sendemail-btn">
            Send Email
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
=======
import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [values, setValue] = useState({
    email: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/forgotpassword", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Email sent! Please check your inbox.");
          //toast.success("Email sent! Please check your inbox")
          navigate("/signin");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="forgotpassword-container">
      <Header />
      <form onSubmit={handleSubmit} className="forgotpassword-form">
        <h2>Forgot Password</h2>

        <div className="mb-3">
          <label className="email">Enter your Email.</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={(e) => setValue({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="sendemail-btn">
            Send Email
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
