
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
        weight: 1,
        opacity: 0.8,
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
        var layer = e.target;
    
    layer.setStyle({
        weight: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });
    map_iris_bound_layer.bringToFront();
    info.update();
}
function trilibLabel(str) {
    var label = str === 'Glass' ? 'Verre' :
            str === 'Can / Plastic' ? 'Plastique & metal' :
            'Parpier & carton';
    return(label);
}
/*================================================
 = Iris map                                      =
 ===============================================*/

/*--- Map initialization -----------------------*/

// Map initialization
window.map_iris = L.map('map_iris');
// CartoDB
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_iris);
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
var map_iris_bound_layer = L.geoJSON(arr_geo, {
         interactive: false,
    style: {fillOpacity: 0, weight: 1, color: '#2e5173'},
    filter: function (feature, layer) {
        if (feature.properties.insee_com == iris_data.insee_com) {
            return true;
        }
    }}).setZIndex(2).addTo(map_iris);
/*--- Map restriction --------------------------*/

// Set map focus on paris
map_iris.fitBounds(map_iris_iris_layer.getBounds());
// Map limitation
//map_iris.setMaxBounds(map_iris_iris_layer.getBounds());
//map_iris.setMinZoom(map_iris.getZoom());

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

map_iris.addLayer(markers);

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

    var varRange = geoPropRange(iris_geo, varName, 'insee_com', iris_data.insee_com);
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
        div.innerHTML += '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                varGrades[i].toLocaleString() + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1].toLocaleString() + '<br>' : '+');
    }
    return div;
};
legend.update = function () {
    var varName = $('#map_iris_selectArea').val();

    var nSplit = 4;

    var varRange = geoPropRange(iris_geo, varName);
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
                    varGrades[i].toLocaleString() + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1].toLocaleString() + '<br>' : '+');
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
    map_iris_iris_layer.clearLayers();

    function style(feature) {
        return {
            fillColor: getColor(feature.properties[varName]),
            weight: 1,
            opacity: 0.8,
            color: 'white',
            dashArray: '',
            fillOpacity: 0.7
        };
    }

    L.geoJSON(iris_geo, {
        onEachFeature: onEachFeature,
        style: style,
        filter: function (feature, layer) {
            if (feature.properties.insee_com == iris_data.insee_com) {
                return true;
            }
        }}).addTo(map_iris_iris_layer);
map_iris_bound_layer.bringToFront();
});

$('#map_iris_selectMarker').change(function () {
    var varName = 'indexArr_' + $('#map_iris_selectMarker').val();
    markers.clearLayers();
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

                    if (out[i][0].localisationfo_postalcode.substr(3, 5) === String(iris_data.insee_com).substring(3, 5)) {
                        var marker = L.marker(out[i][0].geo, {icon: customIcon});

                        var html = '<div class="trilibDetailContainer">';

                        for (j = 0; j < out[i].length; j++) {
                            if (j === 0) {
                                html += '<div class="trilibDetail" data-value=' + j + ' style="display:block"; data-state="active">';
                            } else {
                                html += '<div class="trilibDetail" data-value=' + j + '>';
                            }

                            html += '<b>Adresse</b>: ' + out[i][j].localisationfo_street + '<br>';
                            html += '<b>Modèle</b>: ' + out[i][j].wastecontainermodelfo_model + '<br>';
                            html += '<b>Type de déchet</b>: ' + trilibLabel(out[i][j].wastetype_designation) + '<br>';
                            html += '<b>Date</b>: ' + out[i][j].fillingratedate.substr(0, 10) + '<br>';
                            html += '<b>Taux de remplissage</b>: ' + Math.round(out[i][j].fillingrate * out[i][j].fillinglimit / 100) + ' %<br>';
                            html += '<b>Taux de remplissage journalier (moy.)</b>: ' + Math.round(out[i][j].avgfillingrateperday * out[i][j].fillinglimit / 100) + ' %<br>';
                            html += '</div>';
                        }

                        html += '</div><br><div class="trilibDetailNav"><a class="prev"><i class="fas fa-chevron-left"></i></a><span class="tilibNavPos">1</span>/' + out[i].length + '<a class="next"><i class="fas fa-chevron-right"></i></a></div>';

                        marker.bindPopup(html);

                        marker.on('popupopen', function () {
                            $(".trilibDetailNav .prev").click(function () {
                                var active = $(".trilibDetail[data-state='active']").data('value') + 1;
                                var prev = active - 1;
                                if ($(".trilibDetail:nth-of-type(" + prev + ")").length) {
                                    $(".trilibDetail:nth-of-type(" + active + ")").attr('data-state', null);
                                    $(".trilibDetail:nth-of-type(" + active + ")").css('display', 'none');
                                    $(".trilibDetail:nth-of-type(" + prev + ")").css('display', 'block');
                                    $(".trilibDetail:nth-of-type(" + prev + ")").attr('data-state', 'active');
                                    $(".tilibNavPos").html(prev);
                                }
                            });

                            $(".trilibDetailNav .next").click(function () {
                                var active = $(".trilibDetail[data-state='active']").data('value') + 1;
                                var next = active + 1;
                                if ($(".trilibDetail:nth-of-type(" + next + ")").length) {
                                    $(".trilibDetail:nth-of-type(" + active + ")").attr('data-state', null);
                                    $(".trilibDetail:nth-of-type(" + active + ")").css('display', 'none');
                                    $(".trilibDetail:nth-of-type(" + next + ")").css('display', 'block');
                                    $(".trilibDetail:nth-of-type(" + next + ")").attr('data-state', 'active');
                                    $(".tilibNavPos").html(next);
                                }
                            });
                        });

                        markers.addLayer(marker);
                    }
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

});