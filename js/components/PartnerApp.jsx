var React = require("react");
var Reflux = require("reflux");

var Navbar = require("react-bootstrap/Navbar");
var Nav = require("react-bootstrap/Nav");
var NavItem = require("react-bootstrap/NavItem");

var Button = require("react-bootstrap/Button");

var MenuActions = require("../actions/MenuActions");
var AuthActions = require("../actions/AuthActions");
var MenuStore = require("../stores/MenuStore");
var AuthStore = require("../stores/AuthStore");
var PartnerView = require("./PartnerView.jsx");
var Login = require("./Login.jsx");
var Constants = require("../utils/partner-constants");



module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem"),Reflux.connect(AuthStore,"loginResult")],

        getInitialState: function() {
            var state = {
                loginResult:{
                  loggedIn: !!sessionStorage.getItem(Constants.SessionStorageKeys.bearer_token),
                  name: sessionStorage.getItem(Constants.SessionStorageKeys.name) || "",
                  error: undefined
              }
            };
            return state;
        },

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
                case Constants.MenuItems.login:
                    if(!this.state.loginResult || !this.state.loginResult.loggedIn){
                        MenuActions.login();
                    } else{
                        AuthActions.logOut();      
                    }
                    break;
            }
        },

        render: function () {
            var content;
            var loginResult = this.state.loginResult;
            var loginText = "";
            if(!!loginResult) loginText = loginResult.loggedIn ? "Logg ut" : "Logg inn";
            else loginText = "Logg inn";
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
                case Constants.MenuItems.login:
                    content = <Login />
                    break;
            }
             if (this.state.showMenu) {
             
                var menu = (
                    <Nav activeKey={this.state.menuItem} collapsable={true} expanded={false} onSelect={this.handleMenuSelect}>
                        <NavItem eventKey={Constants.MenuItems.home}>Søk</NavItem>
                        <NavItem eventKey={Constants.MenuItems.partnerlist}>Partnerliste</NavItem>
                        <NavItem eventKey={Constants.MenuItems.favourites}>Favoritter</NavItem>
                        <NavItem eventKey={Constants.MenuItems.login}>{ loginText }</NavItem>
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