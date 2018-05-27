var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'nexto'
});

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
  console.log('Client connected: ' + socket.id);
  console.log(socket.handshake.jsonp);
  
  con.query('SELECT * FROM messages;', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    socket.emit('initMessages', result);
    console.log('sent all initial messages');
  });

  //io.on('test', () => console.log('worked~')); // test with web page

  socket.on('newMessage', function(msg) {
    io.emit('newMessage', msg);
  });

  socket.on('disconnect', function() {
    console.log('Client disconnected: ' + socket.id);
  });
});
