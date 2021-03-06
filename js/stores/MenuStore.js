var Reflux = require("reflux");

var MenuActions = require("../actions/MenuActions");

var Constants = require("../utils/partner-constants");

module.exports = Reflux.createStore({
    
    listenables: [MenuActions],

    onHome: function() {
        this.menuItemSelected(Constants.MenuItems.home);
    },

    onSearch: function() {
        this.menuItemSelected(Constants.MenuItems.search);
    },

    onPartnerlist: function() {
        this.menuItemSelected(Constants.MenuItems.partnerlist);
    },

    onFavorites: function() {
        this.menuItemSelected(Constants.MenuItems.favorites);
    },
    
    onLogin: function(){
      this.menuItemSelected(Constants.MenuItems.login);
    },
    
    onPartnerDetail: function(id){
        this.menuItemSelected(Constants.MenuItems.partner_detail, id);
    },
    
    onPersonDetail: function(id){
        this.menuItemSelected(Constants.MenuItems.person_detail, id);
    },

    onContactDetail: function(id){
        this.menuItemSelected(Constants.MenuItems.contact_detail, id);
    },

    onActivity: function(id){
        this.menuItemSelected(Constants.MenuItems.activity, id);
    },
    
    onActivities: function(){
        this.menuItemSelected(Constants.MenuItems.activities);  
    },

    getInitialState: function () {
        console.log("React Component is connecting...")
        return Constants.MenuItems.home;
    },

    menuItemSelected: function(menuItem, id) {
        if(id){
            this.trigger({path: menuItem, id: id});
        }else{
            this.trigger({path: menuItem});
        }
    }
});
