'use strict';

myApp.controller('PartnerCtrl', function InitCtrl($scope, partnerService, $log, $routeParams, $location) {
    $scope.partner = {};
    if($routeParams.id) {
        partnerService.getPartner($routeParams.id, function (partner) {
            $scope.partner = partner;
        });

        $scope.editPartner = function (id) {
            $location.path('/partnerEdit/' + id);
        };
    }else {
        $scope.newPartner = function () {
            $location.path('/partnerNew');
        };
    }

    partnerService.getPartners(function(partners) {
        $scope.partners = partners;
    });

    $scope.getPartnerDetail = function(partner) {
        window.location = "#/partnerDetail/" + partner.id;
    }

    $scope.savePartner = function (partner){
        partnerService.savePartner(partner, function(p) {
            $scope.getPartnerDetail(p);
        });
    };

});