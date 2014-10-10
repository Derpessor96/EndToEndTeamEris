app.controller('UserDetailsController', function ($scope, $routeParams, identity, auth, usersData) {
	$scope.identity = identity;
	$scope.user = {};

	if (identity.isAuthenticated()) {
		$scope.ableToUpdate = identity.isAuthorizedForRole('admin') || identity.currentUser._id === $routeParams.id;
	}

	usersData.getUserDetails($routeParams.id)
		.then(function success(data) {
			$scope.user = data;
		});

	$scope.updateInfo = function (user) {
		auth.update(user)
			.then(function success(data) {
				console.log(data);
			});
	}
})