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

var SessionStorage = require("../utils/sessionstorage");
var Constants = require("../utils/partner-constants");
var Navigator = require("../utils/navigator");

module.exports =

    React.createClass({

        mixins: [Reflux.connect(MenuStore,"menuItem"), Reflux.connect(DataStore, "rbkData"), Reflux.connect(AuthStore,"loginResult"), Navigator],

        propTypes: {
            activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            partnerTypes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
        },
        
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
                    this.goTo("");
                    break;
                case Constants.MenuItems.partnerlist:
                    SessionStorage.remove(Constants.SessionStorageKeys.partnerFilter);
                    this.goTo("partnerList");
                    break;
                case Constants.MenuItems.favorites:
                    this.goTo("favorites");
                    break;
                case Constants.MenuItems.login:
                    if(!this.state.loginResult || !this.state.loginResult.loggedIn){
                        this.goTo("login");
                    } else{
                        this.goTo("");
                        AuthActions.logOut();
                    }
                    break;
                case Constants.MenuItems.activities:
                    SessionStorage.remove(Constants.SessionStorageKeys.activityFilter);
                    this.goTo("activities");
                    break;
                 default:
                    console.error("Invalid menuItem");
            }
        },
        
        buildSpinButton: function(){
            if(this.state.rbkData.isUpdating){
                    return (<a className="disabled"><i className="glyphicon glyphicon-refresh spin"></i>&nbsp;&nbsp;Oppdaterer</a>);
                } else {
                    return (<a onClick={this.synchronize}><i className="glyphicon glyphicon-refresh"></i>&nbsp;&nbsp;Oppdater</a>);
                }
        },
        
        buildBackButton: function(){
            if(this.getIterator() > 0){
                return (<a className="navbar-brand btn {additionalClasses} headertext" onClick={this.goBack}><i className="glyphicon glyphicon-chevron-left headertext"></i></a>);
            } else {
                var style = {width:"68px"};
                return  (<a className="navbar-brand" style={style}>&nbsp;</a>);
            }
        },
        
        buildAdditionalClasses: function(){
            if(this.state.rbkData.isUpdating){
                    return "disabled";
                } else {
                    return "";
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
                title = "Logg inn";
                content = (<Login />);
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
                        content = <PartnerSearchView partners={this.props.partners} contacts={this.props.contacts} />
                        break;
                    case Constants.MenuItems.partnerlist:
                        title = "Partnere";
                        content = <PartnerListView partners={this.props.partners} partnerTypes={this.props.partnerTypes} />
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
                        content = <PersonDetailView index="0" id={this.state.menuItem.id} />
                        break;
                    case Constants.MenuItems.contact_detail:
                        title = "Kontakt";
                        var contactId = this.state.menuItem.id;
                        content = <ContactDetailView contacts={this.props.contacts} partners={this.props.partners} id={contactId} />
                        break;
                    case Constants.MenuItems.activities:
                        title = "Aktiviteter";
                        content = <ActivityListView activities={this.props.activities} />;
                        break;
                    case Constants.MenuItems.activity:
                        title = "Aktivitet";
                        content = <ActivityDetailView activities={this.props.activities} contacts={this.props.contacts} partners={this.props.partners} id={this.state.menuItem.id} />;
                        break;
                }
                // hack to ensure scrolling to top of page
                $(window).scrollTop(0);
            }
                var spinIcon = this.buildSpinButton();
                var backButton = this.buildBackButton();
                var additionalClasses = this.buildAdditionalClasses();

            var navbar = (
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header navbar-header-gold">
                            {backButton}
                            <a className="navbar-brand mobile-header hide-on-large"><strong><span className="headertext">{title}</span></strong></a>
                            <button type="button" className="headertext navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-menu">
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
                                        <span className="glyphicon glyphicon-briefcase" />&nbsp;&nbsp;Partnere
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
                                <li className="updater">{spinIcon}</li>
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