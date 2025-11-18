import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaEllipsisV, FaSync, FaMoon, FaExpand, FaInfoCircle, FaMapMarkerAlt, FaRoad } from 'react-icons/fa';
import { useUpdate } from "../context/UpdateContext";

// URLs de fallback
const FALLBACK_IMAGE_URL =
  "https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true";
const LOADING_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231f2937' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui' font-size='14'%3ECarregando...%3C/text%3E%3C/svg%3E";
const ERROR_IMAGE_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%231f2937' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ef4444' font-family='system-ui' font-size='14'%3EImagem indisponível%3C/text%3E%3C/svg%3E";

function CameraCard({ camera, onImageClick, index }) {
  const [imageSrc, setImageSrc] = useState(LOADING_PLACEHOLDER); // Começa com placeholder de loading (igual ao site oficial)
  const [prevImageSrc, setPrevImageSrc] = useState(null); // Para crossfade
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Track visibility
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // Flag para primeira carga (igual ao site oficial: carregou)
  const menuRef = useRef(null);
  const cardRef = useRef(null); // Ref for Intersection Observer
  const imageLoadedRef = useRef(false); // Track if image has been loaded initially
  const MAX_RETRIES = 150; // Número máximo de tentativas
  const { isPaused } = useUpdate(); // Get pause state from context

  // Intersection Observer para detectar quando o card está visível
  useEffect(() => {
    // Don't observe if updates are paused (fullscreen is open)
    if (isPaused) {
      setIsVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPaused) {
            setIsVisible(true);
            // Inicia o carregamento da imagem quando visível (apenas uma vez)
            if (!imageLoadedRef.current) {
              imageLoadedRef.current = true;
              // Primeira carga: define a URL da câmera (igual ao site oficial quando carregou = false)
              setImageSrc(camera.url);
              setPrevImageSrc(camera.url);
              setHasLoadedOnce(false); // Ainda não carregou completamente
            }
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: '50px', // Começa a carregar 50px antes de entrar na viewport
        threshold: 0.01, // Dispara quando pelo menos 1% está visível
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [camera.url, isPaused]); // Include isPaused in dependencies

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

  // Função auxiliar para extrair a URL base (sem query parameters)
  const getBaseUrl = (url) => {
    return url.split('?')[0];
  };

  // Função para lidar com erros ao carregar a imagem (igual ao site oficial)
  const handleError = (e) => {
    // Previne loop infinito de erros (igual ao site oficial: this.onerror=null)
    if (e.target) {
      e.target.onerror = null;
      // Define imagem de erro padrão (igual ao site oficial: erro_camera.png)
      e.target.src = ERROR_IMAGE_URL;
    }
    
    if (retryCount < MAX_RETRIES) {
      // Tenta recarregar a imagem até o limite de tentativas
      setRetryCount(retryCount + 1);
      const baseUrl = getBaseUrl(camera.url);
      const d = new Date();
      setImageSrc(`${baseUrl}?retry=${d.getTime()}`);
    } else {
      // Usa a imagem de erro após atingir o limite de tentativas
      setImageSrc(ERROR_IMAGE_URL);
    }
  };

  const refreshImage = () => {
    setIsLoading(true);
    setRetryCount(0);
    const baseUrl = getBaseUrl(camera.url);
    const d = new Date();
    setImageSrc(`${baseUrl}?t=${d.getTime()}`);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
    onImageClick({ url: camera.url, title: camera.neighborhood || camera.street || camera.camera_number || "Câmera" }, index);
    setIsMenuOpen(false);
  };

  // Handler para quando a imagem carrega com sucesso
  const handleImageLoad = () => {
    if (!hasLoadedOnce) {
      setHasLoadedOnce(true); // Marca que já carregou (igual ao site oficial: carregou = true)
    }
    setIsLoading(false);
  };

  // Atualiza a imagem a cada 6 segundos com crossfade (igual ao site oficial), apenas se visível e não pausado
  useEffect(() => {
    if (!isVisible || !imageSrc || isPaused) return; // Não atualiza se não estiver visível, imagem não carregada, ou pausado
    if (!hasLoadedOnce) return; // Não atualiza até a primeira carga completar (igual ao site oficial)

    const interval = setInterval(() => {
      setRetryCount(0);
      setPrevImageSrc(imageSrc);
      setIsTransitioning(true);
      const baseUrl = getBaseUrl(camera.url);
      const d = new Date();
      // Apenas atualiza o timestamp (igual ao site oficial quando carregou = true)
      const newImageSrc = `${baseUrl}?t=${d.getTime()}`;
      setImageSrc(newImageSrc);
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 6000); // 6 segundos como no site oficial

    return () => clearInterval(interval);
  }, [camera.url, imageSrc, isVisible, isPaused, hasLoadedOnce, getBaseUrl]);

  return (
    <div ref={cardRef} className={`relative border border-gray-800 shadow-lg rounded-lg overflow-hidden bg-gray-900 ${isFullscreen ? 'hidden' : ''}`}>
      {/* Status Badges */}
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        {camera.status && camera.status !== "Em Funcionamento" && (
          <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
            Câmera com Problemas
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

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-1 z-20">
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
        {/* Imagem anterior para crossfade */}
        {isFullscreen && prevImageSrc && (
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
        {/* Imagem atual - sempre renderiza (igual ao site oficial) */}
        <img
          src={imageSrc}
          alt={camera.neighborhood || camera.street || "Imagem da câmera"}
          className={`w-full h-full object-cover cursor-pointer ${
            isFullscreen ? 'absolute inset-0' : ''
          } ${isTransitioning ? 'opacity-100' : 'opacity-100'} transition-opacity duration-1000 ${
            isNightVision ? "night-vision" : ""
          }`}
          onClick={() => onImageClick({ url: camera.url, title: camera.neighborhood || camera.street || camera.camera_number || "Câmera" }, index)}
          onError={handleError}
          onLoad={handleImageLoad}
          loading="lazy"
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
