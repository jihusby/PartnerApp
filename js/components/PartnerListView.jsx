var _ = require("underscore");

var React = require("react");
var Reflux = require("reflux");

var Spinner = require("react-spinner");

var ButtonGroup = require("react-bootstrap/ButtonGroup");
var Button = require("react-bootstrap/Button");
var DropdownButton = require("react-bootstrap/DropdownButton");
var MenuItem = require("react-bootstrap/MenuItem");

var DataStore = require("../stores/DataStore");
var PartnerBox = require("./PartnerBox.jsx");

var SessionStorage = require("../utils/sessionstorage");
var Constants = require("../utils/partner-constants");


module.exports = React.createClass({

    propTypes: {
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        partnerTypes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    
    getInitialState: function(){
        var filterInStorage = SessionStorage.get(Constants.SessionStorageKeys.partnerFilter);
        return {
            filteredPartnerList: [],
            partnerListData: [],
            dropdownTitle: filterInStorage ? (filterInStorage == "all" ? "Alle partnertyper" : filterInStorage) : "Alle partnertyper",
            init: true
        };
    },
    
    handleSelect: function(partnerType) {
        this.setState({init: false });
        if (partnerType){
            SessionStorage.set(Constants.SessionStorageKeys.partnerFilter, partnerType);
            var filteredPartnerList = this.filterPartners(partnerType);
            this.setState({
                filteredPartnerList: filteredPartnerList,
                dropdownTitle: partnerType === "all" ? "Alle partnertyper" : partnerType
            });
        }
    },
    
    filterPartners: function(filter){
        if(filter === "all"){
            return this.props.partners;
        }
        return filteredPartnerList = this.props.partners.filter(function(partner){
            return (partner.partnerType=== filter);
        });
    },
    
    buildPartnerList: function(filteredPartners){
        return _.map(this.props.partnerTypes, function(partnerType) {
            var partnerTypePartners = _.filter(filteredPartners, function(partner)
            {
                return partner.partnerType === partnerType.name;
            });
            var partnerList = partnerTypePartners.map(function(p){
                return (
                    <PartnerBox partner={p} />
                );
            });
            
            var header = "";
            if(partnerList.length > 0){
                header = (
                    <h4>{partnerType.name}</h4>
                );
            }
            
            return (
                <div>
                    {header}
                    {partnerList}
                </div>
            );
        });
    },
    
    render: function () {
        if(!this.props.partners || !this.props.partnerTypes){
            return (<div>
                        <div className="center-text">
                            Venter på data...
                        </div>
                        <div className="top-margin">
                            <Spinner />
                        </div>
                    </div>);
        } else {
            var that = this;
            var partnerTypeMenuItems = this.props.partnerTypes.map(function(partnerType){
                return (<MenuItem className="dropdown-list-item input-obj" eventKey={partnerType.name} > {partnerType.name}</MenuItem>);
            });
            var buttonGroupInstance = (
                <ButtonGroup className="spacing-bottom">
                    <DropdownButton className="dropdown-list input-obj" title={this.state.dropdownTitle} onSelect={this.handleSelect}>
                        <MenuItem className="dropdown-list-item input-obj" eventKey="all">Alle partnertyper</MenuItem>
                        {partnerTypeMenuItems}
                    </DropdownButton>
                </ButtonGroup>
            );
            var partnerNodes;
            if(this.state.init){
                var filterInStorage = SessionStorage.get(Constants.SessionStorageKeys.partnerFilter);
                var filteredPartnerList = this.filterPartners(filterInStorage || "all");
                partnerNodes = this.buildPartnerList(filteredPartnerList);
            } else{
                partnerNodes = this.buildPartnerList(this.state.filteredPartnerList);
            }

            return (
                <div className="top-margin">
                    {buttonGroupInstance}
                    <div className="list-group">
                        {partnerNodes}
                    </div>
                </div>
            );
        }
    } 
});