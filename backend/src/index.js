const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const getMenu = require('./controllers/getMenu');
const placeOrder = require('./controllers/placeOrder');
const listOrders = require('./controllers/listOrders');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

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

      default:
        return res.status(400).json({
          jsonrpc: '2.0',
          error: { code: -32601, message: 'Method not found' },
          id,
        });
    }

    res.json({ jsonrpc: '2.0', result, id });
  } catch (err) {
    console.error('RPC error:', err);
    res.status(500).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Internal server error' },
      id,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});


