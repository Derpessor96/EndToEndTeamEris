'use strict';

app.controller('categoriesController', ['$scope', 'CategoriesResource',
    function categoriesController($scope, CategoriesResource) {
        $scope.categories = CategoriesResource.all();
    }
]);