'use strict';

App.View.Apply = Backbone.View.extend({
    
    _template : _.template( $('#apply-apply_list_template').html() ),
    
    initialize: function() {
        this.collection = new App.Collection.Applies();

        this.listenTo(this.collection,"reset",this.render);

        this.collection.fetch({"reset": true})
        // this.render();
    },

    events: {
        "click .application-search-btn" : "openSearch",
        "click .close-search-btn" : "closeSearch",
        
    },

    openSearch: function(e){
        this.$('.search-form-group').addClass('open');
        $(e.currentTarget).addClass('hide');
    },
    
    closeSearch: function(){
        this.$('.search-form-group').removeClass('open');
        this.$('.application-search-btn').removeClass('hide');
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },
    
    render: function() {
        this.$el.html(this._template({
            applies : this.collection.toJSON()
        }));
        return this;
    }
});