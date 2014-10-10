app.controller('UserOffersController', function ($scope, $routeParams, identity, auth, usersData, offersData, categoriesData) {
	$scope.identity = identity;
	$scope.user = {};
	$scope.userOffers = [];
	$scope.categories = [];
	$scope.page = 0;

	categoriesData.getAllCategories()
		.then(function success(data) {
			for (var i = 0; i < data.length; ++i) {
				$scope.categories[data[i]._id] = data[i].name;
			}
		})
		.then(function () {
			usersData.getUserDetails($routeParams.id)
				.then(function success(data) {
					for (var i = 0; i < data.length; ++i) {
						$scope.userOffers[i].id = data[i]._id;
						$scope.userOffers[i].title = data[i].title;
						$scope.userOffers[i].description = data[i].description;
						$scope.userOffers[i].creationDate = data[i].creationDate;
						$scope.userOffers[i].price = data[i].price;
						$scope.userOffers[i].category = data[i].category;
					}
				});

			$scope.refreshOffers = function () {
				offersData.getUserOffers($routeParams.id, $scope.page, $scope.orderBy, $scope.orderType)
					.then(function success(data) {
						$scope.userOffers = data;
						console.log(data);
					});
			}

			$scope.previousPage = function () {
				if ($scope.page === 0) {
					return;
				}

				--$scope.page;

				$scope.refreshOffers();
			}

			$scope.nextPage = function () {
				++$scope.page;

				$scope.refreshOffers();
			}

			$scope.refreshOffers();
		});
})