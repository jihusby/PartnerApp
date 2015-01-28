/**
 * Shows a single Contact in a list view
 *  input showPosition: Show the Contact's Position on 2nd line left-aligned
 *  input showPartner: Show Partner name on 3rd line right-aligned
 *  input showFavorite: Show favorite star on 1st line to the left of the name
 */
var React = require("react");
var Favorite = require("./Favorite.jsx");

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

    buildFavorite: function(contact, showFavorite) {
        if(showFavorite) {
            return (
                <Favorite  id={contact.id} />
                );
        }else {
            return ("");
        }
    },

    /*
    TODO: Show favorite star before the contact name
     */
    render: function() {
        var contact = this.props.contact;
        var favorite = this.buildFavorite(contact, this.props.showFavorite);
        var position = this.buildPosition(contact, this.props.showPosition);
        var partnerName = this.buildPartnerName(contact, this.props.showPartner);
        var contactName = contact.firstName + " " + contact.lastName;
        return (
        <div>
            <a className="list-group-item" onClick={this.onClickContact.bind(this, contact.id)}>
                <h4 className="list-group-item-heading"> {contactName}</h4>
                <small>
                    {position}
                    {partnerName}
                </small>
            </a>
            </div>
        );
    }
});