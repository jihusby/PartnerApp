var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");
var store = require("store.js");
var Utils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants.js");
var ContactBox = require("./ContactBox.jsx");
var BackendActions = require

module.exports = React.createClass({
    propTypes: {
        activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    
    render: function(){
        var that = this;
        var id = this.props.id;
        var activity = _.find(this.props.activities, function(a){return a.id == id;});
        var html = activity.description.replace(/["]/g, "");
        var dateString = Utils.formatDates(activity.startDate, activity.endDate);
        
        console.log("Enrollments: " + JSON.stringify(activity.enrollments));
        console.log("Contacts: " + JSON.stringify(this.props.contacts));
        var enrollments = activity.enrollments.map(function(enrollment){
            var contact = _.find(that.props.contacts, function(c){
                return c.id === enrollment.personId;
            });
            
            if(contact){
                console.log("Found contact: " + JSON.stringify(contact));
                return (
                    <ContactBox contact={contact} showPosition={true} showFavorite={true} />
                );
            }
        });
        
        return (
            <div className="activity-detail panel">
                <h3>{activity.title}</h3>
                <h4>{activity.location}</h4>
                <p>{dateString}</p>
                <span dangerouslySetInnerHTML={{__html:html}}></span>
                <br/>
                <strong>Påmeldte</strong>
                {enrollments}
            </div>
        );
    }
});