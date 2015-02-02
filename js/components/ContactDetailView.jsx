var React = require("react");
var _ = require("underscore");

var LocalStorageUtils = require("../utils/localstorage-utils");
var FormatUtils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants");
var Button = require("react-bootstrap/Button");
var Favorite = require("./Favorite.jsx");
var ContactNote = require("./ContactNote.jsx");
var ContactBox = require("./ContactBox.jsx");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var Contact = require("../model/Contact.js");
var Reflux = require("reflux");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"contactNotes")],

    getInitialState: function() {
        ContactActions.getContactNotes();
        return {
            contactNote: 'Initial'
        };

    },

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
        /*var note = this.buildNote(contact.note);*/
        var partnerName = this.buildPartnerName(partner);

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
                        <h3><strong>{name}</strong> <Favorite id={contact.id} /></h3>
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
                <ContactNote addToContactNotes={this.addToContactNotes} />
            </div>
        )},

    addToContactNotes: function(contactNote){
        var contactNotes = this.state.contactNotes || [];
        var contactNote = { id: this.props.id, contactNote: contactNote };

        console.log("cn.length: " + contactNotes.length);
        var cn = _.findWhere(contactNotes, {contactNote: contactNote});
        console.log("cn: " + cn);
        var found = _.findWhere(contactNotes, {id: this.props.id});
        if(found){
            console.log("found: " + found);
            ContactActions.setContactNotes(_.union(contactNotes, [found]));
        }else{

        }

        console.log("contactNotes are " + JSON.stringify(contactNotes));
        ContactActions.setContactNotes(_.union(contactNotes, [contactNote]));

    },

    buildPartnerName: function(partner){
        return (
            <div>
                <a onClick={this.onClickPartner.bind(this, partner.id)}>{partner.name}</a><br/>
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
                                    <small><a href={mailTo}>Send e-post</a></small><br/>
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
            var phoneFormatted = FormatUtils.formatPhone(phone);
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
                                    <small><a href={phoneLink}>{phoneFormatted}</a></small><br/>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <small><a href={mobileLink}>{mobileFormatted}</a></small><br/>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <div className="row">
                        <div className="col-xs-1">
                            <div className="parent-content">
                                <div className="left-icon">
                                    <i className="glyphicon glyphicon-comment"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-11">
                            <div className="parent-content">
                                <div className="right-line">
                                    <small><a href={smsLink}>Send SMS</a></small><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            );
        }else{
            return ("");
        }
    },


    handleChange: function(field, e) {
        console.log("field is " + field);
        var nextState = {}
        nextState[field] = e.target.checked
        this.setState(nextState)
        console.log("nextState is " + nextState[field]);
    }

});
