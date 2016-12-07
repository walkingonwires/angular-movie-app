(function () {
    'use strict';

    angular.module('movieApp').controller('DetailsController', detailsController);

    detailsController.$inject = ['$scope', 'dataService'];

    function detailsController (
        $scope,
        dataService
    ) {
        $scope.loading = true;

        dataService.getDetails().then(function (data) {
            $scope.details = data;
        }).catch(function (err) {
            console.error(err);
        });
    }
})();