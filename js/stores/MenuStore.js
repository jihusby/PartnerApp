/**
 *
 * Created by jam on 05/12/14.
 */
var Reflux = require("reflux");

var MenuActions = require("../actions/MenuActions");

var Constants = require("../utils/partner-constants");


module.exports = Reflux.createStore({

    listenables: [MenuActions]  ,

    onSearch: function() {
        console.log("Search partners called from React Component")
        this.menuItemSelected(Constants.MenuItems.home);
    },

    onFavourites: function() {
        console.log("Favourites called from React Component")
        this.menuItemSelected(Constants.MenuItems.favourites);
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        return Constants.MenuItems.home;
    },

    menuItemSelected: function(menuItem) {
        this.trigger(menuItem);
    }


});
