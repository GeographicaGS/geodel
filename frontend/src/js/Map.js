Map = {
	
	layers: [],
	markers: {},
	iniLat: 37.36455,
	iniLng: -3.57645,	
	iniZoom: 6,
	__map:null,
	featureApplies: null,
	
	initialize: function(){
		$("#map").outerHeight($("#map").outerHeight()-$("footer").outerHeight());
			
			this.__map = new L.Map('map', {
				  center: new L.LatLng(this.iniLat, this.iniLng),
				  zoom: this.iniZoom,
				  fadeAnimation: false,
				  zoomControl: false,
				  attributionControl: true
			});

			var zoomControl = new L.Control.Zoom({
				position : 'topright'
			});		
		
			zoomControl.addTo(this.__map);
			
			// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			// }).addTo(this.__map);
			// var ggl = new L.Google('ROADMAP');
			// var ggl = new L.Google('SATELLITE');
			var ggl = new L.Google('HYBRID');
			this.__map.addLayer(ggl);
			this.featureApplies = L.markerClusterGroup({spiderfyOnMaxZoom: true, showCoverageOnHover: false,
				iconCreateFunction: function(cluster) {
					var markers = cluster.getAllChildMarkers();
					var n = 0;
					for (var i = 0; i < markers.length; i++) {
						n++;
					}
					return L.divIcon({ html: n, className: 'mycluster', iconSize: L.point(40, 40) });
				}
			});
			this.featureApplies.addTo(this.__map);
	},

	drawApplies:function(rows){
		this.featureApplies.clearLayers()
		$(rows).each(function(index, row) {
			if(!row.coord_x || !row.coord_y){
				row.coord_x = row.coord_x_m;
				row.coord_y = row.coord_y_m;
			}

			var styleAccept = 	{
									radius: 10,
									fillColor: "#009e68",
									color: "#ffffff",
									weight: 1,
									opacity: 0.8,
									fillOpacity: 1
								};

			var styleNotAccept = 	{
										radius: 10,
										fillColor: "#8a9197",
										color: "#ffffff",
										weight: 1,
										opacity: 0.8,
										fillOpacity: 1
									};


			if(row.coord_x && row.coord_y){
				Map.featureApplies.addLayer(L.circleMarker([row.coord_y, row.coord_x], (row.estado == 'Aprobado y finalizado' ? styleAccept: styleNotAccept)));
			}
		});
	},

	getMap: function() {
		return this.__map;
	}
}




