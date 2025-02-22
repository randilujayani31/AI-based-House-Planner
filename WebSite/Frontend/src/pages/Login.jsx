<<<<<<< HEAD
import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Font Awesome icons

function Login() {
  const [values, setValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("auth", "true");
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("role", res.data.role);

          navigate("/user-inputs");
        } else {
          toast.error(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <Header />
      <ToastContainer />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome!</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            id="email"
            onChange={(e) => setValue({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3 password-field">
          <input
            type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
            className="form-control"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(e) => setValue({ ...values, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword((prevState) => !prevState)}
            aria-label="Toggle Password Visibility"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <div className="d-grid">
          <button id="login_btn" type="submit" className="login-btn">
            Sign In
          </button>
        </div>
        <p className="already-have-acc">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </p>
        <p className="already-have-acc">
          Don't have an account! <Link to="/register">Sign Up</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
}

export default Login;

=======
import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Font Awesome icons

function Login() {
  const [values, setValue] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("auth", "true");
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("role", res.data.role);

          navigate("/user-inputs");
        } else {
          toast.error(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <Header />
      <ToastContainer />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome!</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            id="email"
            onChange={(e) => setValue({ ...values, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3 password-field">
          <input
            type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
            className="form-control"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(e) => setValue({ ...values, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword((prevState) => !prevState)}
            aria-label="Toggle Password Visibility"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <div className="d-grid">
          <button id="login_btn" type="submit" className="login-btn">
            Sign In
          </button>
        </div>
        <p className="already-have-acc">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </p>
        <p className="already-have-acc">
          Don't have an account! <Link to="/register">Sign Up</Link>
        </p>
      </form>
      <Footer />
    </div>
  );
}

export default Login;

>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
