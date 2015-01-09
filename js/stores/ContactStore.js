var Reflux = require("reflux");
var _ = require("underscore");

var store = require("store.js");

var ContactActions = require("../actions/ContactActions");

var Constants = require("../utils/partner-constants");

module.exports = Reflux.createStore({
    
    listenables: [ContactActions],
    
    onSet: function(key, value){
        store.set(key, value);
    },
    
    onGet: function(key){
        this.trigger(store.get(key));
    },
    
    onGetById: function(id){
        console.log("Id: " + id);
        var key = Constants.LocalStorageKeys.partnerdata;
        var data = store.get(key);
        var result = _.find(data.persons, function(person){ return person.id == id; });
        console.log("Found: " + result);
        this.trigger(result);
    },
    
    onRemove: function(key){
        store.remove(key);
    }
});