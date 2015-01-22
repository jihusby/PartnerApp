var React = require("react");
var Reflux = require("reflux");
var _ = require("underscore");
var store = require("store.js");

jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;
require("bootstrap");

var Spinner = require("react-spinner");

var MenuActions = require("../actions/MenuActions");
var AuthActions = require("../actions/AuthActions");
var BackendActions = require("../actions/BackendActions");

var MenuStore = require("../stores/MenuStore");
var AuthStore = require("../stores/AuthStore");
var DataStore = require("../stores/DataStore");

var PartnerSearchView = require("./PartnerSearchView.jsx");
var PartnerListView = require(".//PartnerListView.jsx");

var Login = require("./Login.jsx");
var FavoriteView = require("./FavoriteView.jsx");
var ContactDetailView = require("./ContactDetailView.jsx");
var PartnerDetailView = require("./PartnerDetailView.jsx");
var ActivityListView = require("./ActivityListView.jsx");
var ActivityDetailView = require("./ActivityDetailView.jsx");

var Constants = require("../utils/partner-constants");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem"),Reflux.connect(AuthStore,"loginResult"), Reflux.connect(DataStore, "rbkData")],

        getInitialState: function() {
            return {loginResult: AuthStore.getDefaultData()};
        },

        handleMenuToggle: function() {
            this.setState({showMenu:!this.state.showMenu});
        },

        handleMenuSelect: function(menuEvent) {
            if(this.state.rbkData.isUpdating){
                return;   
            }
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
                case Constants.MenuItems.activities:
                    routie("activities");
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
                window.history.back();
            }
        },
        
        synchronize: function(){
            this.setState({ rbkData: {isUpdating: true}});
            BackendActions.synchronizeData(true);
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
                        console.log("Partner Detail");
                        // refactor - pass id
                        var partnerId = this.state.menuItem.id;
                        var partner = _.find(this.props.partners, function(partner){
                            return partner.id == partnerId;
                        });
                        content = <PartnerDetailView selectedPartner={partner} />
                        break;
                    case Constants.MenuItems.person_detail:
                        title = "Person";
                        console.log("Person detail");
                        content = <ContactDetailView index="0" id={this.state.menuItem.id} />
                        break;
                    case Constants.MenuItems.activities:
                        title = "Aktiviteter";
                        content = <ActivityListView />;
                        break;
                    case Constants.MenuItems.activity:
                        title = "Aktivitet";
                        content = <ActivityDetailView id={this.state.menuItem.id} />;
                        break;
                }
                // hack to ensure scrolling to top of page
                $(window).scrollTop(0);
            }
                var spinIcon;
                var additionalClasses ="";
                if(this.state.rbkData.isUpdating){
                    spinIcon = (<a className="disabled"><i className="glyphicon glyphicon-refresh spin"></i>&nbsp;&nbsp;Oppdaterer</a>);
                    additionalClasses = "disabled";
                } else {
                    spinIcon = (<a onClick={this.synchronize}><i className="glyphicon glyphicon-refresh"></i>&nbsp;&nbsp;Oppdater</a>);
                    additionalClasses = "";
                }
            var navbar = (
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header"> 
                            <a className="navbar-brand btn" onClick={this.goBack}><i className="glyphicon glyphicon-chevron-left"></i></a>
                            <a className="navbar-brand mobile-header hide-on-large"><strong>{title}</strong></a>
                            <a className="navbar-brand btn btn-sync hide-on-large" onClick={this.synchronize}><i className="glyphicon glyphicon-refresh"></i></a>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-menu">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="nav-menu">
                            <ul className="nav navbar-nav">
                                <li id={Constants.MenuItems.home} className="active">
                                    <a onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.home)} className={additionalClasses}>
                                        <span className="glyphicon glyphicon-search" /> &nbsp;&nbsp;Søk
                                    </a>
                                </li>
                                <li id={Constants.MenuItems.partnerlist}>
                                    <a onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.partnerlist)} className={additionalClasses}>
                                        <span className="glyphicon glyphicon-briefcase" />&nbsp;&nbsp;Partnerliste
                                    </a>
                                </li>
                                <li id={Constants.MenuItems.favorites}>
                                    <a onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.favorites)} className={additionalClasses}>
                                        <span className="glyphicon glyphicon-star" />&nbsp;&nbsp;Favoritter
                                    </a>
                                </li>
                                <li id={Constants.MenuItems.activities}>
                                    <a onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.activities)} className={additionalClasses}>
                                        <span className="glyphicon glyphicon-calendar" />&nbsp;&nbsp;Aktiviteter
                                    </a>
                                </li>
                                <li className="hide-on-small">{spinIcon}</li>
                                <li id={Constants.MenuItems.login}>
                                    <a onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.login)} className={additionalClasses}>
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