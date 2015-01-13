var React = require("react");
var Reflux = require("reflux");
var ButtonGroup = require("react-bootstrap/ButtonGroup");
var Button = require("react-bootstrap/Button");
var DropdownButton = require("react-bootstrap/DropdownButton");
var MenuItem = require("react-bootstrap/MenuItem");

var PartnerListStore = require("../stores/PartnerListStore");

var PartnerBox = React.createClass({
  render: function() {
    return (
      <a href="#" className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.partner.name}</h4>
        <p className="list-group-item-text">{this.props.partner.partnerType}</p>
      </a>
    );
  }
});

/*var PartnerTypeMenuItem = React.createClass({
    render: function() {

        return (
            <MenuItem eventKey={this.props.partnerType.name} onSelect={this.props.selectCallback}>{this.props.partnerType.name}</MenuItem>
            );
    }
});*/
module.exports = React.createClass({

    mixins: [Reflux.listenTo(PartnerListStore,"onPartnerListData", "onPartnerListData")],  
    getInitialState: function(){
        return {
            filteredPartnerList: [],
            partnerListData: PartnerListStore.getDefaultData(),
            dropdownTitle: "Partnertype"
        };
    },
   
    onPartnerListData: function(partnerListData){
        this.setState({
            filteredPartnerList: partnerListData.partnerList,
            partnerListData: partnerListData
        });
    },
    handleSelect: function(partnerType) {
        console.log(partnerType);
        if (partnerType){
            var filteredPartnerList = this.state.partnerListData.partnerList.filter(function(partner){
                return (partner.partnerType=== partnerType);
            });
            this.setState({
                filteredPartnerList: filteredPartnerList,
                dropdownTitle: partnerType
            });
        }
    },
    render: function () {
        if(!this.state.filteredPartnerList || !this.state.partnerListData.partnerTypes){
            return (<div>No data yet</div>);
        } else {
            var that = this;
            var partnerTypeMenuItems = this.state.partnerListData.partnerTypes.map(function(partnerType){
                return (<MenuItem eventKey={partnerType.name} > {partnerType.name}</MenuItem>);
            });
            var buttonGroupInstance = (
                <ButtonGroup className="spacing-bottom">
                    <DropdownButton title={this.state.dropdownTitle} onSelect={this.handleSelect}>
                        {partnerTypeMenuItems}
                    </DropdownButton>
                </ButtonGroup>
            );
            var partnerNodes = this.state.filteredPartnerList.map(function (partner) {
                return (<PartnerBox partner={partner} />);
            });
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