var React = require("react");
var Reflux = require("reflux");
var MenuActions = require("./actions/MenuActions");
var DataStore = require("./stores/DataStore");
var Alerter = require("./utils/alerter");

var Main = require("./components/Main.jsx");
var fastclick = require("fastclick");
var Hammer = require("hammer.js");
jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;

var Navigator = require("./utils/navigator");

fastclick(document.body);

document.addEventListener('deviceready', function() {
    StatusBar.overlaysWebView(false);
    StatusBar.styleBlackOpaque();
    StatusBar.backgroundColorByHexString("#333333");
}, false);

// check if needed    
var updateStatusBar = navigator.userAgent.match(/iphone|ipad|ipod/i) &&
parseInt(navigator.appVersion.match(/OS (\d)/)[1], 10) >= 7;
if (updateStatusBar) {
    document.body.style.marginTop = '20px';
}

var container = document.getElementById("container");
React.render(<Main/>, container);

var swipe = new Hammer(document.body);
swipe.get('swipe').set({ direction: Hammer.DIRECTION_RIGHT });

swipe.on("swiperight", function(){
    Navigator.goBack();
});

// check if user is active on resume
document.addEventListener("resume", onResume, false);

function onResume() {
    DataStore.getDataFromBackend(DataStore.updateData, false);
}

routie({
    "": function() {
        MenuActions.home();
    },
    "home": function() {
        MenuActions.home();
    },
    "search": function() {
        MenuActions.search();
    },
    "favorites": function() {
        MenuActions.favorites();
    },
    "login": function() {
        MenuActions.login();
    },
    "partnerList": function(){
      MenuActions.partnerlist();  
    },
    "partner/?:id": function(id) {
        if(id){
            MenuActions.partnerDetail(id);
        } else {
            MenuActions.partnerList();
        }
    },
    "person/:id": function(id){
        if(id){
            MenuActions.personDetail(id);
        }
    },
    "contact/:id": function(id){
        if(id){
            MenuActions.contactDetail(id);
        }
    },
    "activities": function(){
        MenuActions.activities();
    },
    "activity/:id": function(id){
        MenuActions.activity(id);   
    }

});
