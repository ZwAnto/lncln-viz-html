// Build the chart
Highcharts.chart('hc_arr_tonnageHab', {
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
            showInLegend: false,
            colorByPoint: true
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
    colors: genColorGradient(mainColor,20).reverse() ,
    series: tonnageHab_arr
});