let socket = io();

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

socket.on('newMessage', (message) => {
  console.log('New Message: ', message);
  let el = $('<li></li>');
  
  console.log(el);
  
  el.text(`${ message.from }: ${ message.text }`)
  $('#messages').append(el);
});
 
socket.on('creatMessage', (message) => {
  console.log('New Message: ', message);
});

$(document).ready(() => {
  $('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val()
    }, () => {

    });
  });
});