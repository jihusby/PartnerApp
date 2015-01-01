var React = require("react");
var Alert = require("react-bootstrap/Alert");

module.exports =
    React.createClass({
   
    getInitialState: function(){
        return { showAlert: false };
    },
    
    render: function(){
        if(this.state.showAlert){
            return (
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <h4>{this.props.title}</h4>
                    <p>{this.props.message}</p>
                </Alert>
            );
        }else{
         return (
           <div style="display:none"></div>  
         );
        }
    },
    
    handleAlertDismiss: function(){
     this.setState({ showAlert: false});   
    }
});