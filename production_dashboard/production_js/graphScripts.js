//OLD code end
let root = am5.Root.new("chartdiv");
let root_other_graph = am5.Root.new("other_graph_div");
let historic_root = am5.Root.new("historyChartdiv");
let product_other_graph = am5.Root.new("product_historyChartdiv");
// let mixed_root = am5.Root.new("mixed_graph_div");
// let mixed_history_graph = am5.Root.new("mixed_historyChartdiv");
// New Code
const createAmChart = (root, chartsData, dispose, xtype="date") => {
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

//create am category charts
const createAmChartCategory = (root, chartsData, dispose, name) => {
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
    chart.get("colors").set("step", 3);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
            categoryField: "label",
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

    var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
        name: graphName,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "label"
    })
    );

    series.data.setAll(chartsData);
    var legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
}

const productionAppButtons = (data) => {
    let appHtml = '';
    for (const key in data) {
        let graphName = data[key]['name'] !== undefined?data[key]['name']:key;
        let first_prod = key == 0? 'first_prod':'';
        appHtml += `<a class="btn btn-app product-app-active ${first_prod}" data_key="${key}"><i class="far fa-chart-bar"></i>${graphName}</a>`;
    }
    $('.production-graph-icons').html(appHtml);
    setTimeout(function(){
        if(appHtml != '') {
            $('.first_prod').trigger('click');
        }
    }, 1000);
}



//blade code for measuring points data start
// const energyData = @json($data['chartsData']);
// const productionData = @json($data['otherGraph']);
// let productionDataTmp = productionData;
// createAmChart(root, energyData, false);

// const mixedData = {...energyData, ...productionData};
// createAmChart(mixed_root, mixedData, false);
// productionAppButtons(productionData);
//end