(function () {
    'use strict';

    angular.module('movieApp').directive('loadOnScroll', loadOnScroll);

    loadOnScroll.$inject = ['$window', '$document'];

    function loadOnScroll (
        $window,
        $document
    ) {
        return {
            restrict: 'A',
            link: _linkFunc

        };

        function _linkFunc (scope, elem, attr) {
            elem.on('scroll', function () {
                var content = $document[0].getElementById('content-row');
                console.log($window[0].pageY);
                scope.$apply();
            });
        }
    }
})();