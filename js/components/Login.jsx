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
                <div>
                    <Panel header="Logg inn">
                        <form className="form-horizontal">
                          <div className="form-group">
                            <label className="col-sm-2 control-label">E-post</label>
                            <div className="col-sm-10">
                              <Input
                                type="text"
                                placeholder="E-post"
                                ref="username"
                                className="form-control"
                            />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Passord</label>
                            <div className="col-sm-10">
                              <Input
                                type="password"
                                placeholder="Passord"
                                ref="password"
                                className="form-control"
                                onKeyDown={this.handleKeyDown}
                            />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
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
                this.login();
            }
        }
    });