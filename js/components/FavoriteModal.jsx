var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");

var Modal = require("react-bootstrap/Modal");
var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");
var OverlayMixin = require("react-bootstrap/OverlayMixin");

var FavoriteActions = require("../actions/FavoriteActions.js");
var FavoriteStore = require("../stores/FavoriteStore.js");

module.exports = React.createClass({
    
    render: function(){
        return (
            <Modal title="Legg til i favoritter" onRequestHide={this.props.onToggle}>
              <div className="modal-body">
                <Input type="textarea" label="Notat" ref="note" defaultValue="" />
              </div>
              <div className="modal-footer">
                <Button onClick={this.props.onToggle}>Avbryt</Button>
                <Button onClick={this.addToFavorite}>Legg til</Button>
              </div>
            </Modal>
          );
    },
    
    addToFavorite: function(){
        var func = this.props.addToFavorite;
        func(this.refs.note.getValue());
    }
});