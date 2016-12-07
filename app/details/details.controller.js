(function () {
    'use strict';

    angular.module('movieApp').controller('DetailsController', detailsController);

    detailsController.$inject = ['$scope', '$location', '$sce', 'dataService', 'TMDB_IMG_URL', 'TMDB_POSTER_SIZES'];

    function detailsController (
        $scope,
        $location,
        $sce,
        dataService,
        TMDB_IMG_URL,
        TMDB_POSTER_SIZES
    ) {
        $scope.loading = true;
        $scope.id = $location.path().split('/')[2];

        dataService.getDetails($scope.id).then(function (data) {
            $scope.details = data;
            _getVideo();
        }).catch(function (err) {
            console.error(err);
        });

        $scope.buildImageSrc = function (posterPath) {
            return TMDB_IMG_URL + TMDB_POSTER_SIZES.LARGE + posterPath;
        };

        function _getVideoUrl (videos) {
            var videoPopulated = false;
            if (videos && videos.length > 0) {
                angular.forEach(videos, function (video) {
                    if (video.site === "YouTube" && !videoPopulated) {
                        var baseUrl = 'http://www.youtube.com/embed/';
                        videoPopulated = true;
                        $scope.details.videoUrl = $sce.trustAsResourceUrl(baseUrl + video.key);
                    }
                });
            } else {
                return null;
            }
        }

        function _getVideo () {
            dataService.getVideos($scope.details.id).then(function (data) {
                _getVideoUrl(data.results);
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
})();