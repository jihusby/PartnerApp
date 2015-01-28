var React = require("react");
var _ = require("underscore");
var Favorite = require("./Favorite.jsx");
var ContactBox = require("./ContactBox.jsx");
var Constants = require("../utils/partner-constants.js");

module.exports = React.createClass({

    getInitialState: function(){
        return {
            sortedContacts: [],
            contacts: [],
            partner: ''
        };
    },

    render: function () {
        var partner = this.props.selectedPartner;
        var sortedContacts = _.sortBy(partner.contacts, function(contact) {
            return [contact.lastName, contact.firstName].join("_");
        });

        var address = this.buildAddress(partner.address, partner.zipCode, partner.city);
        var website = this.buildWebsite(partner.webSite);
        var mailTo = this.buildMailTo(partner.email);
        var phone = this.buildPhone(partner.phone);

        var proffLink = this.buildProffLink(partner.name);
        var mapLink = this.buildMapLink(partner.address, partner.zipCode, partner.city);
        var logoSrc = Constants.URLS.partnerLogos + partner.logo;

        var contacts = sortedContacts.map(function(contact){
            return (
                <ContactBox contact={contact} showPosition={true} />
            );
        });

        return (
            <div>
            <div className="media">
        <div className="media-left">
        <span className="helper"></span>
        <img className="media-object" src={logoSrc} />
        </div>
        <div className="media-body">
        <h3><strong>{partner.name}</strong></h3>
<small>{partner.partnerType}</small>
</div>
</div>
<address>
{address}
{phone}
{mailTo}
{proffLink}
{website}
{mapLink}
</address>
<strong>Kontaktpersoner</strong>
{contacts}
</div>
)},

openExternalLink: function(link){
    window.open(link, '_system');
},

buildAddress: function(address, zipCode, city){
    if(address && address.length > 0){
        return (
            <div>
            {address}<br/>
            {zipCode} {city}<br/><br/>
        </div>
    );
    } else{
        return ("");
    }
},

buildWebsite: function(website){
    if(website && website.length > 0){
        var hasHttp = website.indexOf("http://") == 0;
        var websiteLink = hasHttp ? website : "http://" + website;
        return (
            <span>
            <i className="glyphicon glyphicon-globe"></i> <small><a onClick={this.openExternalLink.bind(this, websiteLink)}>{websiteLink}</a></small><br/>
        </span>
    );
    } else {
        return ("");
    }
},

buildProffLink: function(name){
    var proffLink = "http://www.proff.no/bransjesøk?q=" + name;
    return (
        <span>
        <i className="glyphicon glyphicon-info-sign"></i> <small><a onClick={this.openExternalLink.bind(this, proffLink)}>Info fra proff.no</a></small><br/>
    </span>
);
},

buildMailTo: function(email){
    if(email && email.length > 0){
        var mailTo = "mailto:" + email;
        return (
            <span>
            <i className="glyphicon glyphicon-envelope"></i> <small><a href={mailTo}>{email}</a></small><br/>
        </span>
    );
    } else {
        return ("");
    }
},

buildPhone: function(phone){
    if(phone && phone.length > 0){
        var phoneLink = "tel:" + phone;
        return (
            <span>
            <i className="glyphicon glyphicon-earphone"></i> <small><a href={phoneLink}>{phone}</a></small><br/>
        </span>
    );
    }else{
        return ("");
    }
},

buildMapLink: function(address, zipCode, city){
    if(address && address.length > 0){
        var mapLink = "http://maps.google.com/maps?q=" + encodeURIComponent(address + ", " + zipCode + ", " + city + ", " + "norway");
        return (
            <span>
            <i className="glyphicon glyphicon-map-marker"></i> <small><a onClick={this.openExternalLink.bind(this, mapLink)}>Åpne i kart</a></small><br/>
        </span>
    );
    } else {
        return ("");
    }
}

});