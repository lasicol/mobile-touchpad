const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { X11Class } = require('addon-x11');

const X11Obj = new X11Class();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('move', function({x, y}){
    X11Obj.moveCursor(x, y);
  });
  socket.on('btn', function({buttonNum, press}){
    X11Obj.mouseButton(buttonNum, press);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});