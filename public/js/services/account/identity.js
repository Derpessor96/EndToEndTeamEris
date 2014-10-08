app.factory('identity', function($window) {
	var user;
	if ($window.bootstrappedUserObject) {
		user = $window.bootstrappedUserObject;
	}
    return {
        currentUser: user,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function(role) {
            return !!this.currentUser && this.currentUser.role === role;
        }
    }
});