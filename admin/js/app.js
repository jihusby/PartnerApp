'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.version'
])
    .config(function($routeProvider) {
        $routeProvider.when('/activities',
            {
                templateUrl:'js/activities/Activities.html',
                controller: 'ActivityCtrl'
            });
        $routeProvider.when('/partners',
            {
                templateUrl:'js/partners/Partners.html',
                controller: 'PartnerCtrl'
            });
        $routeProvider.when('/partnerDetail/:id',
            {
                templateUrl:'js/partners/PartnerDetail.html',
                controller: 'PartnerCtrl'
            });
        $routeProvider.when('/partnerEdit/:id',
            {
                templateUrl:'js/partners/PartnerEdit.html',
                controller: 'PartnerCtrl'
            });
        $routeProvider.when('/partnerNew',
            {
                templateUrl:'js/partners/PartnerEdit.html',
                controller: 'PartnerCtrl'
            });
    });
