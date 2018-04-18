
/*================================================
 = Function definition                           =
 ===============================================*/

// event listenner for each feature 
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}
// Style function for each feature 
function style(feature) {
    return {
        fillColor: getColor(feature.properties.indexArr_p13_pop_m),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    };
}
// highlight functions
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#42576c',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}
function resetHighlight(e) {
    map_iris_iris_layer.resetStyle(e.target);
    info.update();
}

/*================================================
 = Iris map                                      =
 ===============================================*/

/*--- Map initialization -----------------------*/

// Map initialization
window.map_iris = L.map('map_iris');
// CartoDB
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_iris);
// Moving zoom control
map_iris.zoomControl.setPosition('bottomleft');
// Removing credits
$('.leaflet-control-attribution').remove();

/*--- Layer initialization ---------------------*/

// Adding arr bounding to map
var map_iris_iris_layer = L.geoJSON(iris_geo, {
    onEachFeature: onEachFeature,
    style: style,
    filter: function (feature, layer) {
        if (feature.properties.insee_com == iris_data.insee_com) {
            return true;
        }
    }}).addTo(map_iris);

/*--- Map restriction --------------------------*/

// Set map focus on paris
map_iris.fitBounds(map_iris_iris_layer.getBounds());
// Map limitation
map_iris.setMaxBounds(map_iris_iris_layer.getBounds());
map_iris.setMinZoom(map_iris.getZoom());

/*--- Marker initialization --------------------*/

var markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    singleMarkerMode: false,
    iconCreateFunction: function (cluster) {
        return L.divIcon({
            icon: '',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            html: '<i class="fas fa-map-marker-alt"></i>' +
                    '<br><b>' +
                    cluster.getChildCount() +
                    '</b>'
        });
    }
});

var customIcon = L.divIcon({
    icon: '',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    html: '<i class="fas fa-map-marker-alt"></i>'
});

/*================================================
 = Custom control                                =
 ===============================================*/

/*--- Highlight information --------------------*/

// Info container
var info = L.control({position: 'bottomright'});
// Info initialization
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// Info update
info.update = function (props) {

    var varName = $('#map_iris_selectArea').val();
    var varLabel = $('#map_iris_selectArea :selected').data("label");
    var varUnit = $('#map_iris_selectArea :selected').data("unit");


    if (props) {
        var varValue = props[varName];
        varValue = typeof varValue === 'string' ? (varValue == 'A' ? 'Activité' :
                varValue == 'H' ? 'Habitation' :
                'Divers') :
                Math.round(varValue, 0).toLocaleString();

        $("#map_iris .info").html(props.nom_iris + '<br>' + varLabel + ': ' + varValue + ' ' + varUnit);
        $("#map_iris .info").css('display', 'block');
    } else {
        $("#map_iris .info").html('');
        $("#map_iris .info").css('display', 'none');
    }

};
// Adding info control to map
info.addTo(map_iris);

/*--- Legend -----------------------------------*/

var legend = L.control({position: 'topright'});
legend.onAdd = function (map) {

    var varName = $('#map_iris_selectArea').val();

    var nSplit = 4;

    var varRange = geoPropRange(arr_geo, varName);
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    var div = L.DomUtil.create('div', 'legend')

    // loop through our density intervals and generate a label with a colored square for each interval
    if ($('#map_iris_selectArea :selected').data('unit') != '') {
        div.innerHTML += $('#map_iris_selectArea :selected').data('unit') + '<br>';
    }
    for (var i = 0; i < varGrades.length; i++) {
        div.innerHTML +=
                '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                varGrades[i] + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1] + ' ' + $('#map_iris_selectArea :selected').data('unit') + '<br>' : '+');
    }
    return div;
};
legend.update = function () {
    var varName = $('#map_iris_selectArea').val();

    var nSplit = 4;

    var varRange = geoPropRange(arr_geo, varName);
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    // loop through our density intervals and generate a label with a colored square for each interval
    var html = '';
    if ($('#map_iris_selectArea :selected').data('unit') != '') {
        html = $('#map_iris_selectArea :selected').data('unit') + '<br>';
    }
    var label = ['A', 'H', 'D'];
    var labelLong = ['Activité', 'Habitation', 'Divers'];

    if ($('#map_iris_selectArea').val() === 'typ_iris') {
        for (var i = 0; i < 3; i++) {
            html +=
                    '<i style="background:' + getColor(label[i]) + '"></i> ' +
                    labelLong[i] + ' ' + $('#map_iris_selectArea :selected').data('unit') + '<br>';
        }
    } else {
        for (var i = 0; i < varGrades.length; i++) {
            html +=
                    '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                    varGrades[i] + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1] + ' ' + $('#map_iris_selectArea :selected').data('unit') + '<br>' : '+');
        }
    }
    $('#map_iris .legend').html(html);
}
legend.addTo(map_iris);

