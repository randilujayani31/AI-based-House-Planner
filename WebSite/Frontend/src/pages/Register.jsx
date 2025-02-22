<<<<<<< HEAD
import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!validatePassword(values.password)) {
      toast.error(
        "Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }
    axios
      .post("http://localhost:8081/register", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Account created successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          toast.error(res.data.Error);
          //alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <Header />
      <ToastContainer />
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Join Us!</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={(e) => setValue({ ...values, username: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={(e) => setValue({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={(e) => setValue({ ...values, password: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            name="confirmpassword"
            onChange={(e) =>
              setValue({ ...values, confirmpassword: e.target.value })
            }
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </div>
        <p className="already-have-acc">
          Already have an account! <Link to="/signin">Sign In</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
}

export default Register;
=======
import React, { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.password !== values.confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!validatePassword(values.password)) {
      toast.error(
        "Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }
    axios
      .post("http://localhost:8081/register", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Account created successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        } else {
          toast.error(res.data.Error);
          //alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="register-container">
      <Header />
      <ToastContainer />
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Join Us!</h2>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={(e) => setValue({ ...values, username: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={(e) => setValue({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={(e) => setValue({ ...values, password: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            name="confirmpassword"
            onChange={(e) =>
              setValue({ ...values, confirmpassword: e.target.value })
            }
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </div>
        <p className="already-have-acc">
          Already have an account! <Link to="/signin">Sign In</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
}

export default Register;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
