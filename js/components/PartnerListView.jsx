var React = require("react");
var Reflux = require("reflux");

var PartnerStore = require("../stores/PartnerStore");

var PartnerBox = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.partner.name}</h1>        
      </div>
    );
  }
});

module.exports = React.createClass({

    mixins: [Reflux.connect(PartnerStore,"partners")],  
    
    getInitialState: function(){
    },
    
    render: function () {
        console.log(this.state.partners);
        if(!this.state.partners){

        } else {
            var partnerNodes = this.state.partners.map(function (partner) {
                return (<PartnerBox partner={partner} />);
            });
            return (
                <div>
                    {partnerNodes}
                </div>
            );

        }
    } 
});