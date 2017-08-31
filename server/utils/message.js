var createMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var createLocationMessage = (from, p) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${ p.lat },${ p.lon }`,
    createdAt: new Date().getTime()
  };
};

module.exports = { createMessage, createLocationMessage };
