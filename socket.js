import express from './node_modules/express/index.js';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from './node_modules/socket.io/dist/index.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(join(''));
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Example: Receiving a message from the client
    socket.on('message', (data) => {
      console.log('Message received:', data);
  
      // Broadcast the message to other connected clients
      io.emit('message', data)
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

server.listen(3000, () => {
    console.log('server running at http://192.168.1.141:3000');
});