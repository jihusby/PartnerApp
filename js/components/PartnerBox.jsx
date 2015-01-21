var React = require("react");

module.exports = React.createClass({
    onClickPartner: function(id) {
        routie("partner/" + id);
    },
    render: function() {
        return (
            <a className="list-group-item" onClick={this.onClickPartner.bind(this, this.props.partner.id)}>
                <h4 className="list-group-item-heading">{this.props.partner.name}</h4>
                <p className="list-group-item-text partnertype-list-item">{this.props.partner.partnerType}</p>
            </a>
        );
    }
});