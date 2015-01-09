/**
 *
 * Created by jam on 01/12/14.
 */

var React = require('react');

var fastclick = require('fastclick');
fastclick(document.body);
var Main = require('./components/Main.jsx');
var Login = require('./components/Login.jsx');
var Alert = require('./components/Alert.jsx');

var updateStatusBar = navigator.userAgent.match(/iphone|ipad|ipod/i) &&
parseInt(navigator.appVersion.match(/OS (\d)/)[1], 10) >= 7;
if (updateStatusBar) {
    document.body.style.marginTop = '20px';
}
React.render(<Main/>, document.getElementById("container"));
//React.render(<Login/>, document.getElementById("login"));