var Reflux = require("reflux");

var $ = require("jquery");
var _ = require("underscore");
var moment = require("moment");

var store = require("store.js");

var BackendActions = require("../actions/BackendActions");
var AuthActions = require("../actions/AuthActions");
var MenuActions = require("../actions/MenuActions");

var Partner = require("../model/partner");
var Contact = require("../model/contact");
var Utils = require("../utils/format-utils");
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
            // check if user is active, once per day
            this.checkIfActive(function(isActive){ 
                if(isActive){ // if active, get data
                    var refreshDate = store.get(Constants.LocalStorageKeys.last_refresh_date);

                    if(!forceUpdate && !that.aDayHasPassed(refreshDate)){ // data is fresh, get from localstorage
                        setTimeout(function(){ // hack
                            callback(that.getDataFromLocalStorage());
                        }, 10);
                        console.log("Data updated from localstorage");
                    } else{
                        console.log("Fetching data from server");
                        that.getDataFromServer(callback);
                    }
                } else { // if not, delete data and send user to a not active screen
                    that.invalidateUser();
                }
            });
        } else {
            // user is not logged in, return
            return;   
        }
    },
    
    invalidateUser: function(){
        store.clear();
        AuthActions.logOut();
        MenuActions.login();
    },
    
    checkIfActive: function(callback){
        var lastActiveCheck = store.get(Constants.LocalStorageKeys.last_active_check);
        if(this.aDayHasPassed(lastActiveCheck)){
            $.ajax({
                type: "GET",
                url: Constants.URLS.active,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorize", store.get("bearer_token"));
                },
                success: function (data) {
                    console.log("Success: " + JSON.stringify(data));
                    store.set(Constants.LocalStorageKeys.last_active_check, moment());
                    callback(data.active);
                },
                error: function(errorMsg) {
                    console.log("Error: " + errorMsg);
                    callback(false);
                }
            });
        } else {
            callback(true);
        }
    },
    
    aDayHasPassed: function(date){
        return date && moment(date).add(1, "days").diff(moment()) > 0;
    },
    
    getDataFromLocalStorage: function(){
        var data = {
            partners: store.get(Constants.LocalStorageKeys.partnerdata), 
            persons: store.get(Constants.LocalStorageKeys.persons), 
            partnerTypes: store.get(Constants.LocalStorageKeys.partnerTypes),
            activities: store.get(Constants.LocalStorageKeys.activities),
            isUpdating: false
        };
        return data;
    },
    
    getDataFromServer: function(callback){
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
                
                var partners = _.chain(json.partners)
                    .filter(function(p){
                        return p.partnerType !== "VIP-Kunde";
                    })
                    .sortBy("name")
                    .map(function(p){
                        var partner = new Partner(p);
                        partner.setContacts(
                            _.filter(json.persons, function(person){ 
                                return person.partnerId == partner.id;
                            })
                        );
                        return partner;
                    })
                    .value();
                
                var persons = _.chain(json.persons)
                    .filter(function(person){
                        return !!_.find(partners, function(partner){ 
                            return partner.id === person.partnerId;
                        });
                    })
                    .sortBy(function(person){
                        return [person.lastName, person.firstName].join("_");
                    })
                    .map(function(person){
                        return new Contact(person);
                    })
                    .value();
                                    
                store.set(Constants.LocalStorageKeys.partnerdata, partners);
                store.set(Constants.LocalStorageKeys.persons, persons);
                store.set(Constants.LocalStorageKeys.partnerTypes, partnerTypes);
                store.set(Constants.LocalStorageKeys.activities, json.activities);
                store.set(Constants.LocalStorageKeys.last_refresh_date, moment());

                var data = {
                    partners: partners, 
                    persons: persons, 
                    partnerTypes: partnerTypes,
                    activities: json.activities,
                    isUpdating: false
                };
                console.log("Data updated from server");
                callback(data);
            },
            error: function(xhr, status, err) {
                if (xhr.status === 401){
                    AuthActions.logOut();
                    callback({ isUpdating: false });
                }

                this.getDataFromLocalStorage(callback);
            },
            timeout: 20000
        });
    }
});
