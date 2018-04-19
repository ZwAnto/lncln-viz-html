var breaks_color_iris = [10, 100, 200, 400, 600, 800, 1000];

function styleIris(feature) {
    return {
        fillColor: getColorIris(feature.properties.n, breaks_color_iris),
        weight: 0.8,
        opacity: 0.8,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getColorIris(d, breaks_color) {
    return d > breaks_color[6] ? '#800026' :
        d > breaks_color[5] ? '#BD0026' :
            d > breaks_color[4] ? '#E31A1C' :
                d > breaks_color[3] ? '#FC4E2A' :
                    d > breaks_color[2] ? '#FD8D3C' :
                        d > breaks_color[1] ? '#FEB24C' :
                            d > breaks_color[0] ? '#FED976' :
                                '#FFEDA0';
}



function funStyle(geojson, styleFun, layerName) {
    arrond2Layer = L.geoJSON(geojson, {
        style: styleFun
    })
    arrond2Layer.addTo(mymap);
//    control.addBaseLayer(arrond2Layer, layerName)


}



var mymap = L.map('map_iris_ds_ma_rue').setView([48.855, 2.32], 12);
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap)

//Legend
var irisLegend = L.control({ position: 'bottomright' });

irisLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = breaks_color_iris,
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorIris((grades[i] + 1), breaks_color_iris) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

irisLegend.addTo(mymap);

$.getJSON('Data/ds_ma_rue_iris.geojson', function (data) {
            funStyle(data,
                styleIris, "Iris")
        });




