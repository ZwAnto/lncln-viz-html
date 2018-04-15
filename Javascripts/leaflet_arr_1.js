function getColor(d) {
    return d > 0.9 ? colors[9] :
            d > 0.8 ? colors[8] :
            d > 0.7 ? colors[7] :
            d > 0.6 ? colors[6] :
            d > 0.5 ? colors[5] :
            d > 0.4 ? colors[4] :
            d > 0.3 ? colors[3] :
            d > 0.2 ? colors[2] :
            d > 0.1 ? colors[1] :
            colors[0];
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
function zoomToFeature(e) {
    var layer = e.target;
    var props = layer.feature.properties;
 
    map_arr.fitBounds(e.target.getBounds());
    
    $('#dataArrPop').html('<h2>' + props.p13_pop_m.toFixed(2) + '</h2>Million Hab.<br><br><h2>' + Math.round(props.tonnage_hab) + '</h2>Kg de déchets / Hab. / An');
/*$('#dataParisPou').html('<span><h2>' + Math.round(paris.pou_hab) + '</h2> Hab. / Poubelle</span><br><br><span><h2>1</h2> Poubelle tout les ' + Math.round(paris.pou_m) + ' m</span>');*/
$('#dataArrPou').html('<h2>1</h2>Poubelle<br><br><i class="fal fa-male"></i> pour <b>' + Math.round(props.pou_hab) + ' Hab.</b><br><i class="fal fa-map-marker"></i> tout les <b>' + Math.round(props.pou_m) + ' m</b>');

$('#dataArrTriMobile').html('<h2>' + props.triMobileN + '</h2>collectes mensuelles<br><br><h2>' + props.triMobileNGeo + '</h2>points de collecte');

    
    
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
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

// Color array
colors = genColorGradient('#70A9A1', 10);

// Map initialization
window.map_arr = L.map('map_arr').setView([40.747133, -73.927887], 10);

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
map_arr.setMinZoom(11);

// Info container
var info = L.control({position: 'bottomright'});
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
info.update = function (props) {
  
    if (props) {
        $("#map_arr .info").html(props.nom_com);
        $("#map_arr .info").css('display','block');
    } else {
       $("#map_arr .info").html('');
        $("#map_arr .info").css('display','none');
    }
    
};
info.addTo(map_arr);

// Change color scheme on variable selection
$('#map_arr_select').change(function () {
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