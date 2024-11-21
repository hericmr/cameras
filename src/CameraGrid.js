import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import CameraCard from "./CameraCard";
import cameras from "./cameras.json";

function CameraGrid({ onImageClick, updateInterval = 6000 }) {
  const [cameraUrls, setCameraUrls] = useState(Object.values(cameras));
  const intervalRef = useRef(null);

  // Atualiza URLs das imagens com timestamp
  const updateImages = useCallback(() => {
    setCameraUrls((prevCameraUrls) =>
      prevCameraUrls.map((camera) => ({
        ...camera,
        url: `${camera.url.split('&t=')[0]}&t=${new Date().getTime()}`,
      }))
    );
  }, []);

  useEffect(() => {
    updateImages();

    intervalRef.current = setInterval(updateImages, updateInterval);

    return () => clearInterval(intervalRef.current);
  }, [updateImages, updateInterval]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {cameraUrls.map((camera, index) => (
        <CameraCard
          key={index}
          camera={camera}
          index={index}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
}

CameraGrid.propTypes = {
  onImageClick: PropTypes.func.isRequired,
  updateInterval: PropTypes.number,
};

export default CameraGrid;
