// CameraGrid.js
import React, { useEffect, useState } from 'react';
import CameraCard from './CameraCard';

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
    "21": {"lugar": "Praça das Bandeiras", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0443/snap_c1.jpg?1731353706967"},
    "22": {"lugar": "Canal 4", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1529/snap_c1.jpg?1731367713141"},
    "23": {"lugar": "Câmera 1528", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1743/snap_c1.jpg?1731372528173"},
    "24": {"lugar": "Câmera 1744", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0421/snap_c1.jpg?1731372621823"},
    "25": {"lugar": "Câmera 0421", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0439/snap_c1.jpg?1731372676920"},
    "26": {"lugar": "Câmera 0439", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0437/snap_c1.jpg?1731372770766"},
    "27": {"lugar": "Câmera 0437", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0419/snap_c1.jpg?1731372833194"},
    "28": {"lugar": "Câmera 0419", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0436/snap_c1.jpg?1731372872578"},
    "29": {"lugar": "Câmera 0436", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1782/snap_c1.jpg?1731372913209"}, 
    "30": {"lugar": "Câmera 1782", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0434/snap_c1.jpg?1731372974796"},
    "31": {"lugar": "Câmera 0434", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1839/snap_c1.jpg?1731373071495"},
  };

function CameraGrid({ onImageClick }) {
    const [cameraUrls, setCameraUrls] = useState(Object.values(cameras));

    useEffect(() => {
        const updateImages = () => {
            const updatedCameras = Object.keys(cameras).map(key => ({
                ...cameras[key],
                url: `${cameras[key].url}&t=${new Date().getTime()}`
            }));
            setCameraUrls(updatedCameras);
        };

        const interval = setInterval(updateImages, 4500);
        updateImages();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {cameraUrls.map((camera, index) => (
                <CameraCard key={index} camera={camera} index={index} onImageClick={onImageClick} />
            ))}
        </div>
    );
}

export default CameraGrid;
