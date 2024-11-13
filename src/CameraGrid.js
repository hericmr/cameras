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
    "33": {"lugar": "Canal 2", "url": `${baseUrl}cam1665/snap_c1.jpg?1731459598074`},
    "34": {"lugar": "Canal 3", "url": `${baseUrl}cam0045/snap_c1.jpg?1731459691638`},
    "35": {"lugar": "Canal 4", "url": `${baseUrl}cam0044/snap_c1.jpg?1731459747173`},
    "36": {"lugar": "Canal 1", "url": `${baseUrl}cam1781/snap_c1.jpg?1731459840018`},
    "37": {"lugar": "Camera ..", "url": `${baseUrl}cam0435/snap_c1.jpg?1731459932967`},
    "38": {"lugar": "Camera ...", "url": `${baseUrl}cam0438/snap_c1.jpg?1731459988483`},
    "39": {"lugar": "Divisa Santos-SV", "url": `${baseUrl}cam0376/snap_c1.jpg?1731460014251`},
    "40": {"lugar": "Subida do Morro", "url": `${baseUrl}cam0377/snap_c1.jpg?1731460091791`},
    "41": {"lugar": "Ana Costa", "url": `${baseUrl}cam1541/snap_c1.jpg?1731460193046`},
    "42": {"lugar": "Ana Costa 2", "url": `${baseUrl}cam1538/snap_c1.jpg?1731460257192`},
    "43": {"lugar": "Câmera 1595", "url": `${baseUrl}cam1595/snap_c1.jpg?1731491705496`},
    "44": {"lugar": "Câmera 1580", "url": `${baseUrl}cam1580/snap_c1.jpg?1731491705496`},
    "45": {"lugar": "Câmera 1575", "url": `${baseUrl}cam1575/snap_c1.jpg?1731491705496`},
    "46": {"lugar": "Câmera 1565", "url": `${baseUrl}cam1565/snap_c1.jpg?1731491705496`},
    "47": {"lugar": "Câmera 1555", "url": `${baseUrl}cam1555/snap_c1.jpg?1731491705496`},
    "48": {"lugar": "Câmera 1540", "url": `${baseUrl}cam1540/snap_c1.jpg?1731491705512`},
    "49": {"lugar": "Câmera 1535", "url": `${baseUrl}cam1535/snap_c1.jpg?1731491705512`},
    "50": {"lugar": "Câmera 1530", "url": `${baseUrl}cam1530/snap_c1.jpg?1731491705512`},
    "51": {"lugar": "Câmera 1525", "url": `${baseUrl}cam1525/snap_c1.jpg?1731491705512`},
    "52": {"lugar": "Câmera 1520", "url": `${baseUrl}cam1520/snap_c1.jpg?1731491705512`},
    "53": {"lugar": "Câmera 1515", "url": `${baseUrl}cam1515/snap_c1.jpg?1731491705512`},
    "54": {"lugar": "Câmera 1490", "url": `${baseUrl}cam1490/snap_c1.jpg?1731491705512`},
    "55": {"lugar": "Câmera 1460", "url": `${baseUrl}cam1460/snap_c1.jpg?1731491705512`},
    "56": {"lugar": "Câmera 1450", "url": `${baseUrl}cam1882/snap_c1.jpg?1731492508511`},
    "57": {"lugar": "Câmera 1882", "url": `${baseUrl}cam1874/snap_c1.jpg?1731492537266`},
    "58": {"lugar": "Câmera 1874", "url": `${baseUrl}cam1873/snap_c1.jpg?1731492568819`},
    "59": {"lugar": "Câmera 1873", "url": `${baseUrl}cam1872/snap_c1.jpg?1731492598413`},
    "60": {"lugar": "Câmera 1872", "url": `${baseUrl}cam1871/snap_c1.jpg?1731492589643`},
    "61": {"lugar": "Câmera 1871", "url": `${baseUrl}cam1859/snap_c1.jpg?1731492809586`},
    "62": {"lugar": "Câmera 1859", "url": `${baseUrl}cam1862/snap_c1.jpg?1731492842440`},
    "63": {"lugar": "Câmera 1862", "url": `${baseUrl}cam1860/snap_c1.jpg?1731492897770`},
    "64": {"lugar": "Câmera 1860", "url": `${baseUrl}cam1880/snap_c1.jpg?1731492951529`},
    "65": {"lugar": "Câmera 1880", "url": `${baseUrl}cam1863/snap_c1.jpg?1731492982912`},
    "66": {"lugar": "Câmera 1863", "url": `${baseUrl}cam1861/snap_c1.jpg?1731493038057`},
    "1839":{"lugar":"Câmera 1839","url":   `${baseUrl}cam1839/snap_c1.jpg?1731497544541`},
    "1833":{"lugar":"Câmera 1833","url": `${baseUrl}cam1833/snap_c1.jpg?1731497544541`},
    "1832":{"lugar":"Câmera 1832","url":`${baseUrl}cam1832/snap_c1.jpg?1731497544541`},
    "1819":{"lugar":"Câmera 1819","url":`${baseUrl}cam1819/snap_c1.jpg?1731497544556`},
    "1814":{"lugar":"Câmera 1814","url":`${baseUrl}cam1814/snap_c1.jpg?1731497544556`},
    "1812":{"lugar":"Câmera 1812","url":`${baseUrl}cam1812/snap_c1.jpg?1731497544556`},
    "1798":{"lugar":"Câmera 1798","url":`${baseUrl}cam1798/snap_c1.jpg?1731497544556`},
        "1797":{"lugar":"Câmera 1797","url":`${baseUrl}cam1797/snap_c1.jpg?1731497544556`},
        "1796":{"lugar":"Câmera 1796","url":`${baseUrl}cam1796/snap_c1.jpg?1731497544556`},        
        "1794":{"lugar":"Câmera 1794","url":`${baseUrl}cam1794/snap_c1.jpg?1731497544556`}, 
        
        "1793":{"lugar":"Câmera 1793","url":`${baseUrl}cam1793/snap_c1.jpg?1731497544556`},       
         "1792":{"lugar":"Câmera 1792","url":`${baseUrl}cam1792/snap_c1.jpg?1731497544556`},       
          "1791":{"lugar":"Câmera 1791","url":`${baseUrl}cam1791/snap_c1.jpg?1731497544556`},      
            "1785":{"lugar":"Câmera 1785","url":`${baseUrl}cam1785/snap_c1.jpg?1731497544556`},    
                "1782":{"lugar":"Câmera 1782","url":`${baseUrl}cam1782/snap_c1.jpg?1731497544556`},        
        
        "1781":{"lugar":"Câmera 1781","url":`${baseUrl}cam1781/snap_c1.jpg?1731497544556`},  
              "1757":{"lugar":"Câmera 1757","url":`${baseUrl}cam1757/snap_c1.jpg?1731497544556`},  
                    "1756":{"lugar":"Câmera 1756","url":`${baseUrl}cam1756/snap_c1.jpg?1731497544556`}, 
                           "1755":{"lugar":"Câmera 1755","url":`${baseUrl}cam1755/snap_c1.jpg?1731497544556`},     
                              "1753":{"lugar":"Câmera 1753","url":`${baseUrl}cam1753/snap_c1.jpg?1731497544556`},       

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
