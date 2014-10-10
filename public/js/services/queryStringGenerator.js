app.factory('queryStringGenerator', function ($http, $q, identity) {
	return {
		getQueryString: function (page, orderBy, orderType) {
			var result = '/';

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

            return result;
		}
	}
});