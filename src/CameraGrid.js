// CameraGrid.js
import React, { useEffect, useState } from "react";
import CameraCard from "./CameraCard";

const baseUrl = "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/";
const cameras = {
  "154": {
      "lugar": "Lugar Desconhecido 154",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1798/snap_c1.jpg?1731598084548"
  },
  "155": {
      "lugar": "Lugar Desconhecido 155",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1797/snap_c1.jpg?1731598084548"
  },
  "156": {
      "lugar": "Lugar Desconhecido 156",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1796/snap_c1.jpg?1731598084548"
  },
  "157": {
      "lugar": "Lugar Desconhecido 157",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1794/snap_c1.jpg?1731598084548"
  },
  "158": {
      "lugar": "Lugar Desconhecido 158",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1793/snap_c1.jpg?1731598084548"
  },
  "159": {
      "lugar": "Lugar Desconhecido 159",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1792/snap_c1.jpg?1731598084548"
  },
  "160": {
      "lugar": "Lugar Desconhecido 160",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1791/snap_c1.jpg?1731598084548"
  },
  "161": {
      "lugar": "Lugar Desconhecido 161",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1785/snap_c1.jpg?1731598084548"
  },
  "162": {
      "lugar": "Lugar Desconhecido 162",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1782/snap_c1.jpg?1731598084548"
  },
  "163": {
      "lugar": "Lugar Desconhecido 163",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1781/snap_c1.jpg?1731598084548"
  },
  "164": {
      "lugar": "Lugar Desconhecido 164",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1757/snap_c1.jpg?1731598084548"
  },
  "165": {
      "lugar": "Lugar Desconhecido 165",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1756/snap_c1.jpg?1731598084548"
  },
  "166": {
      "lugar": "Lugar Desconhecido 166",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1755/snap_c1.jpg?1731598084548"
  },
  "167": {
      "lugar": "Lugar Desconhecido 167",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1753/snap_c1.jpg?1731598084548"
  },
  "168": {
      "lugar": "Lugar Desconhecido 168",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1743/snap_c1.jpg?1731598084548"
  },
  "169": {
      "lugar": "Lugar Desconhecido 169",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1742/snap_c1.jpg?1731598084548"
  },
  "170": {
      "lugar": "Lugar Desconhecido 170",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1739/snap_c1.jpg?1731598084548"
  },
  "171": {
      "lugar": "Lugar Desconhecido 171",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1738/snap_c1.jpg?1731598084548"
  },
  "172": {
      "lugar": "Lugar Desconhecido 172",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1737/snap_c1.jpg?1731598084548"
  },
  "173": {
      "lugar": "Lugar Desconhecido 173",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1734/snap_c1.jpg?1731598084548"
  },
  "174": {
      "lugar": "Lugar Desconhecido 174",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1733/snap_c1.jpg?1731598084548"
  },
  "175": {
      "lugar": "Lugar Desconhecido 175",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1732/snap_c1.jpg?1731598084548"
  },
  "176": {
      "lugar": "Lugar Desconhecido 176",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1731/snap_c1.jpg?1731598084548"
  },
  "177": {
      "lugar": "Lugar Desconhecido 177",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1722/snap_c1.jpg?1731598084548"
  },
  "178": {
      "lugar": "Lugar Desconhecido 178",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1721/snap_c1.jpg?1731598084548"
  },
  "179": {
      "lugar": "Lugar Desconhecido 179",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1719/snap_c1.jpg?1731598084548"
  },
  "180": {
      "lugar": "Lugar Desconhecido 180",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1718/snap_c1.jpg?1731598084548"
  },
  "181": {
      "lugar": "Lugar Desconhecido 181",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1705/snap_c1.jpg?1731598084548"
  },
  "182": {
      "lugar": "Lugar Desconhecido 182",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1704/snap_c1.jpg?1731598084548"
  },
  "183": {
      "lugar": "Lugar Desconhecido 183",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1703/snap_c1.jpg?1731598084548"
  },
  "184": {
      "lugar": "Lugar Desconhecido 184",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1702/snap_c1.jpg?1731598084548"
  },
  "185": {
      "lugar": "Lugar Desconhecido 185",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1690/snap_c1.jpg?1731598084548"
  },
  "186": {
      "lugar": "Lugar Desconhecido 186",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1689/snap_c1.jpg?1731598084548"
  },
  "187": {
      "lugar": "Lugar Desconhecido 187",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1686/snap_c1.jpg?1731598084548"
  },
  "188": {
      "lugar": "Lugar Desconhecido 188",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1685/snap_c1.jpg?1731598084548"
  },
  "189": {
      "lugar": "Lugar Desconhecido 189",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1684/snap_c1.jpg?1731598084548"
  },
  "190": {
      "lugar": "Lugar Desconhecido 190",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1683/snap_c1.jpg?1731598084548"
  },
  "191": {
      "lugar": "Lugar Desconhecido 191",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1682/snap_c1.jpg?1731598084548"
  },
  "192": {
      "lugar": "Lugar Desconhecido 192",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1681/snap_c1.jpg?1731598084548"
  },
  "193": {
      "lugar": "Lugar Desconhecido 193",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1680/snap_c1.jpg?1731598084548"
  },
  "194": {
      "lugar": "Lugar Desconhecido 194",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1679/snap_c1.jpg?1731598084548"
  },
  "195": {
      "lugar": "Lugar Desconhecido 195",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1678/snap_c1.jpg?1731598084548"
  },
  "196": {
      "lugar": "Lugar Desconhecido 196",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1665/snap_c1.jpg?1731598084548"
  },
  "197": {
      "lugar": "Lugar Desconhecido 197",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1663/snap_c1.jpg?1731598084548"
  },
  "198": {
      "lugar": "Lugar Desconhecido 198",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1661/snap_c1.jpg?1731598084548"
  },
  "199": {
      "lugar": "Lugar Desconhecido 199",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1660/snap_c1.jpg?1731598084548"
  },
  "200": {
      "lugar": "Lugar Desconhecido 200",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1659/snap_c1.jpg?1731598084548"
  },
  "201": {
      "lugar": "Lugar Desconhecido 201",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1656/snap_c1.jpg?1731598084548"
  },
  "202": {
      "lugar": "Lugar Desconhecido 202",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1655/snap_c1.jpg?1731598084548"
  },
  "203": {
      "lugar": "Lugar Desconhecido 203",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1654/snap_c1.jpg?1731598084548"
  },
  "204": {
      "lugar": "Lugar Desconhecido 204",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1652/snap_c1.jpg?1731598084548"
  },
  "205": {
      "lugar": "Lugar Desconhecido 205",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1648/snap_c1.jpg?1731598084548"
  },
  "206": {
      "lugar": "Lugar Desconhecido 206",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1646/snap_c1.jpg?1731598084548"
  },
  "207": {
      "lugar": "Lugar Desconhecido 207",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1637/snap_c1.jpg?1731598084548"
  },
  "208": {
      "lugar": "Lugar Desconhecido 208",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1632/snap_c1.jpg?1731598084548"
  },
  "209": {
      "lugar": "Lugar Desconhecido 209",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1631/snap_c1.jpg?1731598084548"
  },
  "210": {
      "lugar": "Lugar Desconhecido 210",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1629/snap_c1.jpg?1731598084548"
  },
  "211": {
      "lugar": "Lugar Desconhecido 211",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1628/snap_c1.jpg?1731598084548"
  },
  "212": {
      "lugar": "Lugar Desconhecido 212",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1621/snap_c1.jpg?1731598084548"
  },
  "213": {
      "lugar": "Lugar Desconhecido 213",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1620/snap_c1.jpg?1731598084548"
  },
  "214": {
      "lugar": "Lugar Desconhecido 214",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1617/snap_c1.jpg?1731598084548"
  },
  "215": {
      "lugar": "Lugar Desconhecido 215",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1616/snap_c1.jpg?1731598084548"
  },
  "216": {
      "lugar": "Lugar Desconhecido 216",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1607/snap_c1.jpg?1731598084548"
  },
  "217": {
      "lugar": "Lugar Desconhecido 217",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1606/snap_c1.jpg?1731598084548"
  },
  "218": {
      "lugar": "Lugar Desconhecido 218",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1604/snap_c1.jpg?1731598084548"
  },
  "219": {
      "lugar": "Lugar Desconhecido 219",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1603/snap_c1.jpg?1731598084548"
  },
  "220": {
      "lugar": "Lugar Desconhecido 220",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1598/snap_c1.jpg?1731598084548"
  },
  "221": {
      "lugar": "Lugar Desconhecido 221",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1597/snap_c1.jpg?1731598084548"
  },
  "222": {
      "lugar": "Lugar Desconhecido 222",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1596/snap_c1.jpg?1731598084548"
  },
  "223": {
      "lugar": "Lugar Desconhecido 223",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1595/snap_c1.jpg?1731598084548"
  },
  "224": {
      "lugar": "Lugar Desconhecido 224",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1594/snap_c1.jpg?1731598084548"
  },
  "225": {
      "lugar": "Lugar Desconhecido 225",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1593/snap_c1.jpg?1731598084548"
  },
  "226": {
      "lugar": "Lugar Desconhecido 226",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1592/snap_c1.jpg?1731598084548"
  },
  "227": {
      "lugar": "Lugar Desconhecido 227",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1591/snap_c1.jpg?1731598084548"
  },
  "228": {
      "lugar": "Lugar Desconhecido 228",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1589/snap_c1.jpg?1731598084548"
  },
  "229": {
      "lugar": "Lugar Desconhecido 229",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1588/snap_c1.jpg?1731598084548"
  },
  "230": {
      "lugar": "Lugar Desconhecido 230",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1584/snap_c1.jpg?1731598084548"
  },
  "231": {
      "lugar": "Lugar Desconhecido 231",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1581/snap_c1.jpg?1731598084548"
  },
  "232": {
      "lugar": "Lugar Desconhecido 232",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1580/snap_c1.jpg?1731598084548"
  },
  "233": {
      "lugar": "Lugar Desconhecido 233",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1579/snap_c1.jpg?1731598084548"
  },
  "234": {
      "lugar": "Lugar Desconhecido 234",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1578/snap_c1.jpg?1731598084548"
  },
  "235": {
      "lugar": "Lugar Desconhecido 235",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1577/snap_c1.jpg?1731598084548"
  },
  "236": {
      "lugar": "Lugar Desconhecido 236",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1575/snap_c1.jpg?1731598084548"
  },
  "237": {
      "lugar": "Lugar Desconhecido 237",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1572/snap_c1.jpg?1731598084548"
  },
  "238": {
      "lugar": "Lugar Desconhecido 238",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1571/snap_c1.jpg?1731598084548"
  },
  "239": {
      "lugar": "Lugar Desconhecido 239",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1569/snap_c1.jpg?1731598084548"
  },
  "240": {
      "lugar": "Lugar Desconhecido 240",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1565/snap_c1.jpg?1731598084548"
  },
  "241": {
      "lugar": "Lugar Desconhecido 241",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1564/snap_c1.jpg?1731598084548"
  },
  "242": {
      "lugar": "Lugar Desconhecido 242",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1563/snap_c1.jpg?1731598084548"
  },
  "243": {
      "lugar": "Lugar Desconhecido 243",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1561/snap_c1.jpg?1731598084548"
  },
  "244": {
      "lugar": "Lugar Desconhecido 244",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1559/snap_c1.jpg?1731598084548"
  },
  "245": {
      "lugar": "Lugar Desconhecido 245",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1558/snap_c1.jpg?1731598084548"
  },
  "246": {
      "lugar": "Lugar Desconhecido 246",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1557/snap_c1.jpg?1731598084548"
  },
  "247": {
      "lugar": "Lugar Desconhecido 247",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1555/snap_c1.jpg?1731598084548"
  },
  "248": {
      "lugar": "Lugar Desconhecido 248",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1554/snap_c1.jpg?1731598084548"
  },
  "249": {
      "lugar": "Lugar Desconhecido 249",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1553/snap_c1.jpg?1731598084548"
  },
  "250": {
      "lugar": "Lugar Desconhecido 250",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1549/snap_c1.jpg?1731598084548"
  },
  "251": {
      "lugar": "Lugar Desconhecido 251",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1548/snap_c1.jpg?1731598084548"
  },
  "252": {
      "lugar": "Lugar Desconhecido 252",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1547/snap_c1.jpg?1731598084548"
  },
  "253": {
      "lugar": "Lugar Desconhecido 253",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1546/snap_c1.jpg?1731598084548"
  },
  "254": {
      "lugar": "Lugar Desconhecido 254",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1544/snap_c1.jpg?1731598084548"
  },
  "255": {
      "lugar": "Lugar Desconhecido 255",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1542/snap_c1.jpg?1731598084548"
  },
  "256": {
      "lugar": "Lugar Desconhecido 256",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1541/snap_c1.jpg?1731598084548"
  },
  "257": {
      "lugar": "Lugar Desconhecido 257",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1540/snap_c1.jpg?1731598084548"
  },
  "258": {
      "lugar": "Lugar Desconhecido 258",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1538/snap_c1.jpg?1731598084548"
  },
  "259": {
      "lugar": "Lugar Desconhecido 259",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1536/snap_c1.jpg?1731598084548"
  },
  "260": {
      "lugar": "Lugar Desconhecido 260",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1535/snap_c1.jpg?1731598084548"
  },
  "261": {
      "lugar": "Lugar Desconhecido 261",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1534/snap_c1.jpg?1731598084548"
  },
  "262": {
      "lugar": "Lugar Desconhecido 262",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1532/snap_c1.jpg?1731598084548"
  },
  "263": {
      "lugar": "Lugar Desconhecido 263",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1531/snap_c1.jpg?1731598084548"
  },
  "264": {
      "lugar": "Lugar Desconhecido 264",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1530/snap_c1.jpg?1731598084548"
  },
  "265": {
      "lugar": "Lugar Desconhecido 265",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1529/snap_c1.jpg?1731598084548"
  },
  "266": {
      "lugar": "Lugar Desconhecido 266",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1527/snap_c1.jpg?1731598084548"
  },
  "267": {
      "lugar": "Lugar Desconhecido 267",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1526/snap_c1.jpg?1731598084548"
  },
  "268": {
      "lugar": "Lugar Desconhecido 268",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1525/snap_c1.jpg?1731598084548"
  },
  "269": {
      "lugar": "Lugar Desconhecido 269",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1524/snap_c1.jpg?1731598084548"
  },
  "270": {
      "lugar": "Lugar Desconhecido 270",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1523/snap_c1.jpg?1731598084548"
  },
  "271": {
      "lugar": "Lugar Desconhecido 271",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1522/snap_c1.jpg?1731598084548"
  },
  "272": {
      "lugar": "Lugar Desconhecido 272",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1521/snap_c1.jpg?1731598084548"
  },
  "273": {
      "lugar": "Lugar Desconhecido 273",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1520/snap_c1.jpg?1731598084548"
  },
  "274": {
      "lugar": "Lugar Desconhecido 274",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1519/snap_c1.jpg?1731598084548"
  },
  "275": {
      "lugar": "Lugar Desconhecido 275",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1517/snap_c1.jpg?1731598084548"
  },
  "276": {
      "lugar": "Lugar Desconhecido 276",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1516/snap_c1.jpg?1731598084548"
  },
  "277": {
      "lugar": "Lugar Desconhecido 277",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1515/snap_c1.jpg?1731598084548"
  },
  "278": {
      "lugar": "Lugar Desconhecido 278",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1514/snap_c1.jpg?1731598084548"
  },
  "279": {
      "lugar": "Lugar Desconhecido 279",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1513/snap_c1.jpg?1731598084548"
  },
  "280": {
      "lugar": "Lugar Desconhecido 280",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1512/snap_c1.jpg?1731598084548"
  },
  "281": {
      "lugar": "Lugar Desconhecido 281",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1492/snap_c1.jpg?1731598084548"
  },
  "282": {
      "lugar": "Lugar Desconhecido 282",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1491/snap_c1.jpg?1731598084548"
  },
  "283": {
      "lugar": "Lugar Desconhecido 283",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1490/snap_c1.jpg?1731598084548"
  },
  "284": {
      "lugar": "Lugar Desconhecido 284",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1472/snap_c1.jpg?1731598084548"
  },
  "285": {
      "lugar": "Lugar Desconhecido 285",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1471/snap_c1.jpg?1731598084548"
  },
  "286": {
      "lugar": "Lugar Desconhecido 286",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1466/snap_c1.jpg?1731598084548"
  },
  "287": {
      "lugar": "Lugar Desconhecido 287",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1464/snap_c1.jpg?1731598084548"
  },
  "288": {
      "lugar": "Lugar Desconhecido 288",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1460/snap_c1.jpg?1731598084548"
  },
  "289": {
      "lugar": "Lugar Desconhecido 289",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1457/snap_c1.jpg?1731598084548"
  },
  "290": {
      "lugar": "Lugar Desconhecido 290",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1455/snap_c1.jpg?1731598084548"
  },
  "291": {
      "lugar": "Lugar Desconhecido 291",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1453/snap_c1.jpg?1731598084548"
  },
  "292": {
      "lugar": "Lugar Desconhecido 292",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1451/snap_c1.jpg?1731598084548"
  },
  "293": {
      "lugar": "Lugar Desconhecido 293",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1431/snap_c1.jpg?1731598084548"
  },
  "294": {
      "lugar": "Lugar Desconhecido 294",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1428/snap_c1.jpg?1731598084548"
  },
  "295": {
      "lugar": "Lugar Desconhecido 295",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1426/snap_c1.jpg?1731598084548"
  },
  "296": {
      "lugar": "Lugar Desconhecido 296",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1389/snap_c1.jpg?1731598084548"
  },
  "297": {
      "lugar": "Lugar Desconhecido 297",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1387/snap_c1.jpg?1731598084548"
  },
  "298": {
      "lugar": "Lugar Desconhecido 298",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1372/snap_c1.jpg?1731598084548"
  },
  "299": {
      "lugar": "Lugar Desconhecido 299",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1293/snap_c1.jpg?1731598084548"
  },
  "300": {
      "lugar": "Lugar Desconhecido 300",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1292/snap_c1.jpg?1731598084548"
  },
  "301": {
      "lugar": "Lugar Desconhecido 301",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1290/snap_c1.jpg?1731598084548"
  },
  "302": {
      "lugar": "Lugar Desconhecido 302",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1286/snap_c1.jpg?1731598084548"
  },
  "303": {
      "lugar": "Lugar Desconhecido 303",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1285/snap_c1.jpg?1731598084548"
  },
  "304": {
      "lugar": "Lugar Desconhecido 304",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1283/snap_c1.jpg?1731598084548"
  },
  "305": {
      "lugar": "Lugar Desconhecido 305",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1282/snap_c1.jpg?1731598084548"
  },
  "306": {
      "lugar": "Lugar Desconhecido 306",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1277/snap_c1.jpg?1731598084548"
  },
  "307": {
      "lugar": "Lugar Desconhecido 307",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1274/snap_c1.jpg?1731598084548"
  },
  "308": {
      "lugar": "Lugar Desconhecido 308",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1273/snap_c1.jpg?1731598084548"
  },
  "309": {
      "lugar": "Lugar Desconhecido 309",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1272/snap_c1.jpg?1731598084548"
  },
  "310": {
      "lugar": "Lugar Desconhecido 310",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1271/snap_c1.jpg?1731598084548"
  },
  "311": {
      "lugar": "Lugar Desconhecido 311",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1270/snap_c1.jpg?1731598084548"
  },
  "312": {
      "lugar": "Lugar Desconhecido 312",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1269/snap_c1.jpg?1731598084548"
  },
  "313": {
      "lugar": "Lugar Desconhecido 313",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1268/snap_c1.jpg?1731598084548"
  },
  "314": {
      "lugar": "Lugar Desconhecido 314",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1267/snap_c1.jpg?1731598084548"
  },
  "315": {
      "lugar": "Lugar Desconhecido 315",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1241/snap_c1.jpg?1731598084548"
  },
  "316": {
      "lugar": "Lugar Desconhecido 316",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0773/snap_c1.jpg?1731598084548"
  },
  "317": {
      "lugar": "Lugar Desconhecido 317",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0771/snap_c1.jpg?1731598084548"
  },
  "318": {
      "lugar": "Lugar Desconhecido 318",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0770/snap_c1.jpg?1731598084548"
  },
  "319": {
      "lugar": "Lugar Desconhecido 319",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0769/snap_c1.jpg?1731598084548"
  },
  "320": {
      "lugar": "Lugar Desconhecido 320",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0765/snap_c1.jpg?1731598084548"
  },
  "321": {
      "lugar": "Lugar Desconhecido 321",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0764/snap_c1.jpg?1731598084548"
  },
  "322": {
      "lugar": "Lugar Desconhecido 322",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0451/snap_c1.jpg?1731598084548"
  },
  "323": {
      "lugar": "Lugar Desconhecido 323",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0450/snap_c1.jpg?1731598084548"
  },
  "324": {
      "lugar": "Lugar Desconhecido 324",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0443/snap_c1.jpg?1731598084548"
  },
  "325": {
      "lugar": "Lugar Desconhecido 325",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0442/snap_c1.jpg?1731598084548"
  },
  "326": {
      "lugar": "Lugar Desconhecido 326",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0441/snap_c1.jpg?1731598084548"
  },
  "327": {
      "lugar": "Lugar Desconhecido 327",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0440/snap_c1.jpg?1731598084548"
  },
  "328": {
      "lugar": "Lugar Desconhecido 328",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0439/snap_c1.jpg?1731598084548"
  },
  "329": {
      "lugar": "Lugar Desconhecido 329",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0438/snap_c1.jpg?1731598084548"
  },
  "330": {
      "lugar": "Lugar Desconhecido 330",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0437/snap_c1.jpg?1731598084548"
  },
  "331": {
      "lugar": "Lugar Desconhecido 331",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0436/snap_c1.jpg?1731598084548"
  },
  "332": {
      "lugar": "Lugar Desconhecido 332",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0435/snap_c1.jpg?1731598084548"
  },
  "333": {
      "lugar": "Lugar Desconhecido 333",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0434/snap_c1.jpg?1731598084548"
  },
  "334": {
      "lugar": "Lugar Desconhecido 334",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0433/snap_c1.jpg?1731598084548"
  },
  "335": {
      "lugar": "Lugar Desconhecido 335",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0432/snap_c1.jpg?1731598084548"
  },
  "336": {
      "lugar": "Lugar Desconhecido 336",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0431/snap_c1.jpg?1731598084548"
  },
  "337": {
      "lugar": "Lugar Desconhecido 337",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0424/snap_c1.jpg?1731598084548"
  },
  "338": {
      "lugar": "Lugar Desconhecido 338",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0423/snap_c1.jpg?1731598084548"
  },
  "339": {
      "lugar": "Lugar Desconhecido 339",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0422/snap_c1.jpg?1731598084548"
  },
  "340": {
      "lugar": "Lugar Desconhecido 340",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0421/snap_c1.jpg?1731598084548"
  },
  "341": {
      "lugar": "Lugar Desconhecido 341",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0420/snap_c1.jpg?1731598084548"
  },
  "342": {
      "lugar": "Lugar Desconhecido 342",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0419/snap_c1.jpg?1731598084548"
  },
  "343": {
      "lugar": "Lugar Desconhecido 343",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0418/snap_c1.jpg?1731598084548"
  },
  "344": {
      "lugar": "Lugar Desconhecido 344",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0417/snap_c1.jpg?1731598084548"
  },
  "345": {
      "lugar": "Lugar Desconhecido 345",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0416/snap_c1.jpg?1731598084548"
  },
  "346": {
      "lugar": "Lugar Desconhecido 346",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0402/snap_c1.jpg?1731598084548"
  },
  "347": {
      "lugar": "Lugar Desconhecido 347",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0401/snap_c1.jpg?1731598084548"
  },
  "348": {
      "lugar": "Lugar Desconhecido 348",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0400/snap_c1.jpg?1731598084548"
  },
  "349": {
      "lugar": "Lugar Desconhecido 349",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0399/snap_c1.jpg?1731598084548"
  },
  "350": {
      "lugar": "Lugar Desconhecido 350",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0398/snap_c1.jpg?1731598084548"
  },
  "351": {
      "lugar": "Lugar Desconhecido 351",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0397/snap_c1.jpg?1731598084548"
  },
  "352": {
      "lugar": "Lugar Desconhecido 352",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0396/snap_c1.jpg?1731598084548"
  },
  "353": {
      "lugar": "Lugar Desconhecido 353",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0395/snap_c1.jpg?1731598084548"
  },
  "354": {
      "lugar": "Lugar Desconhecido 354",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0394/snap_c1.jpg?1731598084548"
  },
  "355": {
      "lugar": "Lugar Desconhecido 355",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0393/snap_c1.jpg?1731598084548"
  },
  "356": {
      "lugar": "Lugar Desconhecido 356",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0392/snap_c1.jpg?1731598084548"
  },
  "357": {
      "lugar": "Lugar Desconhecido 357",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0391/snap_c1.jpg?1731598084548"
  },
  "358": {
      "lugar": "Lugar Desconhecido 358",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0383/snap_c1.jpg?1731598084548"
  },
  "359": {
      "lugar": "Lugar Desconhecido 359",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0382/snap_c1.jpg?1731598084548"
  },
  "360": {
      "lugar": "Lugar Desconhecido 360",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0381/snap_c1.jpg?1731598084548"
  },
  "361": {
      "lugar": "Lugar Desconhecido 361",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0380/snap_c1.jpg?1731598084548"
  },
  "362": {
      "lugar": "Lugar Desconhecido 362",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0379/snap_c1.jpg?1731598084548"
  },
  "363": {
      "lugar": "Lugar Desconhecido 363",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0378/snap_c1.jpg?1731598084548"
  },
  "364": {
      "lugar": "Lugar Desconhecido 364",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0377/snap_c1.jpg?1731598084548"
  },
  "365": {
      "lugar": "Lugar Desconhecido 365",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0376/snap_c1.jpg?1731598084548"
  },
  "366": {
      "lugar": "Lugar Desconhecido 366",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0045/snap_c1.jpg?1731598084548"
  },
  "367": {
      "lugar": "Lugar Desconhecido 367",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam0044/snap_c1.jpg?1731598084548"
  },
  "368": {
      "lugar": "Lugar Desconhecido 368",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1812/snap_c1.jpg?1731598084548"
  },
  "369": {
      "lugar": "Lugar Desconhecido 369",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1814/snap_c1.jpg?1731598084548"
  },
  "370": {
      "lugar": "Lugar Desconhecido 370",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1819/snap_c1.jpg?1731598084548"
  },
  "371": {
      "lugar": "Lugar Desconhecido 371",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1832/snap_c1.jpg?1731598084548"
  },
  "372": {
      "lugar": "Lugar Desconhecido 372",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1833/snap_c1.jpg?1731598084548"
  },
  "373": {
      "lugar": "Lugar Desconhecido 373",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1839/snap_c1.jpg?1731598084548"
  },
  "374": {
      "lugar": "Lugar Desconhecido 374",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1846/snap_c1.jpg?1731598084548"
  },
  "375": {
      "lugar": "Lugar Desconhecido 375",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1856/snap_c1.jpg?1731598084548"
  },
  "376": {
      "lugar": "Lugar Desconhecido 376",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1859/snap_c1.jpg?1731598084548"
  },
  "377": {
      "lugar": "Lugar Desconhecido 377",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1860/snap_c1.jpg?1731598084548"
  },
  "378": {
      "lugar": "Lugar Desconhecido 378",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1862/snap_c1.jpg?1731598084548"
  },
  "379": {
      "lugar": "Lugar Desconhecido 379",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1863/snap_c1.jpg?1731598084548"
  },
  "380": {
      "lugar": "Lugar Desconhecido 380",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1871/snap_c1.jpg?1731598084548"
  },
  "381": {
      "lugar": "Lugar Desconhecido 381",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1872/snap_c1.jpg?1731598084548"
  },
  "382": {
      "lugar": "Lugar Desconhecido 382",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1873/snap_c1.jpg?1731598084548"
  },
  "383": {
      "lugar": "Lugar Desconhecido 383",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1874/snap_c1.jpg?1731598084548"
  },
  "384": {
      "lugar": "Lugar Desconhecido 384",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1880/snap_c1.jpg?1731598084548"
  },
  "385": {
      "lugar": "Lugar Desconhecido 385",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam1882/snap_c1.jpg?1731598084548"
  },
  "386": {
      "lugar": "Lugar Desconhecido 386",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3000/snap_c1.jpg?1731598084548"
  },
  "387": {
      "lugar": "Lugar Desconhecido 387",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3001/snap_c1.jpg?1731598084548"
  },
  "388": {
      "lugar": "Lugar Desconhecido 388",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3002/snap_c1.jpg?1731598084548"
  },
  "389": {
      "lugar": "Lugar Desconhecido 389",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3003/snap_c1.jpg?1731598084548"
  },
  "390": {
      "lugar": "Lugar Desconhecido 390",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3004/snap_c1.jpg?1731598084548"
  },
  "391": {
      "lugar": "Lugar Desconhecido 391",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3010/snap_c1.jpg?1731598084548"
  },
  "392": {
      "lugar": "Lugar Desconhecido 392",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3011/snap_c1.jpg?1731598084548"
  },
  "393": {
      "lugar": "Lugar Desconhecido 393",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3012/snap_c1.jpg?1731598084548"
  },
  "394": {
      "lugar": "Lugar Desconhecido 394",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3014/snap_c1.jpg?1731598084548"
  },
  "395": {
      "lugar": "Lugar Desconhecido 395",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3015/snap_c1.jpg?1731598084548"
  },
  "396": {
      "lugar": "Lugar Desconhecido 396",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3018/snap_c1.jpg?1731598084548"
  },
  "397": {
      "lugar": "Lugar Desconhecido 397",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3019/snap_c1.jpg?1731598084548"
  },
  "398": {
      "lugar": "Lugar Desconhecido 398",
      "url": "https://egov.santos.sp.gov.br/santosmapeada/css/img/cameras/cam3020/snap_c1.jpg?1731598084548"
  }
}

function CameraGrid({ onImageClick }) {
  const [cameraUrls, setCameraUrls] = useState(Object.values(cameras));

  useEffect(() => {
    const updateImages = () => {
      const updatedCameras = Object.keys(cameras).map((key) => ({
        ...cameras[key],
        url: `${cameras[key].url}&t=${new Date().getTime()}`,
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
        <CameraCard
          key={index}
          camera={camera}
          index={index}
          onImageClick={onImageClick}
        />
      ))}
    </div>
  );
}

export default CameraGrid;
