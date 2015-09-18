'use strict';

App.View.ApplyList = Backbone.View.extend({
    
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
        "keyup .search-input" : "searchApply"
        
    },

    openSearch: function(e){
        this.$('.search-form-group').addClass('open');
        $(e.currentTarget).addClass('hide');
    },
    
    closeSearch: function(){
        this.$('.search-form-group').removeClass('open');
        this.$('.application-search-btn').removeClass('hide');
    },

    searchApply: function(e){
        var rows = this.$(".application-table tr");
        var text = $(e.currentTarget).val();
        $(rows).each(function(index, value) {
            if($(value).find('span.denomination').length > 0 && $(value).find('span.number').length > 0){
                var denomination = $(value).find('span.denomination').text().toLowerCase();
                var number = $(value).find('span.number').text().toLowerCase();
                if(text.length == 0 
                    || denomination.indexOf(text.toLowerCase()) != -1
                    || number.indexOf(text.toLowerCase()) != -1
                    || (number + denomination).replace(/ /g,'').indexOf(text.toLowerCase().replace(/ /g,'')) != -1){
                    
                    $(value).removeClass('hide');
                }else{
                    $(value).addClass('hide');
                }
            }
        });
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