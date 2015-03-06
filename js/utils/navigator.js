var navigatorIterator = 0;
var Constants = require("../utils/partner-constants");
var store = require("store.js");

var SessionStorage = require("../utils/sessionstorage");

var $ = require("jquery");

module.exports = {
    goTo: function(route){
        if (store.get(Constants.LocalStorageKeys.bearer_token)){
            navigatorIterator++;
        }
        routie(route);
    },
    
    goToAnchor: function(hash){
        navigatorIterator++;
        location.hash = "#" + hash;  
    },
    
    getIterator: function(){
        return navigatorIterator;   
    },
    
    goBack: function(){
        console.log("going back");
        if(navigatorIterator > 0){
            var nav = window.navigator;
            if( this.phonegapNavigationEnabled &&
                nav &&
                nav.app &&
                nav.app.backHistory ){
                console.log("going back 1");
                nav.app.backHistory();
            } else {
                console.log("going back 2 (history.back)");
                window.history.back();
            }
            navigatorIterator--;
        }

    },
    
    openExternalLink: function(url){
        if(navigator && navigator.userAgent.match(/iphone|ipad|ipod/i)){
            window.open(url, '_blank', 'location=yes');
        } else {
            if(navigator && navigator.app){
                navigator.app.loadUrl(url, {openExternal: true});
            } else{
                window.open(url, '_system');
            }
        }
    },

    goToTop: function() {

        var ignoreTop =  SessionStorage.get('ignoreTop');
        if(ignoreTop == 'true') {
            SessionStorage.set('ignoreTop', false);
        }else{
            $(window).scrollTop(0);
        }
    }

}

window.onpopstate = function(e) { 
    //navigatorIterator--;
    //console.log("popping");
    //var lastEntry = historyStack.pop();
    //history.replaceState({}, lastEntry, "#" + lastEntry);
}