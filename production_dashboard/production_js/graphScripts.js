//OLD code end
let root = am5.Root.new("chartdiv");
let root_other_graph = "other_graph_div";
let historic_root = am5.Root.new("historyChartdiv");
let product_other_graph = "product_historyChartdiv";
let mixed_root = "mixed_graph_plot_div";
let mixed_history_graph = "mixed_historyChartdiv";

let productionDataArray,mixedDataArray;
// New Code

// const createAmChartCategory = (root, chartsData, dispose, name, type, energyData = []) => {
//     console.log('chart Data', chartsData);
//     $(`#${root}`).ejChart(
//         {
//             rowDefinitions:
//             [
// 				{
//                     rowHeight: 50,
//                     lineColor: "gray",
//                     lineWidth: 0,
//                     unit: 'percentage'
//                 },                
// 				{
//                     rowHeight: 50,
//                     lineColor: "#A8A8A8",
//                     lineWidth: 1,
//                     unit: 'percentage'
//                 }
//             ], 
			
// 			//Initializing Primary X Axis
// 			primaryXAxis:
//             {
//                 title: { text: "Month" }
//             },
			
// 			//Initializing Primary Y Axis
//             primaryYAxis:
//             {
//                 range: { min: 0, max: 90, interval: 10 },
//                 labelFormat: '{value}F',
//                 axisLine: { visible: false },
//                 name: 'yAxis',
//                 title: { text: "Temperature(Fahrenheit)" }
//             },
//             axes: 
// 			[
//                 {
//                     orientation: 'Vertical',
//                     hidePartialLabels: false,
//                     rowIndex: 0,
// 					range: { min: 0, max: 4000 },
//                     majorGridLines: { visible: true },
//                     axisLine: { visible: false },
//                     name: 'yAxis1',
//                     labelFormat: '{value}K',
//                     title: { text: "Temperature(Kelvin)" },
//                     opposedPosition: false
//                 }
//             ],
			
// 			//Initializing Common Properties for all the series  
// 			commonSeriesOptions :
// 			{
// 				enableAnimation :true
// 			},
			
// 			//Initializing Series
//             series: 
// 			[
//                 {
//                     points: chartsData,
// 					name: 'India', 
// 					type: 'line', 
// 					yAxisName: 'yAxis',
// 					tooltip :
// 					{	visible :true, 
// 						format: " #series.name#  <br/> #point.x# : #point.y#"
// 					},
//                     marker:
//                     {
//                         shape: 'circle',
//                         size:
//                         {
//                             height: 6, width: 6
//                         },
//                         visible: true
//                     },
//                     border :{width: 2} 
//                 },
//                 {
// 					points: energyData,
//                     name: 'Canada', 
// 					type: 'line', 
// 					yAxisName: 'yAxis1', 
// 					enableAnimation: true, 
// 					tooltip :
// 					{
// 						visible:true, 
// 						format: " #series.name#  <br/> #point.x# : #point.y#   "
// 					},
// 					marker:
//                     {
//                         shape: 'circle',
//                         size:
//                         {
//                              height: 6, width: 6
//                         },
//                         visible: true
//                     },
//                    border :{width: 2} 

//                 }
//             ],
// 			load:"loadTheme",
// 			canResize:true,
//             title :{text: 'Weather Report'},
//             size: { height: "600" },
//             legend: { visible: true }
//         });
// }

