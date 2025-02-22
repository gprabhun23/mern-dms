const redis = require('redis');

// Load environment variables
require('dotenv').config();

// Create Redis Client using the URL from .env
const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Fetch Redis URL from environment variables
});

redisClient.on('error', (err) => console.error('❌ Redis Error:', err));

redisClient.connect()
  .then(() => console.log('🔵 Redis Connected Successfully'))
  .catch((err) => console.error('❌ Redis Connection Failed:', err));

module.exports = redisClient;
