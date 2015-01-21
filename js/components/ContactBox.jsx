var React = require("react");

module.exports = React.createClass({
    onClickContact: function(id) {
        routie("contact/" + id);
    },
    
    render: function() {
    
        var partnerName = this.buildPartnerName(this.props.contact);
        
        return (
            <a className="list-group-item" onClick={this.onClickContact.bind(this, this.props.contact.id)}>
                <h4 className="list-group-item-heading">{this.props.contact.firstName} {this.props.contact.lastName}</h4>
                {partnerName}
            </a>
        );
    }, 
    
    buildPartnerName: function(contact) {
    
        if(contact.partnerName) {
            return (
                <p className="list-group-item-text">{contact.partnerName}</p>
            )
        } else {
            return ("");
        }
    }
});