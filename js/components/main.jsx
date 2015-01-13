var React = require("react");
var Reflux = require("reflux");
var routie = require("routie");

var PartnerStore = require("../stores/PartnerStore");
var AuthStore = require("../stores/AuthStore");
var PartnerApp = require("./PartnerApp.jsx");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(PartnerStore,"rbkPartners")],
        getInitialState: function(){
            return {loginResult: AuthStore.getDefaultData()};
        },

        render: function () {
            return (
                <div>
                    <PartnerApp partners={this.state.rbkPartners}/>
                </div>
            );
        }    
    });