  var socket = io();
  socket.on('temp', function(msg){
  	console.log("temperature "+msg);
  	$('.temp').text(msg);
  });
  socket.on('humd', function(msg){
  	console.log("Humidity "+msg);
  	$('.humd').text(msg);
  });
  socket.on('light', function(msg){
  	console.log("light " + msg);
  });
  socket.on('co2', function(msg){
  	console.log("CO2 "+msg);
  });