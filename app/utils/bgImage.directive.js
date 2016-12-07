(function () {
    'use strict';

    angular.module('movieApp').directive('backImg', backImg);

    backImg.$inject = [];

    function backImg (){
        return function(scope, element, attrs){
            attrs.$observe('backImg', function(value) {
                element.css({
                    'background-image': 'url(' + value +')',
                    'background-size' : 'cover'
                }).addClass('loaded');
            });
        };
    }
})();