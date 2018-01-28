var htmlConnectionHeader = '<div class="col-12 showConnection" id="showConnection">' +
    '<h2>ZUG ZU DEINEM FLUG</h2>' +
    '<div class="connectionDetailHeader">' +
    'Abfahrt: %start_zeit% Uhr %bahnhof_start% - Ankunft: %ankunft_zeit% Uhr %bahnhof_ziel% - Gesamtdauer: %dauer%' +
    '</div><div class="connectionDetailsContent">' +
    '<table class="table table-responsive"><thead><tr><th>Abfahrt</th><th>Bahnhof</th><th>Ankunft</th><th>Zielbahnhof</th><th>Informationen</th></tr></thead><tbody>';
var htmlConnectionDetail = '<tr>' +
    '<td>%startzeit%</td>' +
    '<td>%startbahnhof%</td>' +
    '<td>%ankunftzeit%</td>' +
    '<td>%zielbahnhof%</td>' +
    '<td>%zuginformation%</td>' +
    '</tr>';
var htmlCloseTable = '</tbody></table>';
var htmlConnectionFooter = '<div class="connectionFooter"><div class="float-left"><button type="button" class="btn btn-secondary btn-sm" onclick="printConnection()">Drucken<span class="glyphicon glyphicon-print"></span></button></div></div></div></div>';