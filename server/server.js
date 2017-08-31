const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const { createMessage, createLocationMessage } = require('./utils/message.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

console.log(createMessage);

io.on('connection', (socket) => {
  console.log('New user connected!');
    
  socket.emit('newMessage', createMessage('Admin', 'Wellcome to chat!'));

  socket.broadcast.emit('newMessage', createMessage('Admin', 'New user joined the chat!'));

  socket.on('createMessage', (data) => {
    console.log('Create message: ', data);

    //  sends to every connection
    io.emit('newMessage', createMessage(data.from, data.text));

    // sends to every connection but this one
    // socket.broadcast.emit('newMessage', {
    //   from: data.from,
    //   text: data.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (p) => {
    io.emit('newLocationMessage', createLocationMessage('Admin', p));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${ port }...`);
});
