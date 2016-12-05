(function () {
    'use strict';

    var app = angular.module('movieApp', ['ui.router', 'firebase']);

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

    //Firebase Config and Init
    var config = {
        apiKey: "AIzaSyBzlJl_NYOpxPMa6n-BUZX7sbaDBs2HfKI",
        authDomain: "angular-movie-app-9e446.firebaseapp.com",
        databaseURL: "https://angular-movie-app-9e446.firebaseio.com",
        storageBucket: "angular-movie-app-9e446.appspot.com",
        messagingSenderId: "139106108017"
    };
    firebase.initializeApp(config);

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

})();
