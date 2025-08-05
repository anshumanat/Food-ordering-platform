export async function rpcCall(
  method,
  params = {},
  options = {}
) {
  const {
    timeout = 5000,
    retries = 2,
    signal: externalSignal,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const signal = externalSignal || controller.signal;

  const body = {
    jsonrpc: '2.0',
    method,
    params,
    id: Date.now(),
  };

  let attempt = 0;
  let lastError;

  while (attempt <= retries) {
    try {
      const res = await fetch('https://foodie-1-o9h9.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal,
      });

      clearTimeout(timeoutId);

      const json = await res.json();

      if (json.error) {
        throw new Error(json.error.message || 'RPC error');
      }

      return json.result;
    } catch (err) {
      lastError = err;

      if (err.name === 'AbortError') throw new Error('Request timed out');
      if (attempt === retries) throw lastError;

      attempt++;
      await new Promise((r) => setTimeout(r, 300 * attempt)); // retry delay
    }
  }

  throw lastError;
}
