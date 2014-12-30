var React = require("react");
var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");
var Constants = require("../utils/partner-constants");
module.exports =
    
    React.createClass({
        login: function() {
            var credentials = { Email: this.refs.username.getValue(), Password: this.refs.password.getValue() };
            $.ajax({
                type: "POST",
                url: Constants.URLS.login,
                data: credentials,
                success: function (token) {
                    sessionStorage.setItem("bearer_token", token);
                    // TODO: refresh component
                },
				error: function(errorMsg) {
                    // TODO: Present error to user
				    console.log(errorMsg);
				}
            });
        },
        logOut: function() {
          sessionStorage.removeItem("bearer_token");
            // TODO: refresh component
        },
        render: function () {
            var isLoggendIn = !!sessionStorage.getItem("bearer_token");
                if(isLoggendIn){
                    return (
                        <Button bsStyle="primary" onClick={this.logOut}>Logg ut</Button>
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
                                />
                            </div>
                            <div className="form-group">
                                <Button bsStyle="primary" onClick={this.login}>Logg inn</Button>                
                            </div>
                        </span>
                    );
                }
        }
    });