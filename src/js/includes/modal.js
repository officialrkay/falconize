class Modal {
    constructor( self, $ ) {
        this.self = self;
        this.$ = $;
    }
    updateConfig( config ) {

    }
    open( modal, trigger ) {
        const modal_z_index = this.calculateModalzIndex( $( modal ).data( 'index' ) );
        $( modal ).addClass( 'show' )
                  .trigger( 'fz.modal.open', [ modal, trigger ] )
                  .css( { zIndex: modal_z_index + 1 } );
        this.createBackDrop( modal, trigger );
    }
    close( modal, trigger ) {
        $( modal ).removeClass( 'show' ).trigger( 'fz.modal.close', [ modal ] );
        this.removeBackDrop( modal, trigger );
    }
    toggle( modal, trigger ) {
        if( $( modal ).hasClass( 'show' ) ) {
            this.close( modal, trigger );
        } else {
            this.open( modal, trigger );
        }
    }
    createBackDrop( modal, trigger ) {
        const div = $( document.createElement( 'div' ) );
        div.addClass( 'modal-backdrop' );
        const modal_id = $( trigger ).data( 'target' ).replace( '#', '' );
        const modal_z_index = this.calculateModalBackDropzIndex( $( modal ).data( 'index' ) );
        div.attr( 'id', modal_id + '-backdrop' );
        div.attr( 'data-target', '#' + modal_id );
        div.attr( 'data-dismiss', 'modal' );
        div.css( {
            zIndex: modal_z_index
        } );
        $( document.body ).append( div );
        div.addClass( 'visible' );
    }
    removeBackDrop( modal, trigger ) {
        var modal_id = "#" + $( modal ).attr( 'id' );
        if( $( trigger ).data( 'target' ) ) {
            modal_id = $( trigger ).data( 'target' );
        }
        $( modal_id + '-backdrop' ).remove();
    }
    calculateModalzIndex( z_index ) {
        if( typeof z_index == 'undefined' ) {
            z_index = 1;
            $( '.modal.show' ).map( function() {
                let zIndex = parseInt( $( this ).css('z-index') );

                if( zIndex >= z_index ) {
                    z_index = zIndex;
                }
            } );
        }

        return z_index;
    }
    calculateModalBackDropzIndex( z_index ) {
        if( typeof z_index == 'undefined' ) {
            z_index = 1;
            $( '.modal-backdrop' ).map( function() {
                let zIndex = parseInt( $( this ).css('z-index') );

                if( zIndex >= z_index ) {
                    z_index = zIndex + 1;
                }
            } );
        }

        return z_index;
    }
}

( ( $ ) => {
    $.fn.modal = function( argument, trigger ) {
        const modal = new Modal( this, $ );
        if( typeof modal[argument] == 'function' ) {
            modal[argument]( this, trigger );
        } else {
            modal.updateConfig( argument );
        }
        return this;
    }
} )( jQuery )
