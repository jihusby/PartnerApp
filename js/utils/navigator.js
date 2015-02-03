var navigatorIterator = 0;
var Constants = require("../utils/partner-constants");
var store = require("store.js");

module.exports = {
    goTo: function(route){
        if (store.get(Constants.LocalStorageKeys.bearer_token)){
            navigatorIterator++;
        }
        routie(route);
    },
    
    getIterator: function(){
        return navigatorIterator;   
    },
    
    goBack: function(){
        var nav = window.navigator;
        if( this.phonegapNavigationEnabled &&
            nav &&
            nav.app &&
            nav.app.backHistory ){
            nav.app.backHistory();
        } else {
            window.history.back();
        }        
        navigatorIterator--;
    }
}

window.onpopstate = function(e) { 
    //navigatorIterator--;
    //console.log("popping");
    //var lastEntry = historyStack.pop();
    //history.replaceState({}, lastEntry, "#" + lastEntry);
}