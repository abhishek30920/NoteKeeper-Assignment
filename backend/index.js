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

// Allowed origins for CORS
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "https://note-keeper-assignment-theta.vercel.app",
];

// Middleware setup
app.use(helmet());
connectDB();
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Manually set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// API Routes
app.use('/api/auth', authRoutes);


// Initialize Socket.IO with CORS
const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  // Verify token and set user info on socket
  authController.verifyToken(token, (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.user = decoded;
    next();
  });
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', (userId) => {
    if (!userId) {
      socket.emit('error', { message: 'User ID is required' });
      return;
    }
    socket.user = { id: userId };
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined their room`);
    notesController.setupSocketHandlers(socket);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
    socket.emit('error', { message: 'An error occurred' });
  });

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
