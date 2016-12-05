(function () {
    'use strict';

    angular.module('movieApp').directive('comments', comments);

    comments.$inject = ['dataFactory'];

    function comments (dataFactory) {
        return {
            restrict: 'E',
            templateUrl: 'comments.html',
            scope: {
                id: '@'
            },
            link: _link
        }
    }

    function _link (scope, el, attr) {
    }
})();