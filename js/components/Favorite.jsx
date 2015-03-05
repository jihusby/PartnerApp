var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");

var ContactActions = require("../actions/ContactActions.js");
var ContactStore = require("../stores/ContactStore.js");
var Button = require("react-bootstrap/Button");

module.exports = React.createClass({

    mixins: [Reflux.connect(ContactStore,"favorites")],
    
    getInitialState: function() {
        ContactActions.getFavorites();
    },
    
    render: function(){
        if(this.isFavorite(this.state.favorites)){
            return  (
                <Button id={this.props.id} bsStyle="default" className="ghost-favorite" onClick={this.removeFavorite}>
                    <i className="glyphicon glyphicon-star"></i>
                </Button>
            );
        } else {
            return  (
                <Button id={this.props.id} bsStyle="default" className="ghost-favorite" onClick={this.addToFavorites}>
                    <i className="glyphicon glyphicon-star-empty"></i>
                </Button>
            );
        }
    },

    componentDidMount: function() {
        document.getElementById(this.props.id).className="ghost-favorite";
    },

    addToFavorites: function(e){
        e.preventDefault();
        var favorites = this.state.favorites || [];
        var favorite = { id: this.props.id };
        ContactActions.setFavorites(_.union(favorites, [favorite]));
        document.getElementById(this.props.id).className="ghost-favorite";
    },
    
    removeFavorite: function(e){
        e.preventDefault();
        var favoriteId = this.props.id;
        var favorites = this.state.favorites || [];
        
        ContactActions.setFavorites(_.without(favorites, _.find(favorites, function(f){ 
                return f.id == favoriteId;
            })
        ));
        document.getElementById(this.props.id).className="ghost-favorite";
    },
    
    isFavorite: function(favorites){
        var that = this;
        return !!_.find(favorites, function(f){ return f.id == that.props.id});
    }
});