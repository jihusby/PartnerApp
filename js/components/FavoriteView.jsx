var React = require("react");
var Reflux = require("reflux");

var Constants = require("../utils/partner-constants.js");

var FavoriteStore = require("../stores/FavoriteStore.js");
var FavoriteActions = require("../actions/FavoriteActions.js");

module.exports = React.createClass({

    mixins: [Reflux.connect(FavoriteStore,"favorites")],  
    
    getInitialState: function(){
        FavoriteActions.get(Constants.LocalStorageKeys.favorites);
        return this.state;
    },
    
    render: function () {
        var i = 0;
        if(!!this.state.favorites){
            var favoriteList = this.state.favorites.map(function(favorite){
                var headingId = "acc" + i;
                var collapseId = "col" + i;
                var collRefId = "#col" + i;
                
                var name = favorite.contact.firstName + " " + favorite.contact.lastName;
                i++;
                return (
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id={headingId}>
                            <h4 className="panel-title">
                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href={collRefId} aria-expanded="false" aria-controls={collapseId}>
                                    {name}
                                </a>
                            </h4>
                        </div>
                        <div id={collapseId} className="panel-collapse collapse" role="tabpanel" aria-labelledby={headingId}>
                            <div className="panel-body">
                                {favorite.note}
                            </div>
                        </div>
                    </div>
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
