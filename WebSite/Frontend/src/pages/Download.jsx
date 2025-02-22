<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/Download.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Download = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
      return;
    }

    axios
      .get("http://localhost:8081/get-all-images", { withCredentials: true })
      .then((response) => {
        setImages(response.data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images");
        setLoading(false);
      });
  }, [storedAuth, navigate]);

  if (!storedAuth) {
    return null;
  }

  const handleDownload = (imageData, imageType) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageData}`;
    link.download = `${imageType}_image.png`;
    link.click();
  };

  return (
    <div className="download-page-container">
      <Header />
      <div className="download-content">
        <ToastContainer />
        {/* <h2 className="download-heading">Download Images</h2> */}

        {loading ? (
          <p className="loading-text">Loading images...</p>
        ) : (
          <div className="image-row-layout">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="image-row">
                  {/* Input Image Section */}
                  <div className="download-image-card">
                    <h3>Masked Image</h3>
                    <img
                      src={`data:image/png;base64,${image.input_image}`}
                      alt="Masked Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.input_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() => handleDownload(image.input_image, "input")}
                    >
                      Download 
                    </button>
                  </div>
                  {/* Masked Image Section */}
                  <div className="download-image-card">
                    <h3>Masked Image</h3>
                    <img
                      src={`data:image/png;base64,${image.masked_image}`}
                      alt="Masked Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.masked_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() => handleDownload(image.masked_image, "masked")}
                    >
                      Download 
                      </button>
                  </div>

                  {/* Shape Generated Image Section */}
                  <div className="download-image-card">
                    <h3>Shape Generated Image</h3>
                    <img
                      src={`data:image/png;base64,${image.shape_generated_image}`}
                      alt="Shape Generated Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.shape_generated_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() =>
                        handleDownload(image.shape_generated_image, "shape_generated")
                      }
                    >
                      Download 
                      </button>
                  </div>

                  {/* Room Split Image Section */}
                  <div className="download-image-card">
                    <h3>Room Split Image</h3>
                    <img
                      src={`data:image/png;base64,${image.room_split_image}`}
                      alt="Room Split Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.room_split_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() =>
                        handleDownload(image.room_split_image, "room_split")
                      }
                    >
                      Download 
                      </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{color:"black"}}>No images found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />

      {/* Modal for image preview */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={`data:image/png;base64,${selectedImage}`} alt="Preview" />
            <button
              className="close-modal"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Download;
=======
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/Download.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Download = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
      return;
    }

    axios
      .get("http://localhost:8081/get-all-images", { withCredentials: true })
      .then((response) => {
        setImages(response.data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images");
        setLoading(false);
      });
  }, [storedAuth, navigate]);

  if (!storedAuth) {
    return null;
  }

  const handleDownload = (imageData, imageType) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageData}`;
    link.download = `${imageType}_image.png`;
    link.click();
  };

  return (
    <div className="download-page-container">
      <Header />
      <div className="download-content">
        <ToastContainer />
        {/* <h2 className="download-heading">Download Images</h2> */}

        {loading ? (
          <p className="loading-text">Loading images...</p>
        ) : (
          <div className="image-row-layout">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="image-row">
                  {/* Input Image Section */}
                  <div className="download-image-card">
                    <h3>Masked Image</h3>
                    <img
                      src={`data:image/png;base64,${image.input_image}`}
                      alt="Masked Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.input_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() => handleDownload(image.input_image, "input")}
                    >
                      Download 
                    </button>
                  </div>
                  {/* Masked Image Section */}
                  <div className="download-image-card">
                    <h3>Masked Image</h3>
                    <img
                      src={`data:image/png;base64,${image.masked_image}`}
                      alt="Masked Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.masked_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() => handleDownload(image.masked_image, "masked")}
                    >
                      Download 
                      </button>
                  </div>

                  {/* Shape Generated Image Section */}
                  <div className="download-image-card">
                    <h3>Shape Generated Image</h3>
                    <img
                      src={`data:image/png;base64,${image.shape_generated_image}`}
                      alt="Shape Generated Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.shape_generated_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() =>
                        handleDownload(image.shape_generated_image, "shape_generated")
                      }
                    >
                      Download 
                      </button>
                  </div>

                  {/* Room Split Image Section */}
                  <div className="download-image-card">
                    <h3>Room Split Image</h3>
                    <img
                      src={`data:image/png;base64,${image.room_split_image}`}
                      alt="Room Split Preview"
                      className="image-preview"
                      onClick={() => setSelectedImage(image.room_split_image)}
                    />
                    <button
                      className="download-button"
                      onClick={() =>
                        handleDownload(image.room_split_image, "room_split")
                      }
                    >
                      Download 
                      </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{color:"black"}}>No images found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />

      {/* Modal for image preview */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={`data:image/png;base64,${selectedImage}`} alt="Preview" />
            <button
              className="close-modal"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Download;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
