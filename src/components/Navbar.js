import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Navbar({ onNavClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-black text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center space-x-2">
                    <img
                        src="https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true"
                        alt="Logo"
                        className="h-8 w-8"
                        style={{ filter: "invert(1)" }}
                    />
                    <h1
                        className="text-sm sm:text-base md:text-2xl lg:text-4xl font-bold tracking-widest hover:text-gray-200 transition duration-300"
                        style={{ fontFamily: 'Press Start 2P, sans-serif' }}
                    >
                        Câmeras de Santos ao vivo
                    </h1>
                </div>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white hover:text-gray-300 focus:outline-none"
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    <svg 
                        className="h-6 w-6" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} 
                        />
                    </svg>
                </button>

                <div className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <button
                        className="block text-sm hover:text-gray-300 transition duration-150 md:inline"
                        onClick={() => onNavClick('home')}
                    >
                        Home
                    </button>
                    <button
                        className="block text-sm hover:text-gray-300 transition duration-150 md:inline"
                        onClick={() => onNavClick('about')}
                    >
                        Sobre o site
                    </button>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    onNavClick: PropTypes.func.isRequired
};

export default Navbar;
