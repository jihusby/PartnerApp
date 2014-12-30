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
                success: function (msg) {
                    var token = msg;
                    console.log(msg);
                },
				error: function(errorMsg) {
				    console.log(errorMsg.responseText);
				}
        });
        },
        render: function () {
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
                        <Button bsStyle="primary" onClick={this.login}>Login</Button>                
                    </div>
                </span>
            );
        }
    });