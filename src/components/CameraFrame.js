import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Exibe o elemento <img> já carregado pelo useCameraFrame, sem um novo pedido ao servidor.
// Enquanto não há quadro, mostra a imagem de fallback (carregando/erro).
function CameraFrame({ frame, fallbackSrc, alt, className, onClick }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!frame || !containerRef.current) return;
    frame.alt = alt;
    frame.className = className;
    frame.draggable = false;
    containerRef.current.replaceChildren(frame);
  }, [frame, alt, className]);

  if (!frame) {
    return <img src={fallbackSrc} alt={alt} className={className} onClick={onClick} />;
  }

  return <div ref={containerRef} className="contents" onClick={onClick} />;
}

CameraFrame.propTypes = {
  frame: PropTypes.instanceOf(typeof HTMLImageElement === "undefined" ? Object : HTMLImageElement),
  fallbackSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default CameraFrame;
