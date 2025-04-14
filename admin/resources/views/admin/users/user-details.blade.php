@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('user-management.Users') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('user-management.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('user-management.Users') }}</li>
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
                        <h3 class="card-title">{{ __('user-management.userList') }}</h3>
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
                                                <th>{{ __('user-management.surname') }}</th>
                                                <th>{{ __('user-management.email') }}</th>
                                                <th>{{ __('user-management.phone') }}</th>
                                                <th>{{ __('user-management.userName') }}</th>
                                                <th>{{ __('user-management.userRole') }}</th>
                                                <th>{{ __('user-management.action') }}</th>
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
                                            ajax: "{{ route('user-details') }}",
                                            columns: [{
                                                    data: 'name',
                                                    name: 'name'
                                                },
                                                {
                                                    data: 'eMail',
                                                    name: 'eMail'
                                                },
                                                {
                                                    data: 'telefon',
                                                    name: 'telefon'
                                                },
                                                {
                                                    data: 'username',
                                                    name: 'username'
                                                },
                                                {
                                                    data: 'role',
                                                    name: 'role'
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
                                        return confirm('Are you sure you want to delete this user?');
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