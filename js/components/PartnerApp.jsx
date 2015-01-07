var React = require("react");
var Reflux = require("reflux");

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
            $('#nav-menu').collapse('hide');
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
                 default:
                    console.error("Invalid menuItem");
            }
        },

        render: function () {
            var content;
            var loginResult = this.state.loginResult;
            var loginText = "Logg inn";
            if(!!loginResult){
                loginText = loginResult.loggedIn ? "Logg ut" : "Logg inn";
            } 

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

            var navbar = (
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header"> 
                            <a className="navbar-brand">PartnerApp</a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-menu">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="nav-menu">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.home)}>Søk</a></li>
                                <li><a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.partnerlist)}>Partnerliste</a></li>
                                <li><a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.favourites)}>Favoritter</a></li>
                                <li><a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.login)}>{loginText}</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );

            return (
                <div>
                    {navbar}
                    <div className="container content-container">
                        {content}
                    </div>
                </div>
            );
        }
    });