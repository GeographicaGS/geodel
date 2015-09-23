"use strict";

var app = app || {};

App.Router = Backbone.Router.extend({
   
    /* define the route and function maps for this router */
     routes: {
        "" : "applyList",
        "apply/:id" : "apply",

        "indicators" : "indicatorList",
        "indicator/:id" : "indicator",
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

    indicatorList:function(){
        App.showView(new App.View.IndicatorList());
    },

    indicator:function(id){
        App.showView(new App.View.Indicator({indicatorId: id}));
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