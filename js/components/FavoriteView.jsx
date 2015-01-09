var React = require("react");
var Reflux = require("reflux");

var Constants = require("../utils/partner-constants.js");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var ContactDetailView = require("./ContactDetailView.jsx");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"favorites")],  
    
    getInitialState: function(){
        ContactActions.get(Constants.LocalStorageKeys.favorites);
        return this.state;
    },
    
    render: function () {
        var i = 0;
        if(!!this.state.favorites){
            var favoriteList = this.state.favorites.map(function(favorite){
                i++;
                return (
                    <ContactDetailView id={favorite.id} note={favorite.note} index={i} />
                    );
            });

            return (
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {favoriteList}
                </div>
            );
        } else{
            return (
                <h4>Du har ikke lagt til noen favoritter.</h4>
            );
        }
    }
});
