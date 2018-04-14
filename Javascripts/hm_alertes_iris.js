Highcharts.mapChart('hm_alertes_iris', {
    chart: {
        map: geojson
    },

    title: {
        text: "Nombre d'alertes dans ma rue par IRIS"
    },

    colorAxis: {
        tickPixelInterval: 100,
        type: 'linear',
        min: 100,
        max: 2200,
        minColor: '#FFAAAA',
        maxColor: '#550000'
    },


    series: [{
        data: data,
        mapData: geojson,
        keys: ['CODE_IRIS', "value"],
        joinBy: 'CODE_IRIS', 
        name: 'Nb alertes'

    }]
});