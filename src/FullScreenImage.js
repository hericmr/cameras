import React, { useEffect, useState } from "react";
import "./FullScreenImage.css";

function FullScreenImage({ imageUrl, close }) {
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

    useEffect(() => {
        let animationFrameId;
        let lastUpdate = Date.now();

        const updateImage = () => {
            const now = Date.now();
            if (now - lastUpdate >= 2000) {
                setCurrentImageUrl(`${imageUrl}&t=${new Date().getTime()}`);
                lastUpdate = now;
            }
            animationFrameId = requestAnimationFrame(updateImage);
        };

        updateImage();

        return () => cancelAnimationFrame(animationFrameId);
    }, [imageUrl]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-90">
            <div className="relative w-full h-full">
                <img
                    src={currentImageUrl}
                    alt="Imagem em tela cheia"
                    className="w-full h-full object-contain transition-all"
                />
            </div>
            <div className="absolute top-4 right-4 z-50 button-top">
                <button
                    onClick={close}
                    className="bg-red-700 text-white text-sm p-2 rounded-full shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    <span className="font-semibold">X</span>
                </button>
            </div>
        </div>
    );
}

export default FullScreenImage;
