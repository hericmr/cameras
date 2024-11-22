import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import CameraCard from "./CameraCard";
import cameras from "./cameras.json";
import { useUpdate } from "./UpdateContext"; // Importa o contexto de pausa

function CameraGrid({ onImageClick, updateInterval = 2000 }) {
    const [cameraUrls, setCameraUrls] = useState(Object.values(cameras));
    const intervalRef = useRef(null);
    const { isPaused } = useUpdate(); // Obtém o estado global de pausa

    // Atualiza URLs das imagens com timestamp
    const updateImages = useCallback(() => {
        if (isPaused) return; // Pausa as atualizações se o modal estiver aberto
        setCameraUrls((prevCameraUrls) =>
            prevCameraUrls.map((camera) => ({
                ...camera,
                url: `${camera.url.split("&t=")[0]}&t=${new Date().getTime()}`,
            }))
        );
    }, [isPaused]);

    useEffect(() => {
        updateImages();

        // Configura o intervalo de atualização
        intervalRef.current = setInterval(updateImages, updateInterval);

        return () => clearInterval(intervalRef.current); // Limpa o intervalo ao desmontar
    }, [updateImages, updateInterval]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {cameraUrls.map((camera, index) => (
                <CameraCard
                    key={index}
                    camera={camera}
                    index={index}
                    onImageClick={onImageClick}
                />
            ))}
        </div>
    );
}

CameraGrid.propTypes = {
    onImageClick: PropTypes.func.isRequired,
    updateInterval: PropTypes.number,
};

export default CameraGrid;
