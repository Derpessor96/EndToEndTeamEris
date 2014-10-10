'use strict';

app.controller('HomeController', ['$scope', 'offersData', 'categoriesData',
    function ($scope, offersData, categoriesData) {
    	$scope.categories = [];

    	categoriesData.getAllCategories()
			.then(function success(data) {
				for (var i = 0; i < data.length; ++i) {
					$scope.categories[data[i]._id] = data[i].name;
				}
			})
		.then(function () {
			offersData.getAllOffers(0, '', 'desc')
				.then(function success(data) {
					$scope.offers = data;
				});
		});
    }
]);