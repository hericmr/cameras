// Navbar.js
import React from 'react';

function Navbar() {
    return (
        <nav className="bg-black text-white py-0.5 shadow-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logotipo com filtro invertido aplicado em CSS inline */}
                <a href="/" className="flex items-center space-x-2">
                    <img
                        src="../public/logo.png?raw=true"
                        alt="Logo"
                        className="h-6 w-6"
                        style={{ filter: "invert(1)" }} // Aplica a inversão de cores
                    />
                    <span className="text-lg font-semibold hover:text-gray-200 transition duration-300">
                        Santos Cameras
                    </span>
                </a>
                <div className="space-x-3">
                    <a href="/" className="text-sm hover:text-gray-300 transition duration-150">Home</a>
                    <a href="/about" className="text-sm hover:text-gray-300 transition duration-150">Sobre</a>
                    <a href="/contact" className="text-sm hover:text-gray-300 transition duration-150">Contato</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
