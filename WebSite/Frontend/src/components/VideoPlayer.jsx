<<<<<<< HEAD
import React, { useRef, useEffect } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <video ref={videoRef} autoPlay loop muted playsInline width="70%" height="auto" style={{
      border: "5px solidrgb(41, 42, 43)",
      padding:"10px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.89)",
    }}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
=======
import React, { useRef, useEffect } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <video ref={videoRef} autoPlay loop muted playsInline width="70%" height="auto" style={{
      border: "5px solidrgb(41, 42, 43)",
      padding:"10px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.89)",
    }}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
>>>>>>> ad1daff77eda17853a9f5794c916f1ce5b4b3db7
