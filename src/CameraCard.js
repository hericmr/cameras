import React, { useState } from "react";
import PropTypes from "prop-types";

// URL da imagem de fallback
const FALLBACK_IMAGE_URL = "URL_DE_FALLBACK"; // Substitua pelo caminho da imagem padrão

function CameraCard({ camera, onImageClick }) {
    const [imageUrl, setImageUrl] = useState(camera.url);

    // Atualiza a URL da imagem para a de fallback caso ocorra um erro ao carregar
    const handleImageError = () => setImageUrl(FALLBACK_IMAGE_URL);

    return (
        <div className="relative">
            <img
                src={imageUrl}
                alt={camera.lugar || "Imagem da câmera"} // Acessibilidade garantida
                className="w-full h-auto object-cover rounded cursor-pointer"
                onClick={() => onImageClick(camera.url)}
                onError={handleImageError}
                loading="lazy" // Lazy loading para melhorar performance
            />
            {/* Removido o overlay com o nome da câmera */}
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
