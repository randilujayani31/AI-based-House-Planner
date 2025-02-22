<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlyViewer from "../components/PlyViewer";
import "../styles/generated3dPlans.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GenerateAndViewPly() {
  const [plyFile, setPlyFile] = useState(null);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".ply")) {
      const fileURL = URL.createObjectURL(file);
      setPlyFile(fileURL);

      return () => URL.revokeObjectURL(fileURL);
    } else {
      alert("Please select a valid .ply file");
    }
  };
  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  if (!storedAuth) {
    return null;
  }

  return (
    <div className="ply_space_view_conatiner">
      <Header />
      <div className="ply-uploader">
        <h1 className="ply-uploader__title">Upload & View 3D Model (.ply)</h1>
        <input
          type="file"
          accept=".ply"
          className="ply-uploader__input"
          onChange={handleFileChange}
        />
        {plyFile && <PlyViewer key={plyFile} plyFile={plyFile} />}
      </div>
      <Footer />
    </div>
  );
}

export default GenerateAndViewPly;
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlyViewer from "../components/PlyViewer";
import "../styles/generated3dPlans.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GenerateAndViewPly() {
  const [plyFile, setPlyFile] = useState(null);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".ply")) {
      const fileURL = URL.createObjectURL(file);
      setPlyFile(fileURL);

      return () => URL.revokeObjectURL(fileURL);
    } else {
      alert("Please select a valid .ply file");
    }
  };
  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  if (!storedAuth) {
    return null;
  }

  return (
    <div className="ply_space_view_conatiner">
      <Header />
      <div className="ply-uploader">
        <h1 className="ply-uploader__title">Upload & View 3D Model (.ply)</h1>
        <input
          type="file"
          accept=".ply"
          className="ply-uploader__input"
          onChange={handleFileChange}
        />
        {plyFile && <PlyViewer key={plyFile} plyFile={plyFile} />}
      </div>
      <Footer />
    </div>
  );
}

export default GenerateAndViewPly;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
