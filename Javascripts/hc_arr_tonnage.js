hc_arr_tonnage = Highcharts.chart('hc_arr_tonnage', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'line'
    },
    title: {
        text: '',
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
            format: '{value:%b}'
        }
    },
    yAxis: {
        title: {
            text: null
        }
    },
    series: $.extend(true,[],tonnage_arr),
    colors: genColorGradient('#9EC1A3', 20)
});

$('#arr_tonnage_check').click(function () {
    var i;
    if ($('#arr_tonnage_check').is(":checked")) {
        for (i = 0; i < hc_arr_tonnage.series.length; i++) {
            hc_arr_tonnage.series[i].setData(tonnageIndex_arr[i]['data']);
        }
    } else {
        for (i = 0; i < hc_arr_tonnage.series.length; i++) {
            hc_arr_tonnage.series[i].setData(tonnage_arr[i]['data']);
        }
    }
});