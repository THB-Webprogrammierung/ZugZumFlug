"use strict";

;(function($) {

    var handlerMethods = {
        form: function () {
            var inputField = {};
            inputField.startStreet = $('#startStreet').val();
            inputField.airport = $('#airport').val();
            inputField.startDate = $('#startDate').val();
            inputField.startTime = $('#startTime').val();
            inputField.timeDistance = $('#timeDistance').val();
            inputField.luggage = $('#luggage').val();
            inputField.fastTrack = $('#fastTrack').val();
            inputField.holidays = $('#holidays').val();

            var d = new Date();
            var todaysDate = new Date();
            var timeErr = false;

            //Umformatierung der Datumsangabe aus dem Formular "31.01.2018" > "2018-01-31"
            var fSD = inputField.startDate.split(".");
            var formStartDate = fSD[2] + "-" + fSD[1] + "-" + fSD[0];

            if(inputField.startStreet === "") {
                if($('#startStreet + div').val() === "" && $('#startStreet + div').text() === "") {
                    $('#startStreet + div').append("Bitte geben Sie einen Flughafen an!");
                    document.querySelector("#startStreet").style.border="0.15em solid red";
                }
            } else {
                if ($('#startStreet + div').text() !== "") {
                    $('#startStreet + div').empty();
                    $('#startStreet').css("border", "none");
                    //$('#startStreet').css("border-color", "green");
                }
            }
            if(inputField.airport === "") {
                if($('#airport + div').val() === "" && $('#airport + div').text() === "") {
                    $('#airport + div').append("Bitte geben Sie einen Flughafen an!");
                    document.querySelector("#airport").style.border="0.15em solid red";
                }
            } else {
                if ($('#airport + div').text() !== "") {
                    $('#airport + div').empty();
                    $('#airport').css("border", "none");
                    //$('#airport').css("border-color", "green");
                }
            }
            if(inputField.startDate === "") {
                if($('#startDate').val() === "" && $('#startDate').text() === "") {
                    document.querySelector("#dateError").innerHTML = "Bitte geben Sie ein Datum ein!";
                    document.querySelector("#startDate").style.border="0.15em solid red";
                }
            } else {
                todaysDate =  d.getFullYear() + "-" + d.getMonth()+1 + "-" + d.getDate();
                if(todaysDate > formStartDate) {
                    $('#startDate + div').empty();
                    $('#startDate + div').append("Das Datum darf nicht in der Vergangenheit liegen!");
                    document.querySelector("#startDate").style.border="0.15em solid red";
                    timeErr = true;
                }
                if ($('#startDate + div').text() !== "" && todaysDate <= formStartDate) {
                    $('#startDate + div').empty();
                    $('#startDate').css("border", "none");
                    //$('#startDate').css("border-color", "green");
                }
            }
            if(inputField.startTime === "") {
                if($('#startTime + div').val() === "" && $('#startTime + div').text() === "") {
                    $('#startTime + div').append("Bitte geben Sie eine Uhrzeit an!");
                    document.querySelector("#startTime").style.border="0.15em solid red";
                }
            } else {
                if  (todaysDate === formStartDate) {
                    var arrFromStartTime = inputField.startTime.split(":");
                    if(arrFromStartTime[0] <= d.getHours()) {
                        $('#startTime + div').empty();
                        $('#startTime + div').append("Die Uhrzeit muss in der Zukunft liegen!");
                        document.querySelector("#startTime").style.border="0.15em solid red";
                        timeErr = true;
                    } else if ($('#startTime + div').text() !== "") {
                        $('#startTime + div').empty();
                        document.querySelector("#startTime").style.border="none";
                        //$('#startTime').css("border-color", "green");
                    }
                } else {
                    if ($('#startTime + div').text() !== "") {
                        $('#startTime + div').empty();
                        document.querySelector("#startTime").style.border="none";
                        //$('#startTime').css("border-color", "green");
                    }
                }
            }


            if(inputField.startStreet !== "" && inputField.airport !== "" && inputField.startDate !== "" && inputField.startTime !== "" && timeErr === false) {
                googleGetConnectionData.getData(inputField);
            }

        }
    };

    $.fn.validate = function() {
        $('#form-submit').click(function() {
            handlerMethods.form();
        });
    };

})(jQuery);