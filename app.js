var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(10111);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
