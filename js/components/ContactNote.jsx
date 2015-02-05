var React = require("react");
var Reflux = require("reflux");
var ContactActions = require("../actions/ContactActions.js");
var LocalStorageUtils = require("../utils/localstorage-utils");

var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");

module.exports = React.createClass({

    getInitialState: function(){
        var cn = this.getContactNote();
        return{
            contactNote: cn
        }
    },

    componentDidMount: function() {
        this.passive();
    },

    render: function(){
        return (
            <div>
                <div>
                    <Input
                        onFocus={this.active}
                        onBlur={this.passive}
                        placeholder="Trykk her for å skrive notat"
                        type="textarea"
                        label="Notat"
                        id="contactNote"
                        ref="contactNote"
                        defaultValue={this.state.contactNote}
                        onChange={this.setContactNote} />
                </div>
            </div>
        );
    },

    active: function(){
        document.getElementById("contactNote").className="textareaActive";
    },

    passive: function(){
        document.getElementById("contactNote").className="textareaPassive";
    },

    setContactNote: function(event){
        this.setState({contactNote: this.refs.contactNote.getValue() });
        ContactActions.setContactNotes({ id: this.props.contact.id, contactNote: this.refs.contactNote.getValue() });
    },

    getContactNote: function(){
        if(this.state && this.state.contactNote){
            return this.state.contactNote;
        }
        return LocalStorageUtils.getContactNote(this.props.contact.id);
    }

});