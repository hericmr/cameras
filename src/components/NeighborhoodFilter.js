import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

function NeighborhoodFilter({ cameras, onFilterChange, onSortChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sortBy, setSortBy] = useState('neighborhood'); // 'neighborhood' or 'none'

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

    const handleNeighborhoodToggle = (neighborhood) => {
        setSelectedNeighborhoods(prev => {
            const isSelected = prev.includes(neighborhood);
            const newSelection = isSelected
                ? prev.filter(n => n !== neighborhood)
                : [...prev, neighborhood];
            
            // Notifica o componente pai sobre a mudança
            onFilterChange(newSelection);
            return newSelection;
        });
    };

    const handleSelectAll = () => {
        if (selectedNeighborhoods.length === filteredNeighborhoods.length) {
            // Desmarcar todos
            setSelectedNeighborhoods([]);
            onFilterChange([]);
        } else {
            // Marcar todos os filtrados
            setSelectedNeighborhoods(filteredNeighborhoods);
            onFilterChange(filteredNeighborhoods);
        }
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
        <div className="bg-gray-900 border-b border-gray-800 py-4 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    {/* Botão de filtro */}
                    <div className="relative flex-shrink-0">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                            <FaFilter />
                            <span className="hidden sm:inline">Filtrar por Bairros</span>
                            <span className="sm:hidden">Filtrar</span>
                            {selectedNeighborhoods.length > 0 && (
                                <span className="bg-blue-800 text-xs px-2 py-0.5 rounded-full">
                                    {selectedNeighborhoods.length}
                                </span>
                            )}
                        </button>

                        {/* Dropdown de filtros */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden flex flex-col">
                                {/* Cabeçalho */}
                                <div className="p-4 border-b border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-white font-semibold">Selecionar Bairros</h3>
                                        <button
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                    
                                    {/* Busca */}
                                    <div className="relative">
                                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Buscar bairro..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    {/* Botões de ação */}
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            onClick={handleSelectAll}
                                            className="flex-1 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                        >
                                            {selectedNeighborhoods.length === filteredNeighborhoods.length ? 'Desmarcar Todos' : 'Marcar Todos'}
                                        </button>
                                        {selectedNeighborhoods.length > 0 && (
                                            <button
                                                onClick={handleClearAll}
                                                className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                                            >
                                                Limpar
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Lista de bairros */}
                                <div className="overflow-y-auto flex-1">
                                    {filteredNeighborhoods.length === 0 ? (
                                        <div className="p-4 text-center text-gray-400">
                                            Nenhum bairro encontrado
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            {filteredNeighborhoods.map(neighborhood => {
                                                const isSelected = selectedNeighborhoods.includes(neighborhood);
                                                const count = cameras.filter(c => c.neighborhood === neighborhood).length;
                                                
                                                return (
                                                    <label
                                                        key={neighborhood}
                                                        className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleNeighborhoodToggle(neighborhood)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500"
                                                        />
                                                        <span className="flex-1 text-white text-sm">
                                                            {neighborhood}
                                                        </span>
                                                        <span className="text-gray-400 text-xs">
                                                            ({count})
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Rodapé com contagem */}
                                <div className="p-3 border-t border-gray-700 bg-gray-900">
                                    <div className="text-xs text-gray-400 text-center">
                                        {selectedNeighborhoods.length > 0 ? (
                                            <span>
                                                {selectedNeighborhoods.length} bairro(s) selecionado(s)
                                            </span>
                                        ) : (
                                            <span>Todos os bairros visíveis</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ordenação */}
                    <div className="flex items-center space-x-2">
                        <label className="text-gray-300 text-sm">Ordenar:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="none">Padrão</option>
                            <option value="neighborhood">Por Bairro</option>
                        </select>
                    </div>

                    {/* Indicador de filtros ativos */}
                    {selectedNeighborhoods.length > 0 && (
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                            <span>Filtrado:</span>
                            <div className="flex flex-wrap gap-2">
                                {selectedNeighborhoods.slice(0, 3).map(neighborhood => (
                                    <span
                                        key={neighborhood}
                                        className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs"
                                    >
                                        {neighborhood}
                                    </span>
                                ))}
                                {selectedNeighborhoods.length > 3 && (
                                    <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs">
                                        +{selectedNeighborhoods.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

NeighborhoodFilter.propTypes = {
    cameras: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default NeighborhoodFilter;


