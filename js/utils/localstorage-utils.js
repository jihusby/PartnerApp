var React = require("react");
var _ = require("underscore");
var store = require("store.js");

var Constants = require("../utils/partner-constants");
var key = Constants.LocalStorageKeys.partnerdata;
var data = store.get(key);

module.exports = {

    findContact: function(id) {
        return _.find(data.persons, function(person){ return person.id == id; });
    },
    
    findPartner: function(id) {
        return _.find(data.partners, function(partner){ return partner.id == id; });
    }
}