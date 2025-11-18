import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

function MinimalFilter({ cameras, onFilterChange, onSortChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortBy, setSortBy] = useState('none');
    const dropdownRef = useRef(null);

    // Extrai bairros únicos e ordena
    const neighborhoods = useMemo(() => {
        const uniqueNeighborhoods = new Set();
        cameras.forEach(camera => {
            if (camera.neighborhood && camera.neighborhood.trim()) {
                uniqueNeighborhoods.add(camera.neighborhood.trim());
            }
        });
        return Array.from(uniqueNeighborhoods).sort();
    }, [cameras]);

    // Filtra bairros baseado na busca
    const filteredNeighborhoods = useMemo(() => {
        if (!searchTerm) return neighborhoods;
        return neighborhoods.filter(neighborhood =>
            neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [neighborhoods, searchTerm]);

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleNeighborhoodToggle = (neighborhood) => {
        setSelectedNeighborhoods(prev => {
            const isSelected = prev.includes(neighborhood);
            const newSelection = isSelected
                ? prev.filter(n => n !== neighborhood)
                : [...prev, neighborhood];
            
            onFilterChange(newSelection);
            return newSelection;
        });
    };

    const handleClearAll = () => {
        setSelectedNeighborhoods([]);
        setSearchTerm('');
        onFilterChange([]);
    };

    const handleSortChange = (newSort) => {
        setSortBy(newSort);
        onSortChange(newSort);
    };

    return (
        <div className="flex items-center gap-3" ref={dropdownRef}>
            {/* Botão de Filtro Minimalista */}
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200 border border-gray-700/50"
                    title="Filtrar por bairros"
                >
                    <FaFilter className="text-xs" />
                    {selectedNeighborhoods.length > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            {selectedNeighborhoods.length}
                        </span>
                    )}
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Minimalista */}
                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 max-h-[500px] flex flex-col">
                        {/* Cabeçalho Compacto */}
                        <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                            <h3 className="text-white text-sm font-medium">Bairros</h3>
                            <div className="flex items-center gap-2">
                                {selectedNeighborhoods.length > 0 && (
                                    <button
                                        onClick={handleClearAll}
                                        className="text-xs text-gray-400 hover:text-white transition-colors"
                                    >
                                        Limpar
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaTimes className="text-xs" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Busca Compacta */}
                        <div className="p-3 border-b border-gray-700">
                            <div className="relative">
                                <FaSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Lista de Bairros Compacta */}
                        <div className="overflow-y-auto flex-1 p-2">
                            {filteredNeighborhoods.length === 0 ? (
                                <div className="p-3 text-center text-gray-400 text-sm">
                                    Nenhum bairro encontrado
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {filteredNeighborhoods.map(neighborhood => {
                                        const isSelected = selectedNeighborhoods.includes(neighborhood);
                                        const count = cameras.filter(c => c.neighborhood === neighborhood).length;
                                        
                                        return (
                                            <label
                                                key={neighborhood}
                                                className="flex items-center gap-2 p-1.5 hover:bg-gray-800 rounded cursor-pointer transition-colors group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleNeighborhoodToggle(neighborhood)}
                                                    className="w-3.5 h-3.5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                                />
                                                <span className="flex-1 text-white text-xs group-hover:text-blue-300 transition-colors">
                                                    {neighborhood}
                                                </span>
                                                <span className="text-gray-500 text-xs">
                                                    {count}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Ordenação Minimalista */}
            <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-2.5 py-1.5 text-sm bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/70 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
                <option value="none">Padrão</option>
                <option value="neighborhood">Por Bairro</option>
            </select>

            {/* Indicador de Filtros Ativos (Minimalista) */}
            {selectedNeighborhoods.length > 0 && (
                <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-400">
                    <span>•</span>
                    <span className="text-gray-300">{selectedNeighborhoods.length} bairro{selectedNeighborhoods.length !== 1 ? 's' : ''}</span>
                </div>
            )}
        </div>
    );
}

MinimalFilter.propTypes = {
    cameras: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default MinimalFilter;

