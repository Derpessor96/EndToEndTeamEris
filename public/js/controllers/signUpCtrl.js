app.controller( 'SignUpCtrl', function ( $scope, $location, auth ) {
	$scope.signup = function ( user ) {
		auth.signup( user ).then( function () {
            console.log('registered');
			//notifier.success( 'Registration successful!' );
			$location.path( '/' );
		}, function ( error ) {
            console.log(error);
			//notifier.error( error.Message );
		} )
	}
} );