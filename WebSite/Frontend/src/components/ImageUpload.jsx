<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faCloudUploadAlt,
  faUndo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/ImageUpload.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [inputBase64Image, setInputBase64Image] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [points, setPoints] = useState([]);
  const [maskedArea, setMaskedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [inputImage, setInputImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleFileChange = (file) => {
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      if (file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        alert("File size exceeds the 10MB limit.");
        setSelectedFile(null);
      }
    } else {
      alert("Only JPEG, JPG, and PNG files are allowed!");
      setSelectedFile(null);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  const clearPoints = () => {
    setPoints([]);
    setMaskedArea(null);
  };

  const removeLastPoint = () => {
    setPoints(points.slice(0, -1));
  };

  const createMask = () => {
    if (!selectedFile || points.length < 3) {
      alert(
        "Please upload an image and define a mask with at least three points."
      );
      return;
    }
    const image = imageRef.current;
    const originalCanvas = canvasRef.current;
    const maskCanvas = document.createElement("canvas");
    const originalCtx = originalCanvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");
    originalCanvas.width = image.naturalWidth;
    originalCanvas.height = image.naturalHeight;
    maskCanvas.width = image.naturalWidth;
    maskCanvas.height = image.naturalHeight;
    originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    // originalCtx.drawImage(image, 0, 0);
    maskCtx.fillStyle = "white";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    const drawMask = (ctx) => {
      ctx.beginPath();
      points.forEach((point, index) => {
        const scaledX = point.x * (ctx.canvas.width / image.clientWidth);
        const scaledY = point.y * (ctx.canvas.height / image.clientHeight);
        if (index === 0) {
          ctx.moveTo(scaledX, scaledY);
        } else {
          ctx.lineTo(scaledX, scaledY);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 8;
      ctx.stroke();
    };
    drawMask(originalCtx);
    drawMask(maskCtx);
    setMaskedArea(maskCanvas.toDataURL());
    setInputImage(maskCanvas.toDataURL());
  };

  const handleCancel = () => {
    setSelectedFile(null);
    clearPoints();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImageToBackend = async (base64Image) => {
    setLoading(true); // Start loading
    try {
      const inputImageformattedBase64 = inputBase64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
      ); // Remove data URI prefix
      const formattedBase64 = base64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
      ); // Remove data URI prefix

      const response = await axios.post(
        "http://localhost:8081/upload-image",
        {
          imageData: formattedBase64,
          inputImage: inputImageformattedBase64,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Image uploaded successfully");

      setTimeout(() => {
        navigate("/generate-2d-plan");
      }, 2000);

      console.log("Image uploaded:", response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error uploading image");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="create">
      <Header />
      <ToastContainer />
      <div className="upload-container">
        <label
          className={`upload-label ${dragActive ? "drag-active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundImage: selectedFile
              ? `url(${URL.createObjectURL(selectedFile)})`
              : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "block",
          }}
        >
          {!selectedFile && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className="icon"
                size="7x"
              />
              <span>Choose an Image or Drag and Drop here!</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </label>
        {selectedFile && (
          <div className="image-container">
            <img
              ref={imageRef}
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="uploaded-image"
              onClick={handleImageClick}
            />
            <canvas ref={canvasRef} className="canvas-overlay"></canvas>
            {points.map((point, index) => (
              <div
                key={index}
                className="point-marker"
                style={{ left: `${point.x}px`, top: `${point.y}px` }}
              />
            ))}

            {selectedFile && (
              <div className="controls">
                <button onClick={createMask} className="mask-button">
                  Create Mask
                </button>
                <button
                  onClick={removeLastPoint}
                  className="remove-point-button"
                >
                  <FontAwesomeIcon icon={faUndo} />{" "}
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}
          </div>
        )}

        {maskedArea && (
          <div className="output-container">
            <img src={maskedArea} alt="Masked Area" className="output-image" />
            <button
              onClick={() => uploadImageToBackend(maskedArea)}
              className="cancel-button"
              disabled={loading}
            >
              
              {loading ? " Processing..." : "Generate Roomsplit"}
            </button>
          </div>
        )}
        {generatedImage && (
          <div className="output-container">
            <img
              src={generatedImage}
              alt="Masked Area"
              className="output-image"
            />
            <button className="cancel-button">Submit</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ImageUpload;
=======
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faCloudUploadAlt,
  faUndo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/ImageUpload.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [inputBase64Image, setInputBase64Image] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [points, setPoints] = useState([]);
  const [maskedArea, setMaskedArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [inputImage, setInputImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleFileChange = (file) => {
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      if (file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        alert("File size exceeds the 10MB limit.");
        setSelectedFile(null);
      }
    } else {
      alert("Only JPEG, JPG, and PNG files are allowed!");
      setSelectedFile(null);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPoints([...points, { x, y }]);
  };

  const clearPoints = () => {
    setPoints([]);
    setMaskedArea(null);
  };

  const removeLastPoint = () => {
    setPoints(points.slice(0, -1));
  };

  const createMask = () => {
    if (!selectedFile || points.length < 3) {
      alert(
        "Please upload an image and define a mask with at least three points."
      );
      return;
    }
    const image = imageRef.current;
    const originalCanvas = canvasRef.current;
    const maskCanvas = document.createElement("canvas");
    const originalCtx = originalCanvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");
    originalCanvas.width = image.naturalWidth;
    originalCanvas.height = image.naturalHeight;
    maskCanvas.width = image.naturalWidth;
    maskCanvas.height = image.naturalHeight;
    originalCtx.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    // originalCtx.drawImage(image, 0, 0);
    maskCtx.fillStyle = "white";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    const drawMask = (ctx) => {
      ctx.beginPath();
      points.forEach((point, index) => {
        const scaledX = point.x * (ctx.canvas.width / image.clientWidth);
        const scaledY = point.y * (ctx.canvas.height / image.clientHeight);
        if (index === 0) {
          ctx.moveTo(scaledX, scaledY);
        } else {
          ctx.lineTo(scaledX, scaledY);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 8;
      ctx.stroke();
    };
    drawMask(originalCtx);
    drawMask(maskCtx);
    setMaskedArea(maskCanvas.toDataURL());
    setInputImage(maskCanvas.toDataURL());
  };

  const handleCancel = () => {
    setSelectedFile(null);
    clearPoints();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImageToBackend = async (base64Image) => {
    setLoading(true); // Start loading
    try {
      const inputImageformattedBase64 = inputBase64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
      ); // Remove data URI prefix
      const formattedBase64 = base64Image.replace(
        /^data:image\/\w+;base64,/,
        ""
      ); // Remove data URI prefix

      const response = await axios.post(
        "http://localhost:8081/upload-image",
        {
          imageData: formattedBase64,
          inputImage: inputImageformattedBase64,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Image uploaded successfully");

      setTimeout(() => {
        navigate("/generate-2d-plan");
      }, 2000);

      console.log("Image uploaded:", response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error uploading image");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="create">
      <Header />
      <ToastContainer />
      <div className="upload-container">
        <label
          className={`upload-label ${dragActive ? "drag-active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            backgroundImage: selectedFile
              ? `url(${URL.createObjectURL(selectedFile)})`
              : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "block",
          }}
        >
          {!selectedFile && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className="icon"
                size="7x"
              />
              <span>Choose an Image or Drag and Drop here!</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </label>
        {selectedFile && (
          <div className="image-container">
            <img
              ref={imageRef}
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="uploaded-image"
              onClick={handleImageClick}
            />
            <canvas ref={canvasRef} className="canvas-overlay"></canvas>
            {points.map((point, index) => (
              <div
                key={index}
                className="point-marker"
                style={{ left: `${point.x}px`, top: `${point.y}px` }}
              />
            ))}

            {selectedFile && (
              <div className="controls">
                <button onClick={createMask} className="mask-button">
                  Create Mask
                </button>
                <button
                  onClick={removeLastPoint}
                  className="remove-point-button"
                >
                  <FontAwesomeIcon icon={faUndo} />{" "}
                </button>
                <button onClick={handleCancel} className="cancel-button">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}
          </div>
        )}

        {maskedArea && (
          <div className="output-container">
            <img src={maskedArea} alt="Masked Area" className="output-image" />
            <button
              onClick={() => uploadImageToBackend(maskedArea)}
              className="cancel-button"
              disabled={loading}
            >
              
              {loading ? " Processing..." : "Generate Roomsplit"}
            </button>
          </div>
        )}
        {generatedImage && (
          <div className="output-container">
            <img
              src={generatedImage}
              alt="Masked Area"
              className="output-image"
            />
            <button className="cancel-button">Submit</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ImageUpload;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
