var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");
var store = require("store.js");
var Utils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants.js");
var ContactBox = require("./ContactBox.jsx");
var PersonBox = require("./PersonBox.jsx");

module.exports = React.createClass({
    mixins: [Utils],
    
    propTypes: {
        activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    
    render: function(){
        var that = this;
        var id = this.props.id;
        var activity = _.find(this.props.activities, function(a){return a.id == id;});
        var html = activity.description.replace(/["]/g, "");
        var dateString = this.formatDates(activity.startDate, activity.endDate);
        var deadlineDate = this.buildDeadlineDate(activity.deadlineDate);
        console.log("Enrollments: " + JSON.stringify(activity.enrollments));
        console.log("Contacts: " + JSON.stringify(this.props.contacts));
        var contacts = activity.enrollments.map(function(enrollment){
            if(enrollment.personId){
                var contact = _.find(that.props.contacts, function(c){
                    return c.id === enrollment.personId;
                });

                if(contact){
                    return (
                        <ContactBox contact={contact} showPosition={true} showFavorite={true} />
                    );
                }
            }
        });
        
        var persons = activity.enrollments.map(function(enrollment){
            if(enrollment.freeText){
                return (
                    <PersonBox freeText={enrollment.freeText} partnerId={enrollment.partnerId} partners={that.props.partners} />
                );
            }
        });
        
        return (
            <div className="activity-detail panel">
                <h3>{activity.title}</h3>
                <h4>{activity.location}</h4>
                <p>{dateString}</p>
                <span dangerouslySetInnerHTML={{__html:html}}></span>
                {deadlineDate}
                <br/>
                <strong>Påmeldte</strong>
                {contacts}
                {persons}
            </div>
        );
    },
    
    buildDeadlineDate : function(deadlineDate){
        if(deadlineDate){
            var formattedDate = this.formatDate(deadlineDate);
            return (
                <div>
                    <br/>
                    <small><strong>Påmeldingsfrist:</strong> {formattedDate}</small>
                </div>
            );
        } else{
            return (
                <span></span>
            );
        }
    }
});