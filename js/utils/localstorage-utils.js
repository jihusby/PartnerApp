var React = require("react");
var _ = require("underscore");
var Constants = require("../utils/partner-constants");
var store = require("store.js");
var contactdata = store.get(Constants.LocalStorageKeys.persons);
var partnerdata = store.get(Constants.LocalStorageKeys.partnerdata);
var notedata = store.get(Constants.LocalStorageKeys.contactNotes);
var ContactActions = require("../actions/ContactActions.js");

module.exports = {

    findContact: function(id) {
        return _.find(contactdata, function(person){ return person.id == id; });
    },
    
    findPartner: function(id) {
        return _.find(partnerdata, function(partner){ return partner.id == id; });
    },

    getContactNote: function(contactId) {
        return _.find(notedata, function(contactNote){ return contactNote.id == contactId; });
    }

}

