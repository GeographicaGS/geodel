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
        this.basicInformationView.close();
        this.interventionView.close();
        this.importView.close();
        this.executionView.close();
        this.stopListening();
    },
    
    render: function() {
        this.basicInformationView = new App.View.ApplyBasicInformation({model: this.model, superView:this});
        this.interventionView = new App.View.ApplyIntervention({model: this.model, superView:this });
        this.importView = new App.View.ApplyImport({model: this.model, superView:this });
        this.executionView = new App.View.ApplyExecution({model: this.model, superView:this });
        this.incidenceView = new App.View.ApplyIncidence({id_apply: this.model.get('solicitud')});
        
        this.$el.html(this._template({
            apply : this.model.toJSON()
        }));

        this.$('#basic_information').append(this.basicInformationView.el);
        this.$('#intervention').append(this.interventionView.el);
        this.$('#import').append(this.importView.el);
        this.$('#execution').append(this.executionView.el);
        this.$('#apply_incidences').append(this.incidenceView.el);

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