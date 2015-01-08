var React = require("react");

module.exports = React.createClass({
    render: function(){
        var contact = this.props.contact;
        var i = this.props.index;
        var headingId = "acc" + i;
        var collapseId = "col" + i;
        var collRefId = "#col" + i;
        console.log(contact);
        var name = contact.firstName + " " + contact.lastName;
        return (
            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id={headingId}>
                    <h4 className="panel-title">
                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href={collRefId} aria-expanded="false" aria-controls={collapseId}>
                            {name}
                        </a>
                    </h4>
                </div>
                <div id={collapseId} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headingId}>
                    <div className="panel-body">
                        {this.props.note}
                    </div>
                </div>
            </div>
        );
    }
});
