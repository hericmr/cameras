export interface Camera {
    id: string;
    url: string;
    camera_number?: string;
    original_id?: string;
    latitude?: string;
    longitude?: string;
    utm_x?: string;
    utm_y?: string;
    street?: string;
    intersection?: string;
    neighborhood?: string;
    camera_type?: string;
    status?: string;
    status_id?: string;
    organizational_unit?: string;
    installation_date?: string;
    is_active?: string;
    is_public?: string;
    is_santos_aovivo?: string;
    created_at?: string;
    updated_at?: string;
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