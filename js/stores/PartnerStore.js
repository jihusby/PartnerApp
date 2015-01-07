/**
 *
 * Created by jam on 05/12/14.
 */
var Reflux = require("reflux");

var $ = require("jquery");
var _ = require("underscore");
var BackendActions = require("../actions/BackendActions");

var Partner = require("../model/partner");
var Contact = require("../model/contact");
var Utils = require("../utils/partner-utils");
var Constants = require("../utils/partner-constants");


module.exports = Reflux.createStore({

    listenables: [BackendActions],

    onSynchronizePartners: function() {
        console.log("Synchronize partners called from React Component")
        this.getPartnersFromBackend(this.updatePartners);
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        this.getPartnersFromBackend(this.updatePartners);
        return [];
    },

    updatePartners: function(json) {
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
        this.trigger(partners);
    },


    getPartnersFromBackend: function(callback) {
        if(!sessionStorage.getItem("bearer_token")){
         return;   
        }else{
            $.ajax({
                url: Constants.URLS.search,
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorize", sessionStorage.getItem("bearer_token"));
                },
                success: function(data) {
                    console.log(data);
                    callback(data);
                },
                error: function(xhr, status, err) {
                    callback({});
                }
            });
        }
    }
});
