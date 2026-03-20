const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Tất cả các request bắt đầu bằng /api sẽ được proxy
    createProxyMiddleware({
      target: "http://20.197.21.221", // Địa chỉ Azure VM của Duy (đã chạy Nginx cổng 80)
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Xóa chữ /api khi gửi sang Backend nếu Backend Duy không dùng prefix /api
      },
      onProxyRes: function (proxyRes, req, res) {
        // Log để Duy kiểm tra xem Cookie có bay về không
        console.log(
          "RAW Response headers from target:",
          proxyRes.headers["set-cookie"],
        );
      },
    }),
  );
};
