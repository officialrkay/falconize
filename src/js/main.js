import './includes/modal';
( ( $ ) => {
  // Modal toggle button
  $( document ).on( 'click', '*[data-toggle="modal"]', function( event ) {
    const target = $( $( this ).data( 'target' ) );
    target.modal( 'toggle', this );
  } )
  $( document ).on( 'click', '*[data-dismiss="modal"]', function( event ) {
    const target = $( $( this ).data( 'target' ) );
    if( $( this ).data( 'target' ) ) {
      $( target ).modal( 'close', this );
    } else {
      $( this ).closest( '.modal' ).modal( 'close', this );
    }
  } )
} )( jQuery )
