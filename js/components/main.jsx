var React = require("react");
var Reflux = require("reflux");
var routie = require("routie");

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
                <div className="filler">
                    <div className="wrapper">
                        <PartnerApp partners={this.state.rbkData.partners} persons={this.state.rbkData.persons}/>
                        <div className="push"></div>
                    </div>
                    <div className="footer">
                        <div className="container">
                            Utviklet av: <img src="images/itema-logo_graa_xsmall.png" />
                        </div>
                    </div>
                </div>
            );
        }    
    });