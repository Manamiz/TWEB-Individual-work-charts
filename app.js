var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

var votes = {};
votes['yes'] = 0;
votes['no'] = 0;
votes['idontknow'] = 0;

io.on('connection', function(socket) {
   console.log('A user connected');

   socket.emit('initVotes', votes);

   socket.on('yes', function() {
      votes['yes'] += 1;
      io.emit('updateVotes', votes);
   });
   socket.on('no', function() {
      votes['no'] += 1;
      io.emit('updateVotes', votes);
   });
   socket.on('idontknow', function() {
      votes['idontknow'] += 1;
      io.emit('updateVotes', votes);
   });
});



http.listen(3000, function() {
   console.log('Listening on *:3000');
});