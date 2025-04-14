@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('user-management.mainEditHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('user-management.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('user-management.subEditBreadcrumb') }}</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
@endsection
@section('body')
<!-- Main row -->
<div class="row">
    <div class="container-fluid">
        <form action="{{ route('update') }}" method="POST" id="edit-user">
            @csrf
            <div class="card card-secondary">
                <div class="card-header">
                    <h3 class="card-title">{{ __('user-management.general') }}</h3>
                </div>

                <div class="card-body p-0">
                    <section class="w-50 p-2 ml-2 ">
                        <div class="row">
                            <div class="col-sm-6">

                                <div class="form-group">
                                    <label>{{ __('user-management.reGroup') }}</label>
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
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>{{ __('user-management.clientGroup') }}</label>
                                    <select class="form-control" id="mandantenGruppen" name="mandantenGruppen">
                                        @foreach($mandantenGruppen as $mandantenGruppens)
                                        <option value="{{ $mandantenGruppens->manGrp_ID }}"
                                            {{ $data->manGrp_ID == $mandantenGruppens->manGrp_ID ? "selected" :""}}>
                                            {{ $mandantenGruppens->name }}
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
                                @if(!empty($data->ben_ID))
                                <input type="hidden" class="form-control" id="hiddem" name="ben_ID"
                                    value="{{$data->ben_ID}}">
                                @else
                                <input type="hidden" class="form-control" id="hiddem" name="adm_ID"
                                    value="{{$data->adm_ID}}">
                                @endif
                                <div class="form-group">
                                    <label>{{ __('user-management.title') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.title') }}" id="title" name="title"
                                        value="{{$data->titel}}">
                                    @error('title')
                                    <label id="title-error" class="error" for="title">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>{{ __('user-management.surname') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.surname') }}" id="surname"
                                        name="surname" value="{{$data->vorname}}">
                                    @error('surname')
                                    <label id="surname-error" class="error" for="surname">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">

                                <div class="form-group">
                                    <label>{{ __('user-management.firstName') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.firstName') }}" id="first_name"
                                        name="first_name" value="{{$data->name}}">
                                    @error('first_name')
                                    <label id="first_name-error" class="error" for="first_name">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>{{ __('user-management.email') }}</label>
                                    @if(!empty($data->eMail))
                                    <input type="email" class="form-control" placeholder="{{ __('user-management.email') }}" id="email"
                                        name="email" value="{{$data->eMail}}">
                                    @error('eMail')
                                    <label id="email-error" class="error" for="email">{{ $message }}</label>
                                    @enderror
                                    @else
                                    <input type="email" class="form-control" placeholder="{{ __('user-management.email') }}" id="email"
                                        name="email" value="{{$data->email}}">
                                    @error('email')
                                    <label id="email-error" class="error" for="email">{{ $message }}</label>
                                    @enderror
                                    @endif

                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">

                                <div class="form-group">
                                    <label>{{ __('user-management.phone') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.phone') }}" id="phone" name="phone"
                                        value="{{$data->telefon}}">
                                    @error('phone')
                                    <label id="phone-error" class="error" for="phone">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>{{ __('user-management.fax') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.fax') }}" id="fax" name="fax"
                                        value="{{$data->fax}}">
                                    @error('fax')
                                    <label id="fax-error" class="error" for="fax">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6">

                                <div class="form-group">
                                    <label>{{ __('user-management.mobilePhone') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.mobilePhone') }}" id="mobile"
                                        name="mobile" value="{{$data->mobiltelefon}}">
                                    @error('mobile')
                                    <label id="mobile-error" class="error" for="mobile">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>{{ __('user-management.userName') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('user-management.userName') }}" id="user_name"
                                        name="user_name" value="{{$data->username}}">
                                    @error('user_name')
                                    <label id="user_name-error" class="error" for="user_name">{{ $message }}</label>
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
                                    <label>{{ __('user-management.userRole') }}</label>
                                    <select class="form-control" name="user_role" id="user_role" class="user_role">
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
                            <h3 class="card-title">{{ __('user-management.rolesAndPermissions') }}</h3>
                        </div>
                        <div class="card-body">
                            <div class="tree">

                            </div>
                            <input class="role-permission-ids" type="hidden" value="{{$UserMenuPermissions}}"
                                name="rolePermissionIds">
                        </div>
                    </div>
                </div>
                <div class="card-sec-submit d-flex justify-content-end">
                    <a href="{{route('user-details')}}"><button type="button"
                            class="btn btn-default mr-2">{{ __('user-management.cancel') }}</button></a>
                    <button type="submit" class="btn btn-secondary save-user float-right">{{ __('user-management.submit') }}</button>
                </div>
            </div>

        </form>
    </div>
</div>
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
});
setTimeout(function() {
    var names = $('.role-permission-ids').val();
    var nameArr = names.split(',');
    console.log(nameArr);
    $('.jstree').jstree(true).select_node(nameArr);
}, 2000);
//$(window).on('load', function () {
//$('#your-tree').jstree(true).select_node(['id-of-node', 'id-of-node2']);
// var names = $('.role-permission-ids').val();
// var nameArr = names.split(',');
// console.log(nameArr);
// $('.jstree').jstree(true).select_node(nameArr);
//});
</script>
@endsection