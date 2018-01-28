"use strict";

$( document ).ready(function() {
    googleGetSuggestions.places();
    $("#airport").suggestionTool({
        apiUri: "http://kommunikations-tuning.de/geodb/webapi/airports/",
        elementId: "#airport"
    });
    $('#form-submit').validate();
});

//Aufruf des Datepicker-PlugIns
$( document ).ready(function() {
    $('#startDate').datepicker();
});

//Aufruf des Timepicker-PlugIns
$( document ).ready(function() {
    $('#startTime').timepicker({
        minuteStep: 5,
        showMeridian: false
    });
});

//Druckfunktion
function printConnection() {
    window.print();
}

//Ausgabe des aktuellen Datums für die Default Anzeige in #startDate
var today = new Date();
var month = today.getMonth() + 1;
if (month < 10) {
    month = "0" + month;
}
var day = today.getDate();
var year = today.getFullYear();
var toDate = (day + "." + month + "." + year);
$('input[name="startDate"]').val(toDate);

//Aufruf des tooltip-PlugIns
$( document ).ready(function() {
    $('.tooltip-div').tooltip();
});

//Aufruf der Fading-Funktion für den Submit-Button
$('#form-submit').hover(
    function() {
        $('#labelSub').fadeOut('fast', function() {
            $('#logoSub').fadeIn('fast');
        });
    },function() {
        $('#logoSub').fadeOut('fast', function() {
            $('#labelSub').fadeIn('fast');
        });
    }
);