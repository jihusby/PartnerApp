'use strict';

myApp.controller('PartnerCtrl', function InitCtrl($scope, partnerService, $log, $routeParams, $location) {
    $scope.partner = {
        partnerType: 'Nettverkspartner'
    };
    if($routeParams.id) {
        partnerService.getPartner($routeParams.id, function (partner) {
            $scope.partner = partner;
        });

        $scope.editPartner = function (partner) {
            $location.path('/partnerEdit/' + partner._id);
        };

        $scope.deletePartner = function (partner) {
            partnerService.deletePartner(partner, function(p) {
                partnerService.getPartners(function(partners) {
                    $scope.partners = partners;
                });
                $scope.getPartners();
            });
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
        window.location = "#/partnerDetail/" + partner._id;
    }

    $scope.getPartners = function() {
        window.location = "#/partners";
    }

    $scope.savePartner = function (partner){
        if(partner._id){
            partnerService.savePartner(partner, function(p) {
                $scope.getPartnerDetail(p);
            });


        }else{
            partnerService.insertPartner(partner, function(p) {
                partnerService.getPartners(function(partners) {
                    $scope.partners = partners;
                });
                $scope.getPartners();
            });

        }
    };

});