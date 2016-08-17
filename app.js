var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');

//Init server
server.listen(10111);
//app.use(express.static('public'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!', nVals: ["temp", "humd", "co2", "luz", "distancia", "movimiento"]});
});

app.get('/sensor/:val', function (req, res) {
  if(req.params.val === "humedad"){
  	  res.send("mojado");
  } else{
  	  res.send("404");
  }
});
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
	setTimeout(sendfake,10000);
};


//Mongo DB connection with mongoose
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("We are also connected to mongodb database"); 
	showTempVal(7,12);
});

var valuesSchema = mongoose.Schema({
	sensor:  String,
	value: String,
	date: { type: Date, default: Date.now }
});

var values = mongoose.model('values', valuesSchema);

function showTempVal(val0 , valn){
	var i = val0;
	var dateMin = new Date('2016,8,'+i);
	var dateMax = new Date('2016,8,'+(i+1));
	values.find({sensor:"temp", $and:[{ date:{$gte: dateMin}}, {date:{$lt: dateMax}}]}, function(err, values) {
		if (err) throw err;
		console.log("##################   Value: "+i+ "  "+ dateMin +" - "+dateMax);
        media(i, valn, 0, values);
	});
};
var suma =0;

function media(val0, valn, n, values){
	if (n < values.length){
        //console.log(values[n].value+"-");
        suma+=parseInt(values[n].value);
        media(val0, valn, n+1, values);
	}else{
		if(val0<valn){
			if(n>0){
			console.log("suma: "+suma+"   nValores: "+n +"   Media: "+(suma/n));
		}else{
			console.log("Sin datos");
		}
			suma =0;
			showTempVal(val0+1, valn);
		}	
	}
}

//Init fake
sendfake();