app.factory('offersData', function ($http, $q, identity, queryStringGenerator) {
    return {
        getAllOffers: function (pageP, orderByP, orderTypeP) {
            var deferred = $q.defer();
            var url = '';

            if (pageP && orderByP && orderTypeP) {
                url = '/api/offers' + queryStringGenerator.getQueryString(page, orderBy, orderType);
            } else {
                url = '/api/offers'
            }

            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getUserOffers: function (userId, page, orderBy, orderType) {
            var deferred = $q.defer();
            var url = '/api/user/' + userId + '/offers' + queryStringGenerator.getQueryString(page, orderBy, orderType);

            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getOfferById: function (offerId) {
            var deferred = $q.defer();

            $http.get('/api/offers' + offerId)
                .success(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        acceptOffer: function (offerId) {
            var deferred = $q.defer();

            $http.post('/api/offers/' + offerId)
                .success(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getOffersInCategory: function (categoryId, page, orderBy, orderType) {
            var deferred = $q.defer();
            var url = '/api/category/' + categoryId + '/offers' + queryStringGenerator.getQueryString(page, orderBy, orderType);

            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        createOffer: function (newOffer) {
            var deferred = $q.defer();

            $http.post('/api/offers/', newOffer)
                .success(function (data) {
                    deferred.resolve(data);
                }, function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
});