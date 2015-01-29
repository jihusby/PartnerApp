var React = require("react");
var _ = require("underscore");

var LocalStorageUtils = require("../utils/localstorage-utils");
var FormatUtils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants");
var Button = require("react-bootstrap/Button");
var Favorite = require("./Favorite.jsx");
var ContactBox = require("./ContactBox.jsx");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var Contact = require("../model/Contact.js");

module.exports = React.createClass({

    onClickPartner: function(id) {
        routie("partner/" + id);
    },

render: function () {
    var contact = LocalStorageUtils.findContact(this.props.id);
    var partner = LocalStorageUtils.findPartner(contact.partnerId);
    var name = [contact.firstName, contact.lastName].join(" ");
    var position = this.buildPosition(contact.position);
    var phone = this.buildPhone(contact.phone);
    var mobile = this.buildMobile(contact.mobile);
    var mail = this.buildMailTo(contact.email);
    var sms = this.buildSMS(contact.mobile);
    var note = this.buildNote(contact.note);
    var partnerName = this.buildPartnerName(partner.name);

    /* TODO: Remove this placeholder and add contact image */
    var logoSrc = Constants.URLS.partnerLogos + partner.logo;
    return (
        <div>
            <div className="media">
                <div className="media-left">
                    <span className="helper"></span>
                    <img className="media-object" src={logoSrc} />
                </div>
                <div className="media-body">
                    <h3><strong>{name}</strong></h3>
                    <small>{position}</small>
                </div>
            </div>
            <address>
{partnerName}
{phone}
{mobile}
{mail}
{sms}
            </address>
            <strong>Notat</strong>
        {contact.note}
        </div>
    )},

    buildPartnerName: function(partnerName){
        return (
            <div>
                {partnerName}<br/>
            </div>
        )
    },

    buildPosition: function(position){
        if(position && position.length > 0){
        return (
            <small>{position}</small>
        );
        }else{
            return ("");
        }
    },
    
    buildMailTo: function(email){
        if(email && email.length > 0){
            var mail = "mailto:" + email;
            return (
            <span>
                <i className="glyphicon glyphicon-envelope"></i> <small><a href={mail}>Send e-post</a></small><br/>
            </span>
            );
        } else {
            return ("");
        }
    },
    
    buildPhone: function(phone){
        if(phone && phone.length > 0){
            var phoneLink = "tel:" + phone;
            var phoneFormatted = FormatUtils.formatPhone(phone);
            return (
                <span>
                    <i className="glyphicon glyphicon-earphone"></i> <small><a href={phoneLink}>{phoneFormatted}</a></small><br/>
                </span>
            );
        }else{
            return("");
        }
    },

    buildMobile: function(mobile){
        if(mobile && mobile.length > 0){
            var mobileLink = "tel:" + mobile;
            var mobileFormatted = FormatUtils.formatMobile(mobile);
            return (
                <span>
                    <i className="glyphicon glyphicon-earphone"></i> <small><a href={mobileLink}>{mobileFormatted}</a></small><br/>
                </span>
            );
        }else{
            return ("");
        }
    },

    buildSMS: function(mobile){
        if(mobile && mobile.length > 0){
            var smsLink = "sms:" + mobile;
            return (
                <span>
                    <i className="glyphicon glyphicon-comment"></i> <small><a href={smsLink}>Send SMS</a></small><br/>
                </span>
            );
        }else{
            return ("");
        }
    },

    buildNote: function(note){
        if(note && note.length > 0){
            return (
                <div>
                    <strong>Notat</strong><br/>
                    {note}<br/><br/>
                </div>
            );
        } else{
            return ("");
        }
    }

});
