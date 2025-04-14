@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('super-admin.mainHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('super-admin.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('super-admin.subBreadcrumb') }}</li>
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

            <form action="{{route('super-admin-form')}}" method="post" id="super-admin-form">
                @csrf


                <div class="card card-secondary">
                    <div class="card-header">
                        <h3 class="card-title">{{ __('super-admin.general') }}</h3>
                    </div>

                    <div class="card-body p-0">

                        <div class="main-box-blade p-3">
                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('super-admin.Company') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Company') }}" id="company"
                                            name="company" value="{{ old('company') }}">
                                        @error('company')
                                        <label id="company-error" class="error" for="company">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('super-admin.Numberofemployees') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Numberofemployees') }}"
                                            id="number_of_employees" name="number_of_employees"
                                            value="{{ old('number_of_employees') }}">
                                        @error('number_of_employees')
                                        <label id="number_of_employees-error" class="error"
                                            for="number_of_employees">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('super-admin.Address') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Address') }}" id="address"
                                            name="address" value="{{ old('address') }}">
                                        @error('address')
                                        <label id="address-error" class="error" for="address">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('super-admin.ChiefExecutiveofficer') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.ChiefExecutiveofficer') }}"
                                            id="chief_executive_officer" name="chief_executive_officer"
                                            value="{{ old('chief_executive_officer') }}">
                                        @error('chief_executive_officer')
                                        <label id="chief_executive_officer-error" class="error"
                                            for="chief_executive_officer">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('super-admin.Postcode') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Postcode') }}" id="postcode"
                                            name="postcode" value="{{ old('postcode') }}">
                                        @error('postcode')
                                        <label id="postcode-error" class="error" for="postcode">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('super-admin.Town') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Town') }}" id="town" name="town"
                                            value="{{ old('town') }}">
                                        @error('town')
                                        <label id="town-error" class="error" for="town">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('super-admin.Phone') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Phone') }}" id="sphone"
                                            name="sphone" value="{{ old('sphone') }}">
                                        @error('sphone')
                                        <label id="sphone-error" class="error" for="sphone">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('super-admin.E-mail') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.E-mail') }}" id="e_mail"
                                            name="e_mail" value="{{ old('e_mail') }}">
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-12">

                                <div class="form-group">
                                    <label>{{ __('super-admin.Note') }}</label>
                                    <textarea class="form-control" rows="3" placeholder="{{ __('super-admin.Note') }}" id="note"
                                        name="note">{{{ old('note') }}}</textarea>
                                    @error('sphone')
                                    <label id="note-error" class="error" for="note">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>

                        </div>

                        <!-- end form -->
                        <div class="card card-secondary">
                            <div class="card-header">
                                <h3 class="card-title">{{ __('super-admin.DBs') }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="ml-3">

                        <div class="row">
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-block btn-outline-secondary" data-toggle="modal"
                                    data-target="#modal-lg">{{ __('super-admin.AddClient') }}</button>
                            </div>
                        </div>

                    </div>

                    <!-- table -->
                    <div class="p-3">

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body table-responsive p-0">
                                        <table id="tblMandantenAuswahl_1" class="table table-hover text-nowrap">
                                            <thead class="bg-secondary">
                                                <tr>
                                                    <th>{{ __('super-admin.id') }}</th>
                                                    <th>{{ __('super-admin.name') }}</th>
                                                    <th>{{ __('super-admin.database') }}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="datatbox">
                                                <tr>
                                                    <td colspan="3" class="dataTables_empty text-center">{{ __('super-admin.noData') }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- table end -->


                    <div class=" card-secondary">
                        <div class="card-header">
                            <h3 class="card-title">{{ __('super-admin.DefinitionofSuperAdmins') }}</h3>
                        </div>

                        <div class="card-body p-0">

                            <div class="main-box-blade p-3">
                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.Title') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Title') }}" id="title"
                                                name="title" value="{{ old('title') }}">
                                            @error('title')
                                            <label id="title-error" class="error" for="title">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.Surname') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Surname') }}" id="surname"
                                                name="surname" value="{{ old('surname') }}">
                                            @error('surname')
                                            <label id="surname-error" class="error" for="surname">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.FirstName') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.FirstName') }}"
                                                id="first_name" name="first_name" value="{{ old('first_name') }}">
                                            @error('first_name')
                                            <label id="first_name-error" class="error"
                                                for="first_name">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.E-mail') }}</label>
                                            <input type="email" class="form-control" placeholder="{{ __('super-admin.E-mail') }}" id="email"
                                                name="email" value="{{ old('email') }}">
                                            @error('email')
                                            <label id="email-error" class="error" for="email">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.Phone') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Phone') }}" id="phone"
                                                name="phone" value="{{ old('phone') }}">
                                            @error('phone')
                                            <label id="phone-error" class="error" for="phone">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.Fax') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Fax') }}" id="fax"
                                                name="fax" value="{{ old('fax') }}">
                                            @error('fax')
                                            <label id="fax-error" class="error" for="fax">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.MobilePhone') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.MobilePhone') }}"
                                                id="mobile" name="mobile" value="{{ old('mobile') }}">
                                            @error('mobile')
                                            <label id="mobile-error" class="error" for="mobile">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.UserName') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.UserName') }}"
                                                id="user_name" name="user_name" value="{{ old('user_name') }}">
                                            @error('user_name')
                                            <label id="user_name-error" class="error"
                                                for="user_name">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.Password') }}</label>
                                            <input type="password" class="form-control" placeholder="{{ __('super-admin.Password') }}"
                                                id="password" name="password" value="{{ old('password') }}">
                                            @error('password')
                                            <label id="password-error" class="error"
                                                for="password">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.ConfirmPassword') }}</label>
                                            <input type="password" class="form-control" placeholder="{{ __('super-admin.ConfirmPassword') }}"
                                                id="confirm_password" name="confirm_password"
                                                value="{{ old('confirm_password') }}">
                                            @error('confirm_password')
                                            <label id="confirm_password-error" class="error"
                                                for="confirm_password">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.userRole') }}</label>
                                            <select class="form-control" name="user_role" id="user_role"
                                                class="user_role">
                                                @foreach($role as $user_role)
                                                <option value="{{ $user_role->id }}">{{ $user_role->role_name }}
                                                </option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card card-secondary">
                                <div class="card-header">
                                    <h3 class="card-title">{{ __('super-admin.rolesAndPermissions') }}</h3>

                                </div>
                                <div class="card-body">
                                    <div class="tree">

                                    </div>
                                    <input class="role-permission-ids" type="hidden"
                                        value="{{ old('rolePermissionIds') }}" name="rolePermissionIds">
                                </div>
                            </div>
                        </div>


                        <!-- submit button -->
                        <div class="card-sec-submit d-flex justify-content-end">
                        <a href="{{route('user-details')}}"><button type="button" class="btn btn-default mr-2">{{ __('super-admin.cancel') }}</button></a>
                            <button type="submit" class="btn btn-secondary save-user float-right">{{ __('super-admin.submit') }}</button>
                        </div>
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
                            <th>{{ __('super-admin.id') }}</th>
                            <th>{{ __('super-admin.name') }}</th>
                            <th>{{ __('super-admin.database') }}</th>
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
                            <td colspan="3" class="dataTables_empty text-center">{{ __('super-admin.noData') }}</td>
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
$(document).ready(function() {
    var settings = {
        "url": "{{route('getPermissionMenu')}}",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        //  return response;
        console.log(response);
        // $('.tree').jstree({ 'core' : {
        //     'data' : response
        // } });
        $('.tree').jstree({
            'core': {

                'data': response,

            },
            "plugins": ["wholerow", "checkbox"],
        });
    });

    $(".save-user").click(function() {
        var selectedElmsIds = [];
        var selectedElms = $('.tree').jstree("get_selected", true);
        $.each(selectedElms, function() {
            selectedElmsIds.push(this.id);
        });
        $(".role-permission-ids").val(selectedElmsIds);
    });

    setTimeout(function() {
        var names = $('.role-permission-ids').val();
        var nameArr = names.split(',');
        console.log(nameArr);
        $('.jstree').jstree(true).select_node(nameArr);
    }, 2000);
});
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
</script>
@endsection