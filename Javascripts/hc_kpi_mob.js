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
            allowPointSelect: true,
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
                    y: 22147,
                    color: '#cfe0c3'
                }, {
                    name: 'Poubelle <br>sur piquet',
                    y: 2036,
                    color: '#9ec1a3'
                }, {
                    name: 'Colonne<br>de verre',
                    y: 962,
                    color: '#70a9a1'
                }, {
                    name: 'Borne<br>de proprete',
                    y: 22,
                    color: '#40798c'
                }]
        }]
});