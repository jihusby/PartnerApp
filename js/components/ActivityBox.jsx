var React = require("react");
var Utils = require("../utils/format-utils");
var Navigator = require("../utils/navigator");

module.exports = React.createClass({
    mixins: [Navigator],
    
    onClickActivity: function(id) {
        this.goTo("activity/" + id);
    },
    
    render: function() {
        var activity = this.props.activity;
        var dateString = Utils.formatDates(activity.startDate, activity.endDate);
        
        return (
            <div className="list-group-item list-choice" onClick={this.onClickActivity.bind(this, activity.id)}>
                <h4 className="list-group-item-heading">{activity.titleShort}</h4>
                <small><p className="list-group-item-text">{dateString}</p></small>
                <p className="list-group-item-text">{activity.location}</p>
            </div>
        );
    }
});