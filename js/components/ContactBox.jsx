var React = require("react");
var Favorite = require("./Favorite.jsx");


module.exports = React.createClass({
    onClickContact: function(id) {
        routie("contact/" + id);
    },
    render: function() {
        var partnerName = this.buildPartnerName(this.props.contact, this.props.showPartner);
        var contactName = this.props.contact.firstName + " " + this.props.contact.lastName;
        return (
            <div className="row list-group-item container">
                <h4 className="list-group-item-heading"><Favorite id={this.props.contact.id} /></h4>
                <a onClick={this.onClickContact.bind(this, this.props.contact.id)}>
                    <div className="col-xs-10">
                        <div>
                            <h4 className="list-group-item-heading"> {contactName}</h4>
                            {partnerName}
                        </div>
                    </div>
                </a>
            </div>
        );
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
    }
});