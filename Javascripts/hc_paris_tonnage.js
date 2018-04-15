// Build the chart
Highcharts.chart('hc_paris_tonnage', {
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
        pointFormat: '{series.name}: <b>{point.y:.0f}{point.percentage:.1f}%</b>'
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
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: '#555555',
                format: '{point.y:.0f}', // one decimal
                style: {
                    fontSize: '11px',
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
                }
            }
        }
    },
    xAxis: {
        type: 'datetime',
        tickWidth: 0,
        lineWidth: 0,
        dateTimeLabelFormats: {
            day: "%e. %b",
            hour: "%H: %M",
            millisecond: "%H: %M: %S. %L",
            minute: "%H: %M",
            month: "%b",
            second: "%H: %M: %S",
            week: "%e. %b",
            year: "%Y"
        }
    },
    yAxis: {
        tickWidth: 0,
        lineWidth: 0,
        gridLineWidth: 0,
        labels: {
            enabled: false
        },
        title: {
            text: null
        },
        stackLabels: {
            enabled: true,
            color: '#555555',
            format: '{total:.0f}',
            style: {
                fontSize: '11px',
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
            }
        }
    },
    series: tonnage_paris
});