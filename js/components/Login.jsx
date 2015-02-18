var React = require("react");
var Reflux = require("reflux");

var store = require("store.js");

var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");
var Panel = require("react-bootstrap/Panel");

var Alert = require("./Alert.jsx");

var AuthActions = require("../actions/AuthActions");
var AuthStore = require("../stores/AuthStore");
var Constants = require("../utils/partner-constants");

module.exports = React.createClass({
    
    mixins: [Reflux.connect(AuthStore,"loginResult")],
    
    getInitialState: function() {
        return {
            loginResult:{
              loggedIn: !!store.get(Constants.LocalStorageKeys.bearer_token),
              name: store.get(Constants.LocalStorageKeys.name) || "",
              error: undefined
          }
        };
    },
    
    render: function () {
                return (
                    <div className="loginForm">
                       <div className="logo-container">
                            <img src="images/logo_xs_small.png" className="rbk-logo" />
                       </div>
                        <p>Logg inn med samme epostadresse og passord som du bruker på nettsiden til Godfoten.</p>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Input
                                            type="email"
                                            placeholder="E-post"
                                            ref="username"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Input
                                            type="password"
                                            placeholder="Passord"
                                            ref="password"
                                            className="form-control"
                                            onKeyDown={this.handleKeyDown}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-offset-1 col-sm-9 pull-right">
                                        <Button className="gold-btn" bsStyle="btn" onClick={this.login}>Logg inn</Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <Alert />
                    </div>
                );
        },
        
        login: function() {
            var credentials = { 
                Email: this.refs.username.getValue(), 
                Password: this.refs.password.getValue() 
            };
            AuthActions.logIn(credentials);
        },
        
        handleKeyDown: function(evt) {
            if (evt.keyCode == 13 ) {
                this.login();
            }
        }
    });