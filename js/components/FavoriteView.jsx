var React = require("react");
var Reflux = require("reflux");

var ContactStore = require("../stores/ContactStore.js");
var ContactActions = require("../actions/ContactActions.js");

var localStorageUtils = require("../utils/localstorage-utils");
var ContactDetailView = require("./ContactDetailView.jsx");
var ContactBox = require("./ContactBox.jsx");

var _ = require("underscore");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"favorites")],  
    
    getInitialState: function(){
        ContactActions.getFavorites();
        return this.state;
    },
    
    render: function () {
        if(this.state.favorites){
            var contactList = this.state.favorites.map(function(favorite){
                var contact = localStorageUtils.findContact(favorite.id);
                var partner = localStorageUtils.findPartner(contact.partnerId);
                contact.partnerName = partner.name;
                return contact;
            });

            var sortedContactList = _.chain(contactList).sortBy(function(contact){
                return [contact.lastName, contact.firstName].join("_");
            }).map(function(contact){
                return <ContactBox contact={contact} showPartner={true} showPosition={true} showFavorite={true} />
            });

            return (
                <div className="top-margin" id="accordion" role="tablist" aria-multiselectable="true">
                    <div className="list-group">
                        {sortedContactList}
                    </div>
                </div>
            );
        } else{
            return (
                <h4>Du har ikke lagt til noen favoritter.</h4>
            );
        }
    }
});
