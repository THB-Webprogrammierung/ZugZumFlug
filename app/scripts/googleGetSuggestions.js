"use strict";

var googleGetSuggestions = {
    places: function() {
        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(51.1642292, 10.4541194));

        var input = document.getElementById('startStreet');
        var options = {
            bounds: defaultBounds,
            types: ['address']
        };

        var autocomplete = new google.maps.places.Autocomplete(input, options);
    }
};
