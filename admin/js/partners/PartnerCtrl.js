'use strict';

myApp.controller('PartnerCtrl', function InitCtrl($scope, partnerService, $log, $routeParams, $location) {
    $scope.partner = {};
    $log.info("1 partner is " +$scope.partner);

    partnerService.getPartners(function(partners) {
        $scope.partners = partners;
    });

    $scope.getPartnerDetail = function(partner) {
        $log.info("2 partner is " + partner);
        window.location = "#/partnerDetail/" + partner.id;
    }

    $scope.id = $routeParams.id;
    if($scope.id) {
        partnerService.getPartner($scope.id, function (partner) {
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

    $scope.savePartner = function (partner){
        partnerService.savePartner(partner, function(partner) {
            $scope.getPartnerDetail(partner);
            window.location = "#/partnerDetail/" + partner.id;
        });

    };


});