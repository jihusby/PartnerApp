var React = require("react");
var Reflux = require("reflux");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var localStorageUtils = require("../utils/localstorage-utils");
var ContactDetailView = require("./ContactDetailView.jsx");
var ContactBox = require("./ContactBox.jsx");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"favorites")],  
    
    getInitialState: function(){
        ContactActions.getFavorites();
        return this.state;
    },
    
    render: function () {
        if(this.state.favorites){
            var favoriteList = this.state.favorites.map(function(favorite){
                var contact = localStorageUtils.findContact(favorite.id);
                var partner = localStorageUtils.findPartner(contact.partnerId);
                contact.partnerName = partner.name;
                return <ContactBox contact={contact} showPartner={true} />
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
