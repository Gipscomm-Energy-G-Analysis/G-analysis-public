
<style> .u-under{ height:auto !important;}
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
                <div class="row">
                    <div class="col-sm-6">
                        <h1 class="m-0">Dashboard</h1>
                    </div><!-- /.container-fluid -->
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
                </div><!-- /.row -->
            </div>
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        @php $image = 'images/Blasanlage.jpg'; @endphp
        @if(file_exists($data['bildAnl']))
        @php  $image = $data['bildAnl']; @endphp
        @endif
        <section class="content">
            <div class="card card-solid">
                <div class="card-body">
                    <div class="row" id="data-card">
                        <div class="col-12 col-sm-6">
                            <h3 class="d-inline-block d-sm-none">LOWA Men’s Renegade GTX Mid Hiking Boots Review</h3>
                            <div class="col-12">
                                <img src="{{$image}}" class="product-image" alt="Product Image" id="machine-image">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <form class="form-horizontal">
                                <div class="card-body">
                                    <input type="hidden" class="form-control" id="anl_ID"  value="{{$data['anl_ID']}}" >
                                    <div class="form-group row">
                                        <label for="anlage" class="col-sm-2 col-form-label">Anlage</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="anlage" placeholder="Anlage" value="{{$data['anlage']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="programm" class="col-sm-2 col-form-label">Status</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="programm" placeholder="Programm" value="{{$data['programm']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="bestellung" class="col-sm-2 col-form-label">Bestellung</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="bestellung" placeholder="bestellung" value="{{$data['bestellung']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="artikel" class="col-sm-2 col-form-label">Artikel</label>
                                        <div class="col-sm-10">
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
                                        <label for="auftragsmenge" class="col-sm-2 col-form-label">Auftragsmenge</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="auftragsmenge" placeholder="Auftragsmenge" value="{{$data['auftragsmenge']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="gutmenge" class="col-sm-2 col-form-label">Gutmenge</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="gutmenge" placeholder="Gutmenge"  value="{{$data['gutmenge']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="ausschuss" class="col-sm-2 col-form-label">Ausschuss</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="ausschuss" placeholder="Ausschuss" value="{{$data['ausschuss']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="zeit_zyklus" class="col-sm-2 col-form-label">Zeit/Zyklus</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="zeit_zyklus" placeholder="Zeit/Zyklus" value="{{$data['zeit_zyklus']}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="werkzeug" class="col-sm-2 col-form-label">Werkzeug</label>
                                        <div class="col-sm-10">
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
                                        <label for="kavitäten" class="col-sm-2 col-form-label">Kavitäten</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="kavitäten" placeholder="Kavitäten" value="{{$data['kavitäten']}}" readonly>
                                        </div>
                                    </div>
                                    @php $letzte_störung = " "; @endphp
                                    @if($data['programm'] != 'Automatik')
                                        $letzte_störung = $data['letzte_störung'];
                                    @endif
                                    <div class="form-group row">
                                        <label for="letzte_störung" class="col-sm-2 col-form-label">Letzte Störung</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="letzte_störung" placeholder="Letzte Störung" value="{{$letzte_störung}}" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="btn-group w-10" style="position : absolute;bottom:0">
                                            <input type="file" hidden  name="image" class="custom-file-input" id="machineImage">
                                            <!-- <span id="mgs_ta"></span> -->
                                            <span for="exampleInputFile" class="btn btn-success col fileinput-button dz-clickable" id="replace-image-button">
                                                <i class="fas fa-plus"></i>
                                            </span>
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
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-tool" data-card-widget="remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                @if($data['shards'] >= 1)
                    @foreach($data['machineshards'] as $key=>$value)
                    @php $i=0; @endphp
                        @if($value != 0)
                            @foreach($data['shardsData'] as $key1=>$value1)
                                @if($key1 == $key) 
                                <div class="card-body">
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                        <label>Custom Select</label>
                                            <select class="custom-select" id="{{$key}}">
                                                <option value="">Select</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="chart">
                                                <canvas id="barChart{{$i}}" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%; background:#fff;" ></canvas>
                                        </div>
                                    </div>
                                </div>
                                @endif
                                @php $i++; @endphp
                            @endforeach
                        @endif
                    @endforeach
                @endif
                <!-- /.card-body -->

              <!-- LINE CHART -->
        <!-- <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">Line Chart</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse">
                <i class="fas fa-minus"></i>
              </button>
              <button type="button" class="btn btn-tool" data-card-widget="remove">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="chart">
              <div id="lineChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></div>
            </div>
          </div> -->
          <!-- /.card-body -->
        </div>

        
            </div>
                

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
    </div>
@stop
@section('jsContent')
    <script src="{{asset('template/plugins/jsgrid/jsgrid.min.js')}}"></script>
    <script src="{{asset('js/dashboard/dashboard_ajax.js')}}"></script>
    <script src="{{asset('js/dashboard/jsGridMachines.js')}}"></script>
    <script src="{{asset('plugins/uplot/uPlot.iife.min.js')}}"></script>
    <script type="text/javascript">
        let shardsCount = '<?php echo $data['shards'];  ?>';
            if(shardsCount >= 1) {
                let shardsData  = ""; 
                shardsData  += '@foreach($data['machineshards'] as $key=>$value)';
                shardsData  += '@php $i=0; @endphp';
                shardsData  += '@if($value != 0)';
                shardsData  += '@foreach($data['shardsData'] as $key1=>$value1)';
                shardsData  += '@if($key1 == $key) ';
                var areaChartData = {
                        labels  : ['Time Server'],
                        datasets: [
                        {
                            label               : '{{$key}} Chart',
                            backgroundColor     : dynamicColors(),
                            borderColor         : dynamicColors(),
                            pointRadius          : false,
                            pointColor          : '#fff',
                            pointStrokeColor    : '#fff',
                            pointHighlightFill  : '#fff',
                            pointHighlightStroke: dynamicColors(),
                            data                : [{{$value1}}]
                        },
                        ]
                }
                //-------------
                //- BAR CHART -
                //-------------
                var barChartCanvas = $('#barChart{{$i}}').get(0).getContext('2d')
                var barChartData = $.extend(true, {}, areaChartData)
                var temp0 = areaChartData.datasets['{{$i}}']
                barChartData.datasets['{{$i}}'] = temp0
                
                var barChartOptions = {
                    responsive              : true,
                    maintainAspectRatio     : false,
                    datasetFill             : false
                }
                
                new Chart(barChartCanvas, {
                    type: 'bar',
                    data: barChartData,
                    options: barChartOptions
                })
                shardsData  +=  '@endif';
                shardsData  +=  '@php $i++; @endphp';
                shardsData  +=  '@endforeach';
                shardsData  +=  ' @endif';
                shardsData  +=  '@endforeach';
            }    
        
        //     $(function () {
        //     /* uPlot
        //     * -------
        //     * Here we will create a few charts using uPlot
        //     */

        //     function getSize(elementId) {
        //     return {
        //         width: document.getElementById(elementId).offsetWidth,
        //         height: document.getElementById(elementId).offsetHeight,
        //     }
        //     }
        //     let data = [
        //     [0, 1, 2, 3, 4, 5, 6],
        //     [28, 48, 40, 19, 86, 27, 90],
        //     [65, 59, 80, 81, 56, 55, 40]
        //     ];
        //     const optsLineChart = {
        //     ... getSize('lineChart'),
        //     scales: {
        //         x: {
        //         time: false,
        //         },
        //         y: {
        //         range: [0, 100],
        //         },
        //     },
        //     series: [
        //         {},
        //         {
        //         fill: 'transparent',
        //         width: 5,
        //         stroke: 'rgba(60,141,188,1)',
        //         },
        //         {
        //         stroke: '#c1c7d1',
        //         width: 5,
        //         fill: 'transparent',
        //         },
        //     ],
        //     };

        //     let lineChart = new uPlot(optsLineChart, data, document.getElementById('lineChart'));

        //     window.addEventListener("resize", e => {
        //     lineChart.setSize(getSize('lineChart'));
        //     });
        // })

    </script>
    
@stop
