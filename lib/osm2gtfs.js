var makeStops = function(nodes){
	//console.log(nodes);
	$.each(nodes, function(nodeID, node){
		//process only if node is a public transportation stop
		if (node.isStop) {
					/**	define variables needed for GTFS stop specification
						https://developers.google.com/transit/gtfs/reference#stops_fields
					**/
					var stopID = nodeID;
					var stopCode = typeof(node.tag.ref) === 'undefined' ? "":node.tag.ref;
					var stopName = typeof(node.tag.name) === 'undefined' ? "Stop Name Not Available":node.tag.name;
					var lat = node.lat;
					var lon = node.lon;
		
					//write to CSV file ultimately. 
					//console.log(stopID + "," + stopCode + "," + stopName + "," + lat + "," + lon);
		}
	});
}

var makeRoutes = function(relations){
	$.each(relations, function(relationID, relation){
		if (node.isRoute) {
					/**	define variables needed for GTFS stop specification
						https://developers.google.com/transit/gtfs/reference#routes_fields
					**/
					var stopID = nodeID;
					var stopCode = typeof(node.tag.ref) === 'undefined' ? "":node.tag.ref;
					var stopName = typeof(node.tag.name) === 'undefined' ? "Stop Name Not Available":node.tag.name;
					var lat = node.lat;
					var lon = node.lon;
		
					//write to CSV file ultimately. 
					//console.log(stopID + "," + stopCode + "," + stopName + "," + lat + "," + lon);
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
				console.log(op);
				makeStops(op[0]);
				makeRoutes(op[2]);
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