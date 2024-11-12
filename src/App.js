// App.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CameraGrid from './CameraGrid';
import FullScreenImage from './FullScreenImage';


function App() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const handleImageClick = (url) => {
        setCurrentImage(url);
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
        setCurrentImage(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <CameraGrid onImageClick={handleImageClick} />
            </main>
            {isFullScreen && <FullScreenImage imageUrl={currentImage} close={closeFullScreen} />}
            <Footer />
        </div>
    );
}

export default App;