const createAmChartCategory = (root, chartsData, dispose, name, type) => {
    console.log('type', type);
    // console.log('chartData', chartsData);
    // return false;
    csOptions = {
        tooltip: {
            visible : true
        },
        border : {width: 0},
        stroke : {width: 0},
        marker: {
            shape: 'circle',
            size: {
                height: 6, width: 6
            },
            visible: true,
            border :{width : 2,color : "black"},
        },
        tooltip: {visible: true, format: "#point.x# <br/> #series.name# : #point.y#"}
    }
    if(type == 'double') {
        console.log('herer is mixed charts');
        $(`#${root}`) .ejChart({
            palette: [ "black", "blue", "red", "green", "yellow", "purple"],
            legend: {
                position: "top"
            },
            //Initializing Primary X Axis
            primaryXAxis: {
                title: {
                    text: name
                },
                labelIntersectAction : "rotate45"
            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: {
                    text: name
                }
            },
            axes: 
			[
                {
                    orientation: 'Vertical',
                    hidePartialLabels: false,
                    rowIndex: 0,
                    majorGridLines: { visible: true },
                    axisLine: { visible: false },
                    name: 'Energy',
                    labelFormat: '{value}',
                    title: { text: "Energy Consuption" },
                    opposedPosition: true
                }
            ],
            commonSeriesOptions: csOptions,
            series: [],
            pointRegionClick: function (args) {
                console.log("Clicked on point! PointIndex: " + args.data.region.Region.PointIndex);
                console.log(args.data);
            }
        });
    } else {
        $(`#${root}`) .ejChart({
            palette: [ "black", "blue", "red", "green", "yellow", "purple"],
            legend: {
                position: "top"
            },
            //Initializing Primary X Axis
            primaryXAxis: {
                title: {
                    text: name
                },
                labelIntersectAction : "rotate45"
            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: {
                    text: ""
                }
            },
            commonSeriesOptions: csOptions,
            series: [],
            pointRegionClick: function (args) {
                console.log("Clicked on point! PointIndex: " + args.data.region.Region.PointIndex);
                console.log(args.data);
            }
        });
    }
    
    createGraphDataSet(chartsData, name, root, type);
}

const updateChartScript =
    newDataSeries =>
    nameSeries =>
    opacity => root => type => {
        let chart = $(`#${root}`).ejChart("instance");
        chart.model.series.push({
            type: 'line',
            dataSource: newDataSeries,
            name: nameSeries,
            xName: "x",
            yName: "y",
            opacity
        });
        if(type == 'double') {
            chart.model.series.push({
                type: 'line',
                dataSource: newDataSeries,
                name: 'Energy',
                yAxisName: 'Energy',
                xName: "x",
                yName: "y1",
                opacity
            });
        }
        
        chart.redraw();
    }

const createGraphDataSet = (newData, chartName, root, type) => {
    const chartData =
        newData
        .map(
            (data,i)=>
            ({
                name: chartName,
                x: "A" + (i + 1) + "-" + data.date,
                y: data.value,
                y1: data.value2
            })
        ),

        

    [startingPoint, endingPoint] =
    [geo.point(head(chartData).x), geo.point(last(chartData).x)]

    indicator =
    geo
    .horizontalLine(startingPoint)(endingPoint);


    const indicators =
    arr =>
    arr
    .map(
        a => updateChartScript(indicator(head(tail(a))))(head(a))(0.3)(root)
    )
    const drawChart =
    () => {
        updateChartScript (chartData) (chartName) (1.0) (root) (type);
        
    }

    console.log('chartPoint', chartData);
    const pointsChart =
        chartData
        .map(a => a.y);

    const minPointsChart =
        math.min(pointsChart)

    const maxPointsChart =
        math.max(pointsChart)

    drawChart();
    return;
}

