var React = require("react");
var _ = require("underscore");
var store = require("store.js");

var Constants = require("../utils/partner-constants.js");

module.exports = React.createClass({
    render: function(){
        var id = this.props.id;
        var activities = store.get(Constants.LocalStorageKeys.activities);
        var activity = _.find(activities, function(a){return a.id == id;});
        var html = activity.description.replace(/["]/g, "");
        return (
            <div>
                <h3>{activity.title}</h3>
                <span dangerouslySetInnerHTML={{__html:html}}></span>
            </div>
        );
    }
});