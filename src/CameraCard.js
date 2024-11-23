import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// URL de fallback para imagem
const FALLBACK_IMAGE_URL =
  "https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true";

function CameraCard({ camera, onImageClick }) {
  const [imageSrc, setImageSrc] = useState(camera.url); // Estado para a URL da imagem
  const [retryCount, setRetryCount] = useState(0); // Contador de tentativas
  const MAX_RETRIES = 150; // Número máximo de tentativas

  // Função para lidar com erros ao carregar a imagem
  const handleError = () => {
    if (retryCount < MAX_RETRIES) {
      // Tenta recarregar a imagem até o limite de tentativas
      setRetryCount(retryCount + 1);
      setImageSrc(camera.url + "?retry=" + Date.now()); // Adiciona um parâmetro único para forçar o recarregamento
    } else {
      // Usa a imagem de fallback após atingir o limite de tentativas
      setImageSrc(FALLBACK_IMAGE_URL);
    }
  };

  // Atualiza a imagem a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setRetryCount(0); // Reseta o contador de tentativas
      setImageSrc(camera.url + "?timestamp=" + Date.now()); // Adiciona timestamp para forçar o recarregamento
    }, 2500);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, [camera.url]);

  return (
    <div className="relative border border-black shadow-lg rounded overflow-hidden">
      {/* Rótulo para indicar "Câmera Quebrada" */}
      {camera.lugar === "quebrada" && (
        <div className="bg-yellow-500 text-black text-xs p-1 rounded-tl absolute top-0 left-0">
          Câmera Quebrada
        </div>
      )}

      {/* Imagem com fallback e retentativa */}
      <div className="w-full h-[210px] bg-gray-700 flex items-center justify-center overflow-hidden">
        <img
          src={imageSrc}
          alt={camera.lugar || "Imagem da câmera"} // Texto alternativo
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onImageClick(camera.url)}
          onError={handleError} // Fallback e retentativa
          loading="lazy" // Carregamento preguiçoso para melhorar a performance
          aria-label={`Clique para visualizar a câmera em ${camera.lugar || "local desconhecido"}`}
        />
        {/* Placeholder no caso de erro após tentativas */}
        {imageSrc === FALLBACK_IMAGE_URL && (
          <span className="text-gray-900 text-sm">Imagem indisponível</span>
        )}
      </div>

{/* Informações abaixo da imagem */}
<div className="p-1 bg-gray-900 bg-opacity-70 text-gray-300 text-xs text-center">
  {camera.lugar || "Local Desconhecido"}
</div>

    </div>
  );
}

CameraCard.propTypes = {
  camera: PropTypes.shape({
    url: PropTypes.string.isRequired,
    lugar: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default CameraCard;
