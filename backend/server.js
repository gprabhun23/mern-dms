// Load environment variables (Concept #5: MongoDB Atlas)
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // (Concept #6: ORM - Mongoose)
const cors = require('cors');
const helmet = require('helmet'); // (Concept #17: Security)
const compression = require('compression'); // (Concept #19: Request compression)
const rateLimit = require('express-rate-limit'); // (Concept #16: Rate limiting)
const winston = require('./utils/logger'); // (Concept #13: Logging)
const redisClient = require('./utils/cache'); // (Concept #15: Caching)
const { createServer } = require('http');
const { Server } = require('socket.io'); // (Concept #14: WebSockets)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger-output.json'); // Auto-generated file
const errorHandler = require('./middlewares/errorMiddleware'); // Import error handler

// Import Routes
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express App
const app = express();
const server = createServer(app);

// WebSocket Initialization (Concept #14: WebSockets)
const io = new Server(server, { 
  cors: { 
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // ✅ Allow requests from React frontend
    credentials: true 
  } 
});

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // ✅ Allow frontend requests
    credentials: true, // ✅ Allow cookies (important for authentication)
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allowed headers
  })
); // Allow cross-origin requests

app.use(helmet()); // Secure headers (Concept #17)
app.use(compression()); // Reduce response size (Concept #19)
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// Rate Limiting (Concept #16: Rate Limiting)
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Too many requests, please try again later."
});
app.use(limiter);

// API Routes
app.use('/api/auth', authRoutes); // User authentication
app.use('/api/documents', documentRoutes); // Document management
app.use('/api/users', userRoutes); // User management

// Global Error Handler
app.use(errorHandler);

// WebSockets for Real-time Collaboration (Concept #14)
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('new-document', (document) => {
    io.emit('update-documents', document); // Broadcast to all users
  });

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});
// ✅ Auto-generated Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect to MongoDB Atlas (Concept #5)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => winston.info('MongoDB connected'))
  .catch(err => winston.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
