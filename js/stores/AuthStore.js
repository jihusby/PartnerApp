var Reflux = require("reflux");

var AuthActions = require("../actions/AuthActions");
var BackendActions = require("../actions/BackendActions");

var Constants = require("../utils/partner-constants");
var MenuActions = require("../actions/MenuActions");

module.exports = Reflux.createStore({

    listenables: [AuthActions],

    getDefaultData: function(){
        return {
            loggedIn: sessionStorage.getItem(Constants.SessionStorageKeys.bearer_token) ? true : false,
            name: sessionStorage.getItem(Constants.SessionStorageKeys.name),
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
                    sessionStorage.setItem(Constants.SessionStorageKeys.bearer_token, data.token);
                    sessionStorage.setItem(Constants.SessionStorageKeys.uid, data.userId);
                    sessionStorage.setItem(Constants.SessionStorageKeys.name, data.name);

                    BackendActions.synchronizePartners();
                    that.trigger({ loggedIn: true, name: data.name, error: undefined });
                    MenuActions.search();
                },
				error: function(errorMsg) {
                    that.trigger({ loggedIn: false, name: "", error: { title: "Det skjedde en feil.", message: errorMsg.responseJSON } });
				}
            });
    },

    onLogOut: function () {
        sessionStorage.removeItem(Constants.SessionStorageKeys.bearer_token);
        sessionStorage.removeItem(Constants.SessionStorageKeys.name);
        sessionStorage.removeItem(Constants.SessionStorageKeys.uid);
        this.trigger({loggedIn: false, name: "", error: undefined });
    }
});
