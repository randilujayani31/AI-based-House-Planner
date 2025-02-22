import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  GridHelper,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(2)}% loaded</Html>;
}

function PlyModel({ plyFile, onModelLoaded }) {
  const geometry = useLoader(PLYLoader, plyFile);
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current && onModelLoaded) {
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      meshRef.current.position.sub(center);
      onModelLoaded(box.getSize(new THREE.Vector3()));
    }
  }, [geometry, onModelLoaded]);

  return (
    <mesh ref={meshRef}>
      <primitive attach="geometry" object={geometry} />
      <meshStandardMaterial color="orange" metalness={0.5} roughness={0.4} />
    </mesh>
  );
}

function PlyViewer({ plyFile }) {
  const controlsRef = useRef();
  const containerRef = useRef();
  const [gridVisible, setGridVisible] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [modelSize, setModelSize] = useState(null);
  const [cameraPosition, setCameraPosition] = useState([0, 280, 400]);
  const [cameraFov, setCameraFov] = useState(75);
  const [gridSize, setGridSize] = useState(20); // Default grid size
  const [initialCameraPosition, setInitialCameraPosition] = useState(null); // Stores first render position
  const [initialCameraFov, setInitialCameraFov] = useState(null); // Stores first render position

  useEffect(() => {
    if (!initialCameraPosition) {
      setInitialCameraPosition(cameraPosition); // Set only on first render
    }
  }, []);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      //   setCameraPosition(cameraPosition);
    }
  };

  const handleModelLoaded = useCallback((size) => {
    setModelSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    setGridSize(maxDimension * 2);
  }, []);

  useEffect(() => {
    if (containerRef.current && modelSize) {
      const containerHeight = containerRef.current.offsetHeight;
      const containerWidth = containerRef.current.offsetWidth;

      const newCameraPosition = [
        0,
        Math.max(modelSize.y, containerHeight) * 0.5,
        Math.max(modelSize.z, containerWidth) * 0.8,
      ];

      setCameraPosition(newCameraPosition);

      const newCameraFov = Math.max(60, Math.min(90, (modelSize.z / 10) * 10));
      setCameraFov(newCameraFov);
    }
  }, [containerRef, modelSize]);

  return (
    <div ref={containerRef} className="ply-viewer">
      <div className="ply-viewer__controls">
        <button onClick={resetCamera} className="ply-viewer__button">
          Reset Camera
        </button>
        <button
          onClick={() => setGridVisible(!gridVisible)}
          className="ply-viewer__button"
        >
          {gridVisible ? "Hide Grid" : "Show Grid"}
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="ply-viewer__button"
        >
          {autoRotate ? "Stop Rotation" : "Auto Rotate"}
        </button>
      </div>

      <Canvas className="ply-viewer__canvas">
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1} />

          {gridVisible && <gridHelper args={[gridSize, 20, "red", "green"]} />}
          <axesHelper args={[5]} />

          <PerspectiveCamera
            makeDefault
            position={cameraPosition}
            fov={cameraFov}
          />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
          />

          {plyFile && (
            <PlyModel plyFile={plyFile} onModelLoaded={handleModelLoaded} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default PlyViewer;
