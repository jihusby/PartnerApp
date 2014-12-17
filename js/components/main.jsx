var React = require("react");
var Reflux = require("reflux");
var Label = require("react-bootstrap/Label");
var Input = require("react-bootstrap/Input");

var $ = require("jquery")

var PartnerStore = require("../stores/PartnerStore");


module.exports =

    React.createClass({

        mixins: [Reflux.connect(PartnerStore,"rbkPartners")],

        render: function () {
            var content;

            if ( this.state.rbkPartners.length > 0 ) {
                content = this.state.rbkPartners.map(function(partner) {
                    return <div>{partner.toString()}</div>;
                });
            } else {
                console.log("No Data yet") ;
                content = <span>Laster data, vennligst vent...</span>;
            }

            return (
                <div>
                    {content}
                </div>
            );

        }

    });


