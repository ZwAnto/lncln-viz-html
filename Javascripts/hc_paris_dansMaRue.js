Highcharts.chart('hc_paris_dansMaRue', {
chart: {
            type: 'column'
        },
        title: {
            text: 'Basic drilldown'
        },
        xAxis: {
            type: 'datetime',
              labels: {
                    format: '{value:%Y-%m-%d}'
            }
        },

        plotOptions: {
            column : {
                stacking : 'normal'
            }
        },
        series: dansMaRue_paris
});