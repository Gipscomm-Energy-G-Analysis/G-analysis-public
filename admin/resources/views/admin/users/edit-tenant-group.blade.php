@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('tenant-group.mainEditHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('tenant-group.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('tenant-group.mainEditHeading') }}</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
@endsection
@section('body')

<section class="main-sec-admin">
    <!-- Main row -->
    <div class="row">
        <div class="container-fluid">

            <form action="{{route('update-tenant-group-form')}}" method="post" id="update-tenant-form">
                @csrf
                <div class="card card-secondary">
                    <div class="card-header">
                        <h3 class="card-title">{{ __('tenant-group.general') }}</h3>
                    </div>

                    <div class="card-body p-0">
                        <section class="w-50 p-2 ml-2 ">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('tenant-group.reGroup') }}</label>
                                        <select class="form-control" id="groups" name="groups">
                                            @foreach($groups as $group)
                                            <option value="{{ $group->betrGrp_ID }}"
                                                {{ $data->betrGrp_ID == $group->betrGrp_ID ? "selected" :""}}>
                                                {{ $group->firma }}
                                            </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div class="main-box-blade p-3">
                            <div class="row">
                                <div class="col-sm-6">
                                    <input type="hidden" class="form-control" id="hiddem" name="id"
                                        value="{{$data->manGrp_ID}}">
                                    <div class="form-group">
                                        <label>{{ __('tenant-group.surname') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('tenant-group.surname') }}" id="surname"
                                            name="surname" value="{{$data->name}}">
                                        @error('surname')
                                        <label id="surname-error" class="error" for="surname">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('tenant-group.abbreviation') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('tenant-group.abbreviation') }}"
                                            id="abbreviation" name="abbreviation" value="{{$data->kurz}}">
                                        @error('abbreviation')
                                        <label id="abbreviation-error" class="error"
                                            for="abbreviation">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="add-client-sec">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="add-inner ">
                                            <div class="ml-3">
                                                <div class="row">
                                                    <div class="col-sm-3">
                                                        <button type="button"
                                                            class="btn btn-block btn-outline-secondary"
                                                            data-toggle="modal" data-target="#modal-lg">{{ __('tenant-group.addClient') }}</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row p-3">
                                                <div class="col-sm-2">
                                                    <button type="button" id="copy"
                                                        class="btn btn-default float-left">{{ __('tenant-group.copyBtn') }}</button>
                                                </div>
                                                <div class="col-sm-3">
                                                    <button type="button" id="csv" class="btn btn-default float-left"
                                                        onclick="exportTableToCSV('g-analysis.csv')">{{ __('tenant-group.csvBtn') }}</button>
                                                </div>
                                                <div class="col-sm-3">
                                                    <button type="button" id="print"
                                                        class="btn btn-default float-left">{{ __('tenant-group.pressBtn') }}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- table -->
                            <div class="">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card box-shadow">
                                            <div class="card-body table-responsive p-0">
                                                <table id="tblMandantenAuswahl_1" class="table table-hover text-nowrap">
                                                    <thead class=" bg-secondary">
                                                        <tr>
                                                            <th>{{ __('tenant-group.id') }}</th>
                                                            <th>{{ __('tenant-group.name') }}</th>
                                                            <th>{{ __('tenant-group.database') }}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="datatbox">
                                                        @if(!empty($editMandanten))
                                                        @foreach($editMandanten as $mandantens)
                                                        <tr class="idmain-box">
                                                            <td><input type='hidden' name='man_ID[]'
                                                                    value="{{$mandantens->man_ID}}">{{$mandantens->man_ID}}
                                                            </td>
                                                            <td>{{$mandantens->nameMan}}</td>
                                                            <td>{{$mandantens->dbName}}</td>
                                                        </tr>
                                                        @endforeach
                                                        @else
                                                        <tr>
                                                            <td colspan="3" class="dataTables_empty text-center">{{ __('tenant-group.noData') }}</td>
                                                        </tr>
                                                        @endif
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row">
                                <div class="col-8">
                                    <div class="dataTables_info" id="example1_info" role="status" aria-live="polite">
                                        Showing
                                        1 to 10 of 57 entries</div>
                                </div>

                                <div class="col-4 ">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <button type="button" class="btn btn-block btn-light">Previous</button>
                                        </div>
                                        <div class="col-sm-6">
                                            <button type="button" class="btn btn-block btn-light">Next</button>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>{{ __('tenant-group.note') }}</label>
                                    <textarea class="form-control" rows="3" placeholder="{{ __('tenant-group.note') }}"
                                        name="note">{{$data->notiz}}</textarea>
                                </div>
                            </div>

                            <!-- table end -->
                            <div class="card-sec-submit d-flex justify-content-end">
                                <a href="{{route('tenant-group-list')}}"><button type="button" class="btn btn-default mr-2">{{ __('tenant-group.cancel') }}</button></a>
                                <button type="submit" class="btn btn-secondary edit-tenant-group float-right">{{ __('tenant-group.submit') }}</button>
                            </div>
                        </div>
            </form>
        </div>
    </div>
</section>
<!-- /.row (main row) -->
<!------Modal popup start-------->
<div class="modal fade" id="modal-lg" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <!-- <h4 class="modal-title">Large Modal</h4> -->
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <table id="tblMandantenAuswahl_2"
                    class="stripe hover row-border compact dt-left custom dataTable no-footer" style="width: 100%;"
                    role="grid" aria-describedby="tblMandantenAuswahl_info">
                    <thead>
                        <tr>
                            <th>{{ __('tenant-group.id') }}</th>
                            <th>{{ __('tenant-group.name') }}</th>
                            <th>{{ __('tenant-group.database') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($mandanten as $mandanten)
                        <tr>
                            <td><input type='hidden' name='man_ID[]'
                                    value='{{$mandanten->man_ID}}'>{{$mandanten->man_ID}}</td>
                            <td>{{$mandanten->nameMan}}</td>
                            <td>{{$mandanten->dbName}}</td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="3" class="dataTables_empty text-center">{{ __('tenant-group.noData') }}</td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
            <div class="modal-footer justify-content-between">
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-secondary">Save changes</button> -->
            </div>
        </div>

    </div>

</div>
<!------Modal popup end-------->
<script>
//add row in table     
$("td").on("dblclick", function() {
    $(".dataTables_empty").closest('tr').remove();
    var currTable = $(this).closest("table").attr("id");
    destinationTable = (currTable.match(/1/)) ? "#tblMandantenAuswahl_2" : "#tblMandantenAuswahl_1";
    $(destinationTable).append($(this).parent());
    $('#modal-lg').modal('hide');
    if ($('#tblMandantenAuswahl_1 tbody tr').length == 0) {
        $('#tblMandantenAuswahl_1 tbody').append(
            '<tr><td colspan="3" class="dataTables_empty text-center">No data available in table</td></tr>');
    }
});
//end add row in table
</script>
@endsection