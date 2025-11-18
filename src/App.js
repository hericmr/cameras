// App.js
import React, { useState, useMemo } from 'react';
import { Navbar, Footer, CameraGrid, FullScreenImage } from './components';
import About from './pages/About';
import { UpdateProvider } from './context/UpdateContext';
import cameras from './assets/cameras.json';

function App() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentImageTitle, setCurrentImageTitle] = useState(null);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState('home'); // Controla a página atual

    const camerasList = useMemo(() => Object.values(cameras), []);

    const handleImageClick = (imageData, index) => {
        setCurrentImage(imageData.url);
        setCurrentImageTitle(imageData.title);
        setCurrentCameraIndex(index);
        setIsFullScreen(true);
    };

    const handlePreviousCamera = () => {
        const newIndex = currentCameraIndex - 1;
        const camera = camerasList[newIndex];
        setCurrentImage(camera.url);
        setCurrentImageTitle(camera.lugar);
        setCurrentCameraIndex(newIndex);
    };

    const handleNextCamera = () => {
        const newIndex = currentCameraIndex + 1;
        const camera = camerasList[newIndex];
        setCurrentImage(camera.url);
        setCurrentImageTitle(camera.lugar);
        setCurrentCameraIndex(newIndex);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setCurrentImage(null);
        setCurrentImageTitle(null);
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
                            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-b border-gray-800 py-4">
                                <div className="container mx-auto px-4">
                                    <div className="flex items-center justify-center space-x-3">
                                        <span className="text-gray-300 text-sm md:text-base">
                                            Monitorando <strong className="text-white font-semibold">{camerasList.length} câmeras</strong> em tempo real
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <CameraGrid onImageClick={handleImageClick} />
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
                    />
                )}
                <Footer />
            </div>
        </UpdateProvider>
    );
}

export default App;
