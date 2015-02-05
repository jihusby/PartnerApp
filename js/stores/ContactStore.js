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
        var result = store.get(Constants.LocalStorageKeys.favorites)
        this.trigger(result);
    },

    onSetContactNotes: function(value){
        if(value) {
            var contactNotes = _.filter(store.get(Constants.LocalStorageKeys.contactNotes), function (contactNote) {
                return contactNote.id != value.id;
            });
            store.set(Constants.LocalStorageKeys.contactNotes, _.union(contactNotes, [value]));
            /*this.trigger(value);*/
        }
    },

    onGetContactNotes: function(){
        console.log("getContactNotes: " + Constants.LocalStorageKeys.contactNotes)
        var result = store.get(Constants.LocalStorageKeys.contactNotes);
        this.trigger(result);
    },

    onGetContactNote: function(value) {
        var result = _.find(store.get(Constants.LocalStorageKeys.contactNotes), function(contactNote){ return contactNote.id == value; });
        this.trigger(result);
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