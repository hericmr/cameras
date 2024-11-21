import React from "react";
import PropTypes from "prop-types";

// URL da imagem de fallback
const FALLBACK_IMAGE_URL = "URL_DE_FALLBACK"; // Substitua pelo caminho da imagem padrão

function CameraCard({ camera, onImageClick }) {
    return (
        <div className="relative">
            <img
                src={camera.url}
                alt={camera.lugar || "Imagem da câmera"} // Texto alternativo acessível
                className="w-full h-auto object-cover rounded cursor-pointer"
                onClick={() => onImageClick(camera.url)}
                onError={(e) => (e.target.src = FALLBACK_IMAGE_URL)} // Fallback no erro de carregamento
                loading="lazy" // Lazy loading para performance
                aria-label={`Clique para visualizar câmera em ${camera.lugar || "local desconhecido"}`}
            />
        </div>
    );
}

// Validação de tipos das props
CameraCard.propTypes = {
    camera: PropTypes.shape({
        url: PropTypes.string.isRequired,
        lugar: PropTypes.string,
    }).isRequired,
    onImageClick: PropTypes.func.isRequired,
};

export default CameraCard;
