app.factory('usersData', function ($http, $q, identity) {
	return {
		getAllUsers: function () {
			var deferred = $q.defer();

			$http.get('/api/user')
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		},
		getUserDetails: function (userId) {
			var deferred = $q.defer();

			$http.get('/api/user/' + userId)
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		}
	}
})