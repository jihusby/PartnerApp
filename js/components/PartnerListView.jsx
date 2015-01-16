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

    mixins: [Reflux.connect(DataStore,"rbkData")],
    getInitialState: function(){
        return {
            filteredPartnerList: [],
            partnerListData: [],
            dropdownTitle: "Partnertype",
            init: true
        };
    },
    
    handleSelect: function(partnerType) {
    
        this.setState({init: false });
        console.log(partnerType);
        if (partnerType){
            if (partnerType === "all") {
                this.setState({
                    filteredPartnerList: this.state.rbkData.partners,
                    dropdownTitle: "Partnertype"
                });
            } else {
                var filteredPartnerList = this.state.rbkData.partners.filter(function(partner){
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
        if(!this.state.rbkData || !this.state.rbkData.partners || !this.state.rbkData.partnerTypes){
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
            var partnerTypeMenuItems = this.state.rbkData.partnerTypes.map(function(partnerType){
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
                partnerNodes = this.state.rbkData.partners.map(function (partner) {
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