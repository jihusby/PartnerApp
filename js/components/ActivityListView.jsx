var React = require("react");
var Reflux = require("reflux");

var Spinner = require("react-spinner");
var DataStore = require("../stores/DataStore.js");

var ActivityBox = require("./ActivityBox.jsx");

module.exports = React.createClass({
    mixins: [Reflux.connect(DataStore,"rbkData")],
    
    render: function(){
        if(!this.state.rbkData || !this.state.rbkData.activities){
            return (<div>
                <div className="center-text">
                    Venter på data...
                </div>
                <div className="spacing-top">
                    <Spinner />
                </div>
            </div>);
        } else {
            return (
                <div>
                    {this.state.rbkData.activities.map(function(activity){
                        return (<ActivityBox activity={activity} />);
                    })}
                </div>
            );
        }
    }
});