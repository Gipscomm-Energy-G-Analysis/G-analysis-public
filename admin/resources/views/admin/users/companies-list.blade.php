@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('company.CompanyList') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('company.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('company.CompanyList') }}</li>
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
                        <h3 class="card-title">{{ __('company.CompanyList') }}</h3>
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
                                                <th>{{ __('company.companyName') }}</th>
                                                <th>{{ __('company.surname') }}</th>
                                                <th>{{ __('company.email') }}</th>
                                                <th>{{ __('company.phone') }}</th>
                                                <th>{{ __('company.mobilePhone') }}</th>
                                                <th>{{ __('company.fax') }}</th>
                                                <th>{{ __('company.userName') }}</th>
                                                <th>{{ __('company.DBName') }}</th>
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
                                            ajax: "{{ route('companies-list') }}",
                                            columns: [
                                                {
                                                    data: 'nameMan',
                                                    name: 'nameMan'
                                                },
                                                {
                                                    data: 'vornameAdm',
                                                    name: 'vornameAdm'
                                                },
                                                {
                                                    data: 'emailAdm',
                                                    name: 'emailAdm'
                                                },
                                                {
                                                    data: 'telefonAdm',
                                                    name: 'telefonAdm'
                                                },
                                                {
                                                    data: 'mobiltelefonAdm',
                                                    name: 'mobiltelefonAdm'
                                                },
                                                {
                                                    data: 'faxAdm',
                                                    name: 'faxAdm'
                                                },
                                                {
                                                    data: 'benutzernameAdm',
                                                    name: 'benutzernameAdm'
                                                },
                                                {
                                                    data: 'dbName',
                                                    name: 'dbName',
                                                    orderable: true,
                                                    searchable: true
                                                }
                                            ]

                                        });
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