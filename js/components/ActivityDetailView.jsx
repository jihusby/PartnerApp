var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");
var store = require("store.js");
var Utils = require("../utils/format-utils");
var Constants = require("../utils/partner-constants.js");
var ContactBox = require("./ContactBox.jsx");
var ContactBoxPassive = require("./ContactBoxPassive.jsx");
var PersonBox = require("./PersonBox.jsx");
var Navigator = require("../utils/navigator");
jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;

module.exports = React.createClass({
    mixins: [Utils, Navigator],

    propTypes: {
        activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function(){
        var that = this;
        var id = this.props.id;
        var activity = _.find(this.props.activities, function(a){return a.id == id;});
        var html = activity.description ? activity.description.replace(/["]/g, "") : "";
        var dateString = this.formatDates(activity.startDate, activity.endDate);
        var deadlineDate = this.buildDeadlineDate(activity.deadlineDate);
        var contacts = this.buildEnrollments(activity, that);
        var attendeesLink = this.buildAttendeesLink(activity.enrollments.length);
        return (
            <div className="activity-detail panel">
                <h3>{activity.title}</h3>
                <h4>{activity.location}</h4>
                <p>{dateString}</p>
                {attendeesLink}
                <br/><br/>
                <span className="activity-detail-description" dangerouslySetInnerHTML={{__html:html}}></span>
                {deadlineDate}
                <br/>
                <a className="anchor" name="attendees"></a>
                {contacts}
            </div>
        );
    },
    
    goToAttendees: function(){
        this.goToAnchor("attendees");
    },
    
    buildAttendeesLink: function(numberOfAttendees){
        var attendeesListHeight = numberOfAttendees * 73; // attendee div is 73px high
        console.log("Window height: " + window.screen.availHeight);
        console.log("Document height: " + $(document).height());
        if(window.screen.availHeight < $(document).height() - attendeesListHeight){
            return (
                <a onClick={this.goToAttendees}>Påmeldte <i className="glyphicon glyphicon-chevron-right"></i></a>
            );
        } else {
            return ("");
        }
    },

    buildEnrollments : function(activity, that) {

        var sortedContactList = [];

        var contacts = activity.enrollments.map(function(enrollment){
            if(enrollment.personId) {
                var contact = _.find(that.props.contacts, function (c) {
                    return c.id === enrollment.personId;
                });

                if (contact) {
                    var partnerId = contact.partnerId;
                    var partner = _.find(that.props.partners, function (p) {
                        return p.id === partnerId;
                    });
                    if (partner) {
                        contact.partnerName = partner.name;
                    }
                    return contact;
                }
            }
        });

        Array.prototype.clean = function(deleteValue) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };

        contacts.clean(null);

        if(contacts.length>0){
            sortedContactList = _.chain(contacts).sortBy(function(contact){
                return [contact.lastName, contact.firstName].join("_");
            }).map(function(contact){
                return <ContactBox contact={contact} showPartner={true} showPosition={true} showFavorite={true} />
            }).value();

        }else{
            sortedContactList = activity.enrollments.map(function(enrollment){
                if(enrollment.freeText){

                    var partnerId = enrollment.partnerId;
                    var partner = _.find(that.props.partners, function(p){
                        return p.id === partnerId;
                    });
                    var partnerName = "";
                    if(partner){
                        partnerName = partner.name;
                    }
                    var contact={"id":"", "firstName":"", "lastName":enrollment.freeText,"partnerName": partnerName};
                    return <ContactBoxPassive contact={contact} />
                }
            });
        }

        if(sortedContactList.length>0){
            return (
                <div>
                    <div className="list-group-item list-heading gold-header"><h4 className="list-group-item-heading"><strong>Påmeldte ({sortedContactList.length})</strong></h4></div>
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
