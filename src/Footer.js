// Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-blue-700 text-white py-4 mt-8">
            <div className="container mx-auto flex flex-col items-center">
                <div className="space-x-4 mb-2">
                    <a href="https://www.facebook.com" className="hover:text-gray-200 transition duration-300" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com" className="hover:text-gray-200 transition duration-300" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.twitter.com" className="hover:text-gray-200 transition duration-300" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} Santos Cameras. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
