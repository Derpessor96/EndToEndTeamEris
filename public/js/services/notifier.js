app.factory( 'notifier', function ( toastr ) {
	return {
		success: function ( msg ) {
            console.log(msg)
			//toastr.success( msg );
		},
		error: function ( msg ) {
            console.log(msg)

            //toastr.error( msg );
		}
	};
} )