var Reflux = require("reflux");

var MenuActions = require("../actions/MenuActions");

var Constants = require("../utils/partner-constants");

module.exports = Reflux.createStore({
    
    listenables: [MenuActions]  ,

    onSearch: function() {
        this.menuItemSelected(Constants.MenuItems.home);
    },

    onPartnerlist: function() {
        this.menuItemSelected(Constants.MenuItems.partnerlist);
    },

    onFavorites: function() {
        this.menuItemSelected(Constants.MenuItems.favourites);
    },
    
    onLogin: function(){
      this.menuItemSelected(Constants.MenuItems.login);
    },
    
    onPartnerDetail: function(id){
        this.menuItemSelected(Constant.MenuItems.partner_detail, id);
    },
    
    onPersonDetail: function(id){
        this.menueItemSelected(Constant.MenuItems.person_detail, id);
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
