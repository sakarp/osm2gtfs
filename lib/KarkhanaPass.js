//Make a tags objects. Each key value pair in XML is turned into an Object with the same key/value pair
	 var nodes = {};
	 var ways = {};
	 var relations = {};
	 
  //take XML data returned by overpass API and make objects
	 var parseOverpassXML = function(overpassXML) { 
	 console.log("entering parse function");
	 //helper functions to get the parsing done

		var tagToObj = function($node) {
			console.log("in tag to obj");
			var tags = {};
			$node.find('tag').each(function() {
			var $t = $(this);
			tags[$t.attr('k')] = $t.attr('v');
			console.log($t.attr('k') + " " + $t.attr('v'));
			});
			return tags;
		}

		var refToObj = function($way) {
			console.log("in ref to obj");
			var refs = {};
			$way.find('ref').each(function() {
				var $w = $(this);
					refs['ref'] = $w.attr('ref');
				});
			return refs;
		}

		var memToObj = function($relation, type){
			console.log("in member to obj");
			var members = {};
			$relation.find(type).each(function() {
			var $r = $(this);
			members[$w.attr('ref')] = {	ref: $w.attr('ref'),
										type: $w.attr('type'),
										role: $w.attr('role')
										};
			});
			return members;
		}


	 //Make a nodes object. 
		$(overpassXML).find('node').each( function() {
				console.log("in node find loop");
				var $node = $(this);
				nodes[$node.attr('id')] = {	id: $node.attr('id'),
											lat: $node.attr('lat'),
											lon: $node.attr('lon'),
											tag: tagToObj($node),
											isStop: tagToObj($node).public_transport === 'stop_position'
											};	
				console.log(nodes.isStop);	
		});

		//Making a way object
		$(overpassXML).find('way').each( function() {
			console.log("in way find loop");
			var $way = $(this);
			ways[$way.attr('id')] = { 	id: $way.attr('id'),
										ref: refToObj($way),
										tag: tagToObj($way)
										};
		});

		//Make a relation object
		$(overpassXML).find('relation').each( function() {
			console.log("in realtion find loop");
			var $relation = $(this);
			relations[$relation.attr('id')] = {	id: $relation.attr('id'),
													memberNodes: memToObj($relation, 'node'),
													memberWay: memToObj($relation, 'way'),
													memberRelation: memToObj($relation, 'relation'),
													tag: tagToObj($relation),
													isRoute: tagToObj.type === "route"
												};
			});

		//send back object of objects
		return [nodes, ways, relations];

		
	};

	var callOverpass = function(queryString){
  		$.ajax({
  			url: "http://overpass-api.de/api/interpreter?data=" + queryString,
  			type: 'GET',
  			crossDomain: true,
  			success: function(data){
				console.log("i should be #1");
				var op = parseOverpassXML(data);
				},
  			error: function(data){
  				console.log('boo');
				},
		});
	};

queryKtm = encodeURIComponent('rel [type="route"] (27.6839, 85.2885, 27.7299,  85.3368);( ._; way(r); node(w););out;');
qTest = encodeURIComponent('rel [type="route"][ref="14B"](27.6839, 85.2885, 27.7299,  85.3368);( ._; way(r); node(w););out;');
qt=encodeURIComponent('node[name="Airport Bus Station"]; out;');

callOverpass(qt);