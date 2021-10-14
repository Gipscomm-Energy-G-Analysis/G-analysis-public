@extends('layout.app')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="offset-md-1 row mb-2">
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
    let graphDataObject = [];
    let graphIds = [];
    let count = 0;
    let type = 'line';
    
    // let chart_data_id = graphData.id;
    const chart_id = 'dynamicChart';
    // let data = graphData.data;
    let label;

    const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const generateColorArray = (length) => {
        
        for (let i = 0; i < length; i++) {
            colorArray.push(getRandomColor());
        }
        return colorArray;
    }

    const lineChartHook = (id, lable, graphDataObject, type, colorArray='rgb(0, 188, 140, 0.2)') => {
        console.log('hereline',graphDataObject);
        $(".main_chart").css("display", "block");
        let ctx = document.getElementById(id).getContext('2d');
        if (myChart) myChart.destroy();
        myChart = new Chart(ctx, {
            type: type,
            data: {
                labels: label,
                datasets: graphDataObject
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
        if(type === 'doughnut' || type === 'pie' || type === 'bar'){
            colorArray = generateColorArray(limit);
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

    

    $(document).on('change', '#select_chart_type, #timeFilter', function() {
        $('.dynamic_title').text($('#select_chart_type option:selected').text());
        getGraphData(graphIds, $('#timeFilter').val(), chart_id);
    });
    
    if(localStorage.getItem('graphData')) {
        let graphData = JSON.parse(localStorage.getItem('graphData'));
        let graphType = localStorage.getItem('graphType');
        console.log('graphType', graphType);
        let colorArray = {'key1':'rgb(0, 188, 140)','key2':'#EEB532', 'key3':'#73A7AF', 'key4': '#E04E51'};
        let count = 1;
        for (const data of graphData) {
            graphIds.push(data.id);
            label = data.label;
            let graphObject = {
                label: `Energy consumption Data for Measuring Point ${count}`,
                data: data.data,
                borderColor: colorArray['key'+count],
                borderWidth: 1,
            };
            graphDataObject.push(graphObject);
            count++;
        }
//        setTimeout(function(){
            lineChartHook(chart_id, label, graphDataObject, graphType);
        // }, 1000)
        
    }

    
</script>
@stop
