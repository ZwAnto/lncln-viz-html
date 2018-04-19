// Ne fonctionnera pas en l'état


        var map_v_ideale = L.map('mapvilleideale').setView([48.855, 2.32], 12);
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(map_v_ideale)
        var breaks_color_ville_ideale = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
        var arrondLegendIdeale = L.control({ position: 'bottomright' });


        function styleVilleIdeale(feature) {
            return {
                fillColor: getColor_ideale(feature.properties.prop, breaks_color_ville_ideale),
                weight: 0.8,
                opacity: 0.8,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }

        function getColor_ideale(d, breaks_color) {
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
            arrond2Layer.addTo(map_v_ideale);


            // L.geoJson().addTo(mymap);
        }

        // Pour ville idéale
        $.getJSON('http://localhost:8000/ville_ideale_sal.geojson', function (data) {
            funStyle(data,
                styleVilleIdeale, "Arrondissements")
        });




        arrondLegendIdeale.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = breaks_color_ville_ideale,
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor_ideale(grades[i], breaks_color_ville_ideale) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        };


        

        arrondLegendIdeale.addTo(map_v_ideale);


