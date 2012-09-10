	var callOverpass = function(queryString){
  		$.ajax({
  			url: "http://overpass-api.de/api/interpreter?data=" + queryString,
  			type: 'GET',
  			crossDomain: true,
  			success: function(data){
				var op = parseOverpassXML(data);
				console.log(op);
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