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

var MenuStore = require("../stores/MenuStore");
var AuthStore = require("../stores/AuthStore");
var DataStore = require("../stores/DataStore");

var Login = require("./Login.jsx");

var BackendActions = require("../actions/BackendActions");
var PartnerSearchView = require("./PartnerSearchView.jsx");
var PartnerListView = require(".//PartnerListView.jsx");
var HomeView = require("./HomeView.jsx");
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

        mixins: [Reflux.connect(MenuStore,"menuItem"), Navigator],

        propTypes: {
            activities: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            partners: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            partnerTypes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            favorites: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            isUpdating: React.PropTypes.bool.isRequired
        },

        handleMenuSelect: function(menuEvent) {
            if(this.props.isUpdating){
                return;
            }

            this.goTo("");
        },

        buildBackButton: function(){
            if(this.getIterator() > 0){
                return (<button className="navbar-brand btn {additionalClasses} back-button" onClick={Navigator.goBack}><i className="glyphicon glyphicon-chevron-left"></i></button>);
            } else {
                var style = {width:"50px"};
                return  (<button className="navbar-brand ghost-button" style={style}>&nbsp;</button>);
            }
        },

        buildHomeButton: function(){
            return (
                <button type="button" className="navbar-toggle" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.home)}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            )
        },

        buildIPadHomeButton: function(){
            return (
                <button type="button" className="home-ipad" onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.home)}>
                    <span className="glyphicon glyphicon-menu-hamburger"></span>
                </button>
            )
        },

        render: function () {

            var content, title;
            var homeButton, iPadHomeButton;
            if (!store.get(Constants.LocalStorageKeys.bearer_token)){
                title = "Logg inn";
                content = (<Login />);
            } else if (!(this.props.partners && this.props.partners.length > 0)){
                content = (
                    <div>
                        <div className="center-text top-margin">
                            <h4>Oppdaterer...</h4>
                        </div>
                        <div className="top-margin">
                            <Spinner />
                        </div>
                    </div>
                );
            } else{
                switch(this.state.menuItem.path){
                    case Constants.MenuItems.home:
                        title = "Godfoten";
                        content = <HomeView partners={this.props.partners} contacts={this.props.contacts} isUpdating={this.props.isUpdating} />
                        homeButton = "";
                        iPadHomeButton = "";
                        break;
                    case Constants.MenuItems.search:
                        title = "Søk";
                        content = <PartnerSearchView partners={this.props.partners} contacts={this.props.contacts} />
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.partnerlist:
                        title = "Partnere";
                        content = <PartnerListView partners={this.props.partners} partnerTypes={this.props.partnerTypes} />
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.favorites:
                        title = "Favoritter";
                        content = <FavoriteView favorites={this.props.favorites} />
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.login:
                        title = "Logg&nbsp;inne";
                        content = <Login />
                        homeButton = "";
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.partner_detail:

                        // refactor - pass id
                        var partnerId = this.state.menuItem.id;
                        var partner = _.find(this.props.partners, function(partner){
                            return partner.id == partnerId;
                        });
                        title = partner.partnerType;
                        content = <PartnerDetailView selectedPartner={partner} />
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.person_detail:
                        title = "Person";
                        content = <PersonDetailView index="0" id={this.state.menuItem.id} />
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.contact_detail:
                        title = "Kontakt";
                        var contactId = this.state.menuItem.id;
                        content = <ContactDetailView contacts={this.props.contacts} partners={this.props.partners} id={contactId} />
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.activities:
                        title = "Aktiviteter";
                        content = <ActivityListView activities={this.props.activities} />;
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                    case Constants.MenuItems.activity:
                        title = "Aktivitet";
                        content = <ActivityDetailView activities={this.props.activities} contacts={this.props.contacts} partners={this.props.partners} id={this.state.menuItem.id} />;
                        homeButton = this.buildHomeButton();
                        iPadHomeButton = this.buildIPadHomeButton();
                        break;
                }
                // hack to ensure scrolling to top of page
                /*$(window).scrollTop(0);*/
            }


            var backButton = this.buildBackButton();
            var navbar = (
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            {backButton}
                            <strong><span className="navbar-brand mobile-header headertext">{title}</span></strong>
                            {iPadHomeButton}
                            {homeButton}
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