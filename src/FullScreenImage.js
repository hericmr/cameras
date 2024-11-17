import React, { useEffect, useState } from 'react';

function FullScreenImage({ imageUrl, close }) {
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

    useEffect(() => {
        let animationFrameId;
        let lastUpdate = Date.now();

        const updateImage = () => {
            const now = Date.now();
            if (now - lastUpdate >= 200) { // Atualiza a cada 100ms
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
                    className="w-full h-full object-contain"
                />
                <button
                    onClick={close}
                    className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full"
                >
                    X
                </button>
            </div>
        </div>
    );
}

export default FullScreenImage;
