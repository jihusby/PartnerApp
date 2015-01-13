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
            if(partner != undefined) {
                routie("partner/" + partner.id);
            }
        },

        personClicked: function(key){
            var person = _.find(this.props.persons, function(person){
               return person.id == key;
            });
            if(person != undefined){
                routie("person/" + person.id);
            }
        },
    
        render: function () {
            var content;
            if(!this.state.viewDetails) {
                content = <PartnerSearchView partners={this.props.partners} partnerSelected={this.partnerClicked} personSelected={this.personClicked} persons={this.props.persons} />;
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


