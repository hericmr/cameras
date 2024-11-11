// Title.js
import React from 'react';

const Title = () => {
    return (
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center items-center h-auto p-4">
            <h1 className="text-5xl font-bold text-white text-center  p-1 rounded-lg 
                md:text-6xl lg:text-7xl 
                bg-black bg-opacity-50 
                text-shadow-[2px_2px_6px_#000000]">
                Imagens ao Vivo de Santos
            </h1>
        </div>
    );
};

export default Title;
