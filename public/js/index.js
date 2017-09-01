let socket = io();

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server!');
});

socket.on('newMessage', (message) => {
  let date = moment(message.createdAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: date
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
  let date = moment(message.createdAt).format('h:mm a');
  let template = $('#location-message-template').html();
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: date
  });

  $('#messages').append(html);
});
 
socket.on('creatMessage', (message) => {
  console.log('New Message: ', message);
});

$(document).ready(() => {
  $('#message-form').on('submit', (e) => {
    e.preventDefault();
    
    let el = $('[name=message]'); 
    socket.emit('createMessage', {
      from: 'User',
      text: el.val()
    }, () => {
      el.val('');
    });
  });

  let locationBtn = $('#sendLocation');

  locationBtn.click(() => {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser!')
    }

    locationBtn
      .attr('disabled', 'disabled')
      .text('Sending...');

    navigator.geolocation.getCurrentPosition((position) => {
      locationBtn
        .removeAttr('disabled')
        .text('Send location');
      
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
      console.log(position);
    }, (error) => {
      locationBtn
        .removeAttr('disabled'
        .text('Send location')); 
      
      alert('Unable to fetch location!');
    });
  });
});