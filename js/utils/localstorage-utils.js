var React = require("react");
var _ = require("underscore");
var Constants = require("../utils/partner-constants");
var store = require("store.js");
var partnerkey = Constants.LocalStorageKeys.partnerdata;
var contactkey = Constants.LocalStorageKeys.persons;
var notekey = Constants.LocalStorageKeys.notes;
var contactdata = store.get(contactkey);
var partnerdata = store.get(partnerkey);
var notedata = store.get(notekey);
var ContactActions = require("../actions/ContactActions.js");
var ContactStore = require("../stores/ContactStore.js");
var Reflux = require("reflux");

module.exports = {

    findContact: function(id) {
        return _.find(contactdata, function(person){ return person.id == id; });
    },
    
    findPartner: function(id) {
        return _.find(partnerdata, function(partner){ return partner.id == id; });
    },

    getNote: function(contactId) {
        return _.find(notedata, function(note){ return note.id == contactId; });
    }

}

