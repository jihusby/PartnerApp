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
        var partners = _.map(_.sortBy(json.partners, "name"), function(partner){
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
        this.trigger({partners: partners, persons: persons});
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
                    store.set(Constants.LocalStorageKeys.partnerdata, data);
                    store.set(Constants.LocalStorageKeys.partnerTypes, data.partnerTypes);
                    callback(data);
                },
                error: function(xhr, status, err) {
                    if (xhr.status === 401){
                        AuthActions.logOut();
                        callback({});
                    }
                    var data = store.get(Constants.LocalStorageKeys.partnerdata);
                    callback(data);
                }
            });
        }
    }
});
