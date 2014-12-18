var React = require("react");
var Reflux = require("reflux");

var Nav = require("react-bootstrap/Nav");
var NavItem = require("react-bootstrap/NavItem");

var MenuActions = require("../actions/MenuActions");
var MenuStore = require("../stores/MenuStore");
var PartnerSearchView = require("./PartnerSearchView.jsx");
var Constants = require("../utils/partner-constants");


module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem")],

        handleMenuSelect: function(menuEvent) {
            switch(menuEvent){
                case Constants.MenuItems.home:
                    MenuActions.search();
                    break;
                case Constants.MenuItems.favourites:
                    MenuActions.favourites();
                    break;
            }
        },

        render: function () {
            var content;
            var activeKey = 1;
            switch(this.state.menuItem){
                case Constants.MenuItems.home:
                    content =  <PartnerSearchView partners={this.props.partners}/>;
                    break;
                case Constants.MenuItems.favourites:
                    content = <div>Favourites clicked</div>
                    activeKey = 2;
                    break;
            }

            var menuInstance = (
                <Nav bsStyle="pills" activeKey={activeKey} onSelect={this.handleMenuSelect}>
                    <NavItem eventKey={Constants.MenuItems.home}>Hjem</NavItem>
                    <NavItem eventKey={Constants.MenuItems.favourites}>Favoritter</NavItem>
                </Nav>
            );

            return (
                <div>
                    {menuInstance}
                    {content}
                </div>
            );

        }
    });


