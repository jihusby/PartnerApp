var React = require("react");
var Reflux = require("reflux");

var Navbar = require("react-bootstrap/Navbar");
var Nav = require("react-bootstrap/Nav");
var NavItem = require("react-bootstrap/NavItem");

var Button = require("react-bootstrap/Button");

var MenuActions = require("../actions/MenuActions");
var MenuStore = require("../stores/MenuStore");
var PartnerView = require("./PartnerView.jsx");
var Constants = require("../utils/partner-constants");


module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem")],

        handleMenuToggle: function() {
            console.log('hellow orld');
            this.setState({showMenu:!this.state.showMenu});
        },

        handleMenuSelect: function(menuEvent) {
            this.setState({showMenu: false});
            switch(menuEvent){
                case Constants.MenuItems.home:
                    MenuActions.search();
                    break;
                case Constants.MenuItems.partnerlist:
                    MenuActions.partnerlist();
                    break;
                case Constants.MenuItems.favourites:
                    MenuActions.favourites();
                    break;
            }
        },

        render: function () {
            var content;
            switch(this.state.menuItem){
                case Constants.MenuItems.home:
                    content =  <PartnerView partners={this.props.partners}/>;
                    break;
                case Constants.MenuItems.partnerlist:
                    content = <div> hello partners</div>
                    break;
                case Constants.MenuItems.favourites:
                    content = <div>Favourites clicked</div>
                    break;
            }
             if (this.state.showMenu) {
                var menu = (
                    <Nav activeKey={this.state.menuItem} collapsable={true} expanded={false} onSelect={this.handleMenuSelect}>
                        <NavItem eventKey={Constants.MenuItems.home}>Søk</NavItem>
                        <NavItem eventKey={Constants.MenuItems.partnerlist}>Partnerliste</NavItem>
                        <NavItem eventKey={Constants.MenuItems.favourites}>Favoritter</NavItem>
                    </Nav>
                    );
            } else {
                menu = undefined;
            }
            var navbar = (
                <Navbar bsStyle="pills" toggleNavKey={1} inverse={true} navExpanded={false} onToggle={this.handleMenuToggle}>
                    {menu}
                </Navbar>
            );

            return (
                <div>
                    {navbar}
                    <div className="container content-container">
                        <div id="alert-container" />
                        {content}
                    </div>
                </div>
            );

        }
    });