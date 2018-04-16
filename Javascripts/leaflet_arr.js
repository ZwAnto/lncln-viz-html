
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: irisRedirect
    });
}
function style(feature) {
    return {
        fillColor: getColor(feature.properties.index_p13_pop_m),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    };
}
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
    map_arr_arr_layer.resetStyle(e.target);
    info.update();
}
function irisRedirect(e) {
    var layer = e.target;
    var props = layer.feature.properties;

    iris_data = props;

    $('#main-pane').load('container_tab_iris.html');

}

// Map initialization
window.map_arr = L.map('map_arr');

// CartoDB
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_arr);

// Moving zoom control
map_arr.zoomControl.setPosition('bottomleft');

// Removing credits
$('.leaflet-control-attribution').remove();

// Adding arr bounding to map
map_arr_arr_layer = L.geoJSON(arr_geo, {onEachFeature: onEachFeature, style: style}).addTo(map_arr);

// Set map focus on paris
map_arr.fitBounds(map_arr_arr_layer.getBounds());

// Map limitation
map_arr.setMaxBounds(map_arr_arr_layer.getBounds());
map_arr.setMinZoom(map_arr.getZoom());

// Info container
var info = L.control({position: 'bottomright'});
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {

    var varName = $('#map_arr_select').val();
    var varLabel = $('#map_arr_select :selected').data("label");
    var varUnit = $('#map_arr_select :selected').data("unit");

    if (props) {
        $("#map_arr .info").html(props.nom_com + '<br>' + varLabel + ': ' + Math.round(props[varName], 0).toLocaleString() + ' ' + varUnit);
        $("#map_arr .info").css('display', 'block');
    } else {
        $("#map_arr .info").html('');
        $("#map_arr .info").css('display', 'none');
    }

};
info.addTo(map_arr);



var legend = L.control({position: 'topright'});
legend.onAdd = function (map) {

    var varName = $('#map_arr_select').val();

    var nSplit = 4;

    var varRange = geoPropRange(arr_geo, varName);
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    var div = L.DomUtil.create('div', 'legend')

    if ($('#map_arr_select :selected').data('unit') != '') {
        div.innerHTML += $('#map_arr_select :selected').data('unit') + '<br>';
    }
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < varGrades.length; i++) {
        div.innerHTML +=
                '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                varGrades[i] + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.update = function () {
    var varName = $('#map_arr_select').val();

    var nSplit = 4;

    var varRange = geoPropRange(arr_geo, varName);
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    // loop through our density intervals and generate a label with a colored square for each interval
    var html = '';
    if ($('#map_arr_select :selected').data('unit') != '') {
        html = $('#map_arr_select :selected').data('unit') + '<br>';
    }
    for (var i = 0; i < varGrades.length; i++) {
        html +=
                '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                varGrades[i] + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1] + '<br>' : '+');
    }

    $('#map_arr .legend').html(html);
}
legend.addTo(map_arr);

// Change color scheme on variable selection
$('#map_arr_select').change(function () {

    legend.update();

    map_arr_arr_layer.removeFrom(map_arr);

    var varName = 'index_' + $('#map_arr_select').val();

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

    map_arr_arr_layer = L.geoJSON(arr_geo, {onEachFeature: onEachFeature, style: style}).addTo(map_arr);
});