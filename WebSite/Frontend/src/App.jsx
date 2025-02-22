import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";
import UploadImagePage from "./pages/UploadImagePage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserInputs from "./pages/UserInputs";
import Generated2dPlans from "./pages/Generated2dPlans";
import Generated3dPlans from "./pages/Generated3dPlans";
import History from "./pages/History";
import Download from "./pages/Download";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/download" element={<Download />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/uploadImagePage" element={<UploadImagePage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/user-inputs" element={<UserInputs />} />
        <Route path="/generate-2d-plan" element={<Generated2dPlans />} />
        <Route path="/generate-3d-plan" element={<Generated3dPlans />} />
      </Routes>
    </div>
  );
}

export default App;
