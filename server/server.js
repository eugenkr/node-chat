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
    
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Wellcome to chat!',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined the chat!',
    createdAt: new Date().getTime()
  });
  
  socket.on('createMessage', (data) => {
    console.log('Create message: ', data);

    //  sends to every connection
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    });

    // sends to every connection but this one
    // socket.broadcast.emit('newMessage', {
    //   from: data.from,
    //   text: data.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected!');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${ port }...`);
});
