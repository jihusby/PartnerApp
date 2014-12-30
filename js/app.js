/**
 *
 * Created by jam on 01/12/14.
 */

var React = require('react');
var Main = require('./components/Main.jsx');
var Login = require('./components/Login.jsx');
React.render(<Main/>, document.getElementById("container"));
React.render(<Login/>, document.getElementById("login"));