var React = require("react");

module.exports = React.createClass({
    onClickPerson: function(id) {
        routie("person/" + id);
    },
    render: function() {
        return (
            <a className="list-group-item" onClick={this.onClickPerson.bind(this, this.props.person.id)}>
                <h4 className="list-group-item-heading">{this.props.person.firstName}{" "}{this.props.person.lastName}</h4>
                <p className="list-group-item-text">{this.props.person.partnerName}</p>
            </a>
        );
    }
});