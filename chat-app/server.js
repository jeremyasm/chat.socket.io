var express = require('express');
var app = express();
var http = require('http').createServer(app); // the http Server
var io = require('socket.io')(http); // initialize a new instance of socket.io by passing the http (the HTTP server) object.

// set a folder to hold static resourses, very important
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3002, function() {
  console.log('listening on *:3002');
});


io.on('connection', function(socket) {

  socket.on('join', function(name) {
    socket.nickname = name;
    io.emit('announcement', name + ' joined the chat.');
  });

  socket.on('chat message', function(msg) {
    // send a message to everyone including this socket
    // io.emit('chat message', socket.nickname, msg);

    // send a message to everyone except for a certain socket
    socket.broadcast.emit('chat message', socket.nickname, msg);

  });

});
