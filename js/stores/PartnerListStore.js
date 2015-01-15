var Reflux = require("reflux");
var $ = require("jquery");
var store = require("store.js"); // cross browser local storage, NOT a reflux store

var DataStore = require("./DataStore");
var AuthActions = require("../actions/AuthActions");
var Constants = require("../utils/partner-constants");

module.exports = Reflux.createStore({

    init: function() {
        this.listenTo(DataStore, this.onSynchronizeData);
        this.listData = {partnerTypes: [], partnerList: []};
    },
    getDefaultData: function() {
        return this.listData;
    },
    onSynchronizeData: function(data) {
        console.log("Synchronize partnertypes called");
        this.listData.partnerList = data.partners;
        this.trigger(this.listData);
    },
    getInitialState: function () {
        // Need getInitialState to initialize listeners
        console.log("PartnerListStore is aquiring partnertypes")
        var partnerTypes = store.get(Constants.LocalStorageKeys.partnerTypes);
        this.listData.partnerTypes = partnerTypes;
        this.trigger(that.listData);
        return [];
    }
});