import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { FaTimes, FaSync, FaChevronLeft, FaChevronRight, FaInfoCircle, FaShare } from 'react-icons/fa';
import "../assets/FullScreenImage.css";
import { useUpdate } from "../context/UpdateContext";
import { CameraDetails } from "./CameraDetails";
import { useCameraFrame } from "../hooks/useCameraFrame";

// URLs de fallback
const LOADING_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23000000' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ffffff' font-family='system-ui' font-size='18'%3ECarregando...%3C/text%3E%3C/svg%3E";
const ERROR_IMAGE_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='%23000000' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ef4444' font-family='system-ui' font-size='18'%3EErro ao carregar imagem%3C/text%3E%3C/svg%3E";

function FullScreenImage({ imageUrl, close, title, onPreviousCamera, onNextCamera, hasPrevious, hasNext, cameraData, cameraId }) {
    // Estados
    const [showDetails, setShowDetails] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false); // Feedback de link copiado
    const { src, isLoading, error, refresh: handleRefresh } = useCameraFrame(imageUrl);
    const currentImageUrl = src || (error ? ERROR_IMAGE_URL : LOADING_PLACEHOLDER);

    // Refs
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const { setIsPaused } = useUpdate(); // Get pause control from context
    
    // Pause other camera updates when fullscreen opens, resume when it closes
    useEffect(() => {
        setIsPaused(true); // Pause all other cameras when fullscreen opens
        
        return () => {
            setIsPaused(false); // Resume updates when fullscreen closes
        };
    }, [setIsPaused]);
    
    const toggleDetails = useCallback(() => {
        setShowDetails(prev => !prev);
    }, []);

    const handleShare = useCallback(async () => {
        if (!cameraId) return;
        
        // Usa a URL atual da página como base
        const currentUrl = window.location.origin + window.location.pathname.split('/camera/')[0] + `/camera/${cameraId}`;
        
        // Tenta usar a Web Share API se disponível
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || 'Câmera de Santos',
                    text: `Veja esta câmera ao vivo: ${title || 'Câmera de Santos'}`,
                    url: currentUrl
                });
            } catch (err) {
                // Se o usuário cancelar ou houver erro, copia para clipboard
                if (err.name !== 'AbortError') {
                    await navigator.clipboard.writeText(currentUrl);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                }
            }
        } else {
            // Fallback: copia para clipboard
            try {
                await navigator.clipboard.writeText(currentUrl);
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
            } catch (err) {
                console.error('Erro ao copiar link:', err);
            }
        }
    }, [cameraId, title]);
    
    // Funções de toque para navegação em dispositivos móveis
    const handleTouchStart = useCallback((e) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);
    
    const handleTouchMove = useCallback((e) => {
        touchEndX.current = e.touches[0].clientX;
    }, []);
    
    const handleTouchEnd = useCallback(() => {
        if (!touchStartX.current || !touchEndX.current) return;
        
        const difference = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;
        
        if (difference > minSwipeDistance && hasNext) {
            onNextCamera();
        } else if (difference < -minSwipeDistance && hasPrevious) {
            onPreviousCamera();
        }
        
        touchStartX.current = null;
        touchEndX.current = null;
    }, [hasPrevious, hasNext, onNextCamera, onPreviousCamera]);
    
    // Componentes UI
    const renderNavigationButtons = () => (
        <>
            {hasPrevious && (
                <button
                    onClick={onPreviousCamera}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-6 rounded-full bg-black/90 hover:bg-gray-900 transition-colors duration-200 flex flex-col items-center gap-1 md:gap-2 group z-[10000]"
                    title="Câmera anterior"
                >
                    <FaChevronLeft className="text-white text-xl md:text-3xl group-hover:text-gray-300" />
                    <span className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400 hidden md:block">Anterior</span>
                </button>
            )}

            {hasNext && (
                <button
                    onClick={onNextCamera}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-6 rounded-full bg-black/90 hover:bg-gray-900 transition-colors duration-200 flex flex-col items-center gap-1 md:gap-2 group z-[10000]"
                    title="Próxima câmera"
                >
                    <FaChevronRight className="text-white text-xl md:text-3xl group-hover:text-gray-300" />
                    <span className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400 hidden md:block">Próxima</span>
                </button>
            )}
        </>
    );
    
    const renderBottomMenu = () => (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-1 md:p-2 z-[10000]">
            <div className="bg-black/90 rounded-lg shadow-xl p-1 md:p-2 flex flex-row gap-1 overflow-x-auto max-w-full">
                <ActionButton
                    onClick={handleRefresh}
                    title="Atualizar imagem"
                    icon={<FaSync className={`text-white text-lg md:text-xl group-hover:text-gray-300 ${isLoading ? 'animate-spin' : ''}`} />}
                    label="Atualizar"
                    disabled={isLoading}
                />

                {cameraId && (
                    <ActionButton
                        onClick={handleShare}
                        title={linkCopied ? "Link copiado!" : "Compartilhar câmera"}
                        icon={<FaShare className="text-white text-lg md:text-xl group-hover:text-gray-300" />}
                        label={linkCopied ? "Copiado!" : "Compartilhar"}
                        active={linkCopied}
                    />
                )}

                <ActionButton
                    onClick={toggleDetails}
                    title="Ver informações da câmera"
                    icon={<FaInfoCircle className="text-white text-lg md:text-xl group-hover:text-gray-300" />}
                    label="Info"
                    active={showDetails}
                />

                <ActionButton
                    onClick={close}
                    title="Fechar"
                    icon={<FaTimes className="text-white text-lg md:text-xl group-hover:text-gray-300" />}
                    label="Fechar"
                />
            </div>
        </div>
    );
    
    // Componente botão de ação reutilizável
    const ActionButton = ({ onClick, title, icon, label, disabled, active }) => (
        <button
            onClick={onClick}
            className={`p-1 md:p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors duration-200 flex flex-row items-center gap-1 md:gap-2 group
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${active ? 'bg-gray-800' : ''}`}
            title={title}
            disabled={disabled}
        >
            {icon}
            <span className="text-xs text-gray-500 group-hover:text-gray-400">{label}</span>
        </button>
    );
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-[9999]">
            <div 
                className="relative w-full h-full flex items-center justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {renderNavigationButtons()}

                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10001]">
                        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}
                
                {error && !src && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10001]">
                        <div className="text-red-500 text-center p-4">
                            <p>Erro ao carregar a imagem</p>
                            <button
                                onClick={handleRefresh}
                                className="mt-2 px-3 py-1 md:px-4 md:py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    </div>
                )}
                
                {error && src && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-3 py-1 rounded-full z-[10001]">
                        Sem sinal — exibindo a última imagem recebida
                    </div>
                )}

                <img
                    src={currentImageUrl}
                    alt={title || "Imagem em tela cheia"}
                    className="w-full h-full object-contain"
                />

                {/* Indicador de navegação por toque - apenas em dispositivos móveis */}
                <div className="absolute bottom-24 left-0 right-0 flex justify-center pointer-events-none md:hidden">
                    <div className="bg-black/50 text-white text-xs py-1 px-3 rounded-full">
                        Deslize para navegar entre câmeras
                    </div>
                </div>
            </div>

            {/* Título */}
            {title && (
                <div className="absolute top-0 left-0 right-0 p-2 md:p-4 z-[10000] bg-gradient-to-b from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <h1 className="text-white text-lg md:text-xl font-medium text-center">
                            {title}
                        </h1>
                    </div>
                </div>
            )}

            {renderBottomMenu()}
            
            {/* Camera Details Modal */}
            {showDetails && cameraData && (
                <CameraDetails
                    cameraData={cameraData}
                    imageUrl={imageUrl}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}

FullScreenImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string,
    onPreviousCamera: PropTypes.func,
    onNextCamera: PropTypes.func,
    hasPrevious: PropTypes.bool,
    hasNext: PropTypes.bool,
    cameraData: PropTypes.object,
    cameraId: PropTypes.string
};

export default FullScreenImage;