// App.js
import React, { useState, useMemo } from 'react';
import { Navbar, Footer, CameraGrid, FullScreenImage } from './components';
import MinimalFilter from './components/MinimalFilter';
import About from './pages/About';
import { UpdateProvider } from './context/UpdateContext';
import cameras from './assets/cameras_detailed.json';
import { formatCurrentDate } from './utils/dateFormatter';

function App() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentImageTitle, setCurrentImageTitle] = useState(null);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const [currentCamera, setCurrentCamera] = useState(null); // Dados completos da câmera atual
    const [currentPage, setCurrentPage] = useState('home'); // Controla a página atual
    const [displayedCameraCount, setDisplayedCameraCount] = useState(null); // Contagem de câmeras exibidas (null = mostrar total)
    const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([]);
    const [sortBy, setSortBy] = useState('none');

    const camerasList = useMemo(() => Object.values(cameras), []);

    const handleImageClick = (imageData, index) => {
        setCurrentImage(imageData.url);
        setCurrentImageTitle(imageData.title);
        setCurrentCameraIndex(index);
        setCurrentCamera(camerasList[index]); // Armazena os dados completos da câmera
        setIsFullScreen(true);
    };

    const handlePreviousCamera = () => {
        const newIndex = currentCameraIndex - 1;
        const camera = camerasList[newIndex];
        setCurrentImage(camera.url);
        setCurrentImageTitle(camera.neighborhood || camera.street || camera.camera_number || "Câmera");
        setCurrentCameraIndex(newIndex);
        setCurrentCamera(camera);
    };

    const handleNextCamera = () => {
        const newIndex = currentCameraIndex + 1;
        const camera = camerasList[newIndex];
        setCurrentImage(camera.url);
        setCurrentImageTitle(camera.neighborhood || camera.street || camera.camera_number || "Câmera");
        setCurrentCameraIndex(newIndex);
        setCurrentCamera(camera);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setCurrentImage(null);
        setCurrentImageTitle(null);
        setCurrentCamera(null);
    };

    const handleNavClick = (page) => {
        setCurrentPage(page); // Atualiza a página ao clicar no menu
    };

    return (
        <UpdateProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar onNavClick={handleNavClick} />
                <main className="flex-grow">
                    {/* Exibe o conteúdo baseado na página atual */}
                    {currentPage === 'home' && (
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
                    )}
                    {currentPage === 'about' && <About />} {/* Aqui é onde o About é renderizado */}
                    {currentPage === 'contact' && <div className="p-4">Contato</div>}
                </main>
                {isFullScreen && (
                    <FullScreenImage
                        imageUrl={currentImage}
                        title={currentImageTitle}
                        close={closeFullScreen}
                        onPreviousCamera={handlePreviousCamera}
                        onNextCamera={handleNextCamera}
                        hasPrevious={currentCameraIndex > 0}
                        hasNext={currentCameraIndex < camerasList.length - 1}
                        cameraData={currentCamera}
                    />
                )}
                <Footer />
            </div>
        </UpdateProvider>
    );
}

export default App;
