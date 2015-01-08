var Reflux = require("reflux");
var store = require("store.js");

var FavoriteActions = require("../actions/FavoriteActions");

var Constants = require("../utils/partner-constants");

module.exports = Reflux.createStore({
    
    listenables: [FavoriteActions],
    
    onSet: function(key, value){
        store.set(key, value);
    },
    
    onGet: function(key){
        this.trigger(store.get(key));
    },
    
    onRemove: function(key){
        store.remove(key);
    }
});