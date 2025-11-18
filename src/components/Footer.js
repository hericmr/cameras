// Footer.js
import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaVideo } from 'react-icons/fa';
import cameras from '../assets/cameras_detailed.json';
import { formatCurrentDateShort } from '../utils/dateFormatter';

function Footer() {
    const totalCameras = Object.keys(cameras).length;
    const currentDate = formatCurrentDateShort();
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-8 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-white font-semibold mb-3">Sobre o Projeto</h3>
                        <p className="text-sm text-gray-400 text-center md:text-left mb-2">
                            Sistema de monitoramento de câmeras de Santos em tempo real.
                            Desenvolvido com React e tecnologias modernas.
                        </p>
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-1 md:space-y-0 md:space-x-2 text-blue-400 text-sm">
                            <div className="flex items-center space-x-2">
                                <FaVideo />
                                <span className="text-gray-300 font-semibold">{totalCameras} câmeras</span>
                                <span className="text-gray-500">disponíveis</span>
                            </div>
                            <span className="text-gray-500 text-xs">- {currentDate}</span>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-white font-semibold mb-3">Links</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/hericmr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="GitHub"
                            >
                                <FaGithub size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={24} />
                            </a>
                            <a
                                href="mailto:contato@exemplo.com"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                                aria-label="Email"
                            >
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Credits Section */}
                    <div className="flex flex-col items-center md:items-end">
                        <h3 className="text-white font-semibold mb-3">Desenvolvido por</h3>
                        <div className="flex items-center space-x-2">
                            <FaCode className="text-gray-400" />
                            <span className="text-sm">hericmr</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            &copy; {new Date().getFullYear()} Cameras de Santos
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
