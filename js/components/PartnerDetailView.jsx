var React = require("react");
var _ = require("underscore");
var Favorite = require("./Favorite.jsx");
var ContactBox = require("./ContactBox.jsx");

module.exports = React.createClass({

render: function () {
    var partner = this.props.selectedPartner;
    var sortedContacts = _.sortBy(partner.contacts, function(contact) {
        return [contact.lastName, contact.firstName].join("_");
    });

    var address = this.buildAddress(partner.address, partner.zipCode, partner.city);
    var website = this.buildWebsite(partner.webSite);
    var mailTo = this.buildMailTo(partner.email);
    var phone = this.buildPhone(partner.phone);
    
    var proffLink = "http://www.proff.no/bransjesøk?q=" + partner.name;
    var mapLink = this.buildMapLink(partner.address, partner.zipCode, partner.city);

    var i = 0;
    
    return (
        <div>
            <h3>{partner.name}{" "} <small>{partner.partnerType}</small></h3>
            <address>
            {address}
            <strong>Kontakt</strong><br/>
                {phone}
                {mailTo}
                <i className="glyphicon glyphicon-info-sign"></i> <a href={proffLink}>{partner.name} hos proff.no</a><br/>
                {website}
                {mapLink}                
            </address>
            <h4>Kontaktpersoner</h4>
                {
                    sortedContacts.map(function(contact){
                        return <ContactBox contact={contact} />
                    })
                }
        </div>
    )},
    
    buildAddress: function(address, zipCode, city){
        if(address && address.length > 0){
        return (
            <div>
                <strong>Adresse</strong><br/>
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
                <i className="glyphicon glyphicon-globe"></i> <a href={websiteLink}>{websiteLink}</a><br/>
                </span>
            );
        } else {
            return ("");
        }
    },
    
    buildMailTo: function(email){
        if(email && email.length > 0){
            var mailTo = "mailto:" + email;
            return (
                <span>
                    <i className="glyphicon glyphicon-envelope"></i> <a href={mailTo}>{email}</a><br/>
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
                    <i className="glyphicon glyphicon-earphone"></i> <a href={phoneLink}>{phone}</a><br/>
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
                <i className="glyphicon glyphicon-map-marker"></i> <a href={mapLink}>Åpne i kart</a><br/>             </span>
            );
        } else {
            return ("");
        }
    }
    
});