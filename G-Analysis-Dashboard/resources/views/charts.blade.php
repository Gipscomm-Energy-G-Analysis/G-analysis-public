@extends('layout.app')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="offset-md-1 row mb-2">
                <div class="col-sm-4">
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">Chart Type</label>
                        <div class="col-sm-9">
                            <select class="form-control" style="width: 100%;" id="select_chart_type">
                                <option selected value="line">Line chart</option>
                                <option value="doughnut">Doughnut chart</option>
                                <option value="pie">Pie chart</option>
                                <option value="bar">Bar chart</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group row">
                        <label class="col-sm-4 col-form-label">No. of Records</label>
                        <div class="col-sm-9">
                            <select class="form-control time_filter" id="timeFilter">
                                <option value="5" selected>5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <ol class="breadcrumb float-sm-right">
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
                                <canvas id="dynamicChart" style="min-height: 250px; height: 550px; max-height: 700px; max-width: 100%;background-color: white;"></canvas>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                </div>
                    <!-- /.card -->

                </div>
                <!-- /.col (RIGHT) -->
            </div>
            <!-- /.row -->
        </div>
    </section>
    <!-- /.content -->
</div>
@stop
@section('jsContent')
<!-- Page specific script -->
<script>
    let myChart;
    let type = 'line';
    let chart_data_id = "{{$chartData['id']}}";
    const chart_id = 'dynamicChart';
    let data = @json($chartData['data']);
    let label = @json($chartData['label']);

    const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const generateColorArray = (length) => {
        let colorArray = [];
        for (let i = 0; i < length; i++) {
            colorArray.push(getRandomColor());
        }
        return colorArray;
    }

    const lineChartHook = (id, label, data, type, colorArray='rgb(0, 188, 140, 0.2)') => {
        $(".main_chart").css("display", "block");
        // $("#not_found_msg").css("display","none");
        let ctx = document.getElementById(id).getContext('2d');
        if (myChart) myChart.destroy();
        myChart = new Chart(ctx, {
            type: type,
            data: {
                labels: label,
                datasets: [{
                    label: `Energy consumption Data`,
                    data: data,
                    backgroundColor: colorArray,
                    borderColor: 'rgb(0, 188, 140)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            color: 'red',
                            display: true,
                            text: 'Server Time'
                        }
                    },
                    y: {
                        title: {
                            color: 'red',
                            display: true,
                            text: 'Power'
                        }
                    }
                }
            }
        })
    }


    const getGraphData = (id, limit, event_id) => {
        let container = document.getElementById('data-card');
        let spinner = new Spinner();
        let type = $('#select_chart_type').val();
        let colorArray;
        if(type === 'doughnut' || type === 'pie'){
            colorArray = generateColorArray(limit);
        } else if(type === 'bar') {
            colorArray = 'rgb(0, 188, 140, 0.2)';
        } else {
            colorArray = 'rgb(0, 188, 140, 0.2)';
        }
        
        spinner.spin(container);
        $.ajax({
            url: '/graph/filter',
            type: 'POST',
            data: {
                measuringPoint: id,
                limit: limit
            },
        }).done(function(response) {
            spinner.stop();
            lineChartHook(event_id, response.label, response.data, type, colorArray);
        });
    }

    lineChartHook(chart_id, label, data, type);

    $(document).on('change', '#select_chart_type, #timeFilter', function() {
        $('.dynamic_title').text($('#select_chart_type option:selected').text());
        getGraphData(chart_data_id, $('#timeFilter').val(), chart_id);
    });
</script>
@stop
