// CameraCard.js
import React, { useState } from 'react';

function CameraCard({ camera, onImageClick }) {
    const [previousImages, setPreviousImages] = useState({});
    
    const handleImageError = () => {
        setPreviousImages(prev => ({
            ...prev,
            url: previousImages.url || camera.url,
        }));
    };

    const handleImageLoad = () => {
        setPreviousImages(prev => ({
            ...prev,
            url: camera.url,
        }));
    };

    return (
        <div className="relative">
            <img
                src={camera.url}
                alt={camera.lugar}
                className="w-full h-auto object-cover rounded-none cursor-pointer"
                onClick={() => onImageClick(camera.url)}
                onError={handleImageError}
                onLoad={handleImageLoad}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-10 bg-black text-white p-2 text-sm text-center">
                {camera.lugar}
            </div>
        </div>
    );
}

export default CameraCard;
