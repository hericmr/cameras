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
    "157":{"lugar":"Câmera 1753","url":`${baseUrl}cam1753/snap_c1.jpg?1731497544556`},
    "1752":{"lugar":"Câmera 1752","url":`${baseUrl}cam1752/snap_c1.jpg?1731502681018`},
    '1751':{"lugar":"Câmera 1751","url":`${baseUrl}cam1833/snap_c1.jpg?1731502681019`},
    "1750":{"lugar":"Câmera 1750","url":`${baseUrl}cam1832/snap_c1.jpg?1731502681019`},
    "1839": {"lugar": "Câmera 1839", "url": `${baseUrl}cam1839/snap_c1.jpg?1731502681018`},
    "1833": {"lugar": "Câmera 1833", "url": `${baseUrl}cam1833/snap_c1.jpg?1731502681019`},
    "1832": {"lugar": "Câmera 1832", "url": `${baseUrl}cam1832/snap_c1.jpg?1731502681019`},
    "1819": {"lugar": "Câmera 1819", "url": `${baseUrl}cam1819/snap_c1.jpg?1731502681021`},
    "1814": {"lugar": "Câmera 1814", "url": `${baseUrl}cam1814/snap_c1.jpg?1731502681022`},
    "1812": {"lugar": "Câmera 1812", "url": `${baseUrl}cam1812/snap_c1.jpg?1731502681022`},
    "1798": {"lugar": "Câmera 1798", "url": `${baseUrl}cam1798/snap_c1.jpg?1731502681025`},
    "1797": {"lugar": "Câmera 1797", "url": `${baseUrl}cam1797/snap_c1.jpg?1731502681025`},
    "1796": {"lugar": "Câmera 1796", "url": `${baseUrl}cam1796/snap_c1.jpg?1731502681025`},
    "1794": {"lugar": "Câmera 1794", "url": `${baseUrl}cam1794/snap_c1.jpg?1731502681026`},
    "1793": {"lugar": "Câmera 1793", "url": `${baseUrl}cam1793/snap_c1.jpg?1731502681027`},
    "1594": {"lugar": "Canal 1594", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1594/snap_c1.jpg?1731502681059"},
    "1593": {"lugar": "Canal 1593", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1593/snap_c1.jpg?1731502681059"},
    "1592": {"lugar": "Canal 1592", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1592/snap_c1.jpg?1731502681060"},
    "1591": {"lugar": "Canal 1591", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1591/snap_c1.jpg?1731502681060"},
    "1589": {"lugar": "Canal 1589", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1589/snap_c1.jpg?1731502681060"},
    "1588": {"lugar": "Canal 1588", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1588/snap_c1.jpg?1731502681060"},
    "1584": {"lugar": "Canal 1584", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1584/snap_c1.jpg?1731502681061"},
    "1581": {"lugar": "Canal 1581", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1581/snap_c1.jpg?1731502681062"},
    "1580": {"lugar": "Canal 1580", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1580/snap_c1.jpg?1731502681062"},
    "1579": {"lugar": "Canal 1579", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1579/snap_c1.jpg?1731502681062"},
    "1578": {"lugar": "Canal 1578", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1578/snap_c1.jpg?1731502681062"},
    "1620": {"lugar": "Canal 1620", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1620/snap_c1.jpg?1731502681053"},
    "1617": {"lugar": "Canal 1617", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1617/snap_c1.jpg?1731502681054"},
    "1616": {"lugar": "Canal 1616", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1616/snap_c1.jpg?1731502681054"},
    "1607": {"lugar": "Canal 1607", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1607/snap_c1.jpg?1731502681057"},
    "1606": {"lugar": "Canal 1606", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1606/snap_c1.jpg?1731502681057"},
    "1604": {"lugar": "Canal 1604", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1604/snap_c1.jpg?1731502681058"},
    "1603": {"lugar": "Canal 1603", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1603/snap_c1.jpg?1731502681058"},
    "1598": {"lugar": "Canal 1598", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1598/snap_c1.jpg?1731502681059"},
    "1597": {"lugar": "Canal 1597", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1597/snap_c1.jpg?1731502681059"},
    "1596": {"lugar": "Canal 1596", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1596/snap_c1.jpg?1731502681059"},
    "1595": {"lugar": "Canal 1595", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1595/snap_c1.jpg?1731502681059"},
    "1654": {"lugar": "Canal 1654", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1654/snap_c1.jpg?1731502681048"},
    "1652": {"lugar": "Canal 1652", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1652/snap_c1.jpg?1731502681048"},
    "1648": {"lugar": "Canal 1648", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1648/snap_c1.jpg?1731502681049"},
    "1646": {"lugar": "Canal 1646", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1646/snap_c1.jpg?1731502681049"},
    "1637": {"lugar": "Canal 1637", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1637/snap_c1.jpg?1731502681051"},
    "1632": {"lugar": "Canal 1632", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1632/snap_c1.jpg?1731502681051"},
    "1631": {"lugar": "Canal 1631", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1631/snap_c1.jpg?1731502681052"},
    "1629": {"lugar": "Canal 1629", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1629/snap_c1.jpg?1731502681052"},
    "1628": {"lugar": "Canal 1628", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1628/snap_c1.jpg?1731502681052"},
    "1621": {"lugar": "Canal 1621", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1621/snap_c1.jpg?1731502681053"},
    "1680": {"lugar": "Canal 1680", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1680/snap_c1.jpg?1731502681044"},
    "1679": {"lugar": "Canal 1679", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1679/snap_c1.jpg?1731502681044"},
    "1678": {"lugar": "Canal 1678", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1678/snap_c1.jpg?1731502681044"},
    "1665": {"lugar": "Canal 1665", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1665/snap_c1.jpg?1731502681046"},
    "1663": {"lugar": "Canal 1663", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1663/snap_c1.jpg?1731502681047"},
    "1661": {"lugar": "Canal 1661", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1661/snap_c1.jpg?1731502681047"},
    "1660": {"lugar": "Canal 1660", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1660/snap_c1.jpg?1731502681047"},
    "1659": {"lugar": "Canal 1659", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1659/snap_c1.jpg?1731502681047"},
    "1656": {"lugar": "Canal 1656", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1656/snap_c1.jpg?1731502681048"},
    "1655": {"lugar": "Canal 1655", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1655/snap_c1.jpg?1731502681048"},
    "1703": {"lugar": "Canal 1703", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1703/snap_c1.jpg?1731502681040"},
    "1702": {"lugar": "Canal 1702", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1702/snap_c1.jpg?1731502681040"},
    "1690": {"lugar": "Canal 1690", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1690/snap_c1.jpg?1731502681042"},
    "1689": {"lugar": "Canal 1689", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1689/snap_c1.jpg?1731502681043"},
    "1686": {"lugar": "Canal 1686", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1686/snap_c1.jpg?1731502681043"},
    "1685": {"lugar": "Canal 1685", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1685/snap_c1.jpg?1731502681043"},
    "1684": {"lugar": "Canal 1684", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1684/snap_c1.jpg?1731502681043"},
    "1683": {"lugar": "Canal 1683", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1683/snap_c1.jpg?1731502681044"},
    "1682": {"lugar": "Canal 1682", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1682/snap_c1.jpg?1731502681044"},
    "1681": {"lugar": "Canal 1681", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1681/snap_c1.jpg?1731502681044"},
    "1734": {"lugar": "Canal 1734", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1734/snap_c1.jpg?1731502681035"},
    "1733": {"lugar": "Canal 1733", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1733/snap_c1.jpg?1731502681035"},
    "1732": {"lugar": "Canal 1732", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1732/snap_c1.jpg?1731502681035"},
    "1731": {"lugar": "Canal 1731", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1731/snap_c1.jpg?1731502681036"},
    "1722": {"lugar": "Canal 1722", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1722/snap_c1.jpg?1731502681037"},
    "1721": {"lugar": "Canal 1721", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1721/snap_c1.jpg?1731502681037"},
    "1719": {"lugar": "Canal 1719", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1719/snap_c1.jpg?1731502681037"},
    "1718": {"lugar": "Canal 1718", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1718/snap_c1.jpg?1731502681038"},
    "1705": {"lugar": "Canal 1705", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1705/snap_c1.jpg?1731502681040"},
    "1704": {"lugar": "Canal 1704", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1704/snap_c1.jpg?1731502681040"},
        "1781": {"lugar": "Canal 1781", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1781/snap_c1.jpg?1731502681028"},
        "1757": {"lugar": "Canal 1757", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1757/snap_c1.jpg?1731502681031"},
        "1756": {"lugar": "Canal 1756", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1756/snap_c1.jpg?1731502681032"},
        "1755": {"lugar": "Canal 1755", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1755/snap_c1.jpg?1731502681032"},
        "1753": {"lugar": "Canal 1753", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1753/snap_c1.jpg?1731502681032"},
        "1743": {"lugar": "Canal 1743", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1743/snap_c1.jpg?1731502681034"},
        "1742": {"lugar": "Canal 1742", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1742/snap_c1.jpg?1731502681034"},
        "1739": {"lugar": "Canal 1739", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1739/snap_c1.jpg?1731502681034"},
        "1738": {"lugar": "Canal 1738", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1738/snap_c1.jpg?1731502681034"},
        "1737": {"lugar": "Canal 1737", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1737/snap_c1.jpg?1731502681035"},
      
  "1812": {"lugar": "Canal 1812", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1812/snap_c1.jpg?1731502681022"},
  "1798": {"lugar": "Canal 1798", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1798/snap_c1.jpg?1731502681025"},
  "1797": {"lugar": "Canal 1797", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1797/snap_c1.jpg?1731502681025"},
  "1796": {"lugar": "Canal 1796", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731502681025"},
  "1794": {"lugar": "Canal 1794", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1794/snap_c1.jpg?1731502681026"},
  "1793": {"lugar": "Canal 1793", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1793/snap_c1.jpg?1731502681026"},
  "1792": {"lugar": "Canal 1792", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1792/snap_c1.jpg?1731502681026"},
  "1791": {"lugar": "Canal 1791", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1791/snap_c1.jpg?1731502681026"},
  "1785": {"lugar": "Canal 1785", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1785/snap_c1.jpg?1731502681027"},
  "1782": {"lugar": "Canal 1782", "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1782/snap_c1.jpg?1731502681027"},    101: {
        lugar: "Lugar Desconhecido 101",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1553/snap_c1.jpg?1731510159174"
    },
    "102": {
        lugar: "Lugar Desconhecido 102",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1549/snap_c1.jpg?1731510159174"
    },
    "103": {
        lugar: "Lugar Desconhecido 103",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1548/snap_c1.jpg?1731510159174"
    },
    "104": {
        lugar: "Lugar Desconhecido 104",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1547/snap_c1.jpg?1731510159175"
    },
    "105": {
        lugar: "Lugar Desconhecido 105",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1546/snap_c1.jpg?1731510159175"
    },
    "106": {
        lugar: "Lugar Desconhecido 106",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1544/snap_c1.jpg?1731510159175"
    },
    "107": {
        lugar: "Lugar Desconhecido 107",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1542/snap_c1.jpg?1731510159175"
    },
    "108": {
        lugar: "Lugar Desconhecido 108",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1541/snap_c1.jpg?1731510159175"
    },
    "109": {
        lugar: "Lugar Desconhecido 109",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1540/snap_c1.jpg?1731510159175"
    },
    "90": {
        lugar: "Lugar Desconhecido 90",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1571/snap_c1.jpg?1731510159171"
    },
    "91": {
        lugar: "Lugar Desconhecido 91",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1569/snap_c1.jpg?1731510159172"
    },
    "92": {
        lugar: "Lugar Desconhecido 92",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1565/snap_c1.jpg?1731510159172"
    },
    "93": {
        lugar: "Lugar Desconhecido 93",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1564/snap_c1.jpg?1731510159172"
    },
    "94": {
        lugar: "Lugar Desconhecido 94",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1563/snap_c1.jpg?1731510159172"
    },
    "95": {
        lugar: "Lugar Desconhecido 95",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1561/snap_c1.jpg?1731510159173"
    },
    "96": {
        lugar: "Lugar Desconhecido 96",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1559/snap_c1.jpg?1731510159173"
    },
    "97": {
        lugar: "Lugar Desconhecido 97",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1558/snap_c1.jpg?1731510159173"
    },
    "98": {
        lugar: "Lugar Desconhecido 98",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1557/snap_c1.jpg?1731510159173"
    },
    "99": {
        lugar: "Lugar Desconhecido 99",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1555/snap_c1.jpg?1731510159173"
    },
    "100": {
        lugar: "Lugar Desconhecido 100",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1554/snap_c1.jpg?1731510159174"
    },
    
    "80": {
        lugar: "Lugar Desconhecido 80",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1589/snap_c1.jpg?1731510159169"
    },
    "81": {
        lugar: "Lugar Desconhecido 81",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1588/snap_c1.jpg?1731510159169"
    },
    "82": {
        lugar: "Lugar Desconhecido 82",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1584/snap_c1.jpg?1731510159170"
    },
    "83": {
        lugar: "Lugar Desconhecido 83",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1581/snap_c1.jpg?1731510159170"
    },
    "84": {
        lugar: "Lugar Desconhecido 84",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1580/snap_c1.jpg?1731510159170"
    },
    "85": {
        lugar: "Lugar Desconhecido 85",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1579/snap_c1.jpg?1731510159170"
    },
    "86": {
        lugar: "Lugar Desconhecido 86",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1578/snap_c1.jpg?1731510159170"
    },
    "87": {
        lugar: "Lugar Desconhecido 87",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1577/snap_c1.jpg?1731510159171"
    },
   "88": {
        lugar: "Lugar Desconhecido 88",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1575/snap_c1.jpg?1731510159171"
    },
    "89": {
        lugar: "Lugar Desconhecido 89",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1572/snap_c1.jpg?1731510159171"
    },
    "69": {
        lugar: "Lugar Desconhecido 69",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1606/snap_c1.jpg?1731510159167"
    },
    "70": {
        lugar: "Lugar Desconhecido 70",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1604/snap_c1.jpg?1731510159167"
    },
    "71": {
        lugar: "Lugar Desconhecido 71",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1603/snap_c1.jpg?1731510159167"
    },
    "72": {
        lugar: "Lugar Desconhecido 72",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1598/snap_c1.jpg?1731510159168"
    },
    "73": {
        lugar: "Lugar Desconhecido 73",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1597/snap_c1.jpg?1731510159168"
    },
    "74": {
        lugar: "Lugar Desconhecido 74",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1596/snap_c1.jpg?1731510159168"
    },
    "75": {
        lugar: "Lugar Desconhecido 75",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1595/snap_c1.jpg?1731510159168"
    },
    "76": {
        lugar: "Lugar Desconhecido 76",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1594/snap_c1.jpg?1731510159168"
    },
    "77": {
        lugar: "Lugar Desconhecido 77",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1593/snap_c1.jpg?1731510159168"
    },
    "78": {
        lugar: "Lugar Desconhecido 78",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1592/snap_c1.jpg?1731510159169"
    },
    "79": {
        lugar: "Lugar Desconhecido 79",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1591/snap_c1.jpg?1731510159169"
    },
    "58": {
        lugar: "Lugar Desconhecido 58",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1646/snap_c1.jpg?1731510159161"
    },
    "59": {
        lugar: "Lugar Desconhecido 59",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1637/snap_c1.jpg?1731510159163"
    },
    "60": {
        lugar: "Lugar Desconhecido 60",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1632/snap_c1.jpg?1731510159163"
    },
    "61": {
        lugar: "Lugar Desconhecido 61",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1631/snap_c1.jpg?1731510159163"
    },
    "62": {
        lugar: "Lugar Desconhecido 62",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1629/snap_c1.jpg?1731510159164"
    },
    "63": {
        lugar: "Lugar Desconhecido 63",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1628/snap_c1.jpg?1731510159164"
    },
    "64": {
        lugar: "Lugar Desconhecido 64",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1621/snap_c1.jpg?1731510159165"
    },
    "65": {
        lugar: "Lugar Desconhecido 65",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1620/snap_c1.jpg?1731510159165"
    },
    "66": {
        lugar: "Lugar Desconhecido 66",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1617/snap_c1.jpg?1731510159165"
    },
    "67": {
        lugar: "Lugar Desconhecido 67",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1616/snap_c1.jpg?1731510159165"
    },
    "68": {
        lugar: "Lugar Desconhecido 68",
        url: "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1607/snap_c1.jpg?1731510159167"
    },
    "58": {
        "lugar": "Lugar Desconhecido 58",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/snap_c1.jpg?1731510159161"
    },
    "59": {
        "lugar": "Lugar Desconhecido 59",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1637/snap_c1.jpg?1731510159163"
    },
    "60": {
        "lugar": "Lugar Desconhecido 60",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1632/snap_c1.jpg?1731510159163"
    },
    "61": {
        "lugar": "Lugar Desconhecido 61",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1631/snap_c1.jpg?1731510159163"
    },
    "62": {
        "lugar": "Lugar Desconhecido 62",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1629/snap_c1.jpg?1731510159164"
    },
    "63": {
        "lugar": "Lugar Desconhecido 63",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1628/snap_c1.jpg?1731510159164"
    },
    "64": {
        "lugar": "Lugar Desconhecido 64",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1621/snap_c1.jpg?1731510159165"
    },
    "65": {
        "lugar": "Lugar Desconhecido 65",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1620/snap_c1.jpg?1731510159165"
    },
    "66": {
        "lugar": "Lugar Desconhecido 66",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1617/snap_c1.jpg?1731510159165"
    },
    "67": {
        "lugar": "Lugar Desconhecido 67",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1616/snap_c1.jpg?1731510159165"
    },
    "48": {
        "lugar": "Lugar Desconhecido 48",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1665/snap_c1.jpg?1731510159158"
    },
    "49": {
        "lugar": "Lugar Desconhecido 49",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1663/snap_c1.jpg?1731510159158"
    },
    "50": {
        "lugar": "Lugar Desconhecido 50",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1661/snap_c1.jpg?1731510159158"
    },
    "51": {
        "lugar": "Lugar Desconhecido 51",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1660/snap_c1.jpg?1731510159159"
    },
    "52": {
        "lugar": "Lugar Desconhecido 52",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1659/snap_c1.jpg?1731510159159"
    },
    "53": {
        "lugar": "Lugar Desconhecido 53",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1656/snap_c1.jpg?1731510159159"
    },
    "54": {
        "lugar": "Lugar Desconhecido 54",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1655/snap_c1.jpg?1731510159159"
    },
    "55": {
        "lugar": "Lugar Desconhecido 55",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1654/snap_c1.jpg?1731510159160"
    },
    "56": {
        "lugar": "Lugar Desconhecido 56",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1652/snap_c1.jpg?1731510159160"
    },
    "57": {
        "lugar": "Lugar Desconhecido 57",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1648/snap_c1.jpg?1731510159161"
    },
    "37": {
        "lugar": "Lugar Desconhecido 37",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1690/snap_c1.jpg?1731510159153"
    },
    "38": {
        "lugar": "Lugar Desconhecido 38",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1689/snap_c1.jpg?1731510159153"
    },
    "39": {
        "lugar": "Lugar Desconhecido 39",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1686/snap_c1.jpg?1731510159153"
    },
    "40": {
        "lugar": "Lugar Desconhecido 40",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1685/snap_c1.jpg?1731510159154"
    },
    "41": {
        "lugar": "Lugar Desconhecido 41",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1684/snap_c1.jpg?1731510159154"
    },
    "42": {
        "lugar": "Lugar Desconhecido 42",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1683/snap_c1.jpg?1731510159154"
    },
    "43": {
        "lugar": "Lugar Desconhecido 43",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1682/snap_c1.jpg?1731510159154"
    },
    "44": {
        "lugar": "Lugar Desconhecido 44",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1681/snap_c1.jpg?1731510159155"
    },
    "45": {
        "lugar": "Lugar Desconhecido 45",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1680/snap_c1.jpg?1731510159155"
    },
    "46": {
        "lugar": "Lugar Desconhecido 46",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1679/snap_c1.jpg?1731510159155"
    },
    "47": {
        "lugar": "Lugar Desconhecido 47",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1678/snap_c1.jpg?1731510159155"
    },
    "26": {
        "lugar": "Lugar Desconhecido 26",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1733/snap_c1.jpg?1731510159146"
    },
    "27": {
        "lugar": "Lugar Desconhecido 27",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1732/snap_c1.jpg?1731510159146"
    },
    "28": {
        "lugar": "Lugar Desconhecido 28",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1731/snap_c1.jpg?1731510159146"
    },
    "29": {
        "lugar": "Lugar Desconhecido 29",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1722/snap_c1.jpg?1731510159148"
    },
    "30": {
        "lugar": "Lugar Desconhecido 30",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1721/snap_c1.jpg?1731510159148"
    },
    "31": {
        "lugar": "Lugar Desconhecido 31",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1719/snap_c1.jpg?1731510159148"
    },
    "32": {
        "lugar": "Lugar Desconhecido 32",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1718/snap_c1.jpg?1731510159148"
    },
    "33": {
        "lugar": "Lugar Desconhecido 33",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1705/snap_c1.jpg?1731510159150"
    },
    "34": {
        "lugar": "Lugar Desconhecido 34",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1704/snap_c1.jpg?1731510159150"
    },
    "35": {
        "lugar": "Lugar Desconhecido 35",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1703/snap_c1.jpg?1731510159151"
    },
    "36": {
        "lugar": "Lugar Desconhecido 36",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1702/snap_c1.jpg?1731510159151"
    },    "15": {
        "lugar": "Lugar Desconhecido 15",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1781/snap_c1.jpg?1731510159139"
    },
    "16": {
        "lugar": "Lugar Desconhecido 16",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1757/snap_c1.jpg?1731510159142"
    },
    "17": {
        "lugar": "Lugar Desconhecido 17",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1756/snap_c1.jpg?1731510159142"
    },
    "18": {
        "lugar": "Lugar Desconhecido 18",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1755/snap_c1.jpg?1731510159142"
    },
    "19": {
        "lugar": "Lugar Desconhecido 19",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1753/snap_c1.jpg?1731510159143"
    },
    "20": {
        "lugar": "Lugar Desconhecido 20",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1743/snap_c1.jpg?1731510159144"
    },
    "21": {
        "lugar": "Lugar Desconhecido 21",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1742/snap_c1.jpg?1731510159144"
    },
    "22": {
        "lugar": "Lugar Desconhecido 22",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1739/snap_c1.jpg?1731510159145"
    },
    "23": {
        "lugar": "Lugar Desconhecido 23",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1738/snap_c1.jpg?1731510159145"
    },
    "24": {
        "lugar": "Lugar Desconhecido 24",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1737/snap_c1.jpg?1731510159145"
    },
    "25": {
        "lugar": "Lugar Desconhecido 25",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1734/snap_c1.jpg?1731510159146"
    },
    
    "0": {
        "lugar": "Lugar Desconhecido 0",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1839/snap_c1.jpg?1731510159131"
    },
    "1": {
        "lugar": "Lugar Desconhecido 1",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1833/snap_c1.jpg?1731510159131"
    },
    "2": {
        "lugar": "Lugar Desconhecido 2",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1832/snap_c1.jpg?1731510159132"
    },
    "3": {
        "lugar": "Lugar Desconhecido 3",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1819/snap_c1.jpg?1731510159133"
    },
    "4": {
        "lugar": "Lugar Desconhecido 4",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1814/snap_c1.jpg?1731510159134"
    },
    "5": {
        "lugar": "Lugar Desconhecido 5",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1812/snap_c1.jpg?1731510159134"
    },
    "6": {
        "lugar": "Lugar Desconhecido 6",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1798/snap_c1.jpg?1731510159136"
    },
    "7": {
        "lugar": "Lugar Desconhecido 7",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1797/snap_c1.jpg?1731510159137"
    },
    "8": {
        "lugar": "Lugar Desconhecido 8",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731510159137"
    },
    "9": {
        "lugar": "Lugar Desconhecido 9",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1794/snap_c1.jpg?1731510159137"
    },
    "10": {
        "lugar": "Lugar Desconhecido 10",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1793/snap_c1.jpg?1731510159137"
    },
    "11": {
        "lugar": "Lugar Desconhecido 11",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1792/snap_c1.jpg?1731510159137"
    },
    "12": {
        "lugar": "Lugar Desconhecido 12",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1791/snap_c1.jpg?1731510159137"
    },
    "13": {
        "lugar": "Lugar Desconhecido 13",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1785/snap_c1.jpg?1731510159138"
    },
    "14": {
        "lugar": "Lugar Desconhecido 14",
        "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1782/snap_c1.jpg?1731510159139"
    }

        

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
