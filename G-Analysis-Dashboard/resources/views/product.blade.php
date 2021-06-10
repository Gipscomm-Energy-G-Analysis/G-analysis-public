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
            <section class="content">
                <div class="card card-solid">
                    <div class="card-body">
                        <div class="row" id="data-card">
                            <div class="col-12 col-sm-6">
                                <h3 class="d-inline-block d-sm-none">LOWA Men’s Renegade GTX Mid Hiking Boots Review</h3>
                                <div class="col-12">
                                    <img src="images/Blasanlage.jpg" class="product-image" alt="Product Image">
                                </div>
                            </div>
                            <div class="col-12 col-sm-6">
                                <form class="form-horizontal">
                                    <div class="card-body">
                                        <div class="form-group row">
                                            <label for="Anlage" class="col-sm-2 col-form-label">Anlage</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="anlage" placeholder="Anlage" value="{{$data['anlage']}}">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="Programm" class="col-sm-2 col-form-label">Programm</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="programm" placeholder="Programm" value="{{$data['programm']}}">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="Artikel" class="col-sm-2 col-form-label">Artikel</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="artikel" placeholder="Artikel" value="{{$data['artikel']}}">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="Bisher_produziert" class="col-sm-2 col-form-label">Bisher produziert</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="bisher_produziert" placeholder="Bisher produziert" value="{{$data['bisher_produziert']}}">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="Zeit/Zyklus" class="col-sm-2 col-form-label">Zeit/Zyklus</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="zeit_zyklus" placeholder="Zeit/Zyklus" value="{{$data['zeit_zyklus']}}">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="Artikel/Stunde" class="col-sm-2 col-form-label">Artikel/Stunde</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="artikel_stunde" placeholder="Artikel/Stunde">
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="Letzte Störung" class="col-sm-2 col-form-label">Letzte Störung</label>
                                            <div class="col-sm-10">
                                                <input type="text" class="form-control" id="letzte_störung" placeholder="Letzte Störung" value="{{$data['letzte_störung']}}">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-body -->
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
    @stop
