var React = require("react");

var Button = require("react-bootstrap/Button");

module.exports = React.createClass({
    render: function(){
        var contact = this.props.contact;
        
        var mailTo = "mailto:" + "";
        var phone = "tel:" + "";
        var sms = "sms:" + "";
        var i = this.props.index;
        var headingId = "acc" + i;
        var collapseId = "col" + i;
        var collRefId = "#col" + i;
        console.log(contact);
        var note = "<span />";
        if(this.props.note){
            note = (
                <strong>Notat: </strong> <br/>
                {this.props.note}
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
                    <a href={phone} className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-earphone"></i></a>
                    <a href={mailTo} className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-envelope"></i></a>
                    <a href={sms} className="btn btn-sm btn-primary"><i className="glyphicon glyphicon-comment"></i></a>
                    
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
