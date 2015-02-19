var React = require("react");
var Reflux = require("reflux");

var DataStore = require("../stores/DataStore");
var AuthStore = require("../stores/AuthStore");
var PartnerApp = require("./PartnerApp.jsx");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(DataStore,"rbkData")],
        getInitialState: function(){
            return {loginResult: AuthStore.getDefaultData()};
        },

        render: function () {
            return (
                <div>
                    <div className="no-margin">
                        <PartnerApp partners={this.state.rbkData.partners} contacts={this.state.rbkData.persons} activities={this.state.rbkData.activities} partnerTypes={this.state.rbkData.partnerTypes} />

                    <div className="footer">
                            Utviklet av <img src="images/itema-logo_graa_xxsmall.png" className="footer-logo" />
                    </div>
                    </div>
                </div>
            );
        }    
    });