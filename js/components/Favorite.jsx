var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");
var Constants = require("../utils/partner-constants");

var ContactActions = require("../actions/ContactActions.js");
var ContactStore = require("../stores/ContactStore.js");

var OverlayMixin = require("react-bootstrap/OverlayMixin");

var FavoriteModal = require("./FavoriteModal.jsx");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"favorites"), OverlayMixin],
    
    getInitialState: function() {
        ContactActions.get(Constants.LocalStorageKeys.favorites);
        return { isModalOpen: false};
    },
    
    render: function(){
    if(this.isFavorite(this.state.favorites)){
        return  (
            <a href="#" className="btn btn-primary btn-sm" onClick={this.removeFavorite}><i className="glyphicon glyphicon-star"></i></a>
        );
    } else{
        return  (
            <a href="#" className="btn btn-primary btn-sm" onClick={this.showModal}><i className="glyphicon glyphicon-star-empty"></i></a>
            );
        }
    },
    
  renderOverlay: function () {
        if(this.state.isModalOpen){
          return (
                <FavoriteModal onToggle={this.showModal} addToFavorites={this.addToFavorites} />
            );
        }else{
            return (
                <span/>
            );
        }
    },

    addToFavorites: function(note){
        var favorites = this.state.favorites || [];
        var favorite = { id: this.props.id, note: note };
        ContactActions.set(Constants.LocalStorageKeys.favorites, _.union(favorites, [favorite]));
        // force update
        ContactActions.get(Constants.LocalStorageKeys.favorites);
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    },
    
    removeFavorite: function(){
        var that = this;
        var favorites = this.state.favorites || [];
        
        ContactActions.set(Constants.LocalStorageKeys.favorites, _.without(favorites, _.find(favorites, function(f){ 
                return f.id == that.props.id
            })
        ));
        // force update
        ContactActions.get(Constants.LocalStorageKeys.favorites);
    },
    
    showModal: function () {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    },

    isFavorite: function(favorites){
        var that = this;
        return !!_.find(favorites, function(f){ return f.id == that.props.id});
    }
});