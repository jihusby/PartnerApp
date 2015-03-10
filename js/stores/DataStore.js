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
var Activity = require("../model/activity");
var Utils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants");
var Alerter = require("../utils/alerter");


module.exports = Reflux.createStore({

    listenables: [BackendActions],

    onSynchronizeData: function(forceUpdate) {
        this.trigger({ isUpdating: true});
        console.log("Updating: " + forceUpdate);
        this.getDataFromBackend(this.updateData, forceUpdate);
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        this.getDataFromBackend(this.updateData, false);
        return { isUpdating: false};
    },

    updateData: function(data) {
        this.trigger(data);
    },

    getDataFromBackend: function(callback, forceUpdate) {
        var that = this;
        if(forceUpdate && navigator && navigator.connection && navigator.connection.type === Connection.NONE){
            Alerter.alert("Offline", "Enheten er offline, prøv igjen senere.");
            callback(that.getDataFromLocalStorage());
        } else if(store.get("bearer_token")){
            // check if user is active, once per day
            this.checkIfActive(function(isActive){
                if(isActive === true){ // if active, get data
                    var refreshDate = store.get(Constants.LocalStorageKeys.last_refresh_date);
                    if(!forceUpdate && refreshDate && !that.aDayHasPassed(refreshDate)){ // data is fresh, get from localstorage
                        setTimeout(function(){ // hack
                            callback(that.getDataFromLocalStorage());
                        }, 10);
                        console.log("Data updated from localstorage");
                    } else{
                        console.log("Fetching data from server");
                        that.getDataFromServer(function(data){
                            callback(data);
                        }, forceUpdate);
                    }
                } else if(!isActive) { // if not, delete data and send user to a not active screen
                    that.invalidateUser();
                } else { // error, most likely due to dropped connection, use data from local storage
                    Alerter.alert("Tilkobling feilet", "Fikk ikke kontakt med serveren.");
                    setTimeout(function(){ // hack
                        callback(that.getDataFromLocalStorage());
                    }, 10);
                    console.log("Offline. Data updated from localstorage.");
                }
            });
        } else {
            // user is not logged in
            callback({ isUpdating: false});
        }
    },
    
    invalidateUser: function(){
        store.clear();
        AuthActions.logOut();
        MenuActions.login();
    },
    
    checkIfActive: function(callback){
        var lastActiveCheck = store.get(Constants.LocalStorageKeys.last_active_check);
        if(!lastActiveCheck || this.aDayHasPassed(lastActiveCheck)){
            $.ajax({
                type: "GET",
                url: Constants.URLS.active,
                beforeSend: function(request) {
                    request.setRequestHeader("Authorize", store.get("bearer_token"));
                },
                success: function (data) {
                    store.set(Constants.LocalStorageKeys.last_active_check, moment());
                    callback(data.active);
                },
                error: function(xhr, status, err) {
                    console.log("Error: " + status);
                    callback(status);
                },
                timeout: Constants.Timeout
            });
        } else {
            callback(true);
        }
    },
    
    aDayHasPassed: function(date){
        if(date){
            var lastRefreshDate = moment(date).add(1, "days");
            var today = moment();
            return lastRefreshDate.diff(today) < 0;
        }
        return true; // hack to ensure we fetch data from server
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
    
    getDataFromServer: function(callback, forceUpdate){
        var that = this;
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
                    .sortBy(function(p){
                        return Utils.formatString(p.name);
                    })
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
                
                var activities = _.map(json.activities, function(a){
                    var i = 0;
                    var activity = {
                        id: a.id,
                        title: a.title,
                        titleShort: a.titleShort,
                        location: a.location,
                        description: a.description,
                        startDate: a.startDate,
                        endDate: a.endDate,
                        employeeId: a.employeeId,
                        deadlineDate: a.deadlineDate,
                        enrollments: _.compact(_.map(_.compact(a.enrollments), function(e){
                            i++;
                            
                            if(e.freeText){
                                var partner = _.find(partners, function(p) { return p.id == e.partnerId; });
                                return {id: i, name: e.freeText, partnerName: partner ? partner.name : "", passive: true };
                            } else if(e.personId) {
                                var person = _.find(persons, function(p) { return p.id == e.personId; });
                                if(person){
                                    var partner = _.find(partners, function(p) { return p.id == person.partnerId; });
                                    return {id: e.personId, name: person.firstName + " " + person.lastName, partnerName: partner ? partner.name : "", position: person.position, passive: false };
                                }
                            }
                        }))
                    };
                    return new Activity(activity);
                });
/*
                    sortedContactList = _.chain(activity.enrollments)
                .filter(function(enrollment) { return !!enrollment.freeText; })
                .map(function(enrollment) { 
                    key++;
                    var partner = _.find(that.props.partners, function(p) { return p.id == enrollment.partnerId; });
                    return <ContactBoxPassive contact={{ id: key, name: enrollment.freeText, partnerName: partner ? partner.name : "" }} />;
                }).value();
                   
                */
                store.set(Constants.LocalStorageKeys.partnerdata, partners);
                store.set(Constants.LocalStorageKeys.persons, persons);
                store.set(Constants.LocalStorageKeys.partnerTypes, partnerTypes);
                store.set(Constants.LocalStorageKeys.activities, activities);
                store.set(Constants.LocalStorageKeys.last_refresh_date, moment());

                var data = {
                    partners: partners, 
                    persons: persons, 
                    partnerTypes: partnerTypes,
                    activities: activities,
                    isUpdating: false
                };
                $(".navbar-collapse").collapse('hide'); // closes menu
                Alerter.alert("Oppdatering", "Vellykket oppdatering.");
                callback(data);
            },
            error: function(xhr, status, err) {
                if (xhr.status === 401){
                    Alerter.alert("Autorisering feilet", "Ugyldig tilkoblingsdata. Logg inn på nytt.");
                    AuthActions.logOut();
                    callback({ isUpdating: false });
                } else {
                    Alerter.alert("Oppdatering feilet", "Oppdateringen tok for lang tid. Prøv igjen.");
                    console.log("Timeout: " + status);
                    callback(that.getDataFromLocalStorage());
                }
                $(".navbar-collapse").collapse('hide'); // closes menu
            },
            timeout: Constants.Timeout
        });
    }
});
