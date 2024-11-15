import React, { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-black text-white py-0.5 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <a href="/" className="flex items-center space-x-2">
                    <img
                        src="https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true"
                        alt="Logo"
                        className="h-6 w-6"
                        style={{ filter: "invert(1)" }}
                    />
                    <span
                        className="text-base md:text-lg font-semibold hover:text-gray-200 transition duration-300 font-cyberpunk"
                    >
                        Cameras de Santos ao vivo
                    </span>
                </a>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="block md:hidden text-white hover:text-gray-300 focus:outline-none transition duration-150"
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg>
                </button>

                <div className={`md:flex space-x-3 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <a href="/" className="block text-sm hover:text-gray-300 transition duration-150 md:inline">
                        Home
                    </a>
                    <a href="/about" className="block text-sm hover:text-gray-300 transition duration-150 md:inline">
                        Sobre
                    </a>
                    <a href="/cameratest.html" className="block text-sm hover:text-gray-300 transition duration-150 md:inline">
                        Cameratest
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
