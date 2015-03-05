var React = require("react");
var Alert = require("react-bootstrap/Alert");

module.exports =
    React.createClass({
    
    getInitialState: function(){
        return { show: true };
    },
    
    render: function(){
        if(this.state.show){
            return (
                <div>
                    <Alert bsStyle="success" onDismiss={this.handleAlertDismiss}>
                        <h4>Oppdater</h4>
                        <p>Oppdatering vellykket!</p>
                    </Alert>
                </div>
            );
        } else{
            return (
                <span></span>
                );
        }
    },
    
    handleAlertDismiss: function(){
        this.setState({ show:false });
    }
});