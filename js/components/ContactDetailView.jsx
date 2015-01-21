var React = require("react");
var _ = require("underscore");

var localStorageUtils = require("../utils/localstorage-utils");
var Constants = require("../utils/partner-constants");
var Button = require("react-bootstrap/Button");
var Favorite = require("./Favorite.jsx");
var ContactBox = require("./ContactBox.jsx");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var Contact = require("../model/Contact.js");

module.exports = React.createClass({

render: function () {
    var contact = localStorageUtils.findContact(this.props.id);
    var partner = localStorageUtils.findPartner(contact.partnerId);

    var name = [contact.firstName, contact.lastName].join(" ");
    var position = this.buildPosition(contact.position);
    var phone = this.buildPhone(contact.mobile);
    var mail = this.buildMailTo(contact.email);
    var sms = this.buildSMS(contact.mobile);
    var note = this.buildNote(contact.note);
    var partnerName = partner.name;
    

    return (
        <div>
            <h3>{name}<small> <br/>{partnerName}</small></h3>
                <Favorite id={contact.id} />
                {mail}
                {phone}
                {sms}
            <div>
                <div className="panel-body">
                    {position}
                    {note}
                </div>
            </div>
        </div>
    )},

    buildPosition: function(position){
        if(position && position.length > 0){
        return (
            <div>
                <strong>Stilling:</strong> {position}<br/><br/>
            </div>
                );
        } else{
            return ("");
        }
    },
    
    buildMailTo: function(email){
        if(email && email.length > 0){
            var mail = "mailto:" + email;
            return (
                <a href={mail} className="btn btn-sm btn-primary">
                    <i className="glyphicon glyphicon-envelope"></i>
                </a>
                );
        } else {
            return ("");
        }
    },
    
    buildPhone: function(phone){
        if(phone && phone.length > 0){
            var phoneLink = "tel:" + phone;
            return (
                <a href={phoneLink} className="btn btn-sm btn-primary">
                    <i className="glyphicon glyphicon-earphone"></i>
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
                <a href={smsLink} className="btn btn-sm btn-primary">
                    <i className="glyphicon glyphicon-comment"></i>
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
    },

});