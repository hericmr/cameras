// App.js
import React, { useState, useEffect } from 'react';
import FullScreenImage from './FullScreenImage.js';
import Title from './Title.js'; // Importe o componente Title

const cameras = {
  "0": {"lugar": "Canal 6", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1593/snap_c1.jpg?1677157043869"},
  "1": {"lugar": "Canoagem", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1464/snap_c1.jpg?1677191520757"},
  "3": {"lugar": "Travessia da balsa", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1455/snap_c1.jpg?1677248602110"},
  "4": {"lugar": "Epitacio Pessoa com Oswaldo Chocrane", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1584/snap_c1.jpg?1677311079649"},
  "5": {"lugar": "C4", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1578/snap_c1.jpg?1677311184499"},
  "6": {"lugar": "CPE", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1561/snap_c1.jpg?1677311246793"},
  "7": {"lugar": "Canal 4", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1591/snap_c1.jpg?1677311286046"},
  "8": {"lugar": "Fonte do Sapo", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1517/snap_c1.jpg?1687433186816"},
  "9": {"lugar": "Aquário", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0451/snap_c1.jpg?1731350523630"},
  "10": {"lugar": "Ferry Boat Saldanha da Gama", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0380/snap_c1.jpg?1731350610657"},
  "11": {"lugar": "Washington Luís - Comporta 10", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0773/snap_c1.jpg?1731350669763"},
  "12": {"lugar": "Aquário 2", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0432/snap_c1.jpg?1731350713272"},
  "13": {"lugar": "Quebra Mar", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1833/snap_c1.jpg?1731350760546"},
  "16": {"lugar": "Quebra mar 2", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1819/snap_c1.jpg?1731350860837"},
  "18": {"lugar": "Câmera 1846", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1846/snap_c1.jpg?1731350899117"},
  "19": {"lugar": "Câmera 0436", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0436/snap_c1.jpg?1731351036758"},
  "20": {"lugar": "Acesso a Praia Canal 1", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0416/snap_c1.jpg?1731353613270"},
  "21": {"lugar": "Praça das Bandeiras", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0443/snap_c1.jpg?1731353706967"}
  "22": {"lugar": "Canal 4", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1529/snap_c1.jpg?1731367713141"},
};

function App() {
  const [cameraUrls, setCameraUrls] = useState(Object.values(cameras));
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const updateImages = () => {
      const updatedCameras = Object.keys(cameras).map(key => ({
        ...cameras[key],
        url: `${cameras[key].url}&t=${new Date().getTime()}` // Atualiza a URL com timestamp para evitar cache
      }));
      setCameraUrls(updatedCameras);
    };

    const interval = setInterval(updateImages, 3000); // Atualiza a cada 3 segundos
    updateImages(); // Atualiza uma vez antes de iniciar o intervalo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  const handleImageClick = (url) => {
    setCurrentImage(url);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    setCurrentImage(null);
  };

  // Função para gerenciar erros de carregamento de imagem e aplicar fallback
  const handleImageError = (index) => {
    setCameraUrls(prevUrls =>
      prevUrls.map((camera, i) =>
        i === index ? { ...camera, url: "/path/to/fallback-image.jpg" } : camera
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 p-0 flex flex-col items-center justify-center">
      <Title /> {/* Usando o componente Title */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
        {cameraUrls.map((camera, index) => (
          <div key={index} className="relative">
            <img
              src={camera.url}
              alt={camera.lugar}
              className="w-full h-auto object-cover rounded-none cursor-pointer"
              onClick={() => handleImageClick(camera.url)}
              onError={() => handleImageError(index)} // Aplica fallback em caso de erro
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-10 bg-black text-white p-2 text-sm text-center">
              {camera.lugar}
            </div>
          </div>
        ))}
      </div>

      {isFullScreen && <FullScreenImage imageUrl={currentImage} close={closeFullScreen} />}
    </div>
  );
}

export default App;