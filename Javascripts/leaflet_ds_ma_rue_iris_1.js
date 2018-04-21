
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
        fillColor: getColor(feature.properties.index_p13_pop_m),
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
    
    map_detail_bound_layer.bringToFront();
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
window.map_detail = L.map('map_detail');
// CartoDB
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_detail);
// Moving zoom control
map_detail.zoomControl.setPosition('bottomleft');
// Removing credits
$('.leaflet-control-attribution').remove();

/*--- Layer initialization ---------------------*/

// Adding arr bounding to map
var map_detail_iris_layer = L.geoJSON(iris_geo, {
    onEachFeature: onEachFeature,
    style: style
}).addTo(map_detail);
var map_detail_bound_layer = L.geoJSON(paris_geo, {
    interactive: false,
    style: {fillOpacity: 0, weight: 1, color: '#2e5173'}
}).addTo(map_detail);

/*--- Map restriction --------------------------*/

// Set map focus on paris
map_detail.fitBounds(map_detail_iris_layer.getBounds());
// Map limitation
//map_detail.setMaxBounds(map_detail_iris_layer.getBounds());
//map_detail.setMinZoom(map_detail.getZoom());

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

    var varName = $('#map_detail_selectArea').val();
    var varLabel = $('#map_detail_selectArea :selected').data("label");
    var varUnit = $('#map_detail_selectArea :selected').data("unit");


    if (props) {
        var varValue = props[varName];
        varValue = typeof varValue === 'string' ? (varValue == 'A' ? 'Activité' :
                varValue == 'H' ? 'Habitation' :
                'Divers') :
                Math.round(varValue, 0).toLocaleString();

        $("#map_detail .info").html(props.nom_com + '<br>' + props.nom_iris + '<br>' + varLabel + ': ' + varValue + ' ' + varUnit);
        $("#map_detail .info").css('display', 'block');
    } else {
        $("#map_detail .info").html('');
        $("#map_detail .info").css('display', 'none');
    }

};
// Adding info control to map
info.addTo(map_detail);

/*--- Legend -----------------------------------*/

var legend = L.control({position: 'topright'});
legend.onAdd = function (map) {

    var varName = $('#map_detail_selectArea').val();

    var nSplit = 4;

    var varRange = geoPropRange(iris_geo, varName);
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    var div = L.DomUtil.create('div', 'legend')

    // loop through our density intervals and generate a label with a colored square for each interval
    if ($('#map_detail_selectArea :selected').data('unit') != '') {
        div.innerHTML += $('#map_detail_selectArea :selected').data('unit') + '<br>';
    }
    for (var i = 0; i < varGrades.length; i++) {
        div.innerHTML += '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                varGrades[i].toLocaleString() + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1].toLocaleString() + '<br>' : '+');
    }
    return div;
};
legend.update = function () {
    var varName = $('#map_detail_selectArea').val();

    var nSplit = 4;

    var varRange = geoPropRange(iris_geo, varName);
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    // loop through our density intervals and generate a label with a colored square for each interval
    var html = '';
    if ($('#map_detail_selectArea :selected').data('unit') != '') {
        html = $('#map_detail_selectArea :selected').data('unit') + '<br>';
    }
    var label = ['A', 'H', 'D'];
    var labelLong = ['Activité', 'Habitation', 'Divers'];

    if ($('#map_detail_selectArea').val() === 'typ_iris') {
        for (var i = 0; i < 3; i++) {
            html +=
                    '<i style="background:' + getColor(label[i]) + '"></i> ' +
                    labelLong[i] + ' ' + $('#map_detail_selectArea :selected').data('unit') + '<br>';
        }
    } else {
        for (var i = 0; i < varGrades.length; i++) {
            html +=
                    '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                    varGrades[i].toLocaleString() + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1].toLocaleString() + '<br>' : '+');
        }
    }
    $('#map_detail .legend').html(html);
}
legend.addTo(map_detail);

/*================================================
 = Variable selection                            =
 ===============================================*/

// Change color scheme on variable selection
$('#map_detail_selectArea').change(function () {
    legend.update();
    if ($('#map_detail_selectArea').val() === 'typ_iris') {
        var varName = $('#map_detail_selectArea').val();
    } else {
        var varName = 'index_' + $('#map_detail_selectArea').val();
    }
    map_detail_iris_layer.clearLayers();

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
        style: style
    }).addTo(map_detail_iris_layer);
    map_detail_bound_layer.bringToFront();
});
