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
  
  el.text(`${ message.from }: ${ message.text }`)
  $('#messages').append(el);
});

socket.on('newLocationMessage', (message) => {
  console.log('New Message: ', message);
  let li = $('<li></li>');
  let a = $('<a target="_blank">My current location</a>');
  
  li.text(`${ message.from }: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
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

  let locationBtn = $('#sendLocation');

  locationBtn.click(() => {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
      console.log(position);
    }, (error) => {
      alert('Unable to fetch location!');
    });
  });
});