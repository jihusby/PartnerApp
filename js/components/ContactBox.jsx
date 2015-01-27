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

render: function() {
    var contact = this.props.contact;
    var showPartner = this.props.showPartner;
    var partnerName = this.buildPartnerName(contact, showPartner);
    var contactName = contact.firstName + " " + contact.lastName;
    return (
        <a className="list-group-item" onClick={this.onClickContact.bind(this, contact.id)}>
<h4 className="list-group-item-heading">{contactName}</h4>
<small><span className="list-group-item-text position-list-item">{contact.position}&nbsp;</span>
{partnerName}</small>
</a>
);
}
});