const express = require('express')
const router = express.Router();
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const moment = require('moment')

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let interval
let messageId = 0

io.sockets.on('connection', (socket) => {
  console.log(`new connection id: ${socket.id}`);

  if(interval){
    clearInterval(interval)
  }

  interval = setInterval(() => {
  sendData(socket);
  }, 1000)

  socket.on('disconnect', () => {
      console.log('Disconnected');
      clearInterval(interval)
  })
})

router.get('*', (req, res) => {
  res.send('Server is running');
});

app.use(cors());
app.use(router);
server.listen(PORT, () => console.log('Server is running on port', PORT));

function randomInteger(min, max) {
  return (Math.random() * (max - min + 1)) + min;
}

function sendData(socket) {
  const payload = {
    messageId:messageId++,
    device:"vertical-farm",
    temperature: randomInteger(22,25),
    humidity: randomInteger(60, 65),
    watertemperature: randomInteger(22, 23),
    waterevel: randomInteger(37,38),
    ph: randomInteger(5,6),
    tds: randomInteger(1100, 1150),
    pump:true,
    led: true,
    date: moment().format('YYYY-MM-DDTHH:mm:ssZ')
 }

 socket.emit('payload', payload)
}