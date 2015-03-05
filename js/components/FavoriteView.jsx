var React = require("react");
var Reflux = require("reflux");

var localStorageUtils = require("../utils/localstorage-utils");
var ContactDetailView = require("./ContactDetailView.jsx");
var ContactBox = require("./ContactBox.jsx");
var Navigator = require("../utils/navigator");

var _ = require("underscore");

module.exports = React.createClass({

    propTypes: {
        favorites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
        
    getInitialState: function(){
        var initialFavorites = this.props.favorites || [];
        return { initialFavorites: initialFavorites };
    },
    
    render: function () {
        Navigator.goToTop();

        if(this.state.initialFavorites.length > 0){
            var contactList = this.state.initialFavorites.map(function(favorite){
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
                <div className="center-text top-margin">
                    <h4>Du har ikke lagt til noen favoritter.</h4>
                </div>
            );
        }
    }
});
