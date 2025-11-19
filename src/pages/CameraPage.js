import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, Footer, FullScreenImage } from '../components';
import { UpdateProvider } from '../context/UpdateContext';
import cameras from '../assets/cameras_detailed.json';

function CameraPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentCamera, setCurrentCamera] = useState(null);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);

    const camerasList = useMemo(() => Object.values(cameras), []);

    useEffect(() => {
        // Busca a câmera por ID ou camera_number
        const camera = camerasList.find(c => 
            c.id === id || c.camera_number === id || c.camera_number === `CAM${id}` || c.id === id.toString()
        );

        if (camera) {
            const index = camerasList.findIndex(c => c.id === camera.id);
            setCurrentCamera(camera);
            setCurrentCameraIndex(index);
            setIsLoading(false);
        } else {
            setIsLoading(false);
            // Redireciona para home se não encontrar
            setTimeout(() => navigate('/'), 2000);
        }
    }, [id, camerasList, navigate]);

    const handlePreviousCamera = () => {
        if (currentCameraIndex > 0) {
            const newIndex = currentCameraIndex - 1;
            const camera = camerasList[newIndex];
            setCurrentCamera(camera);
            setCurrentCameraIndex(newIndex);
            // Usa replace: false para permitir navegação com botão voltar
            navigate(`/camera/${camera.id}`, { replace: false });
            // Atualiza a URL sem recarregar a página
            window.history.pushState({}, '', `/camera/${camera.id}`);
        }
    };

    const handleNextCamera = () => {
        if (currentCameraIndex < camerasList.length - 1) {
            const newIndex = currentCameraIndex + 1;
            const camera = camerasList[newIndex];
            setCurrentCamera(camera);
            setCurrentCameraIndex(newIndex);
            // Usa replace: false para permitir navegação com botão voltar
            navigate(`/camera/${camera.id}`, { replace: false });
            // Atualiza a URL sem recarregar a página
            window.history.pushState({}, '', `/camera/${camera.id}`);
        }
    };

    const closeFullScreen = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <UpdateProvider>
                <div className="min-h-screen flex flex-col bg-black">
                    <Navbar />
                    <main className="flex-grow flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                            <p>Carregando câmera...</p>
                        </div>
                    </main>
                    <Footer />
                </div>
            </UpdateProvider>
        );
    }

    if (!currentCamera) {
        return (
            <UpdateProvider>
                <div className="min-h-screen flex flex-col bg-black">
                    <Navbar />
                    <main className="flex-grow flex items-center justify-center">
                        <div className="text-white text-center">
                            <p className="text-xl mb-4">Câmera não encontrada</p>
                            <p className="text-gray-400">Redirecionando para a página inicial...</p>
                        </div>
                    </main>
                    <Footer />
                </div>
            </UpdateProvider>
        );
    }

    return (
        <UpdateProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    {/* Conteúdo vazio - a câmera será exibida em fullscreen */}
                </main>
                <FullScreenImage
                    imageUrl={currentCamera.url}
                    title={currentCamera.neighborhood || currentCamera.street || currentCamera.camera_number || "Câmera"}
                    close={closeFullScreen}
                    onPreviousCamera={handlePreviousCamera}
                    onNextCamera={handleNextCamera}
                    hasPrevious={currentCameraIndex > 0}
                    hasNext={currentCameraIndex < camerasList.length - 1}
                    cameraData={currentCamera}
                    cameraId={currentCamera.id.toString()}
                />
                <Footer />
            </div>
        </UpdateProvider>
    );
}

export default CameraPage;

