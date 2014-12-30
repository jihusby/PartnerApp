/**
 *
 * Created by aj on 30/12/14.
 */
var Reflux = require("reflux");

var AuthActions = require("../actions/AuthActions");

var Constants = require("../utils/partner-constants");


module.exports = Reflux.createStore({

    listenables: [AuthActions],

    logIn: function(credentials) {
        var callback = "";
        $.ajax({
            url: Constants.URLS.login,
            type: "POST",
            data: credentials,
            success: function(data) {
                console.log(data);
                callback(data);
            },
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString())
                callback({});
            }
        });
    },

    onLoggedIn: function() {
        console.log("Favourites called from React Component")
    },

    logOut: function () {
        console.log("React Component is connecting...")
    }
});
