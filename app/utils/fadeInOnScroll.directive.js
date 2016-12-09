(function () {
    'use strict';

    angular.module('movieApp').directive('fadeInOnScroll', fadeInOnScroll);

    fadeInOnScroll.$inject =['$window'];

    function fadeInOnScroll (
        $window
    ) {
        return {
            restrict: 'A',
            link: _linkFunc
        };

        function _linkFunc(scope, elem, attr) {
            scope.$on('scrolling', function () {
                var windowHeight = $window.innerHeight,
                    elProps = elem[0].getBoundingClientRect();

                if (elProps.top > windowHeight) elem.removeClass('loaded');
                if (elProps.top < windowHeight) elem.addClass('loaded');
                scope.$apply();
            });
        }
    }
})();