/*================================================
 = Variable selection                            =
 ===============================================*/

// Change color scheme on variable selection
$('#map_iris_selectArea').change(function () {
    legend.update();
    if ($('#map_iris_selectArea').val() === 'typ_iris') {
        var varName = $('#map_iris_selectArea').val();
    } else {
        var varName = 'indexArr_' + $('#map_iris_selectArea').val();
    }
    map_iris_iris_layer.removeFrom(map_iris);

    function style(feature) {
        return {
            fillColor: getColor(feature.properties[varName]),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '',
            fillOpacity: 0.7
        };
    }

    map_iris_iris_layer = L.geoJSON(iris_geo, {
        onEachFeature: onEachFeature,
        style: style,
        filter: function (feature, layer) {
            if (feature.properties.insee_com == iris_data.insee_com) {
                return true;
            }
        }}).addTo(map_iris);

});

$('#map_iris_selectMarker').change(function () {
    var varName = 'indexArr_' + $('#map_iris_selectMarker').val();
    markers.removeLayers(markers.getLayers());
    if ($('#map_iris_selectMarker :selected').closest('optgroup').attr('label') == 'Mobilier') {
        if ($('#map_iris_selectMarker').val() == 'TRI') {


            $.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=trilib&rows=10000&facet=collectfrequency&facet=localisationfo_postalcode&facet=wastecontainermodelfo_model&facet=wastecontainermodelfo_type&facet=wastecontainermodelfo_manufacturer&facet=wastetype_designation', function (data) {
                var json = data.records;
                var out = [];
                
                for (var i = 0; i < json.length; i++) {
                    var key = 'k' + json[i].fields.localisationfo_number;
                    if (!out[ key ]) {
                        out[ key ] = [];
                        out[ key ][0] = json[i].fields;
                    } else {
                        out[ key ][ out[ key ].length ] = json[i].fields;
                    }
                }
                
                for (var i in out) {
                     var marker = L.marker(out[i][0].geo, {icon: customIcon});
                   
                     marker.bindPopup("test");
                    
                    markers.addLayer(marker);
                }
            });
        } else {
            markers.addLayer(L.geoJSON(window['mobilier_' + iris_data.insee_com + '_geo'], {
                pointToLayer: function (feature, latlng) {
                    var marker = L.marker(latlng, {icon: customIcon});
                    return marker;
                },
                filter: function (feature, layer) {
                    if (feature.properties.type == $('#map_iris_selectMarker :selected').attr('value')) {
                        return true;
                    }
                }}));
        }
    } else if ($('#map_iris_selectMarker :selected').closest('optgroup').attr('label') == 'Tri mobile') {

        markers.addLayer(L.geoJSON(triMobile_geo, {
            pointToLayer: function (feature, latlng) {
                var marker = L.marker(latlng, {icon: customIcon});
                marker.bindPopup("<b>Adresse:</b> " + feature.properties['adresse'] +
                        "<br><b>Horaires:</b> " + feature.properties['horaires'] +
                        "<br><b>Jours:</b> " + feature.properties['jours.de.tenue']);
                return marker;
            },
            filter: function (feature, layer) {
                if (feature.properties.insee_com == iris_data.insee_com) {
                    return true;
                }
            }}));

    }
    map_iris.addLayer(markers);
});