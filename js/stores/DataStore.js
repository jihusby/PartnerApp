var Reflux = require("reflux");

var $ = require("jquery");
var _ = require("underscore");

var store = require("store.js");

var BackendActions = require("../actions/BackendActions");

var AuthActions = require("../actions/AuthActions");

var Partner = require("../model/partner");
var Contact = require("../model/contact");
var Utils = require("../utils/partner-utils");
var Constants = require("../utils/partner-constants");


module.exports = Reflux.createStore({

    listenables: [BackendActions],

    onSynchronizeData: function() {
        console.log("Synchronize partners called from React Component")
        this.getDataFromBackend(this.updateData);
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        this.getDataFromBackend(this.updateData);
        return [];
    },

    updateData: function(json) {
        var partners = _.map(_.sortBy(_.filter(json.partners, function(partner){ return partner.partnerType !== "VIP-Kunde";}), "name"), function(partner){
            return new Partner(partner);
        });
        partners.forEach(function(partner){
            partner.setContacts(
                json.persons.filter(function(contact){
                    return partner.id == contact.partnerId;
                }).map(function(contactFound){
                     return new Contact(contactFound)
                })
            )
        });
        
        var persons = _.map(_.sortBy(json.persons, function(person) {
            return [person.lastName, person.firstName].join("_");
        }), function(person){
            return new Contact(person);
        });
        this.trigger({
            partners: partners, 
            persons: persons, 
            partnerTypes: _.filter(json.partnerTypes.partnerTypes, function(partnerType) { 
                        return partnerType.name !== "VIP-Kunde";
                    }), 
            activities: json.activities
        });
    },

    getDataFromBackend: function(callback) {
        if(!store.get("bearer_token")){
         return;   
        }else{
            $.ajax({
                url: Constants.URLS.search,
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorize", store.get("bearer_token"));
                },
                success: function(data) {
                    console.log(data);
                    store.set(Constants.LocalStorageKeys.partnerdata, _.filter(data.partners, function(partner) { 
                        return partner.partnerType !== "VIP-Kunde";
                    }));
                    store.set(Constants.LocalStorageKeys.persons, data.persons);
                    store.set(Constants.LocalStorageKeys.partnerTypes, _.filter(data.partnerTypes.partnerTypes, function(partnerType){
                        return partnerType.name !== "VIP-Kunde";
                    }));
                    store.set(Constants.LocalStorageKeys.activities, data.activities);
                    callback(data);
                },
                error: function(xhr, status, err) {
                    if (xhr.status === 401){
                        AuthActions.logOut();
                        callback({});
                    }
                    var data = { 
                        partners: store.get(Constants.LocalStorageKeys.partnerdata),
                        persons: store.get(Constants.LocalStorageKeys.persons),
                        partnerTypes: store.get(Constants.LocalStorageKeys.partnerTypes),
                        activities: store.get(Constants.LocalStorageKeys.activities)
                    };
                    
                    callback(data);
                }
            });
        }
    }
});
