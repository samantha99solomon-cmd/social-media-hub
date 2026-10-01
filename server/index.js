const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-hub')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/social-handles', require('./routes/socialHandles'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/reminders', require('./routes/reminders'));

// Socket.IO Events for Real-time Chat
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join-group', (groupId) => {
    socket.join(groupId);
    io.to(groupId).emit('user-joined', { userId: socket.id });
  });

  socket.on('send-message', (data) => {
    io.to(data.groupId).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
