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
        $scope.selectedSort = {val: MOVIE_SORT.POPULARITY};
        $scope.loading = true;
        var displayedPages = 0,
            autoLoad = true;


        $scope.loadMovies = function () {
            $scope.loading = true;
            dataService.getMovies($scope.selectedSort.val).then(function (data) {
                $scope.movies = data.results;
                $scope.loading = false;
                displayedPages = 1;
                _loadMore(4);
            }).catch(function (err) {
                console.error(err);
                $scope.loading = false;
            });
        };

        $scope.loadMore = function () {
            _loadMore(1);

        };

        $scope.buildImageSrc = function (posterPath) {
            return TMDB_IMG_URL + TMDB_POSTER_SIZES.MEDIUM + posterPath;
        };

        $scope.$on('loadMore', function () {
            if (autoLoad) {
                _loadMore(1);
            }
        });

        $scope.loadMovies();

        function _loadMore (additionalPages) {
            autoLoad = false;
            dataService.getMovies(null, (displayedPages+1)).then(function (data) {
                $scope.movies.push.apply($scope.movies, data.results);
                displayedPages++;
                if (additionalPages > 0) {
                    _loadMore(additionalPages-1);
                } else {autoLoad = true;}
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
})();