const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const http = require('http');
const notesController = require('./controllers/notes');
const socketIO = require('socket.io');
const { setupSocketHandlers } = require('./controllers/notes');
const authController = require('./controllers/auth');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    transports: ["polling", "websocket"], 
    credentials: true,
   
  }
});

// Middleware setup
app.use(helmet());
connectDB();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);



io.use((socket, next) => {

  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  // Verify token and set user info on socket
  try {
    authController.verifyToken(token, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.user = decoded;
      next();
    });
 


    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});


io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join user's private room
  socket.on('join', (userId) => {
    if (!userId) {
      socket.emit('error', { message: 'User ID is required' });
      return;
    }
    
    // Store user info and join room
    socket.user = { id: userId };
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
    
    // Set up note-related socket handlers
    notesController.setupSocketHandlers(socket);
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
    socket.emit('error', { message: 'An error occurred' });
  });

  // Disconnection handling
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
  });
});

// Initialize Socket.IO in notes controller
notesController.setSocketIO(io);

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});