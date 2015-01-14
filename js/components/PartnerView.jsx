var React = require("react");
var _ = require("underscore");

var PartnerSearchView = require("./PartnerSearchView.jsx");

var Utils = require("../utils/partner-utils")

module.exports =

    React.createClass({
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
            return (
                <div>
                    <PartnerSearchView partners={this.props.partners} partnerSelected={this.partnerClicked} 
                personSelected={this.personClicked} persons={this.props.persons} />
                </div>
            );
        }
    });


