var React = require("react");
var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");
var Constants = require("../utils/partner-constants");
var Alert =require("./Alert.jsx");
module.exports =
    
    React.createClass({
    getInitialState: function() {
      var state = { 
          loggedIn: !!sessionStorage.getItem("bearer_token"),
          error: undefined
      };
        return state;
    },
    render: function () {
    if(!!this.state.error){
        React.render(<Alert title={this.state.error.title} message={this.state.error.message} showAlert={true} />, document.getElementById("alert-container"));
    }
            if(this.state.loggedIn){
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
        },
        login: function() {
            var that = this;
            var credentials = { Email: this.refs.username.getValue(), Password: this.refs.password.getValue() };
            $.ajax({
                type: "POST",
                url: Constants.URLS.login,
                data: credentials,
                success: function (token) {
                    sessionStorage.setItem("bearer_token", token);
                    that.setState({ loggedIn: true, error: undefined });
                },
				error: function(errorMsg) {
                    that.setState({ loggedIn: false, error: { title: "Det skjedde en feil.", message: errorMsg } });
                    // TODO: Present error to user
				    console.log(errorMsg);
				}
            });
        },
        logOut: function() {
            sessionStorage.removeItem("bearer_token");
            this.setState({ loggedIn: false, error: undefined });
        },
    });