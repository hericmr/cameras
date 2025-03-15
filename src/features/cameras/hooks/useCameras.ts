import { useState, useMemo } from 'react';
import { CameraClickData, CamerasState } from '../types';
import { cameraService } from '../services/cameraService';

export const useCameras = () => {
    const [state, setState] = useState<CamerasState>({
        isFullScreen: false,
        currentImage: null,
        currentImageTitle: null,
        currentCameraIndex: 0
    });

    const camerasList = useMemo(() => cameraService.getAllCameras(), []);

    const handleImageClick = (imageData: CameraClickData, index: number) => {
        setState({
            isFullScreen: true,
            currentImage: imageData.url,
            currentImageTitle: imageData.title,
            currentCameraIndex: index
        });
    };

    const handlePreviousCamera = () => {
        const newIndex = state.currentCameraIndex - 1;
        const camera = camerasList[newIndex];
        setState({
            ...state,
            currentImage: camera.url,
            currentImageTitle: camera.lugar,
            currentCameraIndex: newIndex
        });
    };

    const handleNextCamera = () => {
        const newIndex = state.currentCameraIndex + 1;
        const camera = camerasList[newIndex];
        setState({
            ...state,
            currentImage: camera.url,
            currentImageTitle: camera.lugar,
            currentCameraIndex: newIndex
        });
    };

    const closeFullScreen = () => {
        setState({
            ...state,
            isFullScreen: false,
            currentImage: null,
            currentImageTitle: null
        });
    };

    return {
        ...state,
        camerasList,
        handleImageClick,
        handlePreviousCamera,
        handleNextCamera,
        closeFullScreen,
        hasPrevious: state.currentCameraIndex > 0,
        hasNext: state.currentCameraIndex < camerasList.length - 1
    };
}; 