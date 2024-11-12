// Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-black text-white py-4 mt-8">
            <div className="container mx-auto flex flex-col items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Cameras de Santos, feito por hericmr.</p>
            </div>
        </footer>
    );
}

export default Footer;
