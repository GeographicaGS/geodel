Map = {
	
	layers: [],
	markers: {},
	iniLat: 37.36455,
	iniLng: -3.57645,	
	iniZoom: 6,
	__map:null,
	
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
			
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.__map);
	},

	getMap: function() {
		return this.__map;
	}
}




