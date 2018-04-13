// Build the chart
Highcharts.chart('hc_kpi_mob', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: '',
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    legend: {
        itemStyle: {
            fontSize: '10px'
        }
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        column: {
            allowPointSelect: false,
            cursor: 'pointer',

            dataLabels: {
                enabled: true,
                color: '#555555',
                format: '{point.y:.0f}', // one decimal
              
                style: {
                    fontSize: '11px',
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
                }
            },
            showInLegend: false
        }
    },
    xAxis: {
        type: 'category',
        tickWidth: 0,
        lineWidth: 0
    },
    yAxis: {
        visible: false
    },
    series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                    name: 'Poubelle <br>de rue',
                    y: paris.POU,
                    color: '#cfe0c3'
                }, {
                    name: 'Poubelle <br>sur piquet',
                    y: paris.POUP,
                    color: '#9ec1a3'
                }, {
                    name: 'Colonne<br>de verre',
                    y: paris.VER,
                    color: '#70a9a1'
                }, {
                    name: 'Borne<br>de proprete',
                    y: paris.PRE,
                    color: '#40798c'
                }]
        }]
});