import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { CameraCard } from "./";
import cameras from "../assets/cameras_detailed.json";

// Memoize the CameraCard component to prevent unnecessary re-renders
const MemoizedCameraCard = React.memo(CameraCard);

function CameraGrid({ onImageClick, onCameraCountChange, filteredNeighborhoods = [], sortBy = 'none' }) {
    const allCameras = useMemo(() => Object.values(cameras), []);

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

    // Notifica o componente pai sobre a mudança na contagem
    useEffect(() => {
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
            {filteredAndSortedCameras.map((camera) => {
                // Índice no array completo, para abrir a câmera certa mesmo com filtros/ordenação
                const originalIndex = allCameras.findIndex(c => c.id === camera.id);
                return (
                    <MemoizedCameraCard
                        key={camera.id}
                        camera={camera}
                        onImageClick={onImageClick}
                        index={originalIndex}
                    />
                );
            })}
        </div>
    ), [filteredAndSortedCameras, onImageClick, allCameras]);

    return (
        <>
            {filteredAndSortedCameras.length === 0 ? (
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