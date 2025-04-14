      @extends('admin.main-layout')

      @section('content-header')

      <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0">{{ __('menus.mainHeading') }}</h1>
                  </div><!-- /.col -->
                  <div class="col-sm-6">
                      <ol class="breadcrumb float-sm-right">
                          <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('menus.breadcrumb') }}</a></li>
                          <li class="breadcrumb-item active">{{ __('menus.mainHeading') }}</li>
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
                  <form action="{{route('create-menu-form')}}" method="post" id="menu-form">
                      @csrf

                      <div class="card card-secondary">
                          <div class="card-header">
                              <h3 class="card-title">{{ __('menus.mainHeading') }}</h3>
                          </div>

                          <div class="card-body p-0">
                              <div class="main-box-blade p-3">
                                  <div class="row">
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('menus.ParentMenu') }}</label>
                                              <select class="form-control" id="parent_id" name="parent_id">
                                              <option selected value="#">Main Menu</option>
                                                  @foreach($GipscommMenu as $GipscommMenus)
                                                  <option value="{{ $GipscommMenus->id }}"
                                                      {{ old('GipscommMenu') == $GipscommMenus->id ? "selected" :""}}>
                                                      {{ $GipscommMenus->name }}
                                                  </option>
                                                  @endforeach
                                              </select>
                                          </div>
                                      </div>
                                      <div class="col-sm-6">
                                          <div class="form-group">
                                              <label>{{ __('menus.MenuName') }}</label>
                                              <input type="text" class="form-control" placeholder="{{ __('menus.MenuName') }}" id="name"
                                                  name="name" value="{{ old('name') }}">
                                              @error('name')
                                              <label id="name-error" class="error" for="name">{{ $message }}</label>
                                              @enderror
                                          </div>
                                      </div>
                                  </div>
                              </div>

                          </div>
                          <div class="card-sec-submit d-flex justify-content-end">
                              <a href="{{ route('menu-list') }}"><button type="button"
                                      class="btn btn-default mr-2">{{ __('menus.cancel') }}</button></a>
                              <button type="submit" class="btn btn-secondary save-menu float-right">{{ __('menus.submit') }}</button>
                          </div>
                      </div>

                  </form>

              </div>
          </div>
      </section>
      <!-- /.row (main row) -->

      @endsection