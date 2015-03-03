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
        var link = "link_" + this.props.id;
        if(this.isFavorite(this.state.favorites)){
            return  (
                <a id={link} onClick={this.removeFavorite} className="ghost-favorite">
                    <Button id={this.props.id} bsStyle="default" className="ghost-favorite">
                        <i className="glyphicon glyphicon-star"></i>
                    </Button>
                </a>
            );
        } else {
            return  (
                <a id={link} onClick={this.addToFavorites} className="ghost-favorite">
                    <Button id={this.props.id} bsStyle="default" className="ghost-favorite">
                        <i className="glyphicon glyphicon-star-empty"></i>
                    </Button>
                </a>
            );
        }
    },

    componentDidMount: function() {
        document.getElementById(this.props.id).className="ghost-favorite";
        document.getElementById("link_" + this.props.id).className="ghost-favorite";
    },

    addToFavorites: function(e){
        var favorites = this.state.favorites || [];
        var favorite = { id: this.props.id };
        ContactActions.setFavorites(_.union(favorites, [favorite]));
        document.getElementById(this.props.id).className="ghost-favorite";
        document.getElementById("link_" + this.props.id).className="ghost-favorite";
    },
    
    removeFavorite: function(e){
        var favoriteId = this.props.id;
        var favorites = this.state.favorites || [];
        
        ContactActions.setFavorites(_.without(favorites, _.find(favorites, function(f){ 
                return f.id == favoriteId;
            })
        ));
        document.getElementById(this.props.id).className="ghost-favorite";
        document.getElementById("link_" + this.props.id).className="ghost-favorite";
    },
    
    isFavorite: function(favorites){
        var that = this;
        return !!_.find(favorites, function(f){ return f.id == that.props.id});
    }
});