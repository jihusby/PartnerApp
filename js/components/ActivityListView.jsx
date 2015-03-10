var React = require("react");
var Reflux = require("reflux");
var moment = require("moment");
var _ = require("underscore");

var Spinner = require("react-spinner");
var ButtonGroup = require("react-bootstrap/ButtonGroup");
var DropdownButton = require("react-bootstrap/DropdownButton");
var MenuItem = require("react-bootstrap/MenuItem");

var DataStore = require("../stores/DataStore.js");

var ActivityBox = require("./ActivityBox.jsx");
var SessionStorage = require("../utils/sessionstorage");
var Constants = require("../utils/partner-constants");
var Navigator = require("../utils/navigator");
var Alerter = require("../utils/alerter");

var commingActivities = "Kommende aktiviteter";

module.exports = React.createClass({
    propTypes: {
        activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    
    getInitialState: function(){
        var activityFilter = SessionStorage.get(Constants.SessionStorageKeys.activityFilter);
        return {
            filteredActivities: [],
            activities: [],
            dropdownTitle: activityFilter || commingActivities,
            init: true
        };
    },
    
    handleSelect: function(filter) {
        this.setState({init: false });
        if (filter){
            SessionStorage.set(Constants.SessionStorageKeys.activityFilter, filter);
            var filteredActivities = this.filterActivities(filter);
            this.setState({
                filteredActivities: filteredActivities,
                dropdownTitle: filter
            });
        }
    },

    componentDidMount: function() {
        Navigator.goToTop();
    },

    render: function(){

        var that = this;
        if(!this.props.activities){
            return (
                <div>
                    <div className="center-text">
                        Venter på data...
                    </div>
                    <div className="top-margin">
                        <Spinner />
                    </div>
                </div>
            );
        } else {
            var activityFilters = this.buildFilters();
            var filterOptions = activityFilters.map(function(options){
                return (<MenuItem className="dropdown-list-item input-obj" eventKey={options.text} > {options.text}</MenuItem>);
            });
            var buttonGroupInstance = (
                <ButtonGroup className="spacing-bottom">
                    <DropdownButton className="dropdown-list input-obj" title={this.state.dropdownTitle} onSelect={this.handleSelect}>
                        {filterOptions}
                    </DropdownButton>
                </ButtonGroup>
            );
            
            var activities;
            if(this.state.init){
                var filterInStorage = SessionStorage.get(Constants.SessionStorageKeys.activityFilter);
                var commingActivitiesList = this.filterActivities(filterInStorage || commingActivities);
                activities = commingActivitiesList.map(function(activity){
                        return (
                            <ActivityBox activity={activity} />
                            );
                        });
            } else {
                activities = this.state.filteredActivities.map(function(activity){
                        return (
                            <ActivityBox activity={activity} />
                            );
                        });
            }
            return (
                <div className="top-margin">
                    {buttonGroupInstance}
                    <div>
                        {activities}
                    </div>
                </div>
            );
        }
    },
                                                    
    sortActivities: function(activity, filterKey){
        if(filterKey === commingActivities){
            return activity.startDate ? moment(activity.startDate).format("X") : 0;
        } else{
            return activity.startDate ? moment(activity.startDate).format("X") * -1 : 0;
        }
    },
    
    filterOnYear: function(activity, filterKey){
        if(filterKey === "Alle"){
            return true;
        } else if(filterKey == commingActivities){
            if(activity.endDate){
                var date = moment(activity.endDate);
                return date.diff(moment()) > 0;
            } else {
                return false;
            }
        } else{
            if(activity.startDate){
                var date = moment(activity.startDate);
                return date.year() == filterKey;
            } else {
                return false;
            }
        }
    },
        
    filterActivities: function(filter){
        var that = this;
        return _.chain(this.props.activities)
            .filter(function(activity){ return that.filterOnYear(activity, filter); })
            .sortBy(function(activity){ return that.sortActivities(activity, filter); });
    },
    
    buildFilters: function(){
        var currentYear = moment().year();
        var previousYear1 = currentYear - 1;
        var previousYear2 = currentYear - 2;
        var previousYear3 = currentYear - 3;
        return [ 
            { text: commingActivities }, 
            { text: currentYear.toString() }, 
            { text: previousYear1.toString() }, 
            { text: previousYear2.toString() }, 
            { text: previousYear3.toString() },
            { text: "Alle" },
            
        ];
    }
});