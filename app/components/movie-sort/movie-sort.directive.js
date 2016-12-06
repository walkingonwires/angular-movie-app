(function () {
    'use strict';

    angular.module('movieApp').directive('movieSort', movieSort);

    angular.$inject = ['MOVIE_SORT'];

    function movieSort (
        MOVIE_SORT
    ) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'components/movie-sort/movie-sort.html',
            scope: {
                activeSort: '=',
                reload: '&'
            },
            link: _linkFunc
        };


        function _linkFunc (scope, el, attr) {

            scope.sortValues = MOVIE_SORT;

            scope.sortString = 'Popularity';

            scope.updateSort = function (sortVal, sortString) {
                scope.sortString = sortString;
                scope.activeSort.val = sortVal;
                scope.reload();
            }
        }
    }
})();