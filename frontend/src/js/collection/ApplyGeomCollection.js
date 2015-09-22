'use strict';

App.Collection.AppliesGeomList = Backbone.Collection.extend({
    initialize: function(models, options) {
    	
    },

    url : function() {
        return App.config.API_URL + '/get_apply_geom';
    },

    parse: function(response){
        return response.results;
    }

    
});