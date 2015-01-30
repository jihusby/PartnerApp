var Reflux = require("reflux");
var _ = require("underscore");

var store = require("store.js");

var ContactActions = require("../actions/ContactActions");

var Constants = require("../utils/partner-constants");

var Contact = require("../model/Contact.js");

module.exports = Reflux.createStore({
    
    listenables: [ContactActions],
    
    onSetFavorites: function(value){
        store.set(Constants.LocalStorageKeys.favorites, value);
        this.trigger(value);
    },
    
    onGetFavorites: function(){
        this.trigger(store.get(Constants.LocalStorageKeys.favorites));
    },

    onSetContactNotes: function(value){
        store.set(Constants.LocalStorageKeys.contactNotes, value);
        this.trigger(value);
    },

    onGetContactNotes: function(){
        this.trigger(store.get(Constants.LocalStorageKeys.contactNotes));
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