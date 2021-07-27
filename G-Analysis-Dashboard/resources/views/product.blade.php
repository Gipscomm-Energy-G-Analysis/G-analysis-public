
<style> .u-under{ height:auto !important; }
    .spinner { position:fixed !important; }
    .product-image { border-radius: 5px; margin-top: 12px; }
    .form-horizontal .card-body { padding-top: 0; }
    .form-group { margin-bottom: 0.3rem !important; }
    .col-form-label { line-height: 1 !important;}
    .add_more_field { margin-top: 33px; float: left; width: 12%; margin-left: 3px;}
</style>
@extends('layout.app')
@section('headContent')
    <link rel="stylesheet" href="{{asset('template/plugins/jsgrid/jsgrid.min.css')}}">
    <link rel="stylesheet" href="{{asset('template/plugins/jsgrid/jsgrid-theme.min.css')}}">
@stop
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                @if(!empty($data))
                    <div class="row dashboard">
                        <div class="col-sm-6">
                            <h1 class="m-0"></h1>
                        </div><!-- /.container-fluid -->
                        @else
                            <h4 style="text-align:center;">{{$message}}</h4>
                        @endif
                    </div><!-- /.row -->
            </div>
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        @if(!empty($data))
            @php $image = 'images/Blasanlage.jpg'; @endphp
            @if(file_exists($data['bildAnl']))
                @php  $image = $data['bildAnl']; @endphp
            @endif
            <section class="content">
                <div class="row">
                    <div class="col-sm-3">
                        <div class="form-group row">
                            <input type="hidden" value= "{{$_SESSION['nameDB']}}"; id="nameDB" />
                            <label class="col-sm-4 col-form-label">Organisation</label>
                            <div class="col-sm-9">
                                <select class="form-control organisation" onchange="select_org()" style="width: 100%;" id="select_org">
                                    <option value="">Select</option>
                                    @foreach($org as $key=>$value)
                                        @if($key==0)
                                            <option value="{{$value['org_ID']}}" selected>{{$value['nameOrg']}}</option>
                                        @else
                                            <option value="{{$value['org_ID']}}">{{$value['nameOrg']}}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="form-group row property">
                            <label class="col-sm-4 col-form-label">Liegenschaft</label>
                            <div class="col-sm-9">
                                <select class="form-control liegenschaft" onchange="getMachineData($('.navigation').attr('data-value'),'current',document.getElementById('select_org').value)" id="select_prop" style="width: 100%;">
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="fc-toolbar-chunk">
                            <div class="btn-group float-right">
                                <button class="fc-search btn btn-primary" id="searchMachines" type="button" aria-label="search" >
                                    <span class="fa fa-search"></span>
                                </button>
                            </div>
                            <div class="btn-group float-right mr-3 navigation" data-value="{{$data['anl_ID']}}">
                                <button class="fc-step-backward btn btn-primary" type="button" event-type="first" aria-label="prev">
                                    <span class="fa fa-step-backward"></span>
                                </button>
                                <button class="fc-prev-button btn btn-primary" type="button" event-type="prev" aria-label="prev">
                                    <span class="fa fa-chevron-left"></span>
                                </button>
                                <button class="fc-next-button btn btn-primary" type="button" event-type="next" aria-label="next">
                                    <span class="fa fa-chevron-right"></span>
                                </button>
                                <button class="fc-step-forward btn btn-primary" type="button" event-type="last" aria-label="next">
                                    <span class="fa fa-step-forward"></span>
                                </button>
                            </div>
                        </div>
                    </div><!-- /.col -->
                </div>
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Dashboard</h3>
                        <div class="card-tools">
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row" id="data-card">
                            <div class="col-12 col-sm-5">
                                <div class="col-12">
                                    <img src="{{$image}}" class="product-image" alt="Product Image" id="machine-image">
                                </div>
                                <div class="form-group row" style= "    float: right; margin-right: 8px;margin-top: 18px">
                                    <div class="btn-group w-10" >
                                        <input type="file" hidden  name="image"  id="machineImage">
                                        <!-- <span id="mgs_ta"></span> -->
                                        <span for="exampleInputFile" class="btn btn-success col fileinput-button dz-clickable" id="replace-image-button">
                                            <i class="fas fa-plus"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-7">
                                <form class="form-horizontal">
                                    <div class="card-body">
                                        <input type="hidden" class="form-control" id="anl_ID"  value="{{$data['anl_ID']}}" >
                                        <div class="row">
                                            <div class="col-md-6 left_section">
                                                <div class="form-group row">
                                                    <!-- <label for="anlage" class="col-sm-2 col-form-label">Anlage</label> -->
                                                    <div class="col-sm-12">
                                                        <label for="anlage" class="col-form-label">Anlage</label>
                                                        <input type="text" class="form-control" id="anlage" placeholder="Anlage" value="{{$data['anlage']}}" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <!-- <label for="programm" class="col-sm-2 col-form-label">Status</label> -->
                                                    <div class="col-sm-12">
                                                        <label for="programm" class="col-form-label">Status</label>
                                                        <input type="text" class="form-control" id="programm" placeholder="Programm" value="{{$data['programm']}}" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <!-- <label for="bestellung" class="col-sm-2 col-form-label">Bestellung</label> -->
                                                    <div class="col-sm-12">
                                                        <label for="bestellung" class="col-form-label">Bestellung</label>
                                                        <input type="text" class="form-control" id="bestellung" placeholder="bestellung" value="{{$data['bestellung']}}" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <!-- <label for="artikel" class="col-sm-2 col-form-label">Artikel</label> -->
                                                    <div class="col-sm-12">
                                                        <label for="artikel" class="col-form-label">Artikel</label>
                                                        <input type="text" class="form-control" id="artikel" placeholder="Artikel" value="{{$data['artikel']}}" readonly>
                                                    </div>
                                                </div>
                                            <!-- <div class="form-group row">
                                                        <label for="bisher_produziert" class="col-sm-2 col-form-label">Bisher produziert</label>
                                                        <div class="col-sm-10">
                                                            <input type="text" class="form-control" id="bisher_produziert" placeholder="Bisher produziert" value="{{$data['bisher_produziert']}}" readonly>
                                                        </div>
                                                    </div> -->
                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="gutmenge" class="col-form-label">Gutmenge</label>
                                                        <input type="text" class="form-control" id="gutmenge" placeholder="Gutmenge"  value="{{$data['gutmenge']}}" readonly>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="ausschuss" class="col-form-label">Ausschuss</label>
                                                        <input type="text" class="form-control" id="ausschuss" placeholder="Ausschuss" value="{{$data['ausschuss']}}" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 right_section">
                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="auftragsmenge" class="col-form-label">Auftragsmenge</label>
                                                        <input type="text" class="form-control" id="auftragsmenge" placeholder="Auftragsmenge" value="{{$data['auftragsmenge']}}" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="zeit_zyklus" class="col-form-label">Zeit/Zyklus</label>
                                                        <input type="text" class="form-control" id="zeit_zyklus" placeholder="Zeit/Zyklus" value="{{$data['zeit_zyklus']}}" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="werkzeug" class="col-form-label">Werkzeug</label>
                                                        <input type="text" class="form-control" id="werkzeug" placeholder="Werkzeug" value="{{$data['werkzeug']}}" readonly>
                                                    </div>
                                                </div>
                                                <!-- <div class="form-group row">
                                                    <label for="artikel_stunde" class="col-sm-2 col-form-label">Artikel/Stunde</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" class="form-control" id="artikel_stunde" placeholder="Artikel/Stunde" readonly>
                                                    </div>
                                                </div> -->
                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="kavitäten" class="col-form-label">Kavitäten</label>
                                                        <input type="text" class="form-control" id="kavitäten" placeholder="Kavitäten" value="{{$data['kavitäten']}}" readonly>
                                                    </div>
                                                </div>
                                                @php $letzte_störung = " "; @endphp
                                                @if($data['programm'] != 'Automatik')
                                                    $letzte_störung = $data['letzte_störung'];
                                                @endif
                                                <div class="form-group row">
                                                    <div class="col-sm-12">
                                                        <label for="letzte_störung" class="col-form-label">Letzte Störung</label>
                                                        <input type="text" class="form-control" id="letzte_störung" placeholder="Letzte Störung" value="{{$letzte_störung}}" readonly>
                                                    </div>
                                                </div>
                                                <div class="add_more_field" data-toggle="modal" data-target="#modal-default">
                                                    <span for="exampleInputFile" class="btn btn-success col fileinput-button dz-clickable" id="replace-image-button">
                                                        <i class="fas fa-plus"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- /.card -->
                <!-- Bar Chart -->
                <div class="card card-success" id="bar_chart" style="display:block;">
                    <div class="card-header">
                        <h3 class="card-title">Charts</h3>
                        <div class="card-tools">
                            {{--                            <button type="button" class="btn btn-tool" data-card-widget="collapse">--}}
                            {{--                                <i class="fas fa-minus"></i>--}}
                            {{--                            </button>--}}
                        </div>
                    </div>
                    <!-- LINE CHART -->
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>No. of Records</label>
                                    <select class="custom-select time_filter" id="timeFilter" >
                                        <option value="5" selected>5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>Time Interval</label>
                                    <select class="custom-select" id="timeFilterInterval" >
                                        <option value="1">1 Minutes</option>
                                        <option value="5">5 Minutes</option>
                                        <option value="10">10 Minutes</option>
                                        <option value="15" selected>15 Minutes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row" id="graph_div">
                            @foreach($data['chartsData'] as $key=>$value)
                                @if($value['record'])
                                    <div class="col-sm-6 main_chart" data_value="{{$value['id']}}" data_event="lineChart_{{$key}}">
                                        <div class="card card-info">
                                            <div class="card-header">
                                                <h3 class="card-title">Line Chart for {{$key}}</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="chart">
                                                    <canvas id="lineChart_{{$key}}" style="background:#F1F6FD;" ></canvas>
                                                </div>
                                            </div>
                                            <!-- /.card-body -->
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                            <div id="not_found_msg" style="display:none;">
                                <span>Record Not Found!</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="modal-default">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title">Add More Fields</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            <label for="add_label_field">Enter Label Name</label>
                                <input type="text" class="form-control" id="add_label_field" >
                            <label for="select_table">Select Table</label>
                                <select class="form-control select_table" onchange="select_table()"  id="select_table">
                                        <option value="">Select</option>
                                        @foreach($tables as $key => $value)
                                            <option value="{{$value['TABLE_NAME']}}">{{$value['TABLE_NAME']}}</option>
                                        @endforeach
                                </select>
                            <label for="select_column">Select Column</label>
                            <select class="form-control select_column" id="select_column">
                                    <option value="">Select</option>       
                            </select>

                        </div>
                        <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->

                <!-- Modal Start -->
                <div class="modal fade" id="modal-Machine-list">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Anlagen</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <section class="content">
                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">Anlagen Table Data</h3>
                                        </div>
                                        <!-- /.card-header -->
                                        <div class="card-body" style="height: 740px;">
                                            <div id="jsGrid1"></div>
                                        </div>
                                        <!-- /.card-body -->
                                    </div>
                                    <!-- /.card -->
                                </section>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- Modal End -->

            </section>
            <!-- /.content -->
        @endif
        <div id="msg" style="display:none; text-align: center; font-size: 25px; font-weight: 800;">
            <span>Record Not Found!</span>
        </div>
    </div>


