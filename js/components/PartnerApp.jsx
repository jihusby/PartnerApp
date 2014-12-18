var React = require("react");
var Reflux = require("reflux");

var MenuStore = require("../stores/MenuStore");
var PartnerSearchView = require("./PartnerSearchView.jsx");

var Constants = require("../utils/partner-constants");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem")],

        render: function () {
            var content;

            switch(this.state.menuItem){
                case Constants.MenuItems.home:
                    content =  <PartnerSearchView partners={this.props.partners}/>;
                    break;
                case Constants.MenuItems.favourites:
                    content = <div>Favourites clicked</div>
                    break;
            }

            return (
                <div>
                    {content}
                </div>
            );
        }
    });


