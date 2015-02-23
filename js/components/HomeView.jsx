var React = require("react");
var Reflux = require("reflux");
var store = require("store.js");
var Spinner = require("react-spinner");
var _ = require("underscore");
jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;
require("bootstrap");

var MenuStore = require("../stores/MenuStore");
var DataStore = require("../stores/DataStore");
var AuthStore = require("../stores/AuthStore");

var BackendActions = require("../actions/BackendActions");
var AuthActions = require("../actions/AuthActions");

var Constants = require("../utils/partner-constants");
var Navigator = require("../utils/navigator");

var Login = require("./Login.jsx");

module.exports = React.createClass({

    mixins: [Reflux.connect(MenuStore,"menuItem"), Reflux.connect(AuthStore,"loginResult"), Navigator],

    propTypes: {
        isUpdating: React.PropTypes.bool.isRequired
    },
    
    getInitialState: function(){
        return {
        };
    },

    render: function () {
        var additionalClasses = this.buildAdditionalClasses();
        var lastSync = this.getlastRefreshDate();
        var spinIcon = this.buildSpinButton(lastSync);
        var loginText = <div><span className="glyphicon glyphicon-log-out" />&nbsp;&nbsp;Logg ut</div>;
        var loginBlock = this.buildLoginBlock(loginText, additionalClasses);

        /* TODO: Save timestamp for last sync, show on button */
        return (
            <div>
                <div className={additionalClasses} onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.partnerlist)} >
                    <div className="container list-container">
                        <div id={Constants.MenuItems.partnerlist}>
                            <span className="glyphicon glyphicon-briefcase" />&nbsp;&nbsp;Partnere
                        </div>
                    </div>
                </div>
                <div className={additionalClasses} onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.activities)}>
                    <div className="container list-container">
                        <div id={Constants.MenuItems.activities}>
                            <span className="glyphicon glyphicon-calendar" />&nbsp;&nbsp;Aktiviteter
                        </div>
                    </div>
                </div>
                <div className={additionalClasses} onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.favorites)}>
                    <div className="container list-container">
                        <div id={Constants.MenuItems.favorites}>
                            <span className="glyphicon glyphicon-star" />&nbsp;&nbsp;Mine favoritter
                        </div>
                    </div>
                </div>
                <div className={additionalClasses} onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.search)}>
                    <div className="container list-container">
                        <div id={Constants.MenuItems.search}>
                            <span className="glyphicon glyphicon-search" /> &nbsp;&nbsp;Søk
                        </div>
                    </div>
                </div>

                {spinIcon}

                {/*Comment 18.02.2015: The variable {loginBlock} goes here if we want to add a logout option to the app (initially, we do not) */}

                <div className="container list-container">
                    <div className="logo-container">
                        <img src="images/logo_xs_small.png" className="rbk-logo" />
                    </div>
                </div>
                <div className="container list-container">
                    <div className="logo-container">
                        <h4>RBK Partner</h4>
                    </div>
                </div>
            </div>
        )},

    buildSpinButton: function(lastSync){
        if(this.props.isUpdating){
            return (
                <div className="list-group-item header-item disabled">
                    <div className="container list-container">
                        <span className="glyphicon glyphicon-refresh spin" />&nbsp;&nbsp;Oppdaterer...
                    </div>
                </div>
            );
        } else {
            return (
                <div className="list-group-item header-item enabled"  onClick={this.synchronize}>
                    <div className="container list-container">
                        <span className="glyphicon glyphicon-refresh" />&nbsp;&nbsp;Oppdater <small>({lastSync})</small>
                    </div>
                </div>
            )
        }
    },

    buildLoginBlock: function(loginText, additionalClasses) {
        return (
            <div className="list-group-item header-item">
                <div className="container list-container">
                    <div id={Constants.MenuItems.home}>
                        <a onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.login)} className={additionalClasses}>
                                {loginText}
                        </a>
                    </div>
                </div>
            </div>

        )
    },

    buildAdditionalClasses: function(){
        if(this.props.isUpdating){
            return "list-group-item header-item list-choice disabled";
        } else {
            return "list-group-item header-item list-choice enabled";
        }
    },

    getlastRefreshDate: function() {
        var rawDate = store.get(Constants.LocalStorageKeys.last_refresh_date);
        if(rawDate) {
            var date = new Date(rawDate);
            if(date.getDate()==new Date().getDate()){
                return this.format(date.getHours()) + ":" + this.format(date.getMinutes());
            }else{
                return this.format(date.getDate()) + "." + this.format(date.getMonth()+1);
            }
        }else{
            return "";
        }
    },

    format: function(num) {
        if(num<10){
            return "0" + num;
        }else{
            return num;
        }
    },

    synchronize: function(){
        BackendActions.synchronizeData(true);
    },

    handleMenuSelect: function(menuEvent) {
        if(this.props.isUpdating){
            return;
        }

        switch(menuEvent){
            case Constants.MenuItems.partnerlist:
                this.goTo("partnerList");
                break;
            case Constants.MenuItems.activities:
                this.goTo("activities");
                break;
            case Constants.MenuItems.favorites:
                this.goTo("favorites");
                break;
            case Constants.MenuItems.search:
                this.goTo("search");
                break;
            case Constants.MenuItems.login:
                AuthActions.logOut();
                this.goTo("login");
                break;
            default:
                console.error("Invalid menuItem");
        }
    }


});