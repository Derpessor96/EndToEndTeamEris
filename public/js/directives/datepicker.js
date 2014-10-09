'use strict';

app.directive( 'datePicker', function () {
    return {
        restrict: 'A',
        link: function ( scope, element ) {
            element.datepicker( {
                dateFormat: 'yy-mm-dd',
                minDate: new Date()
            } );
        }
    }
} );