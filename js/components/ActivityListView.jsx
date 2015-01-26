var React = require("react");
var Reflux = require("reflux");
var moment = require("moment");

var Spinner = require("react-spinner");
var ButtonGroup = require("react-bootstrap/ButtonGroup");
var Button = require("react-bootstrap/Button");
var DropdownButton = require("react-bootstrap/DropdownButton");
var MenuItem = require("react-bootstrap/MenuItem");

var DataStore = require("../stores/DataStore.js");

var ActivityBox = require("./ActivityBox.jsx");

module.exports = React.createClass({
    mixins: [Reflux.connect(DataStore,"rbkData")],
    
    getInitialState: function(){
        return {
            filteredActivities: [],
            activities: [],
            dropdownTitle: "Kommende aktiviteter",
            init: true
        };
    },
    
    handleSelect: function(filter) {
        var that = this;
        this.setState({init: false });
        if (filter){
            var filteredActivities = this.state.rbkData.activities.filter(function(activity){
                return that.filterOnYear(activity, filter);
            });

            this.setState({
                filteredActivities: filteredActivities,
                dropdownTitle: filter
            });
        }
    },
    render: function(){
        var that = this;
        if(!this.state.rbkData || !this.state.rbkData.activities){
            return (
                <div>
                    <div className="center-text">
                        Venter på data...
                    </div>
                    <div className="spacing-top">
                        <Spinner />
                    </div>
                </div>
            );
        } else {
            var activityFilters = this.buildFilters();
            var filterOptions = activityFilters.map(function(options){
                return (<MenuItem eventKey={options.text} > {options.text}</MenuItem>);
            });
            var buttonGroupInstance = (
                <ButtonGroup className="spacing-bottom">
                    <DropdownButton title={this.state.dropdownTitle} onSelect={this.handleSelect}>
                        {filterOptions}
                    </DropdownButton>
                </ButtonGroup>
            );
            
            var activities;
            if(this.state.init){
            var commingActivities = this.state.rbkData.activities.filter(function(activity){
                    return that.filterOnYear(activity, "Kommende aktiviteter");
                });
                activities = commingActivities.map(function(activity){
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
                <div>
                    {buttonGroupInstance}
                    <div>
                        {activities}
                    </div>
                </div>
            );
        }
    },
    
    filterOnYear: function(activity, filterKey){
        if(filterKey === "Alle"){
            return true;
        } else if(filterKey == "Kommende aktiviteter"){
            if(activity.startDate){
                var date = moment(activity.startDate);
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
    
    buildFilters: function(){
        var currentYear = moment().year();
        var previousYear1 = currentYear - 1;
        var previousYear2 = currentYear - 2;
        var previousYear3 = currentYear - 3;
        return [ 
            { text: "Kommende aktiviteter" }, 
            { text: currentYear.toString() }, 
            { text: previousYear1.toString() }, 
            { text: previousYear2.toString() }, 
            { text: previousYear3.toString() },
            { text: "Alle" },
            
        ];
    }
});