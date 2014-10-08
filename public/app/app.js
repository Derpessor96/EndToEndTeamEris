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
            templateUrl: 'app/partials/main/home.html',
            controller: 'MainCtrl'
        } )
        .when( '/latest-ads', {
            templateUrl: 'app/partials/main/home.html',
            controller: 'MainCtrl'
        } )
        .when( '/signup', {
            templateUrl: './app/account/signup.html',
            controller: 'SignUpCtrl'
        } )
} )
    .constant( 'baseServiceUrl', 'http://localhost:7777/' );

app.run( function ( $rootScope, $location ) {
    $rootScope.$on( '$routeChangeError', function ( ev, current, previous, rejection ) {
        if ( rejection === 'not authorized' ) {
            $location.path( '/' );
        }
    } )
} );