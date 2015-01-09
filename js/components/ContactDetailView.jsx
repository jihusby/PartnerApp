var React = require("react");
var Reflux = require("reflux");
var store = require("store.js");
var _ = require("underscore");

var Constants = require("../utils/partner-constants");

var Button = require("react-bootstrap/Button");
var Favorite = require("./Favorite.jsx");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

module.exports = React.createClass({
    render: function(){
        var key = Constants.LocalStorageKeys.partnerdata;
        var data = store.get(key);
        var id = this.props.id;
        var contact = _.find(data.persons, function(person){ return person.id == id; });
        
        var mailTo = "mailto:" + "";
        var phone = "tel:" + "";
        var sms = "sms:" + "";
        var i = this.props.index;
        var headingId = "acc" + i;
        var collapseId = "col" + i;
        var collRefId = "#col" + i;
        var note = "";
        if(this.props.note){
            note = (
                <div>
                    <strong>Notat: </strong> <br/>
                    {this.props.note}
                </div>
            );
        }
        var name = contact.firstName + " " + contact.lastName;
        return (
            <div className="panel panel-default contact-detail">
                <div className="panel-heading" role="tab" id={headingId}>
                    <span className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href={collRefId} aria-expanded="false" aria-controls={collapseId}>
                            {name} </a>
                    </span>
                    <Favorite id={contact.id} />
                    <a href={mailTo} className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a>
                    <a href={phone} className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-earphone"></i></a>
                    <a href={sms} className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-comment"></i></a>                    
                </div>
                <div id={collapseId} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headingId}>
                    <div className="panel-body">
                        <strong>Firma: </strong> {contact.getPartnerName()} <br/>
                        <strong>Stilling: </strong> {contact.position} <br/>
                        {note}
                    </div>
                </div>
            </div>
        );
    }
});
