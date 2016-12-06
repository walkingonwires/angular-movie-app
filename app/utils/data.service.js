(function () {
    'use strict';

    angular.module('movieApp').factory('dataService', dataService);

    dataService.$inject = ['$http', '$q', 'TMDB_KEY', 'MOVIE_SORT'];

    function dataService (
        $http,
        $q,
        TMDB_KEY,
        MOVIE_SORT
    ) {
        var proxyPrefix = '/proxy?url=',
            keyParam = 'api_key=' + TMDB_KEY;

        return {
            getMovies: function (sort, page) {
                var deferred = $q.defer();
                    $http.get(_prepMdbUrl('/discover/movie', sort, page), {
                    }).then(function (res) {
                        deferred.resolve(res.data);
                    }).catch(function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        };

        function _prepMdbUrl (path, order, pageNum) {
            var mdbRoot = 'https://api.themoviedb.org/3',
                sort = '&sort_by=' + (order || MOVIE_SORT.POPULARITY),
                page = '&page=' + (pageNum || '1'),
                adultAndVidDefaults = '&include_adult=false&&include_video=true';

            return proxyPrefix + mdbRoot + path + '?' + keyParam + sort + page + adultAndVidDefaults;
        }
    }
})();