const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');

const getMenu = require('./controllers/getMenu');
const placeOrderFactory = require('./controllers/placeOrder');
const listOrders = require('./controllers/listOrders');
const updateOrderStatusFactory = require('./controllers/updateOrderStatus');
const getOrderStatus = require('./controllers/getOrderStatus');
const acceptOrderFactory = require('./controllers/acceptOrder');
const confirmPaymentFactory = require('./controllers/confirmPayment');
const getAnalytics = require('./controllers/getAnalytics');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server on /ws
const wss = new WebSocket.Server({ server, path: '/ws' });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('📡 WebSocket client connected');

  ws.on('message', (msg) => {
    console.log('💬 Message from client:', msg.toString());
  });

  ws.send(JSON.stringify({
    type: 'hello',
    message: 'Welcome to Foodie WebSocket',
  }));
});

// Inject wss into RPC handler factories
const placeOrder = placeOrderFactory(wss);
const updateOrderStatus = updateOrderStatusFactory(wss);

// JSON-RPC 2.0 handler
app.post('/rpc', async (req, res) => {
  const { method, params, id } = req.body;

  try {
    let result;

    switch (method) {
      case 'getMenu':
        result = await getMenu();
        break;
      case 'placeOrder':
        result = await placeOrder(params);
        break;
      case 'listOrders':
        result = await listOrders(params);
        break;
      case 'updateOrderStatus':
        result = await updateOrderStatus(params);
        break;
      case 'getOrderStatus':
        result = await getOrderStatus(params);
        break;
      case 'acceptOrder':
        result = await acceptOrderFactory(wss)(params);
        break;
      case 'confirmPayment':
        result = await confirmPaymentFactory()(params);
        break;
      case 'getAnalytics':
        result = await getAnalytics(params);
        break;


      default:
        return res.status(400).json({
          jsonrpc: '2.0',
          error: { code: -32601, message: 'Method not found' },
          id,
        });
    }

    res.json({ jsonrpc: '2.0', result, id });
  } catch (err) {
    console.error('❌ RPC error:', err);
    res.status(500).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Internal server error' },
      id,
    });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});




