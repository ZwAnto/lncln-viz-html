
function style(feature) {
    return {
        fillColor: getColor(feature.properties.index_dansMaRue),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    };
}

var map_detail = L.map('map_iris_ds_ma_rue').setView([48.855, 2.32], 12);
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_detail);

//Legend
var irisLegend = L.control({ position: 'bottomright' });

irisLegend.onAdd = function (map) {

    var nSplit = 4;

    var varRange = geoPropRange(iris_geo, 'dansMaRue');
    var rangeDiff = (varRange[1] - varRange[0]) / nSplit;
    var varGrades = [];
    for (i = 0; i < nSplit; i++) {
        varGrades.push(Math.round(varRange[0] + i * rangeDiff));
    }

    var div = L.DomUtil.create('div', 'legend');

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < varGrades.length; i++) {
        div.innerHTML += '<i style="background:' + getColor((i + 1) / nSplit) + '"></i> ' +
                varGrades[i].toLocaleString() + (varGrades[i + 1] ? '&ndash;' + varGrades[i + 1].toLocaleString() + '<br>' : '+');
    }
    return div;
};

irisLegend.addTo(map_detail);

$.getJSON('Data/ds_ma_rue_iris.geojson', function (data) {
            funStyle(data,
                styleIris, "Iris")
        });



var map_iris_iris_layer = L.geoJSON(iris_geo, {
    style: style
   }).addTo(map_detail);

