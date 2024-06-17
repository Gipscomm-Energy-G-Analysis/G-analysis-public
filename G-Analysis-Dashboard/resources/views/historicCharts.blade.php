@extends('layout.appGraph',['database' => $databases, 'selectedDatabase' => $selectedDatabase])
@section('content')
<!-- Content Wrapper. Contains page content -->
<style>
    .table thead tr th {
    border: 1px solid black !important;
    color: black;
}

#messstelle1IDAnl_key_filter{
    margin-left: 346px !important;
    margin-top: -15px !important;
}

#messstelle1IDAnl_key_paginate{
    margin-left: 217px !important;
}

#messstelle2IDAnl_key_filter{
    margin-left: 346px !important;
    margin-top: -15px !important;
}

#messstelle2IDAnl_key_paginate{
    margin-left: 217px !important;
}

.table tbody tr td {
    border: 1px solid black !important;
    color: black;
}
</style>
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="offset-md-1 row mb-2">
                <div class="col-sm-4">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{route('product-dashboard')}}">Dashboard</a></li>
                        <li class="breadcrumb-item active">ChartJS</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="offset-md-1 col-md-10">
                    <!-- AREA CHART -->
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title dynamic_title">Line Chart</h3>

                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart">
                                <div id="accordion">
                                <div class="chart" id="chartdiv">
                                
                                </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                </div>
                    <!-- /.card -->
                <!-- /.col (RIGHT) -->
            </div>
            <div class="row">
                <div class="offset-md-1 col-md-10 measuringPointsTable">

                </div>

            </div>
            <!-- /.row -->
        </div>
    </section>
    <!-- /.content -->
</div>
@stop
@section('jsContent')
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="{{asset('template/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
<script src="{{asset('template/plugins/jszip/jszip.min.js')}}"></script>
<script src="{{asset('template/plugins/pdfmake/pdfmake.min.js')}}"></script>
<script src="{{asset('template/plugins/pdfmake/vfs_fonts.js')}}"></script>
<script src="{{asset('template/plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
<script src="{{asset('template/plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>
<!-- Page specific script -->
<style>
    #chartdiv {
      width: 100%;
      height: 500px;
      max-width: 100%;
    }
</style>
<script>
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

//blade code for measuring points data start

    function createTable(chartsData) {
        let cardhtml = '';
        for (const key in chartsData) {
            cardhtml += `<div class="card">
    <div class="card-header collapsed" id="headingThree">
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
        createAmChart(root, graphData, false);
        createTable(graphData);
    }
</script>
@stop
