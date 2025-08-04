import { useEffect, useRef } from 'react';

/**
 * Custom WebSocket hook with reconnect + optional heartbeat support.
 *
 * @param {string} url - WebSocket endpoint
 * @param {object} callbacks - Event handlers
 * @param {function} callbacks.onMessage - called on message receive
 * @param {function} [callbacks.onOpen] - called on open
 * @param {function} [callbacks.onClose] - called on close
 * @param {function} [callbacks.onError] - called on error
 * @param {boolean} [heartbeat] - enable ping every 30s
 */
export function useWebSocket(
  url,
  { onMessage, onOpen, onClose, onError } = {},
  heartbeat = true
) {
  const wsRef = useRef(null);
  const reconnectRef = useRef({ attempts: 0 });
  const heartbeatIntervalRef = useRef(null);

  useEffect(() => {
    let shouldReconnect = true;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        reconnectRef.current.attempts = 0;
        if (heartbeat) {
          heartbeatIntervalRef.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: 'ping' }));
            }
          }, 30000); // every 30s
        }
        onOpen?.();
      };

      ws.onmessage = (event) => {
        onMessage?.(event);
      };

      ws.onerror = (err) => {
        console.error('[WS Error]', err);
        onError?.(err);
      };

      ws.onclose = () => {
        onClose?.();

        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
        }

        if (shouldReconnect) {
          const timeout = Math.min(10000, 1000 * 2 ** reconnectRef.current.attempts);
          console.warn(`🔁 WS reconnect in ${timeout / 1000}s`);
          setTimeout(connect, timeout);
          reconnectRef.current.attempts += 1;
        }
      };
    };

    connect();

    return () => {
      shouldReconnect = false;
      clearInterval(heartbeatIntervalRef.current);
      wsRef.current?.close();
    };
  }, [url]);
}
