app.factory('categoriesData', function ($http, $q, identity) {
	return {
		getAllCategories: function () {
			var deferred = $q.defer();

			$http.get('/api/category')
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		},
		getCategoryDetails: function (categoryId) {
			var deferred = $q.defer();

			$http.get('/api/category' + categoryId)
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		},
		createCategory: function (newCategory) {
			var deferred = $q.defer();

			$http.post('/api/category', newCategory)
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		}
	}
})