var React = require("react");

module.exports = React.createClass({
    onClickActivity: function(id) {
        routie("activity/" + id);
    },
    render: function() {
        return (
            <a className="list-group-item" onClick={this.onClickActivity.bind(this, this.props.activity.id)}>
                <h4 className="list-group-item-heading">{this.props.activity.titleShort}</h4>
                <p className="list-group-item-text firm-list-item">{this.props.activity.location}</p>
            </a>
        );
    }
});