var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {

	var routeUserChecks = {
		adminRole: {
			authenticate: function (auth) {
				return auth.isAuthorizedForRole('admin');
			}
		},
		authenticated: {
			authenticate: function (auth) {
				return auth.isAuthenticated();
			}
		}
	};

	$routeProvider
        .when('/', {
        	templateUrl: 'partials/main/home',
        	controller: 'HomeController'
        })
        .when('/users', {
        	templateUrl: 'partials/users/users',
        	controller: 'UsersController'
        })
        .when('/users/:id', {
        	templateUrl: 'partials/users/userDetails',
        	controller: 'UserDetailsController',
        	resolve: routeUserChecks.authenticated
        })
        .when('/users/:id/offers', {
        	templateUrl: 'partials/users/userOffers',
        	controller: 'UserOffersController',
        	resolve: routeUserChecks.authenticated
        })
        .when('/users/:id/sales', {
        	templateUrl: 'partials/users/userSales',
        	controller: 'SalesController'
        })
        .when('/offers', {
        	templateUrl: 'partials/offers/offers',
        	controller: 'MainCtrl'
        })
        .when('/offers/:id', {
        	templateUrl: 'partials/offers/offerDetails',
        	controller: 'MainCtrl'
        })
        .when('/offers/create', {
        	templateUrl: 'partials/offers/createOffer',
        	controller: 'MainCtrl'
        })
        .when('/signup', {
        	templateUrl: 'partials/main/signup',
        	controller: 'SignUpCtrl'
        })
        .when('/categories/:id/offers', {
        	templateUrl: 'partials/offers/categories',
        	controller: 'CategoriesController'
        })
        .otherwise({
        	redirectTo: '/'
        });
})
    .constant('baseServiceUrl', 'http://localhost:7777/');

app.run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
		if (rejection === 'not authorized') {
			$location.path('/');
		}
	})
});