'use strict';

App.View.Apply = Backbone.View.extend({
    
    _template : _.template( $('#apply-apply_template').html() ),
    
    initialize: function(options) {
        this.model = new App.Model.ApplyModel();
        this.model.url = this.model.url + options.applyId

        this.listenTo(this.model,"change:solicitud",this.render);

        this.model.fetch({"reset": true})
        // this.render();
    },

    events: {
        "click .panel-toggle" : "expandPanel",
        "click .edit-btn" : "activateEdit",
        // "click .cancel-btn" : "cancelEdit",
        // "click .save-btn" : "save"
    },

    expandPanel: function(e){
        $(e.currentTarget).closest('.panel-item').toggleClass('expanded');
    },

    activateEdit: function(e){
        $(e.currentTarget).closest('.panel-item').addClass('edit-on');   
    },

    // cancelEdit: function(e){
    //     $(e.currentTarget).closest('.panel-item').removeClass('edit-on');   
    // },

    // save: function(e){
    //     $(e.currentTarget).closest('.panel-item').removeClass('edit-on');   
    // },

    onClose: function(){
        // Remove events on close
        this.basicInformation.close();
        this.intervention.close();
        this.importView.close();
        this.execution.close();
        this.stopListening();
    },
    
    render: function() {
        this.basicInformation = new App.View.ApplyBasicInformation({model: this.model, superView:this});
        this.intervention = new App.View.ApplyIntervention({model: this.model, superView:this });
        this.importView = new App.View.ApplyImport({model: this.model, superView:this });
        this.execution = new App.View.ApplyExecution({model: this.model, superView:this });
        
        this.$el.html(this._template({
            apply : this.model.toJSON()
        }));

        this.$('#basic_information').append(this.basicInformation.el);
        this.$('#intervention').append(this.intervention.el);
        this.$('#import').append(this.importView.el);
        this.$('#execution').append(this.execution.el);

        return this;
    },

    closePanel:function(elem){
        $(elem).closest('.panel-item').removeClass('edit-on');
    },

    refreshImports:function(){
        this.$('#plannedInvestment').text(App.formatNumber(this.model.get('inversion_prevista')));
        this.$('#subventionGrant').text(App.formatNumber(this.model.get('subvencion_concedida')));
    }
});