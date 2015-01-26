var React = require("react");
var Utils = require("../utils/partner-utils");

module.exports = React.createClass({
    onClickActivity: function(id) {
        routie("activity/" + id);
    },
    render: function() {
        var activity = this.props.activity;
        var dateString = Utils.formatDates(activity.startDate, activity.endDate);
        
        return (
            <a className="list-group-item" onClick={this.onClickActivity.bind(this, activity.id)}>
                <h4 className="list-group-item-heading">{activity.titleShort}</h4>
                <div className="row">
                    <div className="col-xs-6">
                        <p className="list-group-item-text">{dateString}</p>   
                    </div>
                    <div className="col-xs-6">
                        <p className="list-group-item-text firm-list-item">{activity.location}</p>
                    </div>
                </div>
            </a>
        );
    }
});