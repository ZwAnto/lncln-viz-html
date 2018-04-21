
var colors = genColorGradient(mainColor,5);
// Build the chart
Highcharts.chart('hc_kpi_mob', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: null
    },
    tooltip: {
        enabled: false
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
                    color: colors[4]
                }, {
                    name: 'Poubelle <br>sur piquet',
                    y: paris.POUP,
                    color: colors[3]
                }, {
                    name: 'Colonne<br>de verre',
                    y: paris.VER,
                    color: colors[2]
                }, {
                    name: 'Trilib',
                    y: paris.TRI,
                    color: colors[1]
                },{
                    name: 'Borne<br>de proprete',
                    y: paris.PRE,
                    color: colors[0]
                }]
        }]
});

