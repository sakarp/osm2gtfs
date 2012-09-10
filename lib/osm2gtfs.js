var makeStops = function(nodes){
	//console.log(nodes);
	$.each(nodes, function(key, value){
		//process only if node is a public transportation stop
		if (value.isStop) {
					/**	define variables needed for GTFS stop specification
						https://developers.google.com/transit/gtfs/reference#stops_fields
					**/
					var stopID = key
					var stopCode = typeof(value.tag.ref) === 'undefined' ? "":value.tag.ref;
					var stopName = typeof(value.tag.name) === 'undefined' ? "Stop Name Not Available":value.tag.name;
					var lat = value.lat;
					var lon = value.lon;
		
					//print out CSV file
					console.log(key + "," + stopCode + "," + stopName + "," + lat + "," + lon);
		}
	});
}

	var callOverpass = function(queryString){
  		$.ajax({
  			url: "http://overpass-api.de/api/interpreter?data=" + queryString,
  			type: 'GET',
  			crossDomain: true,
  			success: function(data){
				var op = parseOverpassXML(data);
				//console.log(op);
				makeStops(op[0]);
				},
  			error: function(data){
  				console.log('boo');
				},
		});
	};

queryKtm = encodeURIComponent('rel [type="route"] (27.6839, 85.2885, 27.7299,  85.3368);( ._; way(r); node(w););out;');
testAll = encodeURIComponent('rel [type="route"][ref="14B"](27.6839, 85.2885, 27.7299,  85.3368);( ._; way(r); node(w););out;');
testNode=encodeURIComponent('node[name="Airport Bus Station"]; out;');
testWay=encodeURIComponent('way [name="Bijulibazar Bridge"](27.6839, 85.2885, 27.7299,  85.3368); out;');

callOverpass(testAll);