@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('tenant-group.tenantGroup') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('tenant-group.Dashboard') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('tenant-group.tenantGroup') }}</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
@endsection
@section('body')
<!-- Main row -->
<section class="content sec-user-list">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-secondary">
                    <div class="card-header">
                        <h3 class="card-title">{{ __('tenant-group.tenantGroupList') }}</h3>
                    </div>
                    <div class="card-body">
                        <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12 col-md-6"></div>
                                <div class="col-sm-12 col-md-6"></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-bordered data-table" id="table">
                                        <thead>
                                            <tr>
                                                <th>{{ __('tenant-group.surname') }}</th>
                                                <th>{{ __('tenant-group.abbreviation') }}</th>
                                                <th>{{ __('tenant-group.note') }}</th>
                                                <th>{{ __('tenant-group.action') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                    <script type="text/javascript">
                                    $(function() {
                                        var table = $('.data-table').DataTable({
                                            processing: true,
                                            serverSide: true,
                                            ajax: "{{ route('tenant-group-list') }}",
                                            columns: [{
                                                    data: 'name',
                                                    name: 'name'
                                                },
                                                {
                                                    data: 'kurz',
                                                    name: 'kurz'
                                                },
                                                {
                                                    data: 'notiz',
                                                    name: 'notiz'
                                                },
                                                {
                                                    data: 'action',
                                                    name: 'action',
                                                    orderable: true,
                                                    searchable: true
                                                },
                                            ]
                                        });

                                    });
                                    $(document).on('click', ".confirmation-del", function() {
                                        return confirm('Are you sure you want to delete this Tenant Group?');
                                    });
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection