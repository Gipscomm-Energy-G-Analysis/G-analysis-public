      @extends('admin.main-layout')

      @section('content-header')

      <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0">{{ __('user-management.mainHeading') }}</h1>
                  </div><!-- /.col -->
                  <div class="col-sm-6">
                      <ol class="breadcrumb float-sm-right">
                          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('user-management.breadcrumb') }}</a></li>
                          <li class="breadcrumb-item active">{{ __('user-management.subBreadcrumb') }}</li>
                      </ol>
                  </div><!-- /.col -->
              </div><!-- /.row -->
          </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
      @endsection
      @section('body')

      <!-- Main row -->
      <section class="main-sec-blade">
          <div class="row">
              <div class="container-fluid">
                  <!-- Add User -->
                  <form action="{{route('submit-form')}}" method="post" id="user-form">
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
                                                      {{ old('Groups') == $group->betrGrp_ID ? "selected" :""}}>
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
                                                      {{ old('mandantenGruppen') == $mandantenGruppens->manGrp_ID ? "selected" :""}}>
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

                                          <div class="form-group">
                                              <label>{{ __('user-management.title') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.title') }}" id="title"
                                                  name="title" value="{{ old('title') }}">
                                              @error('title')
                                              <label id="title-error" class="error" for="title">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('user-management.surname') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.surname') }}" id="surname"
                                                  name="surname" value="{{ old('surname') }}">
                                              @error('surname')
                                              <label id="surname-error" class="error"
                                                  for="surname">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-sm-6">

                                          <div class="form-group">
                                              <label>{{ __('user-management.firstName') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.firstName') }}"
                                                  id="first_name" name="first_name" value="{{ old('first_name') }}">
                                              @error('first_name')
                                              <label id="first_name-error" class="error"
                                                  for="first_name">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('user-management.email') }}</label>
                                              <input type="email" class="form-control" placeholder="{{ __('user-management.email') }}" id="email"
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
                                              <label>{{ __('user-management.phone') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.phone') }}" id="phone"
                                                  name="phone" value="{{ old('phone') }}">
                                              @error('phone')
                                              <label id="phone-error" class="error" for="phone">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('user-management.fax') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.fax') }}" id="fax"
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
                                              <label>{{ __('user-management.mobilePhone') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.mobilePhone') }}"
                                                  id="mobile" name="mobile" value="{{ old('mobile') }}">
                                              @error('mobile')
                                              <label id="mobile-error" class="error" for="mobile">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('user-management.userName') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('user-management.userName') }}"
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
                                              <label>{{ __('user-management.password') }}</label>
                                              <input type="password" class="form-control" placeholder="{{ __('user-management.password') }}"
                                                  id="password" name="password" value="{{ old('password') }}">
                                              @error('password')
                                              <label id="password-error" class="error"
                                                  for="password">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                      <div class="col-sm-6">

                                          <div class="form-group">
                                              <label>{{ __('user-management.confirmPassword') }}</label>
                                              <input type="password" class="form-control" placeholder="{{ __('user-management.confirmPassword') }}"
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
                                              <label>{{ __('user-management.userRole') }}</label>
                                              <select class="form-control" name="user_role" id="user_role"
                                                  class="user_role" name="user_role">
                                                  @foreach($role as $user_role)
                                                  <option value="{{ $user_role->id }}"
                                                      {{ old('user_role') == $user_role->id ? "selected" :""}}>
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
                                      <input class="role-permission-ids" type="hidden"
                                          value="{{ old('rolePermissionIds') }}" name="rolePermissionIds">
                                  </div>
                              </div>
                          </div>
                          <div class="card-sec-submit d-flex justify-content-end">
                          <a href="{{route('user-details')}}"><button type="button" class="btn btn-default mr-2">{{ __('user-management.cancel') }}</button></a>
                              <button type="submit" class="btn btn-secondary save-user float-right">{{ __('user-management.submit') }}</button>
                          </div>
                      </div>

                    </form>

              </div>
          </div>
      </section>
      <!-- /.row (main row) -->
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
      </script>
      @endsection