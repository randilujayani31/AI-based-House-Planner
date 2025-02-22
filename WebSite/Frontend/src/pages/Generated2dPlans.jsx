<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/generated2dPlans.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ViewImages = () => {
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false); // To handle button state
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  // Color legend for rooms
  const colorLegend = [
    { color: "#00BF63", room: "Living Room" },
    { color: "#FF66C4", room: "Kitchen" },
    { color: "#FF3131", room: "Bathroom" },
    { color: "#004AAD", room: "Bedroom" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8081/get-room-split-images", { withCredentials: true })
      .then((response) => {
        setImages(response.data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  const generate3DView = () => {
    setGenerating(true);
    axios
      .get("http://localhost:8081/generate-3d-view", {
        responseType: "blob", // Ensure the response is treated as binary data
        withCredentials: true,
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: "model/x-ply" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Generated_3D_View.ply"); // Set filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("3D View generated and downloaded!");
      })
      .catch((error) => {
        console.error("Error generating 3D view:", error);
        toast.error("Error generating 3D view");
      })
      .finally(() => {
        setGenerating(false);
      });
  };

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
    <div className="floor-plans-2d">
      <Header />
      <div className="view-images-container">
        <ToastContainer />
        <h2>Generated Floor Plan</h2>

        {loading ? (
          <p>Loading images...</p>
        ) : (
<div className="image-and-legend">
  {/* Image Section */}
  {images.length > 0 ? (
    <div className="image-card">
      <img
        src={`data:image/png;base64,${images[0].image_data}`}
        alt={`Image 1`}
        className="image-thumbnail"
      />
    </div>
  ) : (
    <p>No images found.</p>
  )}

  {/* Color Legend Section */}
  <div className="color-legend">
    <h3>Color Code Legend</h3>
    <ul>
      {colorLegend.map((item, index) => (
        <li key={index} className="legend-item">
          <span
            className="color-box"
            style={{ backgroundColor: item.color }}
          ></span>
          {item.room}
        </li>
      ))}
    </ul>

    {/* Move buttons here */}
    <div className="buttons-container">
      <button
        className="download-button"
        onClick={() => handleDownload(images[0].image_data, "input")}
      >
        Download
      </button>
      <button
        className="download-button"
        onClick={generate3DView}
        disabled={generating}
      >
        {generating ? "Generating..." : "Generate 3D View"}
      </button>
    </div>
  </div>
</div>

        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewImages;
=======
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/generated2dPlans.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ViewImages = () => {
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false); // To handle button state
  const navigate = useNavigate();
  const storedAuth = localStorage.getItem("auth") === "true";

  // Color legend for rooms
  const colorLegend = [
    { color: "#00BF63", room: "Living Room" },
    { color: "#FF66C4", room: "Kitchen" },
    { color: "#FF3131", room: "Bathroom" },
    { color: "#004AAD", room: "Bedroom" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8081/get-room-split-images", { withCredentials: true })
      .then((response) => {
        setImages(response.data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error("Error fetching images");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!storedAuth) {
      navigate("/signin");
    }
  }, [storedAuth, navigate]);

  const generate3DView = () => {
    setGenerating(true);
    axios
      .get("http://localhost:8081/generate-3d-view", {
        responseType: "blob", // Ensure the response is treated as binary data
        withCredentials: true,
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: "model/x-ply" }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Generated_3D_View.ply"); // Set filename for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("3D View generated and downloaded!");
      })
      .catch((error) => {
        console.error("Error generating 3D view:", error);
        toast.error("Error generating 3D view");
      })
      .finally(() => {
        setGenerating(false);
      });
  };

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
    <div className="floor-plans-2d">
      <Header />
      <div className="view-images-container">
        <ToastContainer />
        <h2>Generated Floor Plan</h2>

        {loading ? (
          <p>Loading images...</p>
        ) : (
<div className="image-and-legend">
  {/* Image Section */}
  {images.length > 0 ? (
    <div className="image-card">
      <img
        src={`data:image/png;base64,${images[0].image_data}`}
        alt={`Image 1`}
        className="image-thumbnail"
      />
    </div>
  ) : (
    <p>No images found.</p>
  )}

  {/* Color Legend Section */}
  <div className="color-legend">
    <h3>Color Code Legend</h3>
    <ul>
      {colorLegend.map((item, index) => (
        <li key={index} className="legend-item">
          <span
            className="color-box"
            style={{ backgroundColor: item.color }}
          ></span>
          {item.room}
        </li>
      ))}
    </ul>

    {/* Move buttons here */}
    <div className="buttons-container">
      <button
        className="download-button"
        onClick={() => handleDownload(images[0].image_data, "input")}
      >
        Download
      </button>
      <button
        className="download-button"
        onClick={generate3DView}
        disabled={generating}
      >
        {generating ? "Generating..." : "Generate 3D View"}
      </button>
    </div>
  </div>
</div>

        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewImages;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
