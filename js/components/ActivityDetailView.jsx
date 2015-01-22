var React = require("react");
var _ = require("underscore");
var moment = require("moment");
var store = require("store.js");

var Constants = require("../utils/partner-constants.js");

module.exports = React.createClass({
    render: function(){
        var id = this.props.id;
        var activities = store.get(Constants.LocalStorageKeys.activities);
        var activity = _.find(activities, function(a){return a.id == id;});
        var html = activity.description.replace(/["]/g, "");
        var endDate ="";
        var date = "";
        var dateFormat = "DD.MM YYYY HH.mm";
        if(activity.startDate){
            date = moment(activity.startDate).format(dateFormat);
            if(activity.endDate){
                date = date + " - " + moment(activity.endDate).format(dateFormat);
            }
        }
        return (
            <div>
                <h3>{activity.title}</h3>
                <h4>{activity.location}</h4>
                <p>{date}</p>
                <span dangerouslySetInnerHTML={{__html:html}}></span>
            </div>
        );
    }
});