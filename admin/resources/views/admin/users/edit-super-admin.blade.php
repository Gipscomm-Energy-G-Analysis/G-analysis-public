@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('super-admin.mainEditHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('super-admin.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('super-admin.mainEditHeading') }}</li>
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

            <form action="{{route('update-super-admin-form')}}" method="post" id="edit-super-admin-form">
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
                                            name="company" value="{{$BetreuerGruppen->firma}}">
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
                                            value="{{$BetreuerGruppen->anzahlMitarbeiter}}">
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
                                            name="address" value="{{$BetreuerGruppen->anschrift}}">
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
                                            value="{{$BetreuerGruppen->geschaeftsfuehrer}}">
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
                                            name="postcode" value="{{$BetreuerGruppen->plz}}">
                                        @error('postcode')
                                        <label id="postcode-error" class="error" for="postcode">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('super-admin.Town') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.Town') }}" id="town" name="town"
                                            value="{{$BetreuerGruppen->ort}}">
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
                                            name="sphone" value="{{$BetreuerGruppen->telefon}}">
                                        @error('sphone')
                                        <label id="sphone-error" class="error" for="sphone">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('super-admin.E-mail') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('super-admin.E-mail') }}" id="e_mail"
                                            name="e_mail" value="{{$BetreuerGruppen->eMail}}">
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-12">

                                <div class="form-group">
                                    <label>{{ __('super-admin.Note') }}</label>
                                    <textarea class="form-control" rows="3" placeholder="{{ __('super-admin.Note') }}" id="note"
                                        name="note">{{$BetreuerGruppen->notiz}}</textarea>
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
                                                @if(!empty($editMandanten))
                                                @foreach($editMandanten as $mandantens)
                                                <tr>
                                                    <td><input type='hidden' name='man_ID[]'
                                                            value="{{$mandantens->man_ID}}">{{$mandantens->man_ID}}</td>
                                                    <td>{{$mandantens->nameMan}}</td>
                                                    <td>{{$mandantens->dbName}}</td>
                                                </tr>
                                                @endforeach
                                                @else
                                                <tr>
                                                    <td colspan="3" class="dataTables_empty text-center">{{ __('super-admin.noData') }}</td>
                                                </tr>
                                                @endif
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
                                        <input type="hidden" class="form-control" id="hiddem" name="id"
                                            value="{{$data->sAdm_ID}}">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.Title') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Title') }}" id="title"
                                                name="title" value="{{$data->titelSAdm}}">
                                            @error('titleSAdm')
                                            <label id="titleSAdm-error" class="error" for="titleSAdm">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.Surname') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Surname') }}" id="surname"
                                                name="surname" value="{{$data->vornameSAdm}}">
                                            @error('surnameSAdm')
                                            <label id="surnameSAdm-error" class="error" for="surname">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>{{ __('super-admin.FirstName') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.FirstName') }}"
                                                id="first_name" name="first_name" value="{{$data->nameSAdm}}">
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
                                                name="email" value="{{$data->emailSAdm}}">
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
                                                name="phone" value="{{$data->telefonSAdm}}">
                                            @error('phone')
                                            <label id="phone-error" class="error" for="phone">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.Fax') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.Fax') }}" id="fax"
                                                name="fax" value="{{$data->faxSAdm}}">
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
                                                id="mobile" name="mobile" value="{{$data->mobiltelefonSAdm}}">
                                            @error('mobile')
                                            <label id="mobile-error" class="error" for="mobile">{{ $message }}</label>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>{{ __('super-admin.UserName') }}</label>
                                            <input type="text" class="form-control" placeholder="{{ __('super-admin.UserName') }}"
                                                id="user_name" name="user_name" value="{{$data->username}}">
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
                                        <label>Password</label>
                                        <input type="password" class="form-control" placeholder="Password"
                                            id="password" name="password" value="">
                                        @error('password')
                                        <label id="password-error" class="error" for="password">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input type="password" class="form-control" placeholder="Confirm Password"
                                            id="confirm_password" name="confirm_password">
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
                                                <option value="{{ $user_role->id }}"
                                                    {{ ($data->role == $user_role->id) ? 'selected' : '' }}>
                                                    {{ $user_role->role_name }}
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
                                    <input class="role-permission-ids" type="hidden" value="{{$UserMenuPermissions}}"
                                        name="rolePermissionIds">
                                </div>
                            </div>
                        </div>


                        <!-- submit button -->
                        <div class="card-sec-submit d-flex justify-content-end">
                        <a href="{{route('user-details')}}"><button type="button" class="btn btn-default mr-2">{{ __('super-admin.cancel') }}</button></a>
                            <button type="submit" class="btn btn-secondary save-super-admin-user float-right">{{ __('super-admin.submit') }}</button>
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
                        @foreach($mandanten as $mandanten)
                        <tr>
                            <td><input type='hidden' name='man_ID[]'
                                    value="{{$mandanten->man_ID}}">{{$mandanten->man_ID}}</td>
                            <td>{{$mandanten->nameMan}}</td>
                            <td>{{$mandanten->dbName}}</td>
                        </tr>
                        @endforeach
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

    $(".save-super-admin-user").click(function() {
        var selectedElmsIds = [];
        var selectedElms = $('.tree').jstree("get_selected", true);
        $.each(selectedElms, function() {
            selectedElmsIds.push(this.id);
        });
        $(".role-permission-ids").val(selectedElmsIds);
    });
});
setTimeout(function() {
    var names = $('.role-permission-ids').val();
    var nameArr = names.split(',');
    console.log(nameArr);
    $('.jstree').jstree(true).select_node(nameArr);
}, 2000);
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