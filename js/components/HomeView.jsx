var React = require("react");
var Reflux = require("reflux");
var store = require("store.js");
var Spinner = require("react-spinner");
var _ = require("underscore");
jQuery = require("jquery"); // bootstrap needs jQuery variable to be set
var $ = jQuery;
require("bootstrap");

var MenuStore = require("../stores/MenuStore");
var AuthStore = require("../stores/AuthStore");

var BackendActions = require("../actions/BackendActions");
var AuthActions = require("../actions/AuthActions");

var Constants = require("../utils/partner-constants");
var Navigator = require("../utils/navigator");
var SessionStorage = require("../utils/sessionstorage");

var Login = require("./Login.jsx");

module.exports = React.createClass({

    mixins: [Reflux.connect(MenuStore,"menuItem"), Reflux.connect(AuthStore,"loginResult"), Navigator],

    getInitialState: function(){
        return {
        };
    },

    render: function () {
        var additionalClasses = this.buildAdditionalClasses();
        var lastSync = this.getlastRefreshDate();
        var loginText = <div><span className="glyphicon glyphicon-log-out" />&nbsp;&nbsp;Logg ut</div>;

        /* TODO: Save timestamp for last sync, show on button */
        return (
            <div className="list-group top-margin">
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
                
                <div className={additionalClasses} onClick={this.handleMenuSelect.bind(this, Constants.MenuItems.partnerlist)} >
                    <div className="menuLink container list-container">
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
                <div className={additionalClasses} onClick={this.openExternalLink.bind(this, "http://www.rbk.no")}>
                    <div className="container list-container">
                        <div id={Constants.MenuItems.search}>
                            <span className="glyphicon glyphicon-globe" /> &nbsp;&nbsp;Gå til rbk.no
                        </div>
                    </div>
                </div>
                <div className="updateLink row">
                    <div className="col-xs-5">
                        <a className="updateLink" href="#" onClick={this.synchronize}><i className="glyphicon glyphicon-refresh"></i> Oppdater</a>
                    </div>
                    <div className="col-xs-7 ">
                        <small className="pull-right">Oppdatert {lastSync} </small>
                    </div>
                </div>
                {/*Comment 18.02.2015: The variable {loginBlock} goes here if we want to add a logout option to the app (initially, we do not) */}
            </div>
        )},

    buildAdditionalClasses: function(){
        if(this.props.isUpdating){
            return "menuLink list-group-item header-item list-choice disabled";
        } else {
            return "menuLink list-group-item header-item list-choice enabled";
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
                SessionStorage.set(Constants.SessionStorageKeys.partnerFilter, '');
                this.goTo("partnerList");
                break;
            case Constants.MenuItems.activities:
                SessionStorage.set(Constants.SessionStorageKeys.activityFilter, '');
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