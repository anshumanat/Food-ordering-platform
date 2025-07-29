const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

app.use(express.json());

app.post('/rpc', (req, res) => {
  res.json({ jsonrpc: '2.0', id: req.body.id, result: 'pong' });
});

wss.on('connection', ws => {
  ws.send(JSON.stringify({ event: 'connected' }));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`RPC on http://localhost:${PORT}/rpc`);
  console.log(`WS on ws://localhost:${PORT}/ws`);
});
