queryKtm = encodeURIComponent('rel [type="route"] (27.6839, 85.2885, 27.7299,  85.3368);( ._; way(r); node(w););out;');
qTest = encodeURIComponent('rel [type="route"][ref="14B"](27.6839, 85.2885, 27.7299,  85.3368);( ._; way(r); node(w););out;');
qt=encodeURIComponent('rel [type="route"](27.6839, 85.2885, 27.7299,  85.3368); out;');
//var op;

$.ajax({
  	url: "http://overpass-api.de/api/interpreter?data=" + qt,
  	type: 'GET',
  	crossDomain: true,
  	success: function(data){ 
		parseOverpassXML(data);
		//console.log(temp);
		},
  		error: function(data){
			console.log("there is an error");
  			alert(data);
		},
});
