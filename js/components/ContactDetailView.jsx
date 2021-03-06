var React = require("react");
var _ = require("underscore");

var LocalStorageUtils = require("../utils/localstorage-utils");
var FormatUtils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants");

var Button = require("react-bootstrap/Button");
var Favorite = require("./Favorite.jsx");
var ContactNote = require("./ContactNote.jsx");

var Navigator = require("../utils/navigator");

var Contact = require("../model/Contact.js");

module.exports = React.createClass({

    propTypes: {
        contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        id: React.PropTypes.any.isRequired
    },
    
    mixins: [Navigator],

    onClickPartner: function(id) {
        this.goTo("partner/" + id);
    },

    render: function () {
        var that = this;
        var contact = _.find(this.props.contacts, function(c){
            return c.id == that.props.id;
        });
        var partner = _.find(this.props.partners, function(p){
            return p.id == contact.partnerId;
        });
        var mobile = this.buildMobile(contact.mobile);
        var phone = '';
        if(contact.phone !== contact.mobile){
            phone = this.buildPhone(contact.phone);
        }
        var mail = this.buildMailTo(contact.email);
        var sms = this.buildSMS(contact.mobile);
        var partnerName = this.buildPartnerName(partner);

        var upperBlock = this.buildUpperBlock(contact);
        return (
            <div className="list-group top-margin">
                {upperBlock}
                <address>
                    {partnerName}
                    {mobile}
                    {phone}
                    {mail}
                    {sms}
                </address>
                <small><ContactNote contact={contact} /></small>
            </div>
        )},

    buildUpperBlock: function(contact) {
        var name = [contact.firstName, contact.lastName].join(" ");
        var position = this.buildPosition(contact.position);

        var logoSrc = "";
        if(!navigator || !navigator.connection || navigator.connection.type != Connection.NONE){
            logoSrc = contact.picture ? Constants.URLS.personImages + contact.picture : "";
        } 
        if(logoSrc) {
            return (
                <div className="spacing-bottom">
                    <div className="media-left">
                        <img className="media-object image image-background" src={logoSrc} data-rel="external" />
                    </div>
                    <div className="media-body">
                        <h4 className="position">
                            <strong className="line-height">{name}&nbsp;</strong>
                            <small><Favorite id={contact.id} />
                            <br/><i className="position">{position}</i></small>
                        </h4>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="spacing-bottom">
                    <div className="media-body">
                        <div className="position">
                            <strong className="line-height">{name}&nbsp;</strong>
                            <Favorite id={contact.id} />
                            <br/>
                            <small><i className="position">{position}</i></small>
                        </div>
                    </div>
                </div>
            )
        }
    },


    buildPartnerName: function(partner){
        return (
            <span>
                <div className="row">
                    <div className="col-xs-1">
                        <div className="parent-content">
                            <div className="left-icon">
                                <Button className="gold-btn company-btn" bsStyle="btn" onClick={this.onClickPartner.bind(this, partner.id)}>{partner.name}</Button><br/>&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    },

    buildPosition: function(position){
        if(position && position.length > 0){
            return (
                position
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
                                    <i className="glyphicon glyphicon-envelope contact-link"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-10">
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
                                    <i className="glyphicon glyphicon-earphone contact-link"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-10">
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
                                    <i className="glyphicon glyphicon-phone contact-link"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-10">
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
                                    <i className="glyphicon glyphicon-comment contact-link"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-10">
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
    }
});
