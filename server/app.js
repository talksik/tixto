var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 3000;
server.listen(port, () => console.log('serving on port: ' + port));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var exMessages = [
  {
    userId: 10,
    id: 1,
    text: "hey anyone wanna study 61A"
  },
  {
    userId: 1, // current user has an id of 1
    id: 2, // id of message itself
    text: "Yea im down"
  }
];

io.on('connection', function (socket) {
  console.log(socket.id);
  exMessages.map((msg) => {
    socket.emit('message', msg);
    console.log('sending msg by msg');
  });

  io.on('test', () => console.log('worked~'));
});
