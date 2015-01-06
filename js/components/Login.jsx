var React = require("react");
var Reflux = require("reflux");

var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");
var Constants = require("../utils/partner-constants");

var AuthActions = require("../actions/AuthActions");
var AuthStore = require("../stores/AuthStore");

module.exports =
    
    React.createClass({
    
    mixins: [Reflux.connect(AuthStore,"loginResult")],
    
    getInitialState: function() {
      var state = {
            loginResult:{
              loggedIn: !!sessionStorage.getItem(Constants.SessionStorageKeys.bearer_token),
              name: sessionStorage.getItem(Constants.SessionStorageKeys.name) || "",
              error: undefined
          }
      };
        return state;
    },
    
    render: function () {
            if(this.state.loginResult.loggedIn){
                return (
                    <span>{this.state.loginResult.name} <Button bsStyle="primary" onClick={this.logOut}>Logg ut</Button></span>
                );
            }else{
                return (                    
                    <span>
                        <div className="form-group">
                            <Input
                                type="text"
                                placeholder="E-post"
                                ref="username"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                type="password"
                                placeholder="Passord"
                                ref="password"
                                className="form-control"
                                onKeyDown={this.handleKeyDown}
                            />
                        </div>
                        <div className="form-group">
                            <Button bsStyle="primary" onClick={this.login}>Logg inn</Button>                
                        </div>
                    </span>
                );
            }
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
                var credentials = { 
                    Email: this.refs.username.getValue(), 
                    Password: this.refs.password.getValue() 
                };
                AuthActions.logIn(credentials);
            }
        },
        
        logOut: function() {
            AuthActions.logOut();
        },
    });