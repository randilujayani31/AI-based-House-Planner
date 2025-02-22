<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/History.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const History = () => {
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

  return (
    <div className="history-container">
      <Header />
      <div className="history-view-container">
        <ToastContainer />
        {/* <h2>History</h2> */}

        {loading ? (
          <p className="loading-text">Loading images...</p>
        ) : (
          <div className="history-table-container">
            {images.length > 0 ? (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Uploaded Time</th>
                    <th>Input Image</th>
                    <th>Masked Image</th>
                    <th>Shape Generated Image</th>
                    <th>Room Split Image</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((image) => (
                    <tr key={image.id}>
                      <td>{image.email}</td>
                      <td>
                        {new Date(image.timestamp).toLocaleString("en-US", {
                          // weekday: "long",
                          year: "numeric",
                          month: "long", // Full month name (e.g., "January")
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true, // 12-hour clock with AM/PM
                          timeZone: "UTC", // Explicitly set UTC if your timestamp is in UTC
                        })}
                      </td>

                      {/* <td>{new Date(image.timestamp).toLocaleString()}</td> */}
                      <td>
                        <img
                          src={`data:image/png;base64,${image.input_image}`}
                          alt="Input"
                          className="table-thumbnail"
                          onClick={() => setSelectedImage(image.input_image)}
                        />
                      </td>
                      <td>
                        <img
                          src={`data:image/png;base64,${image.masked_image}`}
                          alt="Masked"
                          className="table-thumbnail"
                          onClick={() => setSelectedImage(image.masked_image)}
                        />
                      </td>
                      <td>
                        <img
                          src={`data:image/png;base64,${image.shape_generated_image}`}
                          alt="Shape Generated"
                          className="table-thumbnail"
                          onClick={() =>
                            setSelectedImage(image.shape_generated_image)
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={`data:image/png;base64,${image.room_split_image}`}
                          alt="Room Split"
                          className="table-thumbnail"
                          onClick={() =>
                            setSelectedImage(image.room_split_image)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: "black" }}>No History found.</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
=======
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/History.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const History = () => {
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

  return (
    <div className="history-container">
      <Header />
      <div className="history-view-container">
        <ToastContainer />
        {/* <h2>History</h2> */}

        {loading ? (
          <p className="loading-text">Loading images...</p>
        ) : (
          <div className="history-table-container">
            {images.length > 0 ? (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Uploaded Time</th>
                    <th>Input Image</th>
                    <th>Masked Image</th>
                    <th>Shape Generated Image</th>
                    <th>Room Split Image</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((image) => (
                    <tr key={image.id}>
                      <td>{image.email}</td>
                      <td>
                        {new Date(image.timestamp).toLocaleString("en-US", {
                          // weekday: "long",
                          year: "numeric",
                          month: "long", // Full month name (e.g., "January")
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true, // 12-hour clock with AM/PM
                          timeZone: "UTC", // Explicitly set UTC if your timestamp is in UTC
                        })}
                      </td>

                      {/* <td>{new Date(image.timestamp).toLocaleString()}</td> */}
                      <td>
                        <img
                          src={`data:image/png;base64,${image.input_image}`}
                          alt="Input"
                          className="table-thumbnail"
                          onClick={() => setSelectedImage(image.input_image)}
                        />
                      </td>
                      <td>
                        <img
                          src={`data:image/png;base64,${image.masked_image}`}
                          alt="Masked"
                          className="table-thumbnail"
                          onClick={() => setSelectedImage(image.masked_image)}
                        />
                      </td>
                      <td>
                        <img
                          src={`data:image/png;base64,${image.shape_generated_image}`}
                          alt="Shape Generated"
                          className="table-thumbnail"
                          onClick={() =>
                            setSelectedImage(image.shape_generated_image)
                          }
                        />
                      </td>
                      <td>
                        <img
                          src={`data:image/png;base64,${image.room_split_image}`}
                          alt="Room Split"
                          className="table-thumbnail"
                          onClick={() =>
                            setSelectedImage(image.room_split_image)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: "black" }}>No History found.</p>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
