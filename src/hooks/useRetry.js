import { useState, useCallback } from 'react';

export function useRetry(maxRetries = 3, delayMs = 1000) {
    const [retryCount, setRetryCount] = useState(0);

    const retry = useCallback(async (operation) => {
        try {
            const result = await operation();
            setRetryCount(0);
            return result;
        } catch (error) {
            if (retryCount < maxRetries) {
                setRetryCount(prev => prev + 1);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                return retry(operation);
            }
            throw error;
        }
    }, [retryCount, maxRetries, delayMs]);

    return { retry, retryCount };
} 