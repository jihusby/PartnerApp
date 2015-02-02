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
        var logoSrc = Constants.URLS.partnerLogos + partner.logo;

        var contacts = sortedContacts.map(function(contact){
            return (
                <ContactBox contact={contact} showPosition={true} showFavorite={true} />
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
    {website}
    {proffLink}
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
        var mapLink = "http://maps.google.com/maps?q=" + encodeURIComponent(address + ", " + zipCode + ", " + city + ", " + "norway");

        return (
            <span>
                <div className="row">
                    <div className="col-xs-1 top-margin">
                        <div className="parent-content">
                            <div className="left-icon">
                                <i className="glyphicon glyphicon-map-marker"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11 top-margin">
                        <div className="parent-content">
                            <div className="right-line">
                                <small><a onClick={this.openExternalLink.bind(this, mapLink)}> {address}<br/>{zipCode} {city}</a></small><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    } else {
        return ("");
    }
},

buildWebsite: function(website){
    if(website && website.length > 0){
        var hasHttp = website.indexOf("http://") == 0;
        var websiteLink = hasHttp ? website : "http://" + website;
        return (
            <span>
                <div className="row">
                    <div className="col-xs-1">
                        <div className="parent-content">
                            <div className="left-icon">
                                <i className="glyphicon glyphicon-globe"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <div className="parent-content">
                            <div className="right-line">
                                <small><a onClick={this.openExternalLink.bind(this, websiteLink)}>{websiteLink}</a></small><br/>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div className="row">
                <div className="col-xs-1">
                    <div className="parent-content">
                        <div className="left-icon">
                            <i className="glyphicon glyphicon-info-sign"></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    <div className="parent-content">
                        <div className="right-line">
                            <small><a onClick={this.openExternalLink.bind(this, proffLink)}>Info fra proff.no</a></small><br/>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
},

buildMailTo: function(email){
    if(email && email.length > 0){
        var mailTo = "mailto:" + email;
        return (
            <span>
                <div className="row">
                    <div className="col-xs-1">
                        <div className="parent-content">
                            <div className="left-icon">
                                <i className="glyphicon glyphicon-envelope"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <div className="parent-content">
                            <div className="right-line">
                                <small><a href={mailTo}>{email}</a></small><br/>
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className="row">
                    <div className="col-xs-1">
                        <div className="parent-content">
                            <div className="left-icon">
                                <i className="glyphicon glyphicon-earphone"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11">
                        <div className="parent-content">
                            <div className="right-line">
                                <small><a href={phoneLink}>{phone}</a></small><br/>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        );
    }else{
        return ("");
    }
}

});