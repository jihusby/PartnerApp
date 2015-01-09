var Reflux = require("reflux");
var _ = require("underscore");

var store = require("store.js");

var ContactActions = require("../actions/ContactActions");

var Constants = require("../utils/partner-constants");

var Contact = require("../model/Contact.js");

module.exports = Reflux.createStore({
    
    listenables: [ContactActions],
    
    onSet: function(key, value){
        store.set(key, value);
    },
    
    onGet: function(key){
        this.trigger(store.get(key));
    },
    
    onGetById: function(id){
        var key = Constants.LocalStorageKeys.partnerdata;
        var data = store.get(key);
        var contact = new Contact(_.find(data.persons, function(person){ return person.id == id; }));
        this.trigger(contact);
    },
    
    onRemove: function(key){
        store.remove(key);
    }
});