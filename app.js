var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(10111);

console.log("hi");
app.use(express.static('public'));


function sendfake(){
	io.emit('temp', '25');
	io.emit('humd', 30+Math.floor(Math.random()*10));
	setTimeout(sendfake,5000);
	console.log('sended');
};

sendfake();