var React = require("react");
var Navigator = require("../utils/navigator");

module.exports = React.createClass({
    mixins: [Navigator],
    
    onClickPerson: function(id) {
        this.goTo("person/" + id);
    },
    render: function() {
        return (
            <a className="list-group-item" onClick={this.onClickPerson.bind(this, this.props.person.id)}>
                <h4 className="list-group-item-heading">{this.props.person.firstName}{" "}{this.props.person.lastName}</h4>
                <p className="list-group-item-text firm-list-item">{this.props.person.partnerName}</p>
            </a>
        );
    }
});