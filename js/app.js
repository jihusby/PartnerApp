var React = require("react");
var routie = require("routie");
var fastclick = require("fastclick");

fastclick(document.body);
var Main = require('./components/Main.jsx');
var Login = require('./components/Login.jsx');
var Alert = require('./components/Alert.jsx');

document.addEventListener('deviceready', function() {
    StatusBar.overlaysWebView(false);
    StatusBar.styleBlackOpaque();
    StatusBar.backgroundColorByHexString("#333333");
}, false);

//routie("", function(){
//  React.render(<Main/>, document.getElementById("container"));  
//});

React.render(<Main/>, document.getElementById("container"));  
//React.render(<Login/>, document.getElementById("login"));