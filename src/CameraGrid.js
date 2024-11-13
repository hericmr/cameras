// CameraGrid.js
import React, { useEffect, useState } from 'react';
import CameraCard from './CameraCard';

const baseUrl = "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/";
const cameras = {
    "0": {"lugar": "Canal 6", "url": `${baseUrl}cam1593/snap_c1.jpg?1677157043869`},
    "1": {"lugar": "Canoagem", "url": `${baseUrl}cam1464/snap_c1.jpg?1677191520757`},
    "3": {"lugar": "Travessia da balsa", "url": `${baseUrl}cam1455/snap_c1.jpg?1677248602110`},
    "4": {"lugar": "Epitacio Pessoa com Oswaldo Chocrane", "url": `${baseUrl}cam1584/snap_c1.jpg?1677311079649`},
    "5": {"lugar": "C4", "url": `${baseUrl}cam1578/snap_c1.jpg?1677311184499`},
    "6": {"lugar": "CPE", "url": `${baseUrl}cam1561/snap_c1.jpg?1677311246793`},
    "7": {"lugar": "Canal 4", "url": `${baseUrl}cam1591/snap_c1.jpg?1677311286046`},
    "8": {"lugar": "Fonte do Sapo", "url": `${baseUrl}cam1517/snap_c1.jpg?1687433186816`},
    "9": {"lugar": "Aquário", "url": `${baseUrl}cam0451/snap_c1.jpg?1731350523630`},
    "10": {"lugar": "Ferry Boat Saldanha da Gama", "url": `${baseUrl}cam0380/snap_c1.jpg?1731350610657`},
    "11": {"lugar": "Washington Luís - Comporta 10", "url": `${baseUrl}cam0773/snap_c1.jpg?1731350669763`},
    "12": {"lugar": "Aquário 2", "url": `${baseUrl}cam0432/snap_c1.jpg?1731350713272`},
    "13": {"lugar": "Quebra Mar", "url": `${baseUrl}cam1833/snap_c1.jpg?1731350760546`},
    "16": {"lugar": "Quebra mar 2", "url": `${baseUrl}cam1819/snap_c1.jpg?1731350860837`},
    "18": {"lugar": "Câmera 1846", "url": `${baseUrl}cam1846/snap_c1.jpg?1731350899117`},
    "19": {"lugar": "Câmera 0436", "url": `${baseUrl}cam0436/snap_c1.jpg?1731351036758`},
    "20": {"lugar": "Acesso a Praia Canal 1", "url": `${baseUrl}cam0416/snap_c1.jpg?1731353613270`},
    "21": {"lugar": "Praça das Bandeiras", "url": `${baseUrl}cam0443/snap_c1.jpg?1731353706967`},
    "22": {"lugar": "Canal 4", "url": `${baseUrl}cam1529/snap_c1.jpg?1731367713141`},
    "23": {"lugar": "Câmera 1528", "url": `${baseUrl}cam1743/snap_c1.jpg?1731372528173`},
    "24": {"lugar": "Câmera 1744", "url": `${baseUrl}cam0421/snap_c1.jpg?1731372621823`},
    "25": {"lugar": "Câmera 0421", "url": `${baseUrl}cam0439/snap_c1.jpg?1731372676920`},
    "26": {"lugar": "Câmera 0439", "url": `${baseUrl}cam0437/snap_c1.jpg?1731372770766`},
    "27": {"lugar": "Câmera 0437", "url": `${baseUrl}cam0419/snap_c1.jpg?1731372833194`},
    "28": {"lugar": "Câmera 0419", "url": `${baseUrl}cam0436/snap_c1.jpg?1731372872578`},
    "29": {"lugar": "Câmera 0436", "url": `${baseUrl}cam1782/snap_c1.jpg?1731372913209`},
    "30": {"lugar": "Câmera 1782", "url": `${baseUrl}cam0434/snap_c1.jpg?1731372974796`},
    "31": {"lugar": "Câmera 0434", "url": `${baseUrl}cam1839/snap_c1.jpg?1731373071495`},
    "32": {"lugar": "Camera ...", "url": `${baseUrl}cam1598/snap_c1.jpg?1731459378730`},
    "33": {"lugar": "canal 2", "url": `${baseUrl}cam1665/snap_c1.jpg?1731459598074`},
    "34": {"lugar": "canal 3", "url": `${baseUrl}cam0045/snap_c1.jpg?1731459691638`},
    "35": {"lugar": "canal 4", "url": `${baseUrl}cam0044/snap_c1.jpg?1731459747173`},
    "36": {"lugar": "canal 1", "url": `${baseUrl}cam1781/snap_c1.jpg?1731459840018`},
    "37": {"lugar": "camera ..", "url": `${baseUrl}cam0435/snap_c1.jpg?1731459932967`},
    "38": {"lugar": "camera ...", "url": `${baseUrl}cam0438/snap_c1.jpg?1731459988483`},
    "39": {"lugar": "Divisa Santos-SV", "url": `${baseUrl}cam0376/snap_c1.jpg?1731460014251`},
    "40": {"lugar": "Subida  do Morro", "url": `${baseUrl}cam0377/snap_c1.jpg?1731460091791`},
    "41": {"lugar": "Ana costa ", "url": `${baseUrl}cam1541/snap_c1.jpg?1731460193046`},
    "42": {"lugar": "Ana Costa 2", "url": `${baseUrl}cam1538/snap_c1.jpg?1731460257192`},
      
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

        const interval = setInterval(updateImages, 6000);
        updateImages();

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {cameraUrls.map((camera, index) => (
                <CameraCard key={index} camera={camera} index={index} onImageClick={onImageClick} />
            ))}
        </div>
    );
}

export default CameraGrid;
