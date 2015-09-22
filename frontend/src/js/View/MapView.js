'use strict';

App.View.Map = Backbone.View.extend({
	
    initialize: function() {
    	Map.initialize();

        this.collection = new App.Collection.AppliesGeomList();

        this.listenTo(this.collection,"reset",this.render);

        this.resetAppliesGeoms();
        // Map.drawApplies();
    	// this.render();
    },

    resetAppliesGeoms:function(){
        this.collection.fetch({"reset": true})
    },
    
    onClose: function(){
    },
    
    render: function() {

        Map.drawApplies(this.collection.toJSON());

        return this;
    },    
});

	