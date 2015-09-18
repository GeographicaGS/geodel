"use strict";

var app = app || {};

App.Router = Backbone.Router.extend({
   
    /* define the route and function maps for this router */
     routes: {
        "" : "applyList",
        "apply/:id" : "apply", 
        // "home" : "home",

        "login" : "login",

        "notfound" : "notfound",
        "error" : "error",
        "*other" : "notfound",
    },
    
    applyList: function(){
        App.showView(new App.View.ApplyList());
    },

    apply: function(id){
        App.showView(new App.View.Apply({applyId: id}));
    },

    login: function(){
        App.showView(new App.View.Login());
    },


    notfound: function(){
        App.showView(new App.View.NotFound());
    },

    error: function(){
        App.showView(new App.View.Error());
    }
    
});