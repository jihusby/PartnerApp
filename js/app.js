var React = require("react");
var Reflux = require("reflux");
var MenuActions = require("./actions/MenuActions");
var fastclick = require("fastclick");

fastclick(document.body);
    
var updateStatusBar = navigator.userAgent.match(/iphone|ipad|ipod/i) &&
parseInt(navigator.appVersion.match(/OS (\d)/)[1], 10) >= 7;
if (updateStatusBar) {
    document.body.style.marginTop = '20px';
}

routie({
    "": function() {
        MenuActions.search(); 
    },
    "favorites": function() {
        MenuActions.favorites();
    },
    "login": function() {
        MenuActions.login();
    }
});
