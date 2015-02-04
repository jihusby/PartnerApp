var React = require("react");
var _ = require("underscore");
var store = require("store.js");
var Utils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants.js");

module.exports = React.createClass({
    render: function(){
        var id = this.props.id;
        var activities = store.get(Constants.LocalStorageKeys.activities);
        var activity = _.find(activities, function(a){return a.id == id;});
        var html = activity.description.replace(/["]/g, "");
        var dateString = Utils.formatDates(activity.startDate, activity.endDate);
        return (
            <div className="activity-detail panel">
                <h3>{activity.title}</h3>
                <h4>{activity.location}</h4>
                <p>{dateString}</p>
                <span dangerouslySetInnerHTML={{__html:html}}></span>
            </div>
        );
    }
});