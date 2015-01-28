/**
 * Shows a single Contact in a list view
 * input:
 *  showPosition: Show the Contact's Position on the line below the name
 *  showPartner: Show Partner name to the right on the first available line
 */
var React = require("react");

module.exports = React.createClass({
    onClickContact: function(id) {
        routie("contact/" + id);
    },

    buildPartnerName: function(contact, showName) {
        if(showName) {
            if(contact.partnerName) {
                return (
                    <p className="list-group-item-text partnertype-list-item">{contact.partnerName}</p>
                );
            } else {
                return ("");
            }
        }else {
            return ("");
        }
    },

    buildPosition: function(contact, showPosition) {
        if(showPosition) {
            if(contact.position) {
                return (
                    <p className="list-group-item-text position-list-item">{contact.position}</p>
                );
            } else {
                return <p className="list-group-item-text position-list-item">&nbsp;</p>
            }
        }else {
            return ("");
        }
    },

    render: function() {
        var contact = this.props.contact;
        var partnerName = this.buildPartnerName(contact, this.props.showPartner);
        var position = this.buildPosition(contact, this.props.showPosition);
        var contactName = contact.firstName + " " + contact.lastName;
        return (
            <a className="list-group-item" onClick={this.onClickContact.bind(this, contact.id)}>
                <h4 className="list-group-item-heading">{contactName}</h4>
                <small>
                    {position}
                    {partnerName}
                </small>
            </a>
        );
    }
});