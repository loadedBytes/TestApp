$(function(){
   var chart;

    var chartData = [{
        country: "자산",
        year2010: 2565007,
        year2011: 2574204
    }, {
        country: "부채",
        year2010: 3479097,
        year2011: 3586396
    }, {
        country: "자본",
        year2010: 6044104,
        year2011: 6160600
    }];


    AmCharts.ready(function () {
        // SERIAL CHART
        chart = new AmCharts.AmSerialChart();
        chart.dataProvider = chartData;
        chart.categoryField = "country";
        chart.color = "#777";
        chart.fontSize = 12;
        chart.startDuration = 1;
        chart.plotAreaFillAlphas = 0.2;
        chart.columnWidth = .2;
        // the following two lines makes chart 3D
        chart.angle = 30;
        chart.depth3D = 30;

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.gridAlpha = 0.2;
        categoryAxis.gridPosition = "start";
        categoryAxis.gridColor = "#000000";
        categoryAxis.axisColor = "#FFFFFF";
        categoryAxis.fontSize = 12;
        categoryAxis.color = "#555";
        categoryAxis.axisAlpha = 0.5;
        categoryAxis.dashLength = 2;

        // value
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.stackType = "3d"; // This line makes chart 3D stacked (columns are placed one behind another)
        valueAxis.gridAlpha = 0.3;
        valueAxis.gridColor = "#000";
        valueAxis.axisColor = "#333";
        valueAxis.axisAlpha = 0.5;
        valueAxis.dashLength = 2;
        valueAxis.title = "Balance Sheet"
        valueAxis.titleColor = "#777777";
        valueAxis.unit = "(백만원)";
        valueAxis.color = "#999";
        valueAxis.fontSize = 10;
        chart.addValueAxis(valueAxis);

        // GRAPHS         
        // first graph
        var graph1 = new AmCharts.AmGraph();
        graph1.title = "2004";
        graph1.valueField = "year2010";
        graph1.type = "column";
        graph1.lineAlpha = 0;
        graph1.lineColor = "#faa53f";
        graph1.fillAlphas = 1;
        graph1.balloonColor = "#777";
        graph1.balloonText = "2010년도 [[category]] : [[value]] 백만원";
        chart.addGraph(graph1);

        // second graph
        var graph2 = new AmCharts.AmGraph();
        graph2.title = "2005";
        graph2.valueField = "year2011";
        graph2.type = "column";
        graph2.lineAlpha = 0;
        graph2.lineColor = "#fa8137";
        graph2.fillAlphas = 1;
        graph2.balloonColor = "#555";
        graph2.balloonText = "2011년도 [[category]] : [[value]] 백만원";
        chart.addGraph(graph2);

        chart.write("chartdiv");
    });
});
