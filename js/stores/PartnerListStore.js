var Reflux = require("reflux");
var $ = require("jquery");
var store = require("store.js"); // cross browser local storage, NOT a reflux store

var PartnerStore = require("./PartnerStore");
var AuthActions = require("../actions/AuthActions");
var Constants = require("../utils/partner-constants");

module.exports = Reflux.createStore({

    init: function() {
        this.listenTo(PartnerStore, this.onSynchronizePartners);
        this.listData = {partnerTypes: [], partnerList: []};
    },
    getDefaultData: function() {
        return this.listData;
    },
    onSynchronizePartners: function(partners) {
        console.log("Synchronize partnertypes called");
        this.listData.partnerList = partners.partners;
        this.trigger(this.listData);
    },
    getInitialState: function () {
        // Need getInitialState to initialize listeners
        console.log("PartnerListStore is aquiring partnertypes")
        var that = this;
        this.getPartnerTypesFromBackend(function(partnerTypes){
            that.listData.partnerTypes = partnerTypes;
            that.trigger(that.listData);
        });
        return [];
    },
    getPartnerTypesFromBackend: function(callback) {
        if(!store.get("bearer_token")){
            return;   
        } else{
            $.ajax({
                url: Constants.URLS.partnerTypes,
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorize", store.get("bearer_token"));
                },
                success: function(data) {
                    console.log(data);
                    store.set(Constants.LocalStorageKeys.partnerTypes, data);
                    callback(data.partnerTypes);
                },
                error: function(xhr, status, err) {
                    if (xhr.status === 401){
                        AuthActions.logOut();
                        callback({});
                    }
                    var data = store.get(Constants.LocalStorageKeys.partnerTypes);
                    callback(data.partnerTypes);
                }
            });
        }
    }
});