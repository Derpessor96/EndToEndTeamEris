app.factory('auth', function($http, $q, identity) {
    return {
        signup: function(user) {
            var deferred = $q.defer();

            $http.post('/api/user', user)
                .success(function() {
                    deferred.resolve();
                }, function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        update: function (user) {
        	var deferred = $q.defer();

        	user._id = identity.currentUser._id;
        	$http.put('/api/user/', user)
				.then(function () {
					identity.currentUser.firstName = user.firstName;
					identity.currentUser.lastName = user.lastName;
					deferred.resolve();
				}, function (response) {
					deferred.reject(response);
				});

        	return deferred.promise;
        },
        login: function(user){
            var deferred = $q.defer();

            $http.post('/login', user)
                .success(function(response) {
                    if (response.success) {
                        identity.currentUser = response.user;
                        deferred.resolve(true);
                    }
                    else {
                        deferred.resolve(false);
                    }
                });

            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();

            $http.post('/logout').success(function() {
                identity.currentUser = undefined;
                deferred.resolve();
            })

            return deferred.promise;
        },
        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAuthorizedForRole: function(role) {
            if (identity.isAuthorizedForRole(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
})