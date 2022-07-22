let root = am5.Root.new("chartdiv");
    //historic data start
const createAmChart = (root, chartsData, dispose) => {
    console.log(chartsData);
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
        layout: root.verticalLayout
    })
    );

    var easing = am5.ease.linear;
    chart.get("colors").set("step", 3);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            maxDeviation: 0.1,
            groupData: false,
            baseInterval: {
            timeUnit: "minutes",
            count: 15
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        })
    );

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
        createAxisAndSeries(chartsData[key]['amData'], opposite, graphName, root, chart, xAxis);
        count++;
    }
    var legend = chart.children.push(am5.Legend.new(root, {
    })); 
    legend.data.setAll(chart.series.values);
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}

function createAxisAndSeries(startValue, opposite, name, root, chart, xAxis) {
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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
        am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        legendLabelText: name,
        tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}"
        })
        })
    );

    //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
    series.strokes.template.setAll({ strokeWidth: 1 });

    yRenderer.grid.template.set("strokeOpacity", 0.05);
    yRenderer.labels.template.set("fill", series.get("fill"));
    yRenderer.setAll({
        stroke: series.get("fill"),
        strokeOpacity: 1,
        opacity: 1
    });

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"]
    });
    

    series.data.setAll(startValue);
}


const createAmChartCategory = (root, chartsData, dispose, name, type) => {
    let graphName = name !== undefined?name:0;
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
            layout: root.verticalLayout
        })
    );

    var easing = am5.ease.linear;
    // chart.get("colors").set("step", 3);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "date",
            renderer: am5xy.AxisRendererX.new(root, {})
        })
    );

    xAxis.data.setAll(chartsData);


    var yRenderer = am5xy.AxisRendererY.new(root, {
        opposite: false
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
    console.log('graph_type', type);
    if(type == 'double') {
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: graphName,
                xAxis: xAxis,
                yAxis: yAxis,
                logarithmic: true,
                valueYField: "value",
                categoryXField: "date"
            })
        );
        series.data.setAll(chartsData);
        var series2 = chart.series.push( 
            am5xy.ColumnSeries.new(root, { 
              name: "Energy", 
              xAxis: xAxis, 
              yAxis: yAxis, 
              logarithmic: true,
              valueYField: "value2", 
              categoryXField: "date" 
            }) 
          );
        series2.data.setAll(chartsData);
    } else {
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: graphName,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "date"
            })
        );
        
        series.data.setAll(chartsData);
        series.tooltipText = "{categoryX}: {valueY}";
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

//blade code for measuring points data start
function createTable(chartsData) {
        let cardhtml = '';
        for (const key in chartsData) {
            cardhtml += `<div class="card">
    <div class="card-header" id="headingThree">
            <div class="col-sm-6" data-toggle="collapse" data-target="#${chartsData[key]['name']}" aria-expanded="false" aria-controls="${chartsData[key]['name']}">
                <h5 class="mb-0">
                    ${chartsData[key]['name']}
                </h5>
            </div>
    </div>
    <div id="${chartsData[key]['name']}" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div class="card-body">
            <table class="table table-bordered table-striped dataTable dtr-inline" id="${chartsData[key]['name']}_key">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>`;
            let tableData = chartsData[key]['tableData'];
                for (const len in tableData) {
                    cardhtml += `<tr><td>${len}</td>
                            <td>${chartsData[key]['name']}</td>
                            <td>${tableData[len]['Value']}</td>
                            <td>${tableData[len]['Time']}</td></tr>`;
                }                 
            cardhtml += `</tbody></table></div></div>
                        </div>
                    </div>
                </div>`;
                setTimeout(function(){
                    $(`#${chartsData[key]['name']}_key`).DataTable({
                    "responsive": true, "lengthChange": false, "autoWidth": false,
                    "buttons": ["csv", "excel", "pdf", "print"]
                    }).buttons().container().appendTo(`#${chartsData[key]['name']}_key_wrapper .col-md-6:eq(0)`);
                }, 500);
            
        }
        $('.measuringPointsTable').append(cardhtml);
        
    }


//historic data end
if(localStorage.getItem('graphData')) {
    let graphData = JSON.parse(localStorage.getItem('graphData'));
    let graphType = localStorage.getItem('graphType');
    let graph_name = localStorage.getItem('graph_name');
    if(graphType == 'production') {
        for (const key in graphData) {
            if(graph_name == graphData[key]['name']) {
                createAmChartCategory(root, graphData[key]['amData'], true, graph_name, 'single');
                return false;
            }
        }
    } else if(graphType == 'mixed') {
        for (const key in graphData) {
            if(graph_name == graphData[key]['name']) {
                createAmChartCategory(root, graphData[key]['amData'], true, graph_name, 'double');
                return false;
            }
        }
    } else {
        createAmChart(root, graphData, false);
        createTable(graphData);
    }
    
}