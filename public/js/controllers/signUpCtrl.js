app.controller( 'SignUpCtrl', function ( $scope, $location, auth ) {
	$scope.signup = function ( user ) {
        console.log('In signup controller client side');
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