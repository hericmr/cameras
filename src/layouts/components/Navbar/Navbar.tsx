import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
    onNavClick: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Previne scroll quando menu mobile está aberto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleNavigation = (page: string) => {
        onNavClick(page);
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-black text-white shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo e Título */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://github.com/hericmr/cameras/blob/main/public/logo.png?raw=true"
                            alt="Logo"
                            className="h-8 w-8"
                            style={{ filter: "invert(1)" }}
                        />
                        <h1
                            className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold tracking-wider hover:text-gray-200 transition duration-300"
                            style={{ fontFamily: 'Press Start 2P, sans-serif' }}
                        >
                            Câmeras de Santos
                        </h1>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={() => handleNavigation('home')}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                        >
                            <FaHome className="text-gray-400" />
                            <span>Home</span>
                        </button>
                        <button
                            onClick={() => handleNavigation('about')}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                        >
                            <FaInfoCircle className="text-gray-400" />
                            <span>Sobre</span>
                        </button>
                    </div>

                    {/* Botão Menu Mobile */}
                    <button
                        ref={buttonRef}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition duration-200 focus:outline-none"
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            <div
                ref={menuRef}
                className={`fixed inset-0 top-16 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}
            >
                <div className="flex flex-col items-center pt-8 space-y-6">
                    <button
                        onClick={() => handleNavigation('home')}
                        className="flex items-center space-x-3 px-6 py-3 w-64 rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                        <FaHome size={20} className="text-gray-400" />
                        <span className="text-lg">Home</span>
                    </button>
                    <button
                        onClick={() => handleNavigation('about')}
                        className="flex items-center space-x-3 px-6 py-3 w-64 rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                        <FaInfoCircle size={20} className="text-gray-400" />
                        <span className="text-lg">Sobre</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}; 