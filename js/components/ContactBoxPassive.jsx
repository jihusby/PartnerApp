/**
 * Shows a single Contact in a passive list view (not clickable)
 *  input showPosition: Show the Contact's Position on 2nd line left-aligned
 *  input showPartner: Show Partner name on 3rd line right-aligned
 */
var React = require("react");
var Navigator = require("../utils/Navigator");

module.exports = React.createClass({
    mixins: [Navigator],
    
    buildPartnerName: function(contact, showName) {
        if(contact.partnerName) {
            return (
                <p className="list-group-item-text">{contact.partnerName}</p>
            );
        } else {
            return ("");
        }
    },
    
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.contact.id !== this.props.contact.id;
    },
    
    buildPosition: function(contact, showPosition) {
        if(showPosition) {
            if(contact.position) {
                return (
                    <p className="list-group-item-text position-list-item"><i>{contact.position}</i></p>
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
        var contactName = contact.firstName + " " + contact.lastName;
        return (
            <div className="list-group-item">
                <div className="container list-container">
                    <h4 className="list-group-item-heading">{contactName}</h4>
                </div>
                <div>
                    <div>
                        <small>{partnerName}</small>
                    </div>
                </div>
            </div>

        );
    }
});