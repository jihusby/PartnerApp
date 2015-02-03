/**
 * Showing a single partner in a list view
*/
var React = require("react");
var Navigator = require("../utils/navigator");

module.exports = React.createClass({
    mixins: [Navigator],
    
    onClickPartner: function(id) {
        this.goTo("partner/" + id);
    },
    
    render: function() {
        return (
            <a className="list-group-item" onClick={this.onClickPartner.bind(this, this.props.partner.id)}>
                <h4 className="list-group-item-heading">{this.props.partner.name}</h4>
                <p className="list-group-item-text partnertype-list-item"><small>{this.props.partner.partnerType}</small></p>
            </a>
        );
    }
});