// Build the chart
Highcharts.chart('hc_paris_tonnage', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'line'
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
        line: {
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
            showInLegend: true
        }
    },
    xAxis: {
        categories : ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
        tickWidth: 0,
        lineWidth: 0
    },
    yAxis: {
        visible: false
    },
    series: [{
                    name: 'Poubelles verres',
                    data: tonnage_paris_verre,
                    color: '#cfe0c3'
                }, {
                    name: 'Poubelles vertes',
                    data: tonnage_paris_vert,
                    color: '#9ec1a3'
                }, {
                    name: 'Poubelle jaunes',
                    data: tonnage_paris_jaune,
                    color: '#70a9a1'
        }]
});