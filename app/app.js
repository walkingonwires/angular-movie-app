(function () {
    'use strict';

    var app = angular.module('movies', ['ui-router']);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "home/home.html"
            })
    });
})();
