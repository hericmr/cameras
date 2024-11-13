import React, { useEffect, useState } from 'react';

function FullScreenImage({ imageUrl, close }) {
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

    useEffect(() => {
        // Função para atualizar a URL da imagem com um timestamp
        const updateImage = () => {
            setCurrentImageUrl(`${imageUrl}&t=${new Date().getTime()}`);
        };

        // Atualiza a imagem a cada 3 segundos
        const interval = setInterval(updateImage, 10);
        updateImage(); // Chama a função de atualização imediatamente ao montar o componente

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
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
