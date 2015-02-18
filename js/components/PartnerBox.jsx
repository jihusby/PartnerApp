/**
 * Showing a single partner in a list view
*/
var React = require("react");
var Navigator = require("../utils/navigator");

module.exports = React.createClass({
    propTypes: {
        partner: React.PropTypes.object.isRequired
    },
        
    mixins: [Navigator],
    
    onClickPartner: function(id) {
        this.goTo("partner/" + id);
    },
    
    render: function() {
    var partner = this.props.partner;
        return (
            <div className="list-group-item list-choice" onClick={this.onClickPartner.bind(this, partner.id)}>
                <h4 className="list-group-item-heading">{partner.name}</h4>
                <p className="list-group-item-text partnertype-list-item"><small>{partner.partnerType}</small></p>
            </div>
        );
    }
});