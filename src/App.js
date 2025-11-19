// App.js
import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Footer, CameraGrid, FullScreenImage } from './components';
import MinimalFilter from './components/MinimalFilter';
import About from './pages/About';
import CameraPage from './pages/CameraPage';
import { UpdateProvider } from './context/UpdateContext';
import cameras from './assets/cameras_detailed.json';
import { formatCurrentDate } from './utils/dateFormatter';

function HomePage() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentImageTitle, setCurrentImageTitle] = useState(null);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const [currentCamera, setCurrentCamera] = useState(null);
    const [displayedCameraCount, setDisplayedCameraCount] = useState(null);
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([]);
    const [sortBy, setSortBy] = useState('none');
    const navigate = useNavigate();

    const camerasList = useMemo(() => Object.values(cameras), []);

    const handleImageClick = (imageData, index) => {
        const camera = camerasList[index];
        // Navega para a URL da câmera em vez de apenas abrir em fullscreen
        navigate(`/camera/${camera.id}`);
    };

    return (
        <div>
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        {/* Lado Esquerdo: Contador */}
                        <div className="flex items-center gap-3">
                            <span className="text-gray-300 text-sm md:text-base">
                                Mostrando <strong className="text-white font-semibold">
                                    {displayedCameraCount !== null ? displayedCameraCount : camerasList.length} câmeras
                                </strong>
                                {displayedCameraCount !== null && displayedCameraCount !== camerasList.length && (
                                    <span className="text-gray-400"> de {camerasList.length}</span>
                                )}
                            </span>
                            <span className="text-gray-500 text-xs hidden md:inline">•</span>
                            <span className="text-gray-400 text-xs md:text-sm hidden md:inline">
                                {formatCurrentDate()}
                            </span>
                        </div>
                        
                        {/* Lado Direito: Filtros Minimalistas */}
                        <MinimalFilter
                            cameras={camerasList}
                            onFilterChange={setFilteredNeighborhoods}
                            onSortChange={setSortBy}
                        />
                    </div>
                </div>
            </div>
            <CameraGrid 
                onImageClick={handleImageClick} 
                onCameraCountChange={setDisplayedCameraCount}
                filteredNeighborhoods={filteredNeighborhoods}
                sortBy={sortBy}
            />
        </div>
    );
}

function App() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState('home');

    // Atualiza currentPage baseado na rota
    React.useEffect(() => {
        if (location.pathname === '/about') {
            setCurrentPage('about');
        } else if (location.pathname.startsWith('/camera/')) {
            setCurrentPage('camera');
        } else {
            setCurrentPage('home');
        }
    }, [location]);

    const handleNavClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <UpdateProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar onNavClick={handleNavClick} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/camera/:id" element={<CameraPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </UpdateProvider>
    );
}

export default App;
