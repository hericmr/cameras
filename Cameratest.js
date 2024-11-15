import React, { useEffect, useState } from 'react';

function FullScreenImage({ close }) {
    const urls = [
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681035",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681036",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681037",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681038",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681040",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681041",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681042",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681043",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681044",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681045",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681046",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681047",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681048",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681049",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681050",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681051",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681052",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681053",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681054",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681055",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681056",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681057",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681058",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681059",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681060",
        "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681061"
    ];

    const [currentImageUrl, setCurrentImageUrl] = useState(urls[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Função para atualizar a URL da imagem alternando entre URLs
        const updateImage = () => {
            setIndex((prevIndex) => (prevIndex + 1) % urls.length);
            setCurrentImageUrl(urls[index]);
        };

        const interval = setInterval(updateImage, 5); // Atualiza a imagem a cada 50ms

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [urls, index]);

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
