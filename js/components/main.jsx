var React = require("react");
var Reflux = require("reflux");

var PartnerStore = require("../stores/PartnerStore");
var PartnerApp = require("./PartnerApp.jsx");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(PartnerStore,"rbkPartners")],

        render: function () {
            var content;

            if ( this.state.rbkPartners.length > 0 ) {
                content = <PartnerApp partners={this.state.rbkPartners}/>
            } else {
                content = <PartnerApp partners={this.state.rbkPartners}/>
                console.log("No Data yet") ;
                //content = <span>Laster data, vennligst vent...</span>;
            }

            return (
                <div>
                    {content}
                </div>
            );
        }
    });


