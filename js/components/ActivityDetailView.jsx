var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");
var Utils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants.js");
var ContactBox = require("./ContactBox.jsx");
var ContactBoxPassive = require("./ContactBoxPassive.jsx");
var PersonBox = require("./PersonBox.jsx");
var Navigator = require("../utils/navigator");
jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;
var SessionStorage = require("../utils/sessionstorage");

module.exports = React.createClass({
    mixins: [Utils, Navigator],

    propTypes: {
        activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    componentDidMount: function() {
        Navigator.goToTop();
        var id = this.props.id;
        var activity = _.find(this.props.activities, function(a){return a.id == id;});
        var attendeesLink = this.buildAttendeesLink(activity);
        $("#attendeeLink").replaceWith(attendeesLink);
        $("#goToAttendees").click(this.goToAttendees);
    },

    componentDidUpdate: function(){
        Navigator.goToTop();
    },
    
    shouldComponentUpdate: function(nextProps, nextState) {
        //return nextProps.id !== this.props.id;
        return false;
    },
    
    render: function(){

        var that = this;
        var id = this.props.id;
        var activity = _.find(this.props.activities, function(a){return a.id == id;});
        var html = activity.description ? activity.description.replace(/["]/g, "") : "";
        var dateString = this.formatDates(activity.startDate, activity.endDate);
        var deadlineDate = this.buildDeadlineDate(activity.deadlineDate);
        var contacts = this.buildEnrollments(activity, that);
        //setTimeout(function(){}, 200); // hack for ensuring calculation of correct document height
        
        return (
        <div className="activity-detail panel">
            <h3>{activity.title}</h3>
            <h4>{activity.location}</h4>
            <p>{dateString}</p>
            <div id="attendeeLink"></div>
            <span className="activity-detail-description" dangerouslySetInnerHTML={{__html:html}}></span>
            {deadlineDate}
            <br/>
            <a className="anchor" name="attendees"></a>
            {contacts}
        </div>
    );
    },
    
    goToAttendees: function(){
        //SessionStorage.set('ignoreTop', true);
        this.goToAnchor("attendees");
    },
    
    buildAttendeesLink: function(activity){
        var divHeight = !!_.find(activity.enrollments, function(enrollment) { return !!enrollment.personId; }) ? 73 : 51; // attendee div is 73px high if contact, 51px if not
        var docHeight = Math.max(document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight, $(document).height(), document.documentElement.scrollHeight);
        var attendeesListHeight = activity.enrollments.length * divHeight;
        if(activity.enrollments.length == 0 || window.screen.availHeight > docHeight - attendeesListHeight){
            return ("<span></span>");
        } else {
            return ("<div><a id='goToAttendees'>Påmeldte <i class='glyphicon glyphicon-chevron-right'></i></a><br/><br/></div>");
        }
    },

    buildEnrollments : function(activity, that) {
        var sortedContactList = _.sortBy(_.map(activity.enrollments, function(enrollment){
            if(enrollment.passive){
                return <ContactBoxPassive contact={enrollment} />;
            } else{
                return <ContactBox contact={enrollment} showPartner={true} showPosition={true} showFavorite={true} />;
            }
        }), function(c){return c.partnerName});

        if(sortedContactList.length>0){
            return (
                <div className="attendees-list">
                    <div className="list-group-item list-heading gold-header" key="0"><h4 className="list-group-item-heading"><strong>Påmeldte ({sortedContactList.length})</strong></h4></div>
                    {sortedContactList}
                </div>
            )
        }
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
