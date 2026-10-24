import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaEllipsisV, FaSync, FaMoon, FaExpand, FaInfoCircle, FaMapMarkerAlt, FaRoad } from 'react-icons/fa';
import { useUpdate } from "../context/UpdateContext";
import { useCameraFrame } from "../hooks/useCameraFrame";

// URLs de fallback
const LOADING_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231f2937' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui' font-size='14'%3ECarregando...%3C/text%3E%3C/svg%3E";
const ERROR_IMAGE_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231f2937' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ef4444' font-family='system-ui' font-size='14'%3EImagem indisponível%3C/text%3E%3C/svg%3E";

function CameraCard({ camera, onImageClick, index }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const menuRef = useRef(null);
  const cardRef = useRef(null); // Ref for Intersection Observer
  const { isPaused } = useUpdate(); // Get pause state from context

  // Só busca quadros enquanto o card está visível e a tela cheia não está aberta
  const { src, isLoading, error, refresh } = useCameraFrame(camera.url, {
    enabled: isVisible && !isPaused,
  });
  const imageSrc = src || (error ? ERROR_IMAGE_URL : LOADING_PLACEHOLDER);

  // Intersection Observer para detectar quando o card está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        rootMargin: '50px', // Começa a carregar 50px antes de entrar na viewport
        threshold: 0.01, // Dispara quando pelo menos 1% está visível
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openCamera = () => {
    onImageClick({ url: camera.url, title: camera.neighborhood || camera.street || camera.camera_number || "Câmera" }, index);
  };

  const handleFullscreen = () => {
    openCamera();
    setIsMenuOpen(false);
  };

  return (
    <div ref={cardRef} className="relative border border-gray-800 shadow-lg rounded-lg overflow-hidden bg-gray-900">
      {/* Status Badges */}
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        {camera.status && camera.status !== "Em Funcionamento" && (
          <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
            Câmera com Problemas
          </div>
        )}
        {error && src && (
          <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            Sem sinal
          </div>
        )}
        {isLoading && src && (
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

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-1 z-20">
            <button
              onClick={() => {
                refresh();
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
              onClick={() => {
                // Implementar informações detalhadas
                setIsMenuOpen(false);
              }}
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
        <img
          src={imageSrc}
          alt={camera.neighborhood || camera.street || "Imagem da câmera"}
          className={`w-full h-full object-cover cursor-pointer ${
            isNightVision ? "night-vision" : ""
          }`}
          onClick={openCamera}
          aria-label={`Clique para visualizar a câmera ${camera.camera_number || "desconhecida"}`}
        />
      </div>

      {/* Informações abaixo da imagem */}
      <div className="p-3 bg-gray-800 text-gray-300 border-t border-gray-700">
        {/* Detailed Information */}
        {camera.neighborhood && (
          <div className="text-sm font-semibold text-white mb-1 text-center flex items-center justify-center gap-1">
            <FaMapMarkerAlt className="text-blue-400" />
            {camera.neighborhood}
          </div>
        )}
        
        {camera.street && (
          <div className="text-xs text-gray-400 mb-1 text-center truncate flex items-center justify-center gap-1" title={camera.street}>
            <FaRoad className="text-gray-500" />
            {camera.street}
            {camera.intersection && ` × ${camera.intersection}`}
          </div>
        )}
        
      </div>
    </div>
  );
}

CameraCard.propTypes = {
  camera: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string.isRequired,
    camera_number: PropTypes.string,
    neighborhood: PropTypes.string,
    street: PropTypes.string,
    intersection: PropTypes.string,
    camera_type: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default CameraCard;
