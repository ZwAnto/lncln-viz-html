<?php
if ($_SERVER['HTTPS'] != 'on') {
    header("Location: https://zwanto.org/lincoln/");
    exit();
}
?>
<!DOCTYPE html>
<html>
    <head>
        <!-- Title and icon -->
        <title>Viz'ta poubelle</title>
        <link rel="icon" href="https://zwanto.org/lincoln/Img/favicon-96x96.png" />

        <!-- meta tags -->
        <meta charset="UTF-8">
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
        <meta name="theme-color" content="#e71e62">       

        <!-- Font from lincoln.fr -->
        <style type='text/css'>
            @font-face {
                font-family: "lincoln";
                src: url("../Font/Gotham-Book.woff2") format("woff2");
            }
        </style>

        <!-- Bootstrap CSS -->
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'>

        <!-- Leaflet CSS -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
        <link rel='stylesheet' href='https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css'>
        <link rel='stylesheet' href='https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css'>

        <!-- Custom CSS -->
        <link rel='stylesheet' href='https://zwanto.org/lincoln/Stylesheet/main.css'>

        <!-- jQuery first, then Tether, then Bootstrap JS. -->
        <script src='https://code.jquery.com/jquery-3.2.1.js' crossorigin='anonymous'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'></script>
        <script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'></script>

        <!-- Highcharts -->
        <script src="https://code.highcharts.com/highcharts.src.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>

        <!-- Leaflet -->
        <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>   
        <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>   

        <!-- Font Awesome -->
        <script defer src='https://zwanto.org/lincoln/Libs/fontawesome/fontawesome-all.js'></script>

        <!-- Elastic Search 
        <script defer src='https://zwanto.org/lincoln/Libs/elasticsearch-js/elasticsearch.js'></script>-->

        <!-- Custom JS -->
        <script src='Javascripts/import.js' ></script>
        <script src='Javascripts/main.js' ></script>

    </head>
    <body onload="dataImport();">
        <div id="loading" style="
             ">
            <div>
                <div>
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                </div>
                <div>
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                </div>
                <div style="
                     padding-top: 7em;
                     ">Chargment...</div>
            </div>

        </div>

    </body>

</html>



