import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import CameraCard from "./CameraCard";
import cameras from "./cameras.json"; // Importa o arquivo JSON diretamente

function CameraGrid({ onImageClick }) {
  const [cameraUrls, setCameraUrls] = useState(Object.values(cameras));
  const intervalRef = useRef(null);

  // Função para atualizar apenas o campo de URL com o timestamp
  const updateImages = useCallback(() => {
    setCameraUrls((prevCameraUrls) =>
      prevCameraUrls.map((camera) => ({
        ...camera,
        url: `${camera.url.split('&t=')[0]}&t=${new Date().getTime()}`, // Atualiza apenas a URL
      }))
    );
  }, []);

  useEffect(() => {
    updateImages(); // Atualiza imediatamente ao montar

    // Define o intervalo de atualização
    intervalRef.current = setInterval(updateImages, 6000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalRef.current);
  }, [updateImages]);

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

// Definir PropTypes para garantir o tipo correto da prop onImageClick
CameraGrid.propTypes = {
  onImageClick: PropTypes.func.isRequired,
};

export default CameraGrid;
