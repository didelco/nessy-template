var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');

//Init server
server.listen(10111);
app.use(express.static('public'));

// Hello to people
console.log("hello, you are now connected to the server, Wellcome!");

//Send fakes messages
function sendfake(){
	io.emit('temp', '25');
	io.emit('humd', 30+Math.floor(Math.random()*10));
	setTimeout(sendfake,5000);
	console.log('sended');
};
sendfake();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are also connected to mongodb database"); 
});


//Mongo DB connection with mongoose
mongoose.connect('mongodb://localhost/test');

var sensorSchema = new Schema({
  sensor:  String,
  value: String,
  date: { type: Date, default: Date.now }
});
var sensor = mongoose.model('sensor', sensorSchema);