import React, { useState } from 'react';

function CameraCard({ camera, onImageClick }) {
    const [imageUrl, setImageUrl] = useState(camera.url);
    const fallbackImageUrl = "URL_DE_FALLBACK";  // Substitua com o caminho para uma imagem padrão

    const handleImageError = () => {
        setImageUrl(fallbackImageUrl);  // Use uma imagem padrão se o carregamento falhar
    };

    const handleImageLoad = () => {
        // Imagem carregada com sucesso, você pode adicionar alguma lógica, se necessário
    };

    return (
        <div className="relative">
            <img
                src={imageUrl}
                alt={camera.lugar}
                className="w-full h-auto object-cover rounded-none cursor-pointer"
                onClick={() => onImageClick(camera.url)}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"  // Habilita o lazy loading
            />
            {/* Removido o nome da câmera */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-opacity-10 bg-black text-white p-2 text-sm text-center">
                {camera.lugar}
            </div> */}
        </div>
    );
}

export default CameraCard;
