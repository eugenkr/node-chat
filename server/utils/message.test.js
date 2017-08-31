const expect = require('expect');
const { createMessage, createLocationMessage } = require('./message');

describe('Message Lib', () => {
  it('should create a message', () => {
    const o = { from: 'Mocha', text: 'Text message' };
    const msg = createMessage(o.from, o.text);

    expect(msg.from).toBe(o.from);
    expect(msg.text).toBe(o.text);
    expect(msg.createdAt).toBeA('number');
  });

  it('should create a location message', () => {
    const o = { from: 'Mocha', p: { lat: 1, lon: 1 }};
    const msg = createLocationMessage(o.from, o.p);
    const url =`https://www.google.com/maps?q=${ o.p.lat },${ o.p.lon }` 
    
    expect(msg.from).toBe(o.from);
    expect(msg.url).toBe(url);
  });
});