<<<<<<< HEAD
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import VideoPlayer from "../components/VideoPlayer";
import "../styles/UploadImagePage.css";
import "../styles/ImageUpload.css";
import videoSrc from "../assets/info-video.mp4";



function UploadImagePage() {
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  if (!storedAuth) {
    return null;
  }

  // Function to scroll to the upload section
  const scrollToUpload = () => {
    document.getElementById("upload-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="upload-image-page">
      <div className="upload-form">
      <div className="upload-form-upper">
        <h2>Upload Image</h2>
        
        <button className="blink-button" onClick={scrollToUpload}>
          Go to Upload
        </button>
        <p style={{ color: "red" }}>Guideline for selecting an image</p>

        <VideoPlayer src={videoSrc} />

        </div>
        {/* Blinking Button */}
       
      
        <div className="upload-form-under">
          {/* Upload Section */}
          <h2 id="upload-section">Upload the Image</h2>
          <ImageUpload />
        </div>
      </div>
    </div>
  );
}

export default UploadImagePage;
=======
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import VideoPlayer from "../components/VideoPlayer";
import "../styles/UploadImagePage.css";
import "../styles/ImageUpload.css";
import videoSrc from "../assets/info-video.mp4";



function UploadImagePage() {
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  if (!storedAuth) {
    return null;
  }

  // Function to scroll to the upload section
  const scrollToUpload = () => {
    document.getElementById("upload-section").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="upload-image-page">
      <div className="upload-form">
      <div className="upload-form-upper">
        <h2>Upload Image</h2>
        
        <button className="blink-button" onClick={scrollToUpload}>
          Go to Upload
        </button>
        <p style={{ color: "red" }}>Guideline for selecting an image</p>

        <VideoPlayer src={videoSrc} />

        </div>
        {/* Blinking Button */}
       
      
        <div className="upload-form-under">
          {/* Upload Section */}
          <h2 id="upload-section">Upload the Image</h2>
          <ImageUpload />
        </div>
      </div>
    </div>
  );
}

export default UploadImagePage;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
