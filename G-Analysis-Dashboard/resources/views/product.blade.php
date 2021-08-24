<style>
    .u-under {
        height: auto !important;
    }

    .spinner {
        position: fixed !important;
    }

    .product-image {
        border-radius: 5px;
        margin-top: 12px;
    }

    .form-horizontal .card-body {
        padding-top: 0;
    }

    .form-group {
        margin-bottom: 0.3rem !important;
    }

    .col-form-label {
        line-height: 1 !important;
    }

    .group-label {
        font-weight: normal !important;
        width: 73% !important;
    }

    .add_more_field {
        float: left;
    }

    .popup {
        width: 100%;
        float: left;
        margin-top: 20px;
    }

    .add_group {
        width: 50%;
        float: right;
    }

    .table-bordered td,
    .table-bordered th {
        border: none !important;
    }

    #add_sub {
        float: right;
    }

    .white-border-head thead tr th {
        border: 1px solid white !important;
    }

    .white-border-body tbody tr td {
        border: 1px solid white !important;
    }

    .active-mode {
        color: #00bc8c;
    }

    .deactive-mode {
        color: #dc3545;
    }
    .capital {
        text-transform: capitalize;
    }
</style>
@extends('layout.app')
@section('headContent')
<link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
<link rel="stylesheet" href="{{asset('template/plugins/jsgrid/jsgrid.min.css')}}">
<link rel="stylesheet" href="{{asset('template/plugins/jsgrid/jsgrid-theme.min.css')}}">
@stop
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    @if(!empty($data))
    <div class="row navbar navbar-expand navbar-dark">

        <div class="col-sm-3 view-mode">
            <div class="form-group row">
                <input type="hidden" value="{{$_SESSION['nameDB']}}" ; id="nameDB" />
                <input type="hidden" value="{{$_SESSION['username']}}" ; id="username" />
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
        <div class="col-sm-3 view-mode">
            <div class="form-group row property">
                <label class="col-sm-4 col-form-label">Liegenschaft</label>
                <div class="col-sm-9">
                    <select class="form-control liegenschaft" onchange="getMachineData($('.navigation').attr('data-value'),'current',document.getElementById('select_org').value)" id="select_prop" style="width: 100%;">
                    </select>
                </div>
            </div>
        </div>

        @isset($groupData['groupData'][0])
        <div class="col-sm-3 edit-mode" style="display:none;">
            <div class="form-group row property">
                <label class="col-sm-4 col-form-label">{{$groupData['groupData'][0]->name}}</label>
                <div class="col-sm-9">
                    <select class="form-control groupData" id="select_group_options" style="width: 100%;">
                        <option value="">Select</option>
                        @foreach($groupData['groupData'] as $group)
                        <option value="{{$group->id}}">{{$group->option_name}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>

        <div class="col-sm-3 edit-mode" style="display:none;">
            <div class="form-group row property">
                <label class="col-sm-4 col-form-label">Tables</label>
                <div class="col-sm-9">
                    <select class="form-control tableData" id="select_group_table" style="width: 100%;">
                        <option value="">Select</option>
                        @foreach($tables as $table)
                        <option value="{{$table['TABLE_NAME']}}">{{$table['TABLE_NAME']}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>
        @endisset
        <div class=col-sm-6>
            <nav class="main-header navbar navbar-expand navbar-dark" style="border-bottom:unset;">
                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <div class="fc-toolbar-chunk">
                        <div class="btn-group float-right">
                            <button class="fc-search btn btn-primary" id="searchMachines" type="button" aria-label="search">
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
                        <div class="btn-group float-right" style="margin-right: 50px;font-size: 18px;">
                            <input type="checkbox" id="modeSelector" checked data-toggle="toggle" data-on="View Mode" data-off="Edit Mode" data-onstyle="success" data-offstyle="info">
                        </div>
                    </div>

                </ul>
            </nav>

        </div>
    </div>
    @else
    <div class="content-header">
        <div class="container-fluid">
            <div class="row dashboard">
                <div class="col-sm-6">
                    <h1 class="m-0"></h1>
                </div><!-- /.container-fluid -->
                <h4 style="text-align:center;">{{$message}}</h4>
            </div>
        </div>
    </div>
    @endif
    <!-- /.content-header -->

    <!-- Main content -->

    @if(!empty($data))
    @php $image = 'images/Blasanlage.jpg'; @endphp
    @if(file_exists($data['bildAnl']))
    @php $image = $data['bildAnl']; @endphp
    @endif
    <!-- view mode start-->
    <section class="content view-mode">
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
                            <div class="form-group row" style="    float: right; margin-right: 8px;margin-top: 18px">
                                <div class="btn-group w-10">
                                    <input type="file" hidden name="image" id="machineImage">
                                    <!-- <span id="mgs_ta"></span> -->
                                    <div>
                                        <span for="exampleInputFile" class="btn btn-success col fileinput-button dz-clickable" id="replace-image-button">
                                            <i class="fas fa-plus"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-7">
                            <form class="form-horizontal">
                                <div class="card-body">
                                    <input type="hidden" class="form-control" id="anl_ID" value="{{$data['anl_ID']}}">
                                    <div class="row">
                                        <div class="col-md-6 left_section">
                                            @isset($dynamicData['even'])
                                                @forEach($dynamicData['even'] as $label=>$value)
                                                    <div class="form-group row">
                                                        <div class="col-sm-12">
                                                            <label for="{{$label}}" class="col-form-label capital">{{$label}}</label>
                                                            <input type="text" class="form-control" id="{{$label}}" placeholder="{{$label}}" value="{{$value}}" readonly>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            @endisset
                                        </div>
                                        <div class="col-md-6 right_section">
                                            @isset($dynamicData['odd'])
                                                @forEach($dynamicData['odd'] as $label=>$value)
                                                    <div class="form-group row">
                                                        <div class="col-sm-12">
                                                            <label for="{{$label}}" class="col-form-label capital">{{$label}}</label>
                                                            <input type="text" class="form-control" id="{{$label}}" placeholder="{{$label}}" value="{{$value}}" readonly>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            @endisset
                                        </div>
                                        <div class="popup">
                                            <div class="add_group col-sm-3" data-toggle="modal" data-target="#modal-default">
                                                <button type="button" class="btn btn-block btn-primary" id="add_more_field">Add Custom Fields</button>
                                            </div>
                                            <div class="add_group col-sm-3" data-toggle="modal" data-target="#group-modal" style="margin-right:5px;">
                                                <button type="button" class="btn btn-block btn-primary">Add Group Options</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Data Row -->
                    <!-- Data Row end-->
                </div>
            </div>

        <div class="row">
            <div class="col-12">
              <!-- Custom Tabs -->
              <div class="card">
                <div class="card-header d-flex p-0">
                  <h3 class="card-title p-3">Sub Group Configurations</h3>
                </div><!-- /.card-header -->
                <div class="card-body">
                  <div class="tab-content">
                    <div class="tab-pane active">
                        <div class="row">
                            <div class="col-sm-6 even_sub_data">
                                @isset($subGroupConfig['even'])
                                    @forEach($subGroupConfig['even'] as $label=>$value)
                                        <div class="form-group row">
                                            <div class="col-sm-12">
                                                <label class="col-form-label capital">{{$label}}</label>
                                                <input type="text" class="form-control" placeholder="{{$label}}" value="{{$value}}" readonly>
                                            </div>
                                        </div>
                                    @endforeach
                                @endisset
                            </div>
                            <div class="col-sm-6 odd_sub_data">
                                @isset($subGroupConfig['odd'])
                                    @forEach($subGroupConfig['odd'] as $label=>$value)
                                        <div class="form-group row">
                                            <div class="col-sm-12">
                                                <label class="col-form-label capital">{{$label}}</label>
                                                <input type="text" class="form-control" placeholder="{{$label}}" value="{{$value}}" readonly>
                                            </div>
                                        </div>
                                    @endforeach
                                @endisset
                            </div>
                        </div>
                    </div>
                    <!-- /.tab-pane -->
                  </div>
                  <!-- /.tab-content -->
                </div><!-- /.card-body -->
              </div>
              <!-- ./card -->
            </div>
            <!-- /.col -->
          </div>
        <!-- /.card -->
        <!-- Bar Chart -->
        <div class="card card-success" id="bar_chart" style="display:block;">
            <div class="card-header">
                <h3 class="card-title">Charts</h3>
                <div class="card-tools">
                    {{-- <button type="button" class="btn btn-tool" data-card-widget="collapse">--}}
                    {{-- <i class="fas fa-minus"></i>--}}
                    {{-- </button>--}}
                </div>
            </div>
            <!-- LINE CHART -->
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-2">
                        <div class="form-group">
                            <label>No. of Records</label>
                            <select class="custom-select time_filter" id="timeFilter">
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
                            <select class="custom-select" id="timeFilterInterval">
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
                                    <canvas id="lineChart_{{$key}}" style="background:#F1F6FD;"></canvas>
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
                        <h4 class="modal-title">Add Custom Fields</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="add_label_field">Enter Label Name</label>
                        <input type="text" class="form-control" id="add_label_field">
                        <label for="select_table">Select Table</label>
                        <select class="form-control select_table" onchange="select_table()" id="select_table">
                            <option value="">Select</option>
                            <option value="data_value_15m">data_value_15m</option>
                            <option value="data_value_1m">data_value_1m</option>
                            <option value="data_value_1s">data_value_1s</option>
                            <option value="spiesnet">spiesnet</option>
                            <option value="spiesnetFAs">spiesnetFAs</option>
                        </select>
                        <label for="select_column">Select Column</label>
                        <select class="form-control select_column" id="select_column">
                            <option value="">Select</option>
                        </select>

                        <label for="select_column">Select Primary key</label>
                        <select class="form-control select_primary_column" id="select_primary_column">
                            <option value="">Select</option>
                        </select>

                        <label for="select_column">Select Foreign key</label>
                        <select class="form-control select_foreign_column" id="select_foreign_column">
                            <option value="">Select</option>
                        </select>

                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="save_field">Save changes</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!-- /.modal -->
        @php $groupData = json_decode(json_encode($groupData), true); @endphp
        <div class="modal fade" id="group-modal" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Add Group Options</h4>
                        <input type="hidden" value="{{$groupData['groupData'][0]['eAnl_ID']}}" id="group_id" />
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <section class="content">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">{{$groupData['groupData'][0]['name']}}</h3>
                                    <button type="button" name="add" id="add_sub" class="btn btn-success" id="add_subgroup">Add Subgroup</button>
                                </div>
                                <div class="card-body">
                                    <table class="table table-bordered white-border-head white-border-body" id="dynamic_subgroup_field">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px;">#</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach($groupData['groupData'] as $key=>$options)
                                            @php $key++; @endphp
                                            <tr id="subrow{{$key}}">
                                                @if(isset($options['option_name']))
                                                <td>{{$key}}</td>
                                                <td>
                                                    <div class="form-group ">
                                                        <label for="{{$options['option_name']}}" class="col-form-label group-label">{{$options['option_name']}}</label>
                                                        <input type="hidden" name="sub_group[]" class="form-control name_list" value="{{$options['option_name']}}" />
                                                        <button style="float:right;" type="button" name="remove" id="{{$key}}" class="btn btn-danger btn_delete"><i class="far fa-trash-alt"></i></button>
                                                    </div>
                                                    
                                                </td>

                                                @else
                                                @php $options = explode(',',$options['optionen']); @endphp
                                                @foreach($options as $opt)
                                                <td>{{$key}}</td>
                                                <td>
                                                    <input type="text" name="sub_group[]" placeholder="Enter Subgroup Name" class="form-control name_list" value="{{$opt}}" />

                                                </td>
                                                @endforeach
                                                <td>
                                                    <button type="button" name="remove" id="{{$key}}" class="btn btn-danger btn_delete"><i class="far fa-trash-alt"></i></button>
                                                </td>
                                                @endif
                                            </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>



                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="save_subgroup_options">Save changes</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

        <!-- Modal Start -->
        <div class="modal fade" id="modal-Machine-list">
            <div class="modal-dialog modal-xl" style="max-width: 1800px;">
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
                                <!-- <div class="card-body" style="height: 740px;">
                                    <div id="jsGrid1"></div>
                                </div> -->
                                <table class="table table-bordered white-border-head white-border-body" id="custom_machine_table">
                                    <thead>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
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
    <!-- view mode end-->

    <!-- edit mode start-->
    <section class="content edit-mode" style="display:none;">
        <div class="card card-success">
            <div class="card-header">
                <h3 class="card-title">Edit Sub Group Configrations</h3>
                <div class="card-tools">
                </div>
            </div>
            <div class="card-body">

                <div class="row" id="data-card">
                
                    <div class="col-12 col-sm-12">
                    
                        <form class="form-horizontal">
                            <div class="card-body" id="spin_container">
                                <div class="row hideData">
                                    <div class="alert alert-warning alert-dismissible">
                                        <h5><i class="icon fas fa-exclamation-triangle"></i> Alert!</h5>
                                        No Confugurations for the Sub Group Found!
                                      </div>
                                </div>
                                <div class="showData" style="display: none;">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label>Primary Key</label>
                                            <select class="form-control primary_key_subGroup" id="primary_key_subGroup" style="width: 100%;">
                                                <option value="">Select</option>                                                  
                                            </select>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Foreign Key</label>
                                            <select class="form-control foreign_key_subGroup" id="foreign_key_subGroup" style="width: 100%;">
                                                <option value="">Select</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top: 20px;">
                                        <table class="table table-bordered white-border-head white-border-body" id="configuration_table">
                                            <thead>
                                                <tr>
                                                    <th >Column</th>
                                                    <th>Label</th>
                                                    <th style="width: 10px;">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </table>
                                        <div class="popup">
                                            <div class="col-sm-3" style="margin-right:5px;">
                                                <button type="button" class="btn btn-block btn-primary" id="save_configuration_button">Save Configrations</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- edit mode end-->
    @endif
    <div id="msg" style="display:none; text-align: center; font-size: 25px; font-weight: 800;">
        <span>Record Not Found!</span>
    </div>
</div>
@stop
@section('jsContent')
<script src="{{asset('template/plugins/jsgrid/jsgrid.min.js')}}"></script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
<script src="{{asset('js/dashboard/dashboard_ajax.js')}}"></script>
<script src="{{asset('js/dashboard/jsGridMachines.js')}}"></script>
<script src="{{asset('js/dashboard/dashboardMode.js')}}"></script>
<!-- Bootstrap Switch -->
<script type="text/javascript">
    @if(!empty($data))
        let getChartsDiv = document.querySelectorAll('.main_chart');
        const timeFilterHook = document.getElementById('timeFilter');
        let myChart;
        const lineChartHook = (id, label, data, name) => {
            if (data.length > 0) {
                $(".main_chart").css("display", "block");
                // $("#not_found_msg").css("display","none");
                let ctx = document.getElementById(id).getContext('2d');
                if (myChart) myChart.destroy();
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
            } else {
                $(".main_chart").css("display", "none");
                // $("#not_found_msg").css("display","block");

            }
        }

        const getGraphData = (id, limit, event_id, name) => {
            let container = document.getElementById('data-card');
            let spinner = new Spinner();
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
                lineChartHook(event_id, response.label, response.data, name);
            });
        }

        @foreach($data['chartsData'] as $key => $value)
            lineChartHook('lineChart_{{$key}}', @json($value['label']), @json($value['data']), '{{$key}}');
        @endforeach

        //adding event listener to time filter hook
        timeFilterHook.addEventListener('change', function() {
            let limit = this.value;
            let getChartsDiv = document.querySelectorAll('.main_chart');
            if (getChartsDiv.length > 0) {
                getChartsDiv.forEach((node) => {
                    let id = node.getAttribute('data_value');
                    let name = data_event.split("_").pop();
                    console.log('id', id, 'limit', limit, 'data_event', data_event, 'name', name);
                    getGraphData(id, limit, data_event, name);
                });
            }
        });
        /* END LINE CHART */
    @endif
</script>

@stop