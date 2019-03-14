const  events = require('events');
class Emitter extends events {
}
const myEmitter = new Emitter();
module.exports = myEmitter;
