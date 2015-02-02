var React = require("react");

var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");

module.exports = React.createClass({
    propTypes: {
        addToContactNotes: React.PropTypes.func.isRequired
    },
    render: function(){
        return (
            <div>
                <div>
                    <Input type="textarea" label="Notat" ref="contactNote" defaultValue="" />
                </div>
                <div>
                    <Button onClick={this.addToContactNotes}>Legg til</Button>
                </div>
            </div>
          );
    },
    
    addToContactNotes: function(){
        this.props.addToContactNotes(this.refs.contactNote.getValue());
    }
});