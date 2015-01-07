var React = require("react");

var Modal = require("react-bootstrap/Modal");
var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");

module.exports = React.createClass({
    propTypes: {
        onToggle: React.PropTypes.func.isRequired,
        addToFavorites: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <Modal title="Legg til i favoritter" onRequestHide={this.props.onToggle}>
              <div className="modal-body">
                <Input type="textarea" label="Notat" ref="note" defaultValue="" />
              </div>
              <div className="modal-footer">
                <Button onClick={this.props.onToggle}>Avbryt</Button>
                <Button onClick={this.addToFavorites}>Legg til</Button>
              </div>
            </Modal>
          );
    },
    
    addToFavorites: function(){
        this.props.addToFavorites(this.refs.note.getValue());
    }
});