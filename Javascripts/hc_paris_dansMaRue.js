Highcharts.chart('hc_paris_dansMaRue', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'line'
    },
    title: {
        text: null
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
        line: {
            allowPointSelect: false,
            marker: {
                enabled: false
            },
            showInLegend: true
        }
    },
    xAxis: {
        type: 'datetime',
        labels: {
            format: '{value:%Y-%m-%d}'
        }
    },
    yAxis: {
        title: {
            text: null
        }  
    },
    series: dansMarue_paris,
    colors: genColorGradient(mainColor,4).reverse()
});