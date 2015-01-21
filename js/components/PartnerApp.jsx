var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");

jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;
require("bootstrap");

var Spinner = require("react-spinner");

var store = require("store.js");

var MenuActions = require("../actions/MenuActions");
var AuthActions = require("../actions/AuthActions");

var MenuStore = require("../stores/MenuStore");
var AuthStore = require("../stores/AuthStore");

var PartnerSearchView = require("./PartnerSearchView.jsx");
var PartnerListView = require(".//PartnerListView.jsx");

var Login = require("./Login.jsx");
var FavoriteView = require("./FavoriteView.jsx");
var ContactDetailView = require("./ContactDetailView.jsx");
var PartnerDetailView = require("./PartnerDetailView.jsx");

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
                    routie("");
                    break;
                case Constants.MenuItems.partnerlist:
                    routie("partnerList");
                    break;
                case Constants.MenuItems.favorites:
                    routie("favorites");
                    break;
                case Constants.MenuItems.login:
                    if(!this.state.loginResult || !this.state.loginResult.loggedIn){
                        routie("login");
                    } else{
                        AuthActions.logOut();      
                    }
                    break;
                 default:
                    console.error("Invalid menuItem");
            }
        },
        
        goBack: function () {
            var nav = window.navigator;
            if( this.phonegapNavigationEnabled &&
                nav &&
                nav.app &&
                nav.app.backHistory ){
                nav.app.backHistory();
            } else {
                //history.go(-1);
                window.history.back();
            }
        },
        render: function () {
            var content, title;
            var loginResult = this.state.loginResult;
            var loginText = <div><span className="glyphicon glyphicon-log-in" />&nbsp;&nbsp;Logg inn</div>;
            if(loginResult && loginResult.loggedIn){
                loginText = <div><span className="glyphicon glyphicon-log-out" />&nbsp;&nbsp;Logg ut</div>;
            }

            if (!store.get(Constants.LocalStorageKeys.bearer_token)){
                $("nav.navbar").find("li.active").removeClass('active');
                $("nav.navbar").find("li#"+Constants.MenuItems.login).addClass('active');
                content = (<div>Du må logge inn for å få tilgang til partnerdata.<br/><Login /> </div>);
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
                $("nav.navbar").find("li.active").removeClass('active');
                var selectedMenuElement = $("nav.navbar").find("li#"+this.state.menuItem.path);
                if (selectedMenuElement) {
                    selectedMenuElement.addClass('active');
                }
                switch(this.state.menuItem.path){
                    case Constants.MenuItems.home:
                        title = "Søk";
                        content = <PartnerSearchView partners={this.props.partners} persons={this.props.persons} />
                        break;
                    case Constants.MenuItems.partnerlist:
                        title = "Partnere";
                        content = <PartnerListView />
                        break;
                    case Constants.MenuItems.favorites:
                        title = "Favoritter";
                        content = <FavoriteView />
                        break;
                    case Constants.MenuItems.login:
                        title = "Logg inn";
                        content = <Login />
                        break;
                    case Constants.MenuItems.partner_detail:
                        title = "Partner";
                        // refactor - pass id
                        var partnerId = this.state.menuItem.id;
                        var partner = _.find(this.props.partners, function(partner){
                            return partner.id == partnerId;
                        });
                        content = <PartnerDetailView selectedPartner={partner} />
                        break;
                    case Constants.MenuItems.person_detail:
                        title = "Person";
                        content = <ContactDetailView index="0" id={this.state.menuItem.id} />
                        break;
                    case Constants.MenuItems.contact_detail:
                        title = "Contact";
                        var contactId = this.state.menuItem.id;
                        content = <ContactDetailView id={contactId} />
                        break;

                }
                // hack to ensure scrolling to top of page
                $(window).scrollTop(0);
            }
            var navbar = (
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header"> 
                            <a className="navbar-brand" onClick={this.goBack}><i className="glyphicon glyphicon-chevron-left"></i></a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-menu">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="nav-menu">
                            <ul className="nav navbar-nav">
                                <li><a href="#">{title}</a></li>
                                <li id={Constants.MenuItems.home} className="active">
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.home)}>
                                        <span className="glyphicon glyphicon-search" /> &nbsp;&nbsp;Søk
                                    </a>
                                </li>
                                <li id={Constants.MenuItems.partnerlist}>
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.partnerlist)}>
                                        <span className="glyphicon glyphicon-briefcase" />&nbsp;&nbsp;Partnerliste
                                    </a>
                                </li>
                                <li id={Constants.MenuItems.favorites}>
                                    <a href="#" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.favorites)}>
                                        <span className="glyphicon glyphicon-star" />&nbsp;&nbsp;Favoritter
                                    </a>
                                </li>
                                <li id={Constants.MenuItems.login}>
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