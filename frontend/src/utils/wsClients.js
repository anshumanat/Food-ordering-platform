 
let socket;

export function connectWebSocket(onMessage) {
  socket = new WebSocket('http://localhost:4000/rpc');

  socket.onopen = () => {
    console.log('✅ WebSocket connected');

    socket.send(JSON.stringify({ type: 'ping' }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('📡 WS message:', data);

    if (onMessage) onMessage(data);
  };

  socket.onclose = () => {
    console.warn('⚠️ WebSocket disconnected');
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  return socket;
}

export function getSocket() {
  return socket;
}
