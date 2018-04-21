// Build the chart
Highcharts.chart('hc_arr_scatter', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'bubble'
    },
    title: {
        text: '',
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
    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.arr}</h3></th></tr>' +
            '<tr><th>Population :</th><td>{point.x}</td></tr>' +
            '<tr><th>Poubelles de rue:</th><td>{point.y}</td></tr>' +
            '<tr><th>Tonnage:</th><td>{point.z} Kg</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            },
            color: mainColor,
            showInLegend: false
        }
    },
    xAxis: {
        title: {
            text: 'Population'
        }
    },
    yAxis: {
        title: {
            text: 'Poubelles de rue (nombre)'
        }
    },
    series: scatter_arr
});

