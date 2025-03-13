import { useState, useEffect, useCallback } from 'react';

export function useImageLoader(imageUrl, refreshInterval = 5000) {
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadImage = useCallback(async () => {
        try {
            const response = await fetch(imageUrl, {
                cache: 'no-cache',
                headers: {
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (!response.ok) throw new Error('Falha ao carregar imagem');
            
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            
            setImageData(objectUrl);
            setLoading(false);
            setError(null);
            
            return objectUrl;
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, [imageUrl]);

    useEffect(() => {
        let mounted = true;
        let previousObjectUrl = null;
        let intervalId = null;

        const updateImage = async () => {
            if (!mounted) return;
            const newObjectUrl = await loadImage();
            
            // Limpa a URL anterior para evitar vazamento de memória
            if (previousObjectUrl) {
                URL.revokeObjectURL(previousObjectUrl);
            }
            previousObjectUrl = newObjectUrl;
        };

        updateImage();
        intervalId = setInterval(updateImage, refreshInterval);

        return () => {
            mounted = false;
            clearInterval(intervalId);
            if (previousObjectUrl) {
                URL.revokeObjectURL(previousObjectUrl);
            }
        };
    }, [loadImage, refreshInterval]);

    return { imageData, loading, error };
} 