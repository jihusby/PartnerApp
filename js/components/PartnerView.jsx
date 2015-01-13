var React = require("react");
var _ = require("underscore");

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

        personClicked: function(key){
            var person = _.find(this.props.persons, function(person){
               return person.id == key;
            });
            
        },
    
        render: function () {
            var content;
            if(!this.state.viewDetails) {
                content = <PartnerSearchView partners={this.props.partners} partnerSelected={this.partnerClicked} personSelected={this.personClicked} />;
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


