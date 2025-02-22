const redis = require('redis');

// Redis Client (Concept #4: Caching)
const redisClient = redis.createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.error('Redis error:', err));

redisClient.connect().catch(console.error);

module.exports = redisClient;