const createAmChart = (root, chartsData, dispose, xtype="date") => {
    console.log('root',root);
    console.log('chartsData',chartsData);
    if (dispose) {
        root.container.children.clear();
    }
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            focusable: true,
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            fill: am5.color(0x777777),
            layout: root.verticalLayout
        })
    );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);

    if(xtype == "date") {
         // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                maxDeviation: 0.1,
                groupData: true,
                baseInterval: {
                    timeUnit: "second",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {})
            })
        );
    } else {
        // var xAxis = chart.xAxes.push(
        //     am5xy.DateAxis.new(root, {
        //         maxDeviation: 0.1,
        //         groupData: true,
        //         baseInterval: {
        //         timeUnit: "minutes",
        //         count: 15
        //     },
        //         renderer: am5xy.AxisRendererX.new(root, {}),
        //         tooltip: am5.Tooltip.new(root, {})
        //     })
        // );
        console.log('chartsData', chartsData[0]['minValue']);
        console.log('chartsData', chartsData[0]['maxValue']);
        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
              min: chartsData[0]['minValue'],
              max: chartsData[0]['maxValue'],
              renderer: am5xy.AxisRendererX.new(root, {})
            })
          );

        // var xAxis = chart.xAxes.push(
        //     am5xy.CategoryAxis.new(root, {
        //       categoryField: "category",
        //       renderer: am5xy.AxisRendererX.new(root, {})
        //     })
        //   );
        // var xAxis = chart.xAxes.push(
        //     am5xy.DateAxis.new(root, {
        //         groupData: true,
        //         renderer: am5xy.AxisRendererX.new(root, {}),
        //         tooltip: am5.Tooltip.new(root, {})
        //     })
        // );
    }
    

    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
        })
    );
    cursor.lineY.set("visible", false);

    // add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
    }));

    let count = 0;
    let opposite;

    for (const key in chartsData) {
        opposite = (count == 0)?false:true;
        let graphName = chartsData[key]['name'] !== undefined?chartsData[key]['name']:key;
        createAxisAndSeries(chartsData[key]['amData'], opposite, graphName, root, chart, xAxis, xtype);
        count++;
    }

    var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
    legend.data.setAll(chart.series.values);
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}

function createAxisAndSeries(startValue, opposite, name, root, chart, xAxis, xtype) {
    console.log('startValue',startValue);
    var yRenderer = am5xy.AxisRendererY.new(root, {
        opposite: opposite
    });

    var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: yRenderer
        })
    );

    if (chart.yAxes.indexOf(yAxis) > 0) {
        yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
    }

    console.log('xtype',xtype);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    if ( xtype == 'date') {
        var series = chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
                legendLabelText: name
            })
        );
    } else {
        var series = chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                valueXField: "date",
                legendLabelText: name,
                maxDistance: 1,
                tooltip: am5.Tooltip.new(root, {
                    pointerOrientation: "horizontal",
                    labelText: "("+name+"=>{valueY}:Order Number=>{valueX})"
                })
            })
        );
    }

    // var bullet = series.bullets.push(new am5.CircleBullet());
    //     bullet.circle.stroke = am5.color("#fff");
    //     bullet.circle.strokeWidth = 2;

    //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
    series.strokes.template.setAll({ strokeWidth: 2 });

    yRenderer.grid.template.set("strokeOpacity", 0.05);
    yRenderer.labels.template.set("fill", series.get("fill"));
    yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
    });

    series.bullets.push(function(root) {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: series.get("fill")
          })
        });
    });

    if(xtype == 'date') {
        // Set up data processor to parse string dates
        // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
        series.data.processor = am5.DataProcessor.new(root, {
            dateFormat: "yyyy-MM-dd",
            dateFields: ["date"]
        });
    }
    series.data.setAll(startValue);
}

//create am category charts
// const createAmChartCategory = (root, chartsData, dispose, name, type) => {
//     console.log('chartsData', chartsData);
//     let graphName = name !== undefined?name:0;
//     if (dispose) {
//         root.container.children.clear();
//     }
//     // Set themes
//     // https://www.amcharts.com/docs/v5/concepts/themes/
//     root.setThemes([
//         am5themes_Animated.new(root)
//     ]);

//     // Create chart
//     // https://www.amcharts.com/docs/v5/charts/xy-chart/
//     var chart = root.container.children.push(
//         am5xy.XYChart.new(root, {
//             focusable: true,
//             panX: true,
//             panY: true,
//             wheelX: "panX",
//             wheelY: "zoomX",
//             layout: root.verticalLayout
//         })
//     );

