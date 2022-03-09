@extends('layout.app',['database' => $databases, 'selectedDatabase' => $selectedDatabase])
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content">


                    <div class="row">
                        <div class="col-sm-6 offset-sm-3">
                            <div class="card-body" style="margin-top: 10%;background-color: #445260 !important;border: #ffc107 10px solid;">
                            <div class="error-page">
                                <h2 class="headline text-warning"><i class="fas fa-exclamation-triangle text-warning"></i></h2>
                                <div class="error-content">
                                    <h3>{{$message}}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- /.error-page -->
        </section>
    </div>
@stop
@section('jsContent')
    <!-- Page specific script -->
    <script type="text/javascript">
        $(".manPfad").on("change", function () {
            var dataVal = $(this).val();
            $.ajax({
                type: "POST",
                url: "on-change",
                data: { dbname: dataVal },
                success: function (result) {
                    window.location.reload();
                },
                error: function (result) {
                },
            });
        });
    </script>
@stop
