myApp.factory('partnerService', function ($http, $log, $location) {

    return {
        getPartners: function (successcb) {
            $http({method: 'GET', url: 'http://localhost:8000/api/search'}).
                success(function(data, status, headers, config) {
                    successcb(data.partners);
            }).
            error(function(data, status, headers, config) {
                $log.warn(data, status, headers, config);
            });
        },
        getPartner: function (id, successcb) {
            $log.info("PartnerService.id = " + id);
            $http({method: 'GET', url: 'http://localhost:8000/api/partnerDetail?id=' + id}).
                success(function(data, status, headers, config) {
                    successcb(data);
                }).
                error(function(data, status, headers, config) {
                    $log.warn(data, status, headers, config);
            });
        },
        savePartner: function (partner, successcb) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8000/api/partnerSave',
                data: partner
            }
            $http.post('http://localhost:8000/api/partnerSave?id=' + partner.id, req).
                success(function(data, status, headers, config) {
                    successcb(partner);
                }).
                error(function(data, status, headers, config) {
                    $log.warn(data, status, headers, config);
                });

        }

    };
});