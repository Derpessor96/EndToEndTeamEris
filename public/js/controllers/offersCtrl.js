app.controller('offersCtrl', ['$scope', 'offersData', 'identity', '$location',
    function ($scope, offersData, identity, $location) {
    $scope.createOffer = function(offer) {
        offer.seller =identity.currentUser._id;
        offersData.createOffer(offer).then(function () {
            console.log("Offer created!")
        });
        $location.path('/offers');
    }
}]);