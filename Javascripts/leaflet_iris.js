
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}
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

// Color array
colors = genColorGradient(colorPal[3], 10);

// Map initialization
window.map_iris = L.map('map_iris');

// CartoDB
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_iris);

// Moving zoom control
map_iris.zoomControl.setPosition('bottomleft');

// Removing credits
$('.leaflet-control-attribution').remove();

// Adding arr bounding to map
map_iris_iris_layer = L.geoJSON(iris_geo, {onEachFeature: onEachFeature, style: style, filter: function (feature, layer) {

        if (feature.properties.insee_com == '75108') {
            return true;
        }
    }}).addTo(map_iris);

// Set map focus on paris
map_iris.fitBounds(map_iris_iris_layer.getBounds());

// Map limitation
map_iris.setMaxBounds(map_iris_iris_layer.getBounds());
map_iris.setMinZoom(map_iris.getZoom());

// Change color scheme on variable selection
$('#map_iris_select').change(function () {

    map_iris_iris_layer.removeFrom(map_iris);

    var varName = 'indexArr_' + $('#map_iris_select').val();

    if ($('#map_iris_select :selected').closest('optgroup').attr('label') == 'Mobilier') {
        
        var markers = L.markerClusterGroup({showCoverageOnHover: false
});

        markers.addLayer(L.geoJSON(mobilier_75108_geo, {filter: function (feature, layer) {
                if (feature.properties.type == 'POU') {
                    return true;
                }
            }}));
        

        map_iris.addLayer(markers);
    } else {
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

        map_iris_iris_layer = L.geoJSON(iris_geo, {onEachFeature: onEachFeature, style: style, filter: function (feature, layer) {
                if (feature.properties.insee_com == '75108') {
                    return true;
                }
            }}).addTo(map_iris);
    }


});