import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaSync, FaMoon, FaExpand, FaInfoCircle } from 'react-icons/fa';
import { Camera, CameraClickData } from '../../types';
import { cameraService } from '../../services/cameraService';
import './CameraCard.css';

interface CameraCardProps {
    camera: Camera;
    index: number;
    onImageClick: (data: CameraClickData, index: number) => void;
}

const FALLBACK_IMAGE_URL = "https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true";

export const CameraCard: React.FC<CameraCardProps> = ({ camera, onImageClick, index }) => {
    const [imageSrc, setImageSrc] = useState(camera.url);
    const [prevImageSrc, setPrevImageSrc] = useState(camera.url);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNightVision, setIsNightVision] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const MAX_RETRIES = 150;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleError = () => {
        if (retryCount < MAX_RETRIES) {
            setRetryCount(retryCount + 1);
            setImageSrc(cameraService.updateCameraUrl(camera.url));
        } else {
            setImageSrc(FALLBACK_IMAGE_URL);
        }
    };

    const refreshImage = () => {
        setIsLoading(true);
        setRetryCount(0);
        setImageSrc(cameraService.updateCameraUrl(camera.url));
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleFullscreen = () => {
        setIsFullscreen(true);
        onImageClick({ url: camera.url, title: camera.lugar }, index);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRetryCount(0);
            setPrevImageSrc(imageSrc);
            setIsTransitioning(true);
            setImageSrc(cameraService.updateCameraUrl(camera.url));
            
            setTimeout(() => {
                setIsTransitioning(false);
            }, 1000);
        }, 4000);

        return () => clearInterval(interval);
    }, [camera.url, imageSrc]);

    return (
        <div className={`relative border border-gray-800 shadow-lg rounded-lg overflow-hidden bg-gray-900 ${isFullscreen ? 'hidden' : ''}`}>
            {/* Status Badges */}
            <div className="absolute top-2 left-2 z-10 flex gap-2">
                {camera.lugar === "quebrada" && (
                    <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                        Câmera Quebrada
                    </div>
                )}
                {isLoading && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <FaSync className="animate-spin" /> Atualizando
                    </div>
                )}
            </div>

            {/* Menu Button */}
            <div className="absolute top-2 right-2 z-10" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Opções da câmera"
                >
                    <FaEllipsisV className="text-white" />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1 z-20">
                        <button
                            onClick={() => {
                                refreshImage();
                                setIsMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                        >
                            <FaSync className={isLoading ? "animate-spin" : ""} />
                            Atualizar Imagem
                        </button>
                        <button
                            onClick={() => {
                                setIsNightVision(!isNightVision);
                                setIsMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                        >
                            <FaMoon />
                            {isNightVision ? "Desativar" : "Ativar"} Visão Noturna
                        </button>
                        <button
                            onClick={handleFullscreen}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                        >
                            <FaExpand />
                            Tela Cheia
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                        >
                            <FaInfoCircle />
                            Informações
                        </button>
                    </div>
                )}
            </div>

            {/* Imagem com fallback e retentativa */}
            <div className="w-full h-[300px] bg-gray-900 flex items-center justify-center overflow-hidden relative">
                {isFullscreen && (
                    <img
                        src={prevImageSrc}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover ${
                            isTransitioning ? 'opacity-0' : 'opacity-100'
                        } transition-opacity duration-1000 ${
                            isNightVision ? "night-vision" : ""
                        }`}
                    />
                )}
                <img
                    src={imageSrc}
                    alt={camera.lugar || "Imagem da câmera"}
                    className={`w-full h-full object-cover cursor-pointer ${
                        isFullscreen ? 'absolute inset-0' : ''
                    } ${isTransitioning ? 'opacity-100' : 'opacity-100'} transition-opacity duration-1000 ${
                        isNightVision ? "night-vision" : ""
                    }`}
                    onClick={() => onImageClick({ url: camera.url, title: camera.lugar }, index)}
                    onError={handleError}
                    loading="lazy"
                    aria-label={`Clique para visualizar a câmera em ${camera.lugar || "local desconhecido"}`}
                />
                {imageSrc === FALLBACK_IMAGE_URL && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <span className="text-gray-400 text-sm">Imagem indisponível</span>
                    </div>
                )}
            </div>

            {/* Informações abaixo da imagem */}
            <div className="p-2 bg-gray-800 text-gray-300 text-xs text-center border-t border-gray-700">
                {camera.lugar || "Local Desconhecido"}
            </div>
        </div>
    );
}; 