import React from "react";
import PropTypes from "prop-types";

// URL de fallback para imagem
const FALLBACK_IMAGE_URL = "https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true"; // Substitua com a URL correta

// Altura máxima para a imagem
const MAX_IMAGE_HEIGHT = "300px"; // Espaço pequeno para a imagem de fallback

function CameraCard({ camera, onImageClick }) {
    const handleError = (e) => {
        e.target.src = FALLBACK_IMAGE_URL; // Definir fallback se a imagem não carregar
    };

    return (
        <div className="relative">
            {camera.lugar === "quebrada" && (
                <div className="bg-yellow-500 text-black text-xs p-1 rounded-tl absolute top-0 left-0">
                    Câmera Quebrada
                </div>
            )}

            {/* Caixa de texto para o título do lugar fora da imagem */}
            <div className="bg-black bg-opacity-70 text-white text-xs p-1 rounded-tl">
                {camera.lugar || "Local Desconhecido"}
            </div>
            
            {/* Imagem com lazy loading e tratamento de erro */}
            <img
                src={camera.url}
                alt={camera.lugar || "Imagem da câmera"} // Texto alternativo
                className="w-full h-auto object-cover rounded cursor-pointer max-h-[210px]" // Limita a altura máxima para 100px
                onClick={() => onImageClick(camera.url)}
                onError={handleError} // Fallback no erro de carregamento
                loading="lazy" // Carregamento preguiçoso para melhorar a performance
                aria-label={`Clique para visualizar a câmera em ${camera.lugar || "local desconhecido"}`}
            />
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
