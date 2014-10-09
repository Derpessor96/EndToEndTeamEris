app.factory('offersData', function ($http, $q, identity) {
	function getQueryString(page, orderBy, orderType) {
		var result = '';

		if (page) {
			if (result.indexOf('?') === -1) {
				result += '?';
			}

			result += '&page=' + page;
		}

		if (orderBy) {
			if (result.indexOf('?') === -1) {
				result += '?';
			}

			result += '&orderBy=' + orderBy;
		}

		if (orderType) {
			if (result.indexOf('?') === -1) {
				result += '?';
			}

			result += '&orderType=' + orderType;
		}
	}

	return {
		getAllOffers: function (page, orderBy, orderType) {
			var deferred = $q.defer();
			var url = '/api/offers' + getQueryString(page, orderBy, orderType);

			$http.get(url)
                .success(function (data) {
                	deferred.resolve(data);
                }, function (response) {
                	deferred.reject(response);
                });

			return deferred.promise;
		}
	}
});