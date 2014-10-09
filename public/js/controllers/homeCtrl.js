'use strict';

app.controller('HomeController', ['$scope', 'offersData',
    function ($scope, offersData) {
    	console.log(offersData);
    	offersData.getAllOffers(0, '', 'desc')
			.then(function success(data) {
				$scope.offers = data;
				console.log('a');
			});
    }
]);