(function () {
    'use strict';

    angular.module('movieApp').controller('HomeController', homeController);

    homeController.$inject = ['$scope', 'dataService', 'MOVIE_SORT', 'TMDB_IMG_URL', 'TMDB_POSTER_SIZES'];

    function homeController (
        $scope,
        dataService,
        MOVIE_SORT,
        TMDB_IMG_URL,
        TMDB_POSTER_SIZES
    ) {
        $scope.sortOptions = MOVIE_SORT;
        $scope.sort = MOVIE_SORT.POPULARITY;
        $scope.loading = true;

        $scope.loadMovies = function () {
            dataService.getMovies($scope.sort).then(function (data) {
                $scope.movies = data.results;
                $scope.loading = false;
                console.log(data);
            }).catch(function (err) {
                console.error(err);
                $scope.loading = false;
            });
        };

        $scope.buildImageSrc = function (posterPath) {
            return TMDB_IMG_URL + TMDB_POSTER_SIZES.MEDIUM + posterPath;
        };

        $scope.loadMovies();
    }
})();