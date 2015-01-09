var React = require("react");
var Reflux = require("reflux");
var store = require("store.js");
var _ = require("underscore");

var Constants = require("../utils/partner-constants");

var Button = require("react-bootstrap/Button");
var Favorite = require("./Favorite.jsx");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var Contact = require("../model/Contact.js");

module.exports = React.createClass({
    render: function(){
        var i = this.props.index;
        var note = "";
        if(this.props.note){
            note = (
                <div>
                    <strong>Notat: </strong> <br/>
                    {this.props.note}
                </div>
            );
        }
        var content = "";    
        var key = Constants.LocalStorageKeys.partnerdata;
        var data = store.get(key);
        var id = this.props.id;
        var contact = _.find(data.persons, function(person){ return person.id == id; });
        var partner = _.find(data.partners, function(partner){ return partner.id == contact.partnerId; });
        contact.partnerName = partner.name;
        var mailTo = "mailto:" + "";
        var phone = "tel:" + "";
        var sms = "sms:" + "";
        var headingId = "acc" + i;
        var collapseId = "col" + i;
        var collRefId = "#col" + i;

        var name = contact.firstName + " " + contact.lastName;
        return (
            <div className="panel panel-default contact-detail">
                <div className="panel-heading" role="tab" id={headingId}>
                    <div className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href={collRefId} aria-expanded="false" aria-controls={collapseId}>
                            {name} </a>
                    </div>
                    <Favorite id={contact.id} />
                    <a href={mailTo} className="btn btn-sm btn-primary">
                        <i className="glyphicon glyphicon-envelope"></i>
                    </a>
                    <a href={phone} className="btn btn-sm btn-primary">
                        <i className="glyphicon glyphicon-earphone"></i>
                        </a>
                    <a href={sms} className="btn btn-sm btn-primary">
                        <i className="glyphicon glyphicon-comment"></i>
                        </a>                    
                </div>
                <div id={collapseId} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headingId}>
                    <div className="panel-body">
                        <strong>Firma: </strong> {contact.partnerName} <br/>
                        <strong>Stilling: </strong> {contact.position} <br/>
                        {note}
                    </div>
                </div>
            </div>
        );
    }
});
