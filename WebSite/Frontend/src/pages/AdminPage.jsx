<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [emailToSearch, setEmailToSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedEmail = localStorage.getItem("email");

    if (storedAuth === "true" && storedEmail) {
      setAuth(true);
      setName(storedEmail);
      fetchUsers();
    } else {
      console.log("else");
      checkAuth();
    }
  }, []);

  const checkAuth = () => {
    axios
      .get("http://localhost:8081/adminpage", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.email);
          localStorage.setItem("auth", "true");
          localStorage.setItem("email", res.data.email);
          fetchUsers();
        } else {
          setAuth(false);
          toast.error(res.data.Error || "Unauthorized access");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setAuth(false);
        toast.error("Failed to fetch data");
      });
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:8081/user-details", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setUsers(res.data.users);
        } else {
          console.error("Failed to fetch users:", res.data.Error);
          toast.error("Failed to fetch users");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error("Error fetching users");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8081/search?query=${emailToSearch}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setSearchedUser(res.data.results[0]);
        } else {
          console.error("User not found:", res.data.Error);
          toast.error("User not found");
          setSearchedUser(null);
        }
      })
      .catch((err) => {
        console.error("Error searching user:", err);
        toast.error("Error searching user");
        setSearchedUser(null);
      });
  };

  const handleDelete = () => {
    if (!searchedUser) {
      toast.error("No user selected for deletion");
      return;
    }

    axios
      .delete("http://localhost:8081/deleteuser", {
        headers: { "Content-Type": "application/json" },
        data: { email: searchedUser.email },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          fetchUsers();
          setEmailToSearch("");
          setSearchedUser(null);
          toast.success("User deleted successfully");
        } else {
          console.error("Failed to delete user:", res.data.Error);
          toast.error("Failed to delete user");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Error deleting user");
      });
  };

  const handleClearSearch = () => {
    setSearchedUser(null);
  };

  return (
    <div className="admin_container">
      <Header />
      <ToastContainer />
      {auth ? (
        <div className="admin_dashboard">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <h2>Email - {name}</h2>
          </div>
          <div className="dashboard-content">
            <div className="user-details">
              <h2>User Details</h2>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-controls">
              <div className="search-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by email or username"
                  value={emailToSearch}
                  onChange={(e) => setEmailToSearch(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="search-btn"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {searchedUser && (
                <div className="delete-container">
                  <h3>User to be deleted</h3>
                  <p>
                    {searchedUser.username} ({searchedUser.email})
                  </p>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="close-btn"
                    onClick={handleClearSearch}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="login-prompt">
          <h3>Unauthorized Access. Please log in.</h3>
          <Link to="/signin" className="logout-btn">
            Log in
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminPage;
=======
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [emailToSearch, setEmailToSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    const storedEmail = localStorage.getItem("email");

    if (storedAuth === "true" && storedEmail) {
      setAuth(true);
      setName(storedEmail);
      fetchUsers();
    } else {
      console.log("else");
      checkAuth();
    }
  }, []);

  const checkAuth = () => {
    axios
      .get("http://localhost:8081/adminpage", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.email);
          localStorage.setItem("auth", "true");
          localStorage.setItem("email", res.data.email);
          fetchUsers();
        } else {
          setAuth(false);
          toast.error(res.data.Error || "Unauthorized access");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setAuth(false);
        toast.error("Failed to fetch data");
      });
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:8081/user-details", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setUsers(res.data.users);
        } else {
          console.error("Failed to fetch users:", res.data.Error);
          toast.error("Failed to fetch users");
        }
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error("Error fetching users");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8081/search?query=${emailToSearch}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setSearchedUser(res.data.results[0]);
        } else {
          console.error("User not found:", res.data.Error);
          toast.error("User not found");
          setSearchedUser(null);
        }
      })
      .catch((err) => {
        console.error("Error searching user:", err);
        toast.error("Error searching user");
        setSearchedUser(null);
      });
  };

  const handleDelete = () => {
    if (!searchedUser) {
      toast.error("No user selected for deletion");
      return;
    }

    axios
      .delete("http://localhost:8081/deleteuser", {
        headers: { "Content-Type": "application/json" },
        data: { email: searchedUser.email },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          fetchUsers();
          setEmailToSearch("");
          setSearchedUser(null);
          toast.success("User deleted successfully");
        } else {
          console.error("Failed to delete user:", res.data.Error);
          toast.error("Failed to delete user");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        toast.error("Error deleting user");
      });
  };

  const handleClearSearch = () => {
    setSearchedUser(null);
  };

  return (
    <div className="admin_container">
      <Header />
      <ToastContainer />
      {auth ? (
        <div className="admin_dashboard">
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>
            <h2>Email - {name}</h2>
          </div>
          <div className="dashboard-content">
            <div className="user-details">
              <h2>User Details</h2>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>User name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="admin-controls">
              <div className="search-container">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by email or username"
                  value={emailToSearch}
                  onChange={(e) => setEmailToSearch(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="search-btn"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {searchedUser && (
                <div className="delete-container">
                  <h3>User to be deleted</h3>
                  <p>
                    {searchedUser.username} ({searchedUser.email})
                  </p>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="close-btn"
                    onClick={handleClearSearch}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="login-prompt">
          <h3>Unauthorized Access. Please log in.</h3>
          <Link to="/signin" className="logout-btn">
            Log in
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default AdminPage;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
