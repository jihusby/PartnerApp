var React = require("react");
var Reflux = require("reflux");
var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");
var LocalStorageUtils = require("../utils/localstorage-utils");

var Button = require("react-bootstrap/Button");
var Input = require("react-bootstrap/Input");

module.exports = React.createClass({
    propTypes: {
        setContactNote: React.PropTypes.func.isRequired
    },

    mixins: [Reflux.connect(ContactStore,"contactNote")],

    getInitialState: function(){
        ContactActions.getContactNote(this.props.contact.id);
        var cn = this.getContactNote();
        return{
            contactNote: cn
        }
    },

    render: function(){
        return (
            <div>
                <div>
                    <Input className="textareaPassive" onFocus={this.setFocus} onBlur={this.lostFocus} placeholder="Trykk her for å skrive notat" type="textarea" label="Notat" id="contactNote" ref="contactNote" defaultValue={this.state.contactNote} onChange={this.setContactNote} />
                </div>
            </div>
        );
    },

    setFocus: function(){
        document.getElementById("contactNote").className="textareaActive";
    },

    lostFocus: function(){
        document.getElementById("contactNote").className="textareaPassive";
    },

    setContactNote: function(event){
        this.setState({contactNote: this.refs.contactNote.getValue() });
        this.props.setContactNote(this.refs.contactNote.getValue());
    },

    getContactNote: function(){
        if(this.state && this.state.contactNote){
            return this.state.contactNote;
        }
        return LocalStorageUtils.getContactNote(this.props.contact.id);
    }

});