'use strict';

App.View.Map = Backbone.View.extend({
	
    initialize: function() {
    	Map.initialize();

        this.collection = new App.Collection.AppliesGeomList();

        this.listenTo(this.collection,"reset",this.render);

        this.collection.fetch({"reset": true})
        // Map.drawApplies();
    	// this.render();
    },
    
    onClose: function(){
    },
    
    render: function() {

        Map.drawApplies(this.collection.toJSON());

        return this;
    },    
});

	