var React = require("react");
var _ = require("underscore");
var Constants = require("../utils/partner-constants");

module.export = React.createClass({
    getInitialState: function() {
        if(localStorage.getItem(Constants.LocalStorage.favorites) == null){
             return { isFavorite: false };
        }
        return { 
            isFavorite : !!_.find(JSON.parse(localStorage.getItem(Constants.LocalStorage.favorites)), function(favorite){
                return favorite.id == this.props.id;
            }); 
        }
    },
    render: function(){
    if(this.state)
    return  (
        
            <i className="glyphicon glyphicon-star-empty"></i>
        );
    }
});