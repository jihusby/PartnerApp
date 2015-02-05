var React = require("react");
var Navigator = require("../utils/navigator");
var _ = require("underscore");

module.exports = React.createClass({
    propTypes: {
        freeText: React.PropTypes.string,
        partnerId: React.PropTypes.number.isRequired,
        partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    
    mixins: [Navigator],
    
    render: function() {
        var partnerId = this.props.partnerId;
        var partner = _.find(this.props.partners, function(p){
            return p.id === partnerId;
        });
        return (
            <a className="list-group-item">
                <h4 className="list-group-item-heading">{this.props.freeText}</h4>
                <p className="list-group-item-text firm-list-item">{partner.name}</p>
            </a>
        );
    }
});