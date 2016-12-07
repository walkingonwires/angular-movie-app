(function () {
    'use strict';

    angular.module('movieApp').directive('loadOnScroll', loadOnScroll);

    loadOnScroll.$inject = [ '$document', '$state'];

    function loadOnScroll (
        $document,
        $state
    ) {
        return {
            restrict: 'A',
            link: _linkFunc

        };

        function _linkFunc (scope, elem, attr) {
            elem.on('scroll', function () {
                if ($state = 'home') {
                    var windowHeight = elem[0].clientHeight;
                    var last = $document[0].getElementsByClassName('last-movie');
                    var viewportOffset = last[0].getBoundingClientRect();
                    var top = viewportOffset.top;
                    if (top - (viewportOffset.height * 3) < windowHeight ) {
                        scope.$broadcast('loadMore');
                        scope.$apply();
                    }
                }
            });
        }
    }
})();