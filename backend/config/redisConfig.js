const redis = require('redis');

const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' });

client.on('error', err => console.error('Redis Client Error', err));

(async () => {
    try {
        await client.connect();
        console.log('✅ Redis connected');
    } catch (err) {
        console.error('❌ Redis connection error:', err);
    }
})();
