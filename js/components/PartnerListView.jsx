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

    mixins: [Reflux.connect(PartnerListStore,"partnerListData")],  
    handleSelect: function(data) {
        console.log(data);
    },
    render: function () {
        console.log(this.state.partners);
        if(!this.state.partnerListData.partnerList || !this.state.partnerListData.partnerTypes){
            return (<div>No data yet</div>);
        } else {
            var that = this;
            var partnerTypeMenuItems = this.state.partnerListData.partnerTypes.map(function(partnerType){
                return (<MenuItem eventKey={partnerType.name} > {partnerType.name}</MenuItem>);
            });
            var buttonGroupInstance = (
                <ButtonGroup>
                    <DropdownButton title="Dropdown" onSelect={this.handleSelect}>
                        {partnerTypeMenuItems}
                    </DropdownButton>
                </ButtonGroup>
            );
            var partnerNodes = this.state.partnerListData.partnerList.map(function (partner) {
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