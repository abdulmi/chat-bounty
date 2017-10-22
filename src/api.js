import openSocket from 'socket.io-client';
const port = 3000;
const  socket = openSocket(`http://localhost:${port}`);

function recieveMessage(cb) {
  console.log('called')
  socket.on('new_message', message => {
    console.log('getting message from server')
    console.log(message)
    cb(null, {name:socket.name, message})
  });
}

function sendMessage(message,cb) {
  socket.emit('send_message', message)
}
export { recieveMessage, sendMessage };
