import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { CameraCard } from "./";
import cameras from "../assets/cameras_detailed.json";
import { useUpdate } from "../context/UpdateContext"; // Importa o contexto de pausa

// Memoize the CameraCard component to prevent unnecessary re-renders
const MemoizedCameraCard = React.memo(CameraCard);

function CameraGrid({ onImageClick, updateInterval = 6000, onCameraCountChange, filteredNeighborhoods = [], sortBy = 'none' }) {
    const allCameras = useMemo(() => Object.values(cameras), []);
    const [cameraUrls, setCameraUrls] = useState(allCameras);
    const intervalRef = useRef(null);
    const { isPaused } = useUpdate(); // Obtém o estado global de pausa
    const timestampRef = useRef(Date.now());

    // Filtra e ordena câmeras baseado nos filtros selecionados
    const filteredAndSortedCameras = useMemo(() => {
        let filtered = allCameras;

        // Aplica filtro de bairros
        if (filteredNeighborhoods.length > 0) {
            filtered = filtered.filter(camera =>
                camera.neighborhood && filteredNeighborhoods.includes(camera.neighborhood.trim())
            );
        }

        // Aplica ordenação
        if (sortBy === 'neighborhood') {
            filtered = [...filtered].sort((a, b) => {
                const neighborhoodA = (a.neighborhood || '').trim();
                const neighborhoodB = (b.neighborhood || '').trim();
                if (neighborhoodA === neighborhoodB) {
                    // Se mesmo bairro, ordena por rua
                    const streetA = (a.street || '').trim();
                    const streetB = (b.street || '').trim();
                    return streetA.localeCompare(streetB, 'pt-BR');
                }
                return neighborhoodA.localeCompare(neighborhoodB, 'pt-BR');
            });
        }

        return filtered;
    }, [allCameras, filteredNeighborhoods, sortBy]);

    // Função auxiliar para extrair a URL base (sem query parameters)
    const getBaseUrl = useCallback((url) => {
        // Remove qualquer query string existente (incluindo ?t=, &t=, etc)
        return url.split('?')[0];
    }, []);

    // Memoize the update function to prevent recreation on every render
    const updateImages = useCallback(() => {
        if (isPaused) return; // Pausa as atualizações se o modal estiver aberto
        
        timestampRef.current = Date.now();
        setCameraUrls((prevCameraUrls) =>
            prevCameraUrls.map((camera) => {
                const baseUrl = getBaseUrl(camera.url);
                return {
                    ...camera,
                    url: `${baseUrl}?t=${timestampRef.current}`,
                };
            })
        );
    }, [isPaused, getBaseUrl]);

    // Atualiza as URLs das câmeras filtradas quando os filtros mudam
    useEffect(() => {
        setCameraUrls(filteredAndSortedCameras);
        // Notifica o componente pai sobre a mudança na contagem
        if (onCameraCountChange) {
            // Se não há filtros, passa null para mostrar o total
            if (filteredNeighborhoods.length === 0 && sortBy === 'none') {
                onCameraCountChange(null);
            } else {
                onCameraCountChange(filteredAndSortedCameras.length);
            }
        }
    }, [filteredAndSortedCameras, filteredNeighborhoods, sortBy, onCameraCountChange]);

    // Memoize the camera grid to prevent unnecessary re-renders
    const cameraGrid = useMemo(() => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {cameraUrls.map((camera, index) => {
                // Encontra o índice original no array completo para navegação correta
                const originalIndex = allCameras.findIndex(c => c.url === camera.url);
                return (
                    <MemoizedCameraCard
                        key={camera.url}
                        camera={camera}
                        onImageClick={(data) => onImageClick(data, originalIndex >= 0 ? originalIndex : index)}
                        index={originalIndex >= 0 ? originalIndex : index}
                    />
                );
            })}
        </div>
    ), [cameraUrls, onImageClick, allCameras]);

    useEffect(() => {
        // Initial update
        updateImages();

        // Setup interval
        intervalRef.current = setInterval(updateImages, updateInterval);

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [updateImages, updateInterval]);

    return (
        <>
            {cameraUrls.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <p className="text-lg">Nenhuma câmera encontrada com os filtros selecionados.</p>
                    <p className="text-sm mt-2">Tente selecionar outros bairros ou limpar os filtros.</p>
                </div>
            ) : (
                cameraGrid
            )}
        </>
    );
}

CameraGrid.propTypes = {
    onImageClick: PropTypes.func.isRequired,
    updateInterval: PropTypes.number,
    onCameraCountChange: PropTypes.func,
    filteredNeighborhoods: PropTypes.array,
    sortBy: PropTypes.string,
};

// Função helper para filtrar e ordenar (será usado pelo App)
export function useCameraFiltering(cameras, filteredNeighborhoods, sortBy) {
    return useMemo(() => {
        let filtered = cameras;

        // Aplica filtro de bairros
        if (filteredNeighborhoods.length > 0) {
            filtered = filtered.filter(camera =>
                camera.neighborhood && filteredNeighborhoods.includes(camera.neighborhood.trim())
            );
        }

        // Aplica ordenação
        if (sortBy === 'neighborhood') {
            filtered = [...filtered].sort((a, b) => {
                const neighborhoodA = (a.neighborhood || '').trim();
                const neighborhoodB = (b.neighborhood || '').trim();
                if (neighborhoodA === neighborhoodB) {
                    const streetA = (a.street || '').trim();
                    const streetB = (b.street || '').trim();
                    return streetA.localeCompare(streetB, 'pt-BR');
                }
                return neighborhoodA.localeCompare(neighborhoodB, 'pt-BR');
            });
        }

        return filtered;
    }, [cameras, filteredNeighborhoods, sortBy]);
}

export default React.memo(CameraGrid);