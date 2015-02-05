var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");

var ContactActions = require("../actions/ContactActions.js");
var ContactStore = require("../stores/ContactStore.js");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"favorites")],
    
    getInitialState: function() {
        ContactActions.getFavorites();
    },
    
    render: function(){
        if(this.isFavorite(this.state.favorites)){
            return  (
                <a onClick={this.removeFavorite}>
                            <i className="glyphicon glyphicon-star gold"></i>
                </a>
            );
        } else {
            return  (
                <a onClick={this.addToFavorites}>
                        <i className="glyphicon glyphicon-star-empty gold"></i>
                </a>
            );
        }
    },

    addToFavorites: function(){
        var favorites = this.state.favorites || [];
        var favorite = { id: this.props.id };
        ContactActions.setFavorites(_.union(favorites, [favorite]));
    },
    
    removeFavorite: function(){
        var favoriteId = this.props.id;
        var favorites = this.state.favorites || [];
        
        ContactActions.setFavorites(_.without(favorites, _.find(favorites, function(f){ 
                return f.id == favoriteId;
            })
        ));
    },
    
    isFavorite: function(favorites){
        var that = this;
        return !!_.find(favorites, function(f){ return f.id == that.props.id});
    }
});