const expect = require('expect');
const { createMessage } = require('./message');

describe('Message Lib', () => {
  it('should create a message', () => {
    const o = { from: 'Mocha', text: 'Text message' };
    const msg = createMessage(o.from, o.text);

    expect(msg.from).toBe(o.from);
    expect(msg.text).toBe(o.text);
    expect(msg.createdAt).toBeA('number');
  });
});