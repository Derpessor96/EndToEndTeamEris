'use strict';

app.factory('CategoriesResource', ['$resource', 'baseServiceUrl', function($resource, baseServiceUrl) {
    var CategoriesResource = $resource(baseServiceUrl + 'api/category');

    return {
        all: function() {
            return CategoriesResource.query();
        }
    }
}]);