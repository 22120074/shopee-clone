const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://20.197.21.221",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      proxyTimeout: 10 * 60 * 1000,
      timeout: 10 * 60 * 1000,
      onProxyReq: (proxyReq, req, res) => {
        console.log("Sending Request to Azure:", req.method, req.url);
      },
    }),
  );
};
