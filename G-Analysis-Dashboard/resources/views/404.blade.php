@extends('layout.app',['database' => $databases, 'selectedDatabase' => $selectedDatabase])
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content">
        <div class="error-page">
          <h2 class="headline text-warning"> 404</h2>
  
          <div class="error-content">
            <h3><i class="fas fa-exclamation-triangle text-warning"></i>{{$message}}</h3>
          </div>
          <!-- /.error-content -->
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
        url: "/on-change",
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
