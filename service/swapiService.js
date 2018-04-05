'use strict';
//creates a HTTP rest service 
angular.module('AngularApp').factory(
        'swapiService',  [
        '$http',
            '$q',
            function($http, $q) {

              var REST_SERVICE_URI = 'https://swapi.co/api';//swapi base url

              var factory = {
                allStarships: allStarships,
                 starshipsCount: starshipsCount,
              };

              return factory;
            function allStarships(i) {
              
                var deferred = $q.defer();
                //The deferred.promise() method allows an asynchronous function to prevent other code from interfering with the progress or status of its internal request.
                // The Promise exposes only the Deferred methods needed to attach additional handlers or determine the state
                $http.get(REST_SERVICE_URI +"/starships/?page="+i).then(
                        function(response) {
                          deferred.resolve(response.data.results);
                        }, function(errResponse) {
                          console.error('Error while fetching ship Details');
                          deferred.reject(errResponse);
                        });
                return deferred.promise;
          }
            function starshipsCount() {
              
                var deferred = $q.defer();
                //The deferred.promise() method allows an asynchronous function to prevent other code from interfering with the progress or status of its internal request.
                // The Promise exposes only the Deferred methods needed to attach additional handlers or determine the state
                $http.get(REST_SERVICE_URI +"/starships").then(
                        function(response) {
                          deferred.resolve(response.data.count);
                        }, function(errResponse) {
                          console.error('Error while fetching ship Details');
                          deferred.reject(errResponse);
                        });
                return deferred.promise;
          }

            }]);
