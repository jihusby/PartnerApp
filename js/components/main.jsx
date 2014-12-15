var React = require("react");
var Reflux = require("reflux");

var Label = require("react-bootstrap/Label");
var Input = require("react-bootstrap/Input");

var $ = require("jquery")

var PartnerStore = require("../stores/PartnerStore");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(PartnerStore, 'rbkPartners')],

        render: function () {
            console.log(this.state.rbkPartners);

            var json = $.parseJSON(this.state.rbkPartners);

            var partnerList = json.partners.sort().map(function (partner) {
                return (<option value={partner.name}/>);
            });

            partnerList.push(json.persons.sort().map(function (person) {
                return (<option value={person.firstName + " " + person.lastName}/>);
            }));


            return (
                <div>
                    <Input
                        type="Search"
                        placeholder="Søk på firma eller navn på person"
                        ref="searchPartner"
                        list="partners"/>
                    <datalist id="partners">
                        {partnerList}
                    </datalist>
                </div>
            );
        }

    });


