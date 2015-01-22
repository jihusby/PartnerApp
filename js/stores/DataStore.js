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
        this.getDataFromBackend(this.updateData, forceUpdate);
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        this.getDataFromBackend(this.updateData, false);
        return { isUpdating: false};
    },

    updateData: function(data) {
        //console.log("Data: " + JSON.stringify(data));
        this.trigger(data);
    },

    getDataFromBackend: function(callback, forceUpdate) {
        var that = this;
        if(store.get("bearer_token")){
            //var isActive = this.checkIfActive();
            //console.log("Is activce: " + isActive);
            // check if user is active, once per day
            // if active, get data
            // if not, delete data and send user to a not active screen
            var refreshDate = store.get(Constants.LocalStorageKeys.last_refresh_date);

            if(!forceUpdate && refreshDate && moment(refreshDate).add(1, "days").diff(moment()) > 0){ // data is fresh, get from localstorage
                setTimeout(function(){ // hack
                    callback(that.getDataFromLocalStorage());
                }, 10);
                console.log("Data updated from localstorage");
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
                        
                        var data = {
                            partners: partners, 
                            persons: persons, 
                            partnerTypes: partnerTypes,
                            activities: activities,
                            isUpdating: false
                        };
                        console.log("Data updated from server");
                        callback(data);
                    },
                    error: function(xhr, status, err) {
                        if (xhr.status === 401){
                            AuthActions.logOut();
                            callback({ isUpdating: false});
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
    
    checkIfActive: function(){
        var that = this;
        $.ajax({
            type: "POST",
            url: Constants.URLS.active,
            data: store.get(Constants.LocalStorageKeys.uid),
            success: function (data) {
                return data;
            },
            error: function(errorMsg) {
                
            }
        });   
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
            activities: activities,
            isUpdating: false
        };
        return data;
    }
});
