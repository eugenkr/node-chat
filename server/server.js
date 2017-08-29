const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');
  
  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });

  socket.emit('newMessage', {
    from: 'Kiril',
    text: 'Hi there!',
    createdAt: new Date()
  });

  socket.on('createEmail', (data) => {
    console.log('Create email: ', data);
  });

  socket.on('createMessage', (data) => {
    console.log('Create message: ', data);
  });
});

server.listen(port, () => {
  console.log(`Started on port ${ port }...`);
});