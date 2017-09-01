const moment = require('moment');

var createMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var createLocationMessage = (from, p) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${ p.lat },${ p.lon }`,
    createdAt: moment().valueOf()
  };
};

module.exports = { createMessage, createLocationMessage };
