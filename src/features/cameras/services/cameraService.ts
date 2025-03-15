import cameras from '../../../assets/cameras.json';
import { Camera } from '../types';

export const cameraService = {
    getAllCameras: (): Camera[] => {
        return Object.values(cameras);
    },

    updateCameraUrl: (url: string): string => {
        return `${url.split("&t=")[0]}&t=${Date.now()}`;
    },

    downloadCameraImage: async (imageUrl: string): Promise<void> => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `camera-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            throw new Error('Erro ao baixar a imagem');
        }
    }
}; 