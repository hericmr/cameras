import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaVideo, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { getCameraDataByUrl } from '../utils/csvParser';

function CameraDetails({ imageUrl, onClose, cameraData: providedCameraData }) {
  const [cameraData, setCameraData] = useState(providedCameraData || null);
  const [loading, setLoading] = useState(!providedCameraData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se os dados já foram fornecidos, não precisa buscar
    if (providedCameraData) {
      setCameraData(providedCameraData);
      setLoading(false);
      return;
    }

    // Caso contrário, busca do CSV como fallback
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getCameraDataByUrl(imageUrl);
        if (data) {
          setCameraData(data);
          setError(null);
        } else {
          setError('Informações da câmera não encontradas');
        }
      } catch (err) {
        setError('Erro ao carregar informações da câmera');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [imageUrl, providedCameraData]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatBoolean = (value) => {
    return value.toLowerCase() === 'true';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10001]">
        <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <p className="text-white text-center mt-4">Carregando informações...</p>
        </div>
      </div>
    );
  }

  if (error || !cameraData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10001]" onClick={onClose}>
        <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Informações da Câmera</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <p className="text-red-400">{error || 'Informações não disponíveis'}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[10001] overflow-y-auto p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {cameraData.camera_number}
            </h2>
            <p className="text-gray-400 text-sm">ID: {cameraData.id} | Original ID: {cameraData.original_id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Fechar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            cameraData.status === 'Em Funcionamento' 
              ? 'bg-green-900/50 text-green-300 border border-green-700' 
              : 'bg-red-900/50 text-red-300 border border-red-700'
          }`}>
            {cameraData.status === 'Em Funcionamento' ? (
              <FaCheckCircle className="text-green-400" />
            ) : (
              <FaTimesCircle className="text-red-400" />
            )}
            <span className="font-medium">{cameraData.status}</span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400" />
              Localização
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Rua:</span>
                <span className="text-white ml-2">{cameraData.street || 'Não informado'}</span>
              </div>
              {cameraData.intersection && (
                <div>
                  <span className="text-gray-400">Interseção:</span>
                  <span className="text-white ml-2">{cameraData.intersection}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400">Bairro:</span>
                <span className="text-white ml-2">{cameraData.neighborhood || 'Não informado'}</span>
              </div>
              <div>
                <span className="text-gray-400">Coordenadas:</span>
                <span className="text-white ml-2 text-xs">
                  {cameraData.latitude}, {cameraData.longitude}
                </span>
              </div>
              <div>
                <span className="text-gray-400">UTM:</span>
                <span className="text-white ml-2 text-xs">
                  X: {cameraData.utm_x}, Y: {cameraData.utm_y}
                </span>
              </div>
            </div>
          </div>

          {/* Camera Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaVideo className="text-purple-400" />
              Informações da Câmera
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white ml-2">{cameraData.camera_type || 'Não informado'}</span>
              </div>
              {cameraData.organizational_unit && (
                <div>
                  <span className="text-gray-400">Unidade Organizacional:</span>
                  <span className="text-white ml-2">{cameraData.organizational_unit}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400">Status ID:</span>
                <span className="text-white ml-2">{cameraData.status_id}</span>
              </div>
            </div>
          </div>

          {/* Installation & Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-400" />
              Datas
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Data de Instalação:</span>
                <span className="text-white ml-2">{formatDate(cameraData.installation_date)}</span>
              </div>
              <div>
                <span className="text-gray-400">Criado em:</span>
                <span className="text-white ml-2">{formatDate(cameraData.created_at)}</span>
              </div>
              <div>
                <span className="text-gray-400">Atualizado em:</span>
                <span className="text-white ml-2">{formatDate(cameraData.updated_at)}</span>
              </div>
            </div>
          </div>

          {/* Flags & Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FaBuilding className="text-green-400" />
              Status e Configurações
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                {formatBoolean(cameraData.is_active) ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
                <span className="text-gray-400">Ativa:</span>
                <span className={`ml-2 ${formatBoolean(cameraData.is_active) ? 'text-green-400' : 'text-red-400'}`}>
                  {formatBoolean(cameraData.is_active) ? 'Sim' : 'Não'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {formatBoolean(cameraData.is_public) ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
                <span className="text-gray-400">Pública:</span>
                <span className={`ml-2 ${formatBoolean(cameraData.is_public) ? 'text-green-400' : 'text-red-400'}`}>
                  {formatBoolean(cameraData.is_public) ? 'Sim' : 'Não'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {formatBoolean(cameraData.is_santos_aovivo) ? (
                  <FaCheckCircle className="text-green-400" />
                ) : (
                  <FaTimesCircle className="text-red-400" />
                )}
                <span className="text-gray-400">Santos Ao Vivo:</span>
                <span className={`ml-2 ${formatBoolean(cameraData.is_santos_aovivo) ? 'text-green-400' : 'text-red-400'}`}>
                  {formatBoolean(cameraData.is_santos_aovivo) ? 'Sim' : 'Não'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

CameraDetails.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  cameraData: PropTypes.object,
};

export { CameraDetails };
export default CameraDetails;

