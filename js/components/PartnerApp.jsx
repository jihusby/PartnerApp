var React = require("react");
var Reflux = require("reflux");
var Spinner = require("react-spinner");

var store = require("store.js");

var MenuActions = require("../actions/MenuActions");
var AuthActions = require("../actions/AuthActions");

var MenuStore = require("../stores/MenuStore");
var AuthStore = require("../stores/AuthStore");

var PartnerView = require("./PartnerView.jsx");
var PartnerListView = require(".//PartnerListView.jsx");

var Login = require("./Login.jsx");
var FavoriteView = require("./FavoriteView.jsx");

var Constants = require("../utils/partner-constants");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem"),Reflux.connect(AuthStore,"loginResult")],

        getInitialState: function() {
            return {loginResult: AuthStore.getDefaultData()};
        },

        handleMenuToggle: function() {
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
                case Constants.MenuItems.favorites:
                    MenuActions.favorites();
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
            var loginText = <div><span className="glyphicon glyphicon-log-in" />&nbsp;&nbsp;Logg inn</div>;
            if(loginResult && loginResult.loggedIn){
                loginText = <div><span className="glyphicon glyphicon-log-out" />&nbsp;&nbsp;Logg ut</div>;
            }

            if (!store.get(Constants.LocalStorageKeys.bearer_token)){
                content = (<div>You must log in to get the partner data<br/><Login /> </div>);
            } else if (!(this.props.partners  && (this.props.partners.length > 0))){
                content =  (
                    <div>
                        <div className="center-text">
                            Laster data...
                        </div>
                        <div className="spacing-top">
                            <Spinner />
                        </div>
                    </div>
                    );
            } else{
                switch(this.state.menuItem){
                    case Constants.MenuItems.home:
                        content =  <PartnerView partners={this.props.partners}/>;
                        break;
                    case Constants.MenuItems.partnerlist:
                        content = <PartnerListView />
                        break;
                    case Constants.MenuItems.favorites:
                        content = <FavoriteView />
                        break;
                    case Constants.MenuItems.login:
                        content = <Login />
                        break;
                }
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
                                <li className="active">
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.home)}>
                                        <span className="glyphicon glyphicon-search" /> &nbsp;&nbsp;Søk
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.partnerlist)}>
                                        <span className="glyphicon glyphicon-briefcase" />&nbsp;&nbsp;Partnerliste
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.favourites)}>
                                        <span className="glyphicon glyphicon-star" />&nbsp;&nbsp;Favoritter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.login)}>
                                    {loginText}
                                    </a>
                                </li>
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