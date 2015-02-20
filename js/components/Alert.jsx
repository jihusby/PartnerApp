var React = require("react");
var Reflux = require("reflux");
var Alert = require("react-bootstrap/Alert");

var AuthStore = require("../stores/AuthStore");

module.exports =
    React.createClass({
    mixins: [Reflux.connect(AuthStore,"loginResult")],
    getInitialState: function(){
    var state = {
            loginResult:{
                  error: undefined
              } 
          };
        return state;
    },
    
    render: function(){
        var styles = {display:"none"};
        if(!!this.state.loginResult.error){
            return (
            <div>
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <h4>{this.state.loginResult.error.title}</h4>
                    <p>{this.state.loginResult.error.message}</p>
                </Alert>
            </div>
            );
        }else{
         return (
           <div style={styles}></div>  
         );
        }
    },
    
    handleAlertDismiss: function(){
        this.setState({             
            loginResult:{
                  error: undefined
            } 
        });
    }
});