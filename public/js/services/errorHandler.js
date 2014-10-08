app.factory('errorHandler',  ['$q',
    function ($q) {
        //return {
        //    request: function (config) {
        //        return config || $q.when(config);
        //    },
        //    requestError: function(request){
        //        return $q.reject(request);
        //    },
        //    response: function (response) {
        //        return response || $q.when(response);
        //    },
        //    responseError: function (response) {
        //        for (var i in response.data.modelState)
        //        {
        //            console.log(i);
        //        }
        //        if(response.data.error) {
        //            toastr.error("Error: " +response.data.error
        //                + "  ;  Error description :"+response.data.error);
        //        }
        //        else {
        //            for (var err in response.data.modelState) {
        //                toastr.error("ERROR : "+ response.data.modelState[err]);
        //            }
        //        }
//
//
        //        return $q.reject(response);
        //    }
        //};
    }]);

//app.config(['$httpProvider', function ($httpProvider) {
//    $httpProvider.interceptors.push('errorHandler');
//}]);