"use strict";

var googleGetConnectionData = {
    getData: function(data) {

    var timeDate = data.startDate.split(".");
    var timeHoursAndMinutes = data.startTime.split(":");

    var calculateTime = 0;
    var timeDiff = 0;

    if (document.getElementById('luggage').checked) {
        timeDiff = timeDiff-30;
    }
    if (document.getElementById('fastTrack').checked) {
        timeDiff = timeDiff+30;
    }
    if (document.getElementById('holidays').checked) {
        timeDiff = timeDiff-60;
    }

    if(timeDiff < 0) {
        calculateTime = ((timeHoursAndMinutes[0]*60) + parseInt(timeHoursAndMinutes[1]) - data.timeDistance + timeDiff);
    } else {
        calculateTime = ((timeHoursAndMinutes[0]*60) + parseInt(timeHoursAndMinutes[1]) - data.timeDistance);
    }

    var hours = parseInt(calculateTime/60);
    var minutes = calculateTime % 60;

    var months = parseInt(timeDate[1]-1);

    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: data.startStreet,
        destination: data.airport,
        transitOptions: {
            arrivalTime: new Date(parseInt(timeDate[2]), months, parseInt(timeDate[0]), hours, minutes),
            modes: ['TRAIN']
        },
        travelMode: google.maps.DirectionsTravelMode.TRANSIT,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    directionsService.route(
        directionsRequest,
        function(response, status)
        {
            if (status === google.maps.DirectionsStatus.OK)
            {

                var allConnections = [];
                for(var i = 0; i < response.routes[0].legs[0].steps.length; i++) {
                    var connectionDetails = {};
                    if(response.routes[0].legs[0].steps[i].travel_mode === "TRANSIT") {
                        connectionDetails.departureTimeText = response.routes[0].legs[0].steps[i].transit.departure_time.text;
                        connectionDetails.departureStopName = response.routes[0].legs[0].steps[i].transit.departure_stop.name;
                        connectionDetails.arrivalTimeText = response.routes[0].legs[0].steps[i].transit.arrival_time.text;
                        connectionDetails.arrivalStopName = response.routes[0].legs[0].steps[i].transit.arrival_stop.name;
                        connectionDetails.trainInfo = response.routes[0].legs[0].steps[i].transit.line.short_name;
                        allConnections.push(connectionDetails);
                    }
                }
                var z = allConnections.length;
                allConnections.duration =  response.routes[0].legs[0].duration.text;
                allConnections.timeStart = allConnections[0].departureTimeText;
                allConnections.startPoint = allConnections[0].departureStopName;
                allConnections.endPoint = allConnections[--z].arrivalStopName;
                allConnections.timeEnd = allConnections[z].arrivalTimeText;

                var insertHtml = '';

                var find = ['%start_zeit%', '%bahnhof_start%', '%ankunft_zeit%', '%bahnhof_ziel%', '%dauer%'];
                var repl = [allConnections.timeStart, allConnections.startPoint, allConnections.timeEnd, allConnections.endPoint, allConnections.duration];
                insertHtml = htmlConnectionHeader.replaceArray(find, repl);

                for(var j = 0; j < allConnections.length; j++) {
                    find = []; repl = [];
                    find = ['%startzeit%', '%startbahnhof%', '%ankunftzeit%', '%zielbahnhof%', '%zuginformation%'];
                    repl = [allConnections[j].departureTimeText, allConnections[j].departureStopName, allConnections[j].arrivalTimeText, allConnections[j].arrivalStopName, allConnections[j].trainInfo];
                    insertHtml += htmlConnectionDetail.replaceArray(find, repl);
                }
                insertHtml += htmlCloseTable;
                insertHtml += htmlConnectionFooter;

                $('#placeConnectionContent').empty();
                $('#placeConnectionContent').append(insertHtml);

            }
            else {
                alert("Es konnte keine passende Zugverbindung gefunden werden!");
                /*$('#placeConnectionContent').empty();
                $('#placeConnectionContent').append("<b>Es konnte keine passende Zugverbindung gefunden werden!</b>");*/
            }
        }
    );

    }
};