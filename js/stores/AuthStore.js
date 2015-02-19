var Reflux = require("reflux");

var $ = require("jquery");

var store = require("store.js");

var AuthActions = require("../actions/AuthActions");
var BackendActions = require("../actions/BackendActions");

var Constants = require("../utils/partner-constants");
var MenuActions = require("../actions/MenuActions");

module.exports = Reflux.createStore({

    listenables: [AuthActions],

    getDefaultData: function(){
        return {
            loggedIn: store.get(Constants.LocalStorageKeys.bearer_token) ? true : false,
            name: store.get(Constants.LocalStorageKeys.name),
            error: undefined
        };
    },
    onLogIn: function(credentials) {
            var that = this;
            $.ajax({
                type: "POST",
                url: Constants.URLS.login,
                data: credentials,
                success: function (data) {
                    store.set(Constants.LocalStorageKeys.bearer_token, data.token);
                    store.set(Constants.LocalStorageKeys.uid, data.userId);
                    store.set(Constants.LocalStorageKeys.name, data.name);

                    BackendActions.synchronizeData();
                    MenuActions.home();
                    that.trigger({ loggedIn: true, name: data.name, error: undefined });
                },
				error: function(errorMsg) {
                    that.trigger({ loggedIn: false, name: "", error: { title: "Det skjedde en feil.", message: errorMsg.responseJSON } });
				}
            });
    },

    onLogOut: function () {
        store.remove(Constants.LocalStorageKeys.bearer_token);
        store.remove(Constants.LocalStorageKeys.name);
        store.remove(Constants.LocalStorageKeys.uid);
        this.trigger({loggedIn: false, name: "", error: undefined });
    }
});
