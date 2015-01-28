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
    var partnerName = partner.name;
    return (
        <div>
            <h3>{name} <Favorite id={contact.id} />{position}<small> <br/><a onClick={this.onClickPartner.bind(this, partner.id)}>{partnerName}</a></small></h3>
            {phone}
            {mobile}
            {mail}
            {sms}
            <div>
                <div className="panel-body">
                    {note}
                </div>
            </div>
        </div>
    )},

    buildPosition: function(position){
        if(position && position.length > 0){
        return (
            <small><br /><strong>{position}</strong></small>
        );
        }else{
            return ("");
        }
    },
    
    buildMailTo: function(email){
        if(email && email.length > 0){
            var mail = "mailto:" + email;
            return (
                <a href={mail}>
                    <div className="list-group-item list-group-item-heading">
                        <h4>
                            <span>
                                <i className="glyphicon glyphicon-envelope btn btn-sm btn-primary"></i>
                            </span>
                            <span className="list-link">
                                &nbsp;Send e-post
                            </span>
                        </h4>
                    </div>
                </a>
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
                <a href={phoneLink}>
                    <div className="list-group-item list-group-item-heading">
                        <h4>
                            <span>
                                <i className="glyphicon glyphicon-earphone btn btn-sm btn-primary"></i>
                            </span>
                            <span className="list-link">
                                &nbsp;{phoneFormatted}
                            </span>
                        </h4>
                    </div>
                </a>
            );
        }
    },

    buildMobile: function(mobile){
        if(mobile && mobile.length > 0){
            var mobileLink = "tel:" + mobile;
            var mobileFormatted = FormatUtils.formatMobile(mobile);
            return (
                <a href={mobileLink}>
                    <div className="list-group-item list-group-item-heading">
                        <h4>
                            <span>
                                <i className="glyphicon glyphicon-earphone btn btn-sm btn-primary"></i>
                            </span>
                            <span className="list-link">
                                &nbsp;{mobileFormatted}
                            </span>
                        </h4>
                    </div>
                </a>
            );
        }else{
            return ("");
        }
    },

    buildSMS: function(mobile){
        if(mobile && mobile.length > 0){
            var smsLink = "sms:" + mobile;
            return (
                <a href={smsLink}>
                    <div className="list-group-item list-group-item-heading">
                        <h4>
                            <span>
                                <i className="glyphicon glyphicon-comment btn btn-sm btn-primary"></i>
                            </span>
                            <span className="list-link">
                                &nbsp;Send SMS
                            </span>
                        </h4>
                    </div>
                </a>

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
