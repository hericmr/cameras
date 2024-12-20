// App.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CameraGrid from './CameraGrid';
import FullScreenImage from './FullScreenImage';
import About from './About'; // Importa o componente About
import { UpdateProvider } from './UpdateContext'; // Importa o contexto de atualização

function App() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentPage, setCurrentPage] = useState('home'); // Controla a página atual

    const handleImageClick = (url) => {
        setCurrentImage(url);
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setCurrentImage(null);
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
                    {currentPage === 'home' && <CameraGrid onImageClick={handleImageClick} />}
                    {currentPage === 'about' && <About />} {/* Aqui é onde o About é renderizado */}
                    {currentPage === 'contact' && <div className="p-4">Contato</div>}
                </main>
                {isFullScreen && <FullScreenImage imageUrl={currentImage} close={closeFullScreen} />}
                <Footer />
            </div>
        </UpdateProvider>
    );
}

export default App;
