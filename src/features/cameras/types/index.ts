export interface Camera {
    url: string;
    lugar: string;
}

export interface CameraClickData {
    url: string;
    title: string;
}

export interface CamerasState {
    isFullScreen: boolean;
    currentImage: string | null;
    currentImageTitle: string | null;
    currentCameraIndex: number;
} 