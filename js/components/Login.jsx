var React = require("react");
var Reflux = require("reflux");

var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");
var Constants = require("../utils/partner-constants");
var Panel = require("react-bootstrap/Panel");

var Alert = require("./Alert.jsx");

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
                return (
                <div>
                    <Panel header="Logg inn">
                        <form class="form-horizontal">
                          <div class="form-group">
                            <label class="col-sm-2 control-label">E-post</label>
                            <div class="col-sm-10">
                              <Input
                                type="text"
                                placeholder="E-post"
                                ref="username"
                                className="form-control"
                            />
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-sm-2 control-label">Passord</label>
                            <div class="col-sm-10">
                              <Input
                                type="password"
                                placeholder="Passord"
                                ref="password"
                                className="form-control"
                                onKeyDown={this.handleKeyDown}
                            />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                              <Button bsStyle="primary" onClick={this.login}>Logg inn</Button>            
                            </div>
                          </div>
                        </form>
                   </Panel>     
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
                var credentials = { 
                    Email: this.refs.username.getValue(), 
                    Password: this.refs.password.getValue() 
                };
                AuthActions.logIn(credentials);
            }
        }
    });