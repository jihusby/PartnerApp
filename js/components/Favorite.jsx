var React = require("react");
var _ = require("underscore");
var Constants = require("../utils/partner-constants");

module.exports = React.createClass({
    getInitialState: function() {
        var lsFavorites = localStorage[Constants.LocalStorageKeys.favorites];
        if(!lsFavorites){
             return { isFavorite: false };
        }
        var favorites = JSON.parse(lsFavorites);
        console.log("Favorites: " +  favorites);
        var isFavorite = !!_.contains(favorites, this.props.id); 
        return { 
            isFavorite : isFavorite
        }
    },
    
    render: function(){
    if(!!this.state.isFavorite){
        return  (
            <a href="#" onClick={this.handleClick}><i className="glyphicon glyphicon-star"></i></a>
        );
    } else{
        return  (
            <a href="#" onClick={this.handleClick}><i className="glyphicon glyphicon-star-empty"></i></a>
            );
        }
    },
    
    handleClick: function(){
        var favorites = [];
        var lsFavorites = localStorage[Constants.LocalStorageKeys.favorites];
        if(!!lsFavorites){
            favorites = JSON.parse(favorites);    
        }
        if(this.state.isFavorite){
            this.setState({ isFavorite: false});
            localStorage[Constants.LocalStorageKeys.favorites] = JSON.stringify(_.without(favorites, this.props.id));
        }else{
            this.setState({ isFavorite: true});
            favorites.push(this.props.id);
            localStorage[Constants.LocalStorageKeys.favorites] = JSON.stringify(favorites);
        }
    }
});