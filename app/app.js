(function () {
    'use strict';

    var app = angular.module('movieApp', ['ui.router']);

    app.constant('TMDB_KEY', 'f233d57cfd0f9fc52c325d371b1e49f9');
    app.constant('TMDB_IMG_URL', 'https://image.tmdb.org/t/p/');

    app.constant('MOVIE_SORT', {
        POPULARITY: 'popularity.desc',
        RELEASE: 'release_date.desc',
        REVIEWS: 'vote_average.desc'
    });

    app.constant('TMDB_POSTER_SIZES', {
        SMALL: "w185",
        MEDIUM: "w342",
        LARGE: "w500",
        X_LARGE: "w780"
    });

    //Routing
    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "./home/home.html",
                controller: 'HomeController as home'
            })
            .state('details', {
                url: '/details/{movieId}',
                templateUrl: './details/details.html',
                controller: 'DetailsController as details'
            });
    });
})()






