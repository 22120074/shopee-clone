// redisClient.js
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("❌ Redis Client Error", err));

// --- ĐỊNH NGHĨA LUA SCRIPT  ---
const CHECK_AND_RESERVE_SCRIPT = `
  local stock_key = KEYS[1]
  local buy_qty = tonumber(ARGV[1])
  local ttl = tonumber(ARGV[2])
  
  local current_stock = redis.call("get", stock_key)
  
  if not current_stock then
    return -2
  end
  
  if tonumber(current_stock) < buy_qty then
    return -1
  end
  
  local new_stock = redis.call("decrby", stock_key, buy_qty)
  redis.call("expire", stock_key, ttl)
  return new_stock
`;

// Đăng ký command
redis.defineCommand("reserveStock", {
  numberOfKeys: 1,
  lua: CHECK_AND_RESERVE_SCRIPT,
});

module.exports = redis;
