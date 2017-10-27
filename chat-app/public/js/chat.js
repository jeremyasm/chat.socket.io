window.onload = function() {
var socket = io();

socket.on('connect', function() {

  console.log("connect event...")

  // send nickname via join events
  socket.emit('join', prompt('What is your nickname?'));

  // show chat window
  document.getElementById('chat').style.display = 'block';

  // socket.on('announcement', function(msg) {
  //   var li = document.createElement('li');
  //   li.className = 'announcement';
  //   li.innerHTML = msg;
  //   document.getElementById('messages').appendChild(li);
  // });

});

socket.on('announcement', addAnnouncement);

// add messages sent by others to chat field by invoking addMessage
socket.on('chat message', addMessage);


var input = document.getElementById('inputBox');
document.getElementById('form').onsubmit = function() {
  // add message sent by "me" to chat field
  addMessage('me', input.value);
  socket.emit('chat message', input.value);

  // reset the input field
  input.value = '';
  input.focus();

  return false;
}

function addMessage(from, text) {

  console.log("chat message event");

  var li = document.createElement('li');
  li.className = 'message';
  li.innerHTML = '<b>' + from + '</b>: ' + text;
  document.getElementById('messages').appendChild(li);
}

function addAnnouncement(msg) {
  var li = document.createElement('li');
  li.className = 'announcement';
  li.innerHTML = msg;
  document.getElementById('messages').appendChild(li);
}

}
