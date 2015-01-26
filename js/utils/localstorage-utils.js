var React = require("react");
var _ = require("underscore");
var Constants = require("../utils/partner-constants");
var store = require("store.js");
var partnerkey = Constants.LocalStorageKeys.partnerdata;
var contactkey = Constants.LocalStorageKeys.persons;
var contactdata = store.get(contactkey);
var partnerdata = store.get(partnerkey);

module.exports = {

    findContact: function(id) {
        return _.find(contactdata, function(person){ return person.id == id; });
    },
    
    findPartner: function(id) {
        return _.find(partnerdata, function(partner){ return partner.id == id; });
    }
}

