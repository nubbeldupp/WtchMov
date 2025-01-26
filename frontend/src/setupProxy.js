const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy WebSocket connections
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      changeOrigin: true,
    })
  );

  // Proxy API requests
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend:4000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // no rewrite needed
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).json({ error: 'Proxy Error', details: err.message });
      },
    })
  );
};
