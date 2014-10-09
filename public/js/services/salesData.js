app.factory('categoriesData', function ($http, $q, identity, queryStringGenerator) {
	return {
		getUserSales: function (userId, page, orderBy, orderType) {
			var deferred = $q.defer();
			var url = '/api/user/' + userId + '/sales' + queryStringGenerator.getQueryString(page, orderBy, orderType);

			$http.get(url)
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		}
	}
})