@stop
@section('jsContent')
    <script src="{{asset('template/plugins/jsgrid/jsgrid.min.js')}}"></script>
    <script src="{{asset('js/dashboard/dashboard_ajax.js')}}"></script>
    <script src="{{asset('js/dashboard/jsGridMachines.js')}}"></script>
    <script type="text/javascript">
        @if(!empty($data))
        let getChartsDiv = document.querySelectorAll('.main_chart');
        const timeFilterHook = document.getElementById('timeFilter');
        let myChart;
        const lineChartHook = (id, label, data , name) => {
            if(data.length > 0){
                $(".main_chart").css("display","block");
                // $("#not_found_msg").css("display","none");
                let ctx = document.getElementById(id).getContext('2d');
                if(myChart) myChart.destroy();
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: label,
                        datasets: [{
                            label: `Energy consumption for ${name}`,
                            data: data,
                            backgroundColor: 'rgb(0, 188, 140, 0.2)',
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
            else{
                $(".main_chart").css("display","none");
                // $("#not_found_msg").css("display","block");

            }
        }

        const getGraphData = (id, limit, event_id, name) => {
            let container = document.getElementById('data-card');
            let spinner = new Spinner();
            spinner.spin(container);
            $.ajax({
                url:'/graph/filter',
                type: 'POST',
                data: {
                    measuringPoint:id,
                    limit:limit
                },
            }).done( function(response) {
                spinner.stop();
                lineChartHook(event_id, response.label, response.data, name);
            });
        }

        @foreach($data['chartsData'] as $key=>$value)
        lineChartHook('lineChart_{{$key}}', @json($value['label']), @json($value['data']), '{{$key}}');
        @endforeach

        //adding event listener to time filter hook
        timeFilterHook.addEventListener('change', function(){
            let limit = this.value;
            let getChartsDiv = document.querySelectorAll('.main_chart');
            if(getChartsDiv.length > 0) {
                getChartsDiv.forEach((node)=>{
                    let id = node.getAttribute('data_value');
                    let data_event = node.getAttribute('data_event');
                    let name = data_event.split("_").pop();
                    console.log('id',id,'limit',limit,'data_event',data_event,'name',name);
                    getGraphData(id, limit, data_event, name);
                });
            }
        });
        /* END LINE CHART */

        @endif
    </script>

@stop
