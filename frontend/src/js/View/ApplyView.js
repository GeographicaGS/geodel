'use strict';

App.View.Apply = Backbone.View.extend({
    
    _template : _.template( $('#apply-apply_template').html() ),
    
    initialize: function(options) {
        this.model = new App.Model.ApplyModel();
        this.model.url = this.model.url + options.applyId

        this.listenTo(this.model,"request",this.render);

        this.model.fetch({"reset": true})
        // this.render();
    },

    events: {
        "click .panel-toggle" : "expandPanel",
        "click .edit-btn" : "activateEdit",
        "click .cancel-btn" : "cancelEdit",
        "click .save-btn" : "save"
    },

    expandPanel: function(e){
        $(e.currentTarget).closest('.panel-item').toggleClass('expanded');
    },

    activateEdit: function(e){
        $(e.currentTarget).closest('.panel-item').addClass('edit-on');   
    },

    cancelEdit: function(e){
        $(e.currentTarget).closest('.panel-item').removeClass('edit-on');   
    },

    save: function(e){
        $(e.currentTarget).closest('.panel-item').removeClass('edit-on');   
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },
    
    render: function() {
        this.$el.html(this._template());
        return this;
    }
});