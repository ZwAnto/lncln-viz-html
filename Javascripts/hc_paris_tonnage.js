// Build the chart
Highcharts.chart('hc_paris_tonnage', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'area'
    },
    title: {
        text: '',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    legend: {
        verticalAlign: 'top',
        itemStyle: {
            fontSize: '10px'
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
         area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                enabled: false
               
            }
        },
        line: {
            allowPointSelect: false,
            dataLabels: {
                enabled: true,
                color: '#555555',
                format: '{point.y:.0f}', // one decimal
                style: {
                    fontSize: '11px',
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
                }
            },
            marker: {
                enabled: false
            },
            showInLegend: true
        }
    },
    xAxis: {
        categories: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Aout', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
        tickWidth: 0,
        lineWidth: 0
    },
    yAxis: {
        visible: false
    },
    series: [{
            name: 'Verres',
            data: tonnage_paris_verre,
            color: '#cfe0c3'
        }, {
            name: 'Jaunes',
            data: tonnage_paris_jaune,
            color: '#70a9a1'
        }, {
            name: 'Vertes',
            data: tonnage_paris_vert,
            color: '#9ec1a3'
        }]
});