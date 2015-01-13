var React = require("react");
var Reflux = require("reflux");

var PartnerStore = require("../stores/PartnerStore");

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

module.exports = React.createClass({

    mixins: [Reflux.connect(PartnerStore,"rbkData")],  
    
    getInitialState: function(){
    },
    
    render: function () {
        var partners = this.state.rbkData.partners;
        if(!partners || partners.length === 0){
            return (
                <span />
                );
        } else {
            var partnerNodes = partners.map(function (partner) {
                return (<PartnerBox partner={partner} />);
            });
            return (
                <div className="list-group">
                    {partnerNodes}
                </div>
            );

        }
    } 
});