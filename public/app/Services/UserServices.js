'use strict';

app.factory('userServices', ['$http', '$q', 'identity', 'authorization', 'baseServiceUrl',
        function ($http, $q, identity, authorization, baseServiceUrl) {
            var usersApi = baseServiceUrl + '/user';

            return {
                signup: function (user) {
                    var deferred = $q.defer();

                    $http.post(usersApi + '/user', user)
                        .success(function () {
                            deferred.resolve();
                        }, function (response) {
                            deferred.reject(response);
                        });

                    return deferred.promise;
                }
            }
        }]
);