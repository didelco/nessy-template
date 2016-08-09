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
	var fakeTemp = Math.floor(19.3 + (Math.random()*10));
	var fakeHumd = 30+Math.floor(Math.random()*10);
	io.emit('temp', fakeTemp);
	io.emit('humd', fakeHumd);
	var t = new values({ 
		sensor: 'temp',
		value:fakeTemp
	});
	var h = new values({ 
		sensor: 'humd',
		value:fakeHumd
	});

	t.save(function (err, t) {
		if (err) return console.error(err);
		console.log("temp saved")
	});

	h.save(function (err, t) {
		if (err) return console.error(err);
		console.log("humd saved")
	});

	console.log('sended');
	setTimeout(sendfake,5000);
};


//Mongo DB connection with mongoose
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("We are also connected to mongodb database"); 
});


var valuesSchema = mongoose.Schema({
	sensor:  String,
	value: String,
	date: { type: Date, default: Date.now }
});

var values = mongoose.model('values', valuesSchema);


//Init fake
sendfake();