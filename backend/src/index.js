const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const getMenu = require('./controllers/getMenu');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// JSON-RPC 2.0 handler
app.post('/rpc', async (req, res) => {
  const { method, id } = req.body;

  try {
    if (method === 'getMenu') {
      const result = await getMenu(); // Calling the handler
      res.json({ jsonrpc: '2.0', result, id });
    } else {
      res.status(400).json({
        jsonrpc: '2.0',
        error: { code: -32601, message: 'Method not found' },
        id,
      });
    }
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

