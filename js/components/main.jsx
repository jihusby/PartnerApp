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
                    <div>
                        <PartnerApp partners={this.state.rbkData.partners} contacts={this.state.rbkData.persons} activities={this.state.rbkData.activities} partnerTypes={this.state.rbkData.partnerTypes} isUpdating={this.state.rbkData.isUpdating} />

                    <div className="footer">
                            Utviklet av <img src="images/itema-logo_graa_xxxsmall.png" className="footer-logo" />
                    </div>
                    </div>
                </div>
            );
        }    
    });