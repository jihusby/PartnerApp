var React = require("react");

var PartnerSearchView = require("./PartnerSearchView.jsx");
var PartnerDetailView = require("./PartnerDetailView.jsx");

var Utils = require("../utils/partner-utils")

module.exports =

    React.createClass({

        getInitialState: function() {
            return {
                viewDetails: false,
                selectedPartner: undefined
            };
        },

        partnerClicked: function(key){
            var partner = Utils.lookupPartner(this.props.partners, key);
            if(partner!=undefined) {
                this.setState({
                   viewDetails: true,
                   selectedPartner: partner
                });
            }
        },

        render: function () {
            var content;
            if(!this.state.viewDetails) {
                content = <PartnerSearchView partners={this.props.partners} partnerSelected={this.partnerClicked}/>;
            }  else {
                content = <PartnerDetailView selectedPartner={this.state.selectedPartner}/>;
            }
            return (
                <div>
                    {content}
                </div>
            );
        }
    });


