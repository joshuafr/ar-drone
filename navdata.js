var arDrone = require('ar-drone'),
	client  = arDrone.createClient();

var navdata = null;
var clockwise = null;

var getKeys = function(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}

client.on('navdata', function(data) {
	navdata = data;
	try{
		clockwise = data.demo['rotation'].clockwise;
		rotation = data.demo['']
	}
	catch (err) {
	}
	
	//var keys = getKeys(data.demo);
	//console.log(keys);
	//console.log(clockwise);
});

setInterval(function() {
	console.log(clockwise);
}, 1000);


client.takeoff();

client.after(5000, function(){
	client.up(0.3);
})
.after(1000,function() {
	setInterval(function() {
		if(clockwise > 15) {
			client.counterClockwise(1);
		} else if(clockwise < -15) {
			client.clockwise(1);
		} else {
			client.stop();
		}
	}, 10);
})
.after(30000, function() {
  this.stop();
  this.land();
});

