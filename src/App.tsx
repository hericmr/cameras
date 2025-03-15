import React, { useState } from 'react';
import { Navbar } from './layouts/components/Navbar';
import { Footer } from './layouts/components/Footer';
import { CameraGrid, FullScreenImage } from './features/cameras/components';
import { About } from './pages/About';
import { UpdateProvider } from './context/UpdateContext';
import { useCameras } from './features/cameras/hooks/useCameras';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const {
        isFullScreen,
        currentImage,
        currentImageTitle,
        handleImageClick,
        handlePreviousCamera,
        handleNextCamera,
        closeFullScreen,
        hasPrevious,
        hasNext
    } = useCameras();

    const handleNavClick = (page: string) => {
        setCurrentPage(page);
    };

    return (
        <UpdateProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar onNavClick={handleNavClick} />
                <main className="flex-grow">
                    {currentPage === 'home' && <CameraGrid onImageClick={handleImageClick} />}
                    {currentPage === 'about' && <About />}
                    {currentPage === 'contact' && <div className="p-4">Contato</div>}
                </main>
                {isFullScreen && (
                    <FullScreenImage
                        imageUrl={currentImage}
                        title={currentImageTitle}
                        close={closeFullScreen}
                        onPreviousCamera={handlePreviousCamera}
                        onNextCamera={handleNextCamera}
                        hasPrevious={hasPrevious}
                        hasNext={hasNext}
                    />
                )}
                <Footer />
            </div>
        </UpdateProvider>
    );
}

export default App; 