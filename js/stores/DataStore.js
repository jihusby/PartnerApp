var Reflux = require("reflux");

var $ = require("jquery");
var _ = require("underscore");
var moment = require("moment");

var store = require("store.js");

var BackendActions = require("../actions/BackendActions");

var AuthActions = require("../actions/AuthActions");

var Partner = require("../model/partner");
var Contact = require("../model/contact");
var Utils = require("../utils/partner-utils");
var Constants = require("../utils/partner-constants");


module.exports = Reflux.createStore({

    listenables: [BackendActions],

    onSynchronizeData: function(forceUpdate) {
        console.log("Updating: " + forceUpdate);
        console.log("Synchronize partners called from React Component")
        this.getDataFromBackend(this.updateData);
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        this.getDataFromBackend(this.updateData);
        return [];
    },

    updateData: function(data) {
        console.log("Data: " + JSON.stringify(data));
        this.trigger(data);
    },

    getDataFromBackend: function(callback) {
        var forceUpdate = true;
        var that = this;
        if(store.get("bearer_token")){
            // check if user is active, once per day
            // if active, get data
            // if not, delete data and send user to a not active screen
            var refreshDate = store.get(Constants.LocalStorageKeys.last_refresh_date);

            if(!forceUpdate && refreshDate && moment(refreshDate).add(1, "days").diff(moment()) > 0){ // data is fresh, get from localstorage
                callback(that.getDataFromLocalStorage());
            } else{
                console.log("Fetching data from server");
                $.ajax({
                    url: Constants.URLS.search,
                    dataType: 'json',
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorize", store.get("bearer_token"));
                    },
                    success: function(json) {
                        var partnerTypes = _.filter(json.partnerTypes.partnerTypes, function(partnerType)                         {
                            return partnerType.name !== "VIP-Kunde";
                        });
                        
                        var persons = _.map(_.sortBy(json.persons, function(person) {
                            return [person.lastName, person.firstName].join("_");
                        }), function(person){
                            return new Contact(person);
                        });

                        var partners = _.map(_.sortBy(_.filter(json.partners, function(partner){ 
                            return partner.partnerType !== "VIP-Kunde";
                        }), "name"), function(p){
                            var partner = new Partner(p);
                            partner.setContacts(
                                _.filter(persons, function(person){ 
                                    return person.partnerId == partner.id;
                                })
                            );
                            return partner;
                        });

                        store.set(Constants.LocalStorageKeys.partnerdata, partners);
                        store.set(Constants.LocalStorageKeys.persons, persons);
                        store.set(Constants.LocalStorageKeys.partnerTypes, partnerTypes);
                        store.set(Constants.LocalStorageKeys.activities, json.activities);
                        store.set(Constants.LocalStorageKeys.last_refresh_date, moment());
                        
                        var Lspartners = store.get(Constants.LocalStorageKeys.partnerdata);
                        var Lspersons = store.get(Constants.LocalStorageKeys.persons);
                        var LspartnerTypes = store.get(Constants.LocalStorageKeys.partnerTypes);
                        var Lsactivities = store.get(Constants.LocalStorageKeys.activities);
                        var data = {
                            partners: Lspartners, 
                            persons: Lspersons, 
                            partnerTypes: LspartnerTypes,
                            activities: Lsactivities
                        };
                        console.log("Data updated from server");
                        callback(data);
                    },
                    error: function(xhr, status, err) {
                        if (xhr.status === 401){
                            AuthActions.logOut();
                            callback({});
                        }
                        
                        this.getDataFromLocalStorage(callback);
                    }
                });
            }
        } else {
            // user is not logged in, return
            return;   
        }
    },
    
    getDataFromLocalStorage: function(){
        console.log("Fetching data from local storage: " + store.get(Constants.LocalStorageKeys.last_refresh_date));
        var partners = store.get(Constants.LocalStorageKeys.partnerdata);
        var persons = store.get(Constants.LocalStorageKeys.persons);
        var partnerTypes = store.get(Constants.LocalStorageKeys.partnerTypes);
        var activities = store.get(Constants.LocalStorageKeys.activities);
        var data = {
            partners: partners, 
            persons: persons, 
            partnerTypes: partnerTypes,
            activities: activities
        };
        return data;
    }
});
