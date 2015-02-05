var React = require("react");
var Reflux = require("reflux");

var Spinner = require("react-spinner");

var ButtonGroup = require("react-bootstrap/ButtonGroup");
var Button = require("react-bootstrap/Button");
var DropdownButton = require("react-bootstrap/DropdownButton");
var MenuItem = require("react-bootstrap/MenuItem");

var DataStore = require("../stores/DataStore");
var PartnerBox = require("./PartnerBox.jsx");

module.exports = React.createClass({

    propTypes: {
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        partnerTypes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    
    getInitialState: function(){
        return {
            filteredPartnerList: [],
            partnerListData: [],
            dropdownTitle: "Alle partnertyper",
            init: true
        };
    },
    
    handleSelect: function(partnerType) {
    
        this.setState({init: false });
        if (partnerType){
            if (partnerType === "all") {
                this.setState({
                    filteredPartnerList: this.props.partners,
                    dropdownTitle: "Alle partnertyper"
                });
            } else {
                var filteredPartnerList = this.props.partners.filter(function(partner){
                    return (partner.partnerType=== partnerType);
                });
                this.setState({
                    filteredPartnerList: filteredPartnerList,
                    dropdownTitle: partnerType
                });
            }
        }
    },
    render: function () {
        if(!this.props.partners || !this.props.partnerTypes){
            return (<div>
                        <div className="center-text">
                            Venter på data...
                        </div>
                        <div className="spacing-top">
                            <Spinner />
                        </div>
                    </div>);
        } else {
            var that = this;
            var partnerTypeMenuItems = this.props.partnerTypes.map(function(partnerType){
                return (<MenuItem eventKey={partnerType.name} > {partnerType.name}</MenuItem>);
            });
            var buttonGroupInstance = (
                <ButtonGroup className="spacing-bottom">
                    <DropdownButton title={this.state.dropdownTitle} onSelect={this.handleSelect}>
                        <MenuItem eventKey="all">Alle partnertyper</MenuItem>
                        {partnerTypeMenuItems}
                    </DropdownButton>
                </ButtonGroup>
            );
            var partnerNodes;
            if(this.state.init){
                partnerNodes = this.props.partners.map(function (partner) {
                    return (<PartnerBox partner={partner} />);
                });
            } else{
                partnerNodes = this.state.filteredPartnerList.map(function (partner) {
                    return (<PartnerBox partner={partner} />);
                });
            }
            return (
                <div>
                    {buttonGroupInstance}
                    <div className="list-group">
                        {partnerNodes}
                    </div>
                </div>
            );

        }
    } 
});