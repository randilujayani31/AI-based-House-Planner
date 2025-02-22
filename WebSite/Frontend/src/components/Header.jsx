<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../styles/Header.css";

const Header = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.removeItem("auth");
          localStorage.removeItem("email");
          localStorage.removeItem("role");
          setRole(null);
          toast.success("Logged out successfully");
          navigate("/");
        } else {
          toast.error("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        toast.error("Logout error");
      });
  };

  return (
    <header className="header">
      <ToastContainer />

      <div className="logo">APEXA</div>
      <nav>
        <div className="navlinks">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            {role ? (
              <>
                {role === "admin" && (
                  <li>
                    <NavLink to="/adminpage">Admin</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/generate-2d-plan">2d Floor Plans</NavLink>
                </li>
                <li>
                  <NavLink to="/generate-3d-plan">3d Floor Plans</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/history">History</NavLink>
                </li> */}
                <li>
                  <NavLink to="/download">Download</NavLink>
                </li>
                <li>
                  <NavLink to="/history">History</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/signin">Log In</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
=======
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../styles/Header.css";

const Header = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.removeItem("auth");
          localStorage.removeItem("email");
          localStorage.removeItem("role");
          setRole(null);
          toast.success("Logged out successfully");
          navigate("/");
        } else {
          toast.error("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
        toast.error("Logout error");
      });
  };

  return (
    <header className="header">
      <ToastContainer />

      <div className="logo">APEXA</div>
      <nav>
        <div className="navlinks">
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            {role ? (
              <>
                {role === "admin" && (
                  <li>
                    <NavLink to="/adminpage">Admin</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/generate-2d-plan">2d Floor Plans</NavLink>
                </li>
                <li>
                  <NavLink to="/generate-3d-plan">3d Floor Plans</NavLink>
                </li>
                {/* <li>
                  <NavLink to="/history">History</NavLink>
                </li> */}
                <li>
                  <NavLink to="/download">Download</NavLink>
                </li>
                <li>
                  <NavLink to="/history">History</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/signin">Log In</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
