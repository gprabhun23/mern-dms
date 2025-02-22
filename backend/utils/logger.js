const winston = require('winston');

// Winston Logger (Concept #13: Logging)
module.exports = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});
