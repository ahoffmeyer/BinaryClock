/*
    @todo: refactor, check functions, test, comment & document
 */
var clock = {
    init: function() {
        var time        = new Date();
        this.hours      = time.getHours();
        this.minutes    = time.getMinutes();
        this.seconds    = time.getSeconds();

        this.getInterval();
    },
    /**
     *
     * @returns {*}
     */
    getInterval: function() {
        var intervalObj = {};
        intervalObj.hours     = this.intToBin( this.hours );
        intervalObj.minutes   = this.intToBin( this.minutes );
        intervalObj.seconds   = this.intToBin( this.seconds );

        $('#hours').find('.time').html( this.prependZero( this.hours.toString() ) );
        $('#minutes').find('.time').html( this.prependZero( this.minutes.toString() ) );
        $('#seconds').find('.time').html( this.prependZero( this.seconds.toString() ) );
        return this.parseDom( intervalObj );
    },
    /**
     *
     * @param obj
     */
    parseDom: function( obj ) {
        for (var key in obj) {
            for ( var i = 0; i < obj[ key ].length; i++ ) {
                for ( var j = 0, val = obj[ key ][ i ]; j < val.length; j++) {
                    if ( val[ j ] === 1 ) {
                        $('#'+ key).find('.col-'+ i.toString() +' > .clock-'+ j.toString()).css('background', '#fff');
                    } else {
                        $('#'+ key).find('.col-'+ i.toString() +' > .clock-'+ j.toString()).css('background', '#000');
                    }
                }
            }
        }
    },
    /**
     *
     * @param time
     * @returns {Array}
     */
    intToBin: function( time ) {
        var numString = this.prependZero( time.toString() ),
            binArray = [],
            result = [];

        for (var i = 0; i < numString.length; i++) {
            var numInt = parseInt( numString[i] );
            binArray[ i ] = [];
            while ( numInt >= 1) {
                binArray[i].unshift(numInt % 2);
                numInt = Math.floor(numInt / 2);
            }
        }

        result.push( this.extendBinArray( binArray[0], 3) );
        result.push( this.extendBinArray( binArray[1], 4) );

        return result;
    },
    /**
     *
     * @param string
     * @returns {*}
     */
    prependZero: function( string ) {
        return ( string.length > 1 ? string : '0' + string );
    },
    /**
     *
     * @param array
     * @param maxLength
     * @returns {*}
     */
    extendBinArray: function( array, maxLength ) {
        for ( var i = 0; i < maxLength; i++ ) {
            if (array[i] == undefined)
                array.unshift(0);
        }
        return array;
    }
};

setInterval( function() {
    clock.init();
}, 1000);