//     var easing = am5.ease.linear;
//     // chart.get("colors").set("step", 3);

//     // Create axes
//     // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

//     var xAxis = chart.xAxes.push(
//         am5xy.CategoryAxis.new(root, {
//             categoryField: "date",
//             renderer: am5xy.AxisRendererX.new(root, {})
//         })
//     );

//     xAxis.data.setAll(chartsData);


//     var yRenderer = am5xy.AxisRendererY.new(root, {
//         opposite: false
//     });

//     var yAxis = chart.yAxes.push(
//         am5xy.ValueAxis.new(root, {
//         maxDeviation: 1,
//         renderer: yRenderer
//         })
//     );

//     if (chart.yAxes.indexOf(yAxis) > 0) {
//         yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
//     }
//     console.log('graph_type', type);
//     if(type == 'double') {
//         var series = chart.series.push(
//             am5xy.ColumnSeries.new(root, {
//                 name: graphName,
//                 xAxis: xAxis,
//                 yAxis: yAxis,
//                 logarithmic: true,
//                 valueYField: "value",
//                 categoryXField: "date"
//             })
//         );
//         series.data.setAll(chartsData);
//         var series2 = chart.series.push( 
//             am5xy.ColumnSeries.new(root, { 
//               name: "Energy", 
//               xAxis: xAxis, 
//               yAxis: yAxis, 
//               logarithmic: true,
//               valueYField: "value2", 
//               categoryXField: "date" 
//             }) 
//           );
//         series2.data.setAll(chartsData);
//     } else {
//         var series = chart.series.push(
//             am5xy.ColumnSeries.new(root, {
//                 name: graphName,
//                 xAxis: xAxis,
//                 yAxis: yAxis,
//                 valueYField: "value",
//                 categoryXField: "date"
//             })
//         );
        
//         series.data.setAll(chartsData);
//         series.tooltipText = "{categoryX}: {valueY}";
//     }

   

//     var legend = chart.children.push(
//         am5.Legend.new(root, {
//           centerX: am5.p50,
//           x: am5.p50
//         })
//       );
//     legend.data.setAll(chart.series.values);
//     // Make stuff animate on load
//     // https://www.amcharts.com/docs/v5/concepts/animations/
//     chart.appear(1000, 100);
// }

const productionAppButtons = (ele, data , type) => {
    let html = '';
    if(type == 'production') {
        productionDataArray = data;
    } else if(type == 'mixed') {
        mixedDataArray = data;
    }
    console.log(type);
    console.log(data);
    for (const key in data) {
        console.log('key',data[key]['name']);
        html += `<option value="${data[key]['name']}">${data[key]['name']}</option>`;
    }
    $(ele).html(html).trigger('change');
    $('.common-graph-filter').html(html);
}

$(document).on('change', '#timeFilterIntervalProduction', function() {
    let graph_name = $(this).val();
    for (const key in productionDataArray) {
        console.log('productionDataArray', productionDataArray);
        if(graph_name == productionDataArray[key]['name']) {
            createAmChartCategory(root_other_graph, productionDataArray[key]['amData'], true, graph_name, 'single',productionDataArray[key]['energyData']);
            return false;
        }
    }
});

$(document).on('change', '#timeFilterIntervalMixed', function() {
    let graph_name = $(this).val();
    for (const key in mixedDataArray) {
        console.log('mixedDataArray', mixedDataArray);
        if(graph_name == mixedDataArray[key]['name']) {
            createAmChartCategory(mixed_root, mixedDataArray[key]['amData'], true, graph_name, 'double',productionDataArray[key]['energyData']);
            return false;
        }
    }
});





//blade code for measuring points data start
// const energyData = @json($data['chartsData']);
// const productionData = @json($data['otherGraph']);
// let productionDataTmp = productionData;
// createAmChart(root, energyData, false);

// const mixedData = {...energyData, ...productionData};
// createAmChart(mixed_root, mixedData, false);
// productionAppButtons(productionData);
//end