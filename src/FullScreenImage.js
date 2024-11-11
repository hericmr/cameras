import React from 'react';

function FullScreenImage({ imageUrl, close }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt="Imagem em tela cheia"
                    className="max-w-full max-h-full object-contain"
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
