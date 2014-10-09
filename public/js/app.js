var app = angular.module( 'app', [ 'ngResource', 'ngRoute' ] );

app.config( function ( $routeProvider, $locationProvider ) {

    var routeUserChecks = {
        adminRole: {
            authenticate: function ( auth ) {
                return auth.isAuthorizedForRole( 'admin' );
            }
        },
        authenticated: {
            authenticate: function ( auth ) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when( '/', {
            templateUrl: 'views/main/home.html',
            controller: 'MainCtrl'
        } )
        .when( '/offers', {
            templateUrl: 'views/main/offers.html',
            controller: 'MainCtrl'
        } )
        .when( '/users', {
            templateUrl: 'views/main/users.html',
            controller: 'MainCtrl'
        } )
        .when( '/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        } )
        .otherwise( {
            redirectTo: '/'
        } );
} )
    .constant( 'baseServiceUrl', 'http://localhost:7777/' );

app.run( function ( $rootScope, $location ) {
    $rootScope.$on( '$routeChangeError', function ( ev, current, previous, rejection ) {
        if ( rejection === 'not authorized' ) {
            $location.path( '/' );
        }
    } )
} );