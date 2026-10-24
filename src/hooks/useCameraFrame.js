import { useState, useEffect, useRef, useCallback } from 'react';

// O servidor da prefeitura responde 503 quando recebe muitas requisições ao mesmo
// tempo, então todas as câmeras compartilham uma fila com poucas requisições simultâneas.
const MAX_CONCURRENT = 4;
const REQUEST_TIMEOUT = 15000;
// Falhas seguidas antes de considerar a câmera sem sinal
const MAX_FAILURES = 3;
const RETRY_DELAY = 1500;

// Quando o servidor recusa, todas as câmeras esperam juntas (1s, 2s, 4s... até 30s)
const MAX_BACKOFF = 30000;

let activeRequests = 0;
const queue = [];
let pausedUntil = 0;
let backoff = 0;
let pumpTimer = null;

function createRelease() {
    let released = false;
    return () => {
        if (released) return;
        released = true;
        activeRequests--;
        pump();
    };
}

function reportResult(ok) {
    if (ok) {
        backoff = 0;
        return;
    }
    // Várias requisições simultâneas falhando contam como uma só rodada
    if (Date.now() < pausedUntil) return;
    backoff = Math.min(backoff ? backoff * 2 : 1000, MAX_BACKOFF);
    pausedUntil = Date.now() + backoff;
}

function pump() {
    const wait = pausedUntil - Date.now();
    if (wait > 0) {
        if (!pumpTimer) {
            pumpTimer = setTimeout(() => {
                pumpTimer = null;
                pump();
            }, wait);
        }
        return;
    }
    while (activeRequests < MAX_CONCURRENT && queue.length) {
        activeRequests++;
        queue.shift()(createRelease());
    }
}

function schedule(task) {
    queue.push(task);
    pump();
}

// Remove qualquer query string existente (incluindo ?t=, &t=, etc)
const getBaseUrl = (url) => url.split('?')[0];

// Carrega quadros da câmera em segundo plano e devolve o próprio elemento <img>
// já carregado, para ser exibido sem pedir a imagem de novo ao servidor (uma
// segunda requisição pode levar 503 e deixar a imagem quebrada). Uma falha
// mantém o último quadro bom na tela.
export function useCameraFrame(url, { enabled = true, interval = 6000 } = {}) {
    const [frame, setFrame] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const urlRef = useRef(url);
    const inFlightRef = useRef(null);
    const hasFrameRef = useRef(false);
    const failuresRef = useRef(0);
    const retryTimeoutRef = useRef(null);

    const loadFrame = useCallback(() => {
        // Não empilha requisições se o servidor estiver lento
        if (inFlightRef.current) return;

        const requestedFor = url;
        const token = {};
        inFlightRef.current = token;

        schedule((done) => {
            // Cancelado enquanto esperava na fila (saiu da tela, trocou de câmera...)
            if (inFlightRef.current !== token || urlRef.current !== requestedFor) {
                done();
                return;
            }

            const frameUrl = `${getBaseUrl(url)}?t=${Date.now()}`;
            const img = new Image();
            let settled = false;

            const finish = () => {
                if (settled) return false;
                settled = true;
                clearTimeout(timeoutId);
                done();
                if (inFlightRef.current === token) inFlightRef.current = null;
                // Ignora respostas de uma câmera anterior (ex.: após navegar para a próxima)
                return urlRef.current === requestedFor;
            };

            img.onload = () => {
                reportResult(true);
                if (!finish()) return;
                hasFrameRef.current = true;
                failuresRef.current = 0;
                setFrame(img);
                setError(false);
                setIsLoading(false);
            };
            img.onerror = () => {
                if (settled) return;
                reportResult(false);
                if (!finish()) return;
                failuresRef.current++;
                if (failuresRef.current >= MAX_FAILURES) {
                    setError(true);
                    setIsLoading(false);
                } else if (!hasFrameRef.current) {
                    // Ainda sem nenhuma imagem: tenta de novo logo, sem esperar o intervalo
                    retryTimeoutRef.current = setTimeout(loadFrame, RETRY_DELAY * failuresRef.current);
                }
            };
            const timeoutId = setTimeout(() => img.onerror(), REQUEST_TIMEOUT);
            img.src = frameUrl;
        });
    }, [url]);

    // Reinicia o estado quando a câmera muda
    useEffect(() => {
        urlRef.current = url;
        inFlightRef.current = null;
        hasFrameRef.current = false;
        failuresRef.current = 0;
        setFrame(null);
        setError(false);
        return () => {
            urlRef.current = null;
        };
    }, [url]);

    useEffect(() => {
        if (!enabled) return;

        loadFrame();
        const intervalId = setInterval(loadFrame, interval);
        return () => {
            clearInterval(intervalId);
            clearTimeout(retryTimeoutRef.current);
            inFlightRef.current = null;
        };
    }, [enabled, interval, loadFrame]);

    const refresh = useCallback(() => {
        setIsLoading(true);
        clearTimeout(retryTimeoutRef.current);
        inFlightRef.current = null;
        loadFrame();
    }, [loadFrame]);

    return { frame, isLoading: isLoading || (enabled && !frame && !error), error, refresh };
}
