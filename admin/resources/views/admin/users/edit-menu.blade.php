@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('menus.mainEditHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('menus.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('menus.subEditBreadcrumb') }}</li>
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
        <form action="{{ route('update-menu') }}" method="POST" id="edit-menu">
            @csrf
            <div class="card card-secondary">
                <div class="card-header">
                    <h3 class="card-title">{{ __('menus.subEditBreadcrumb') }}</h3>
                </div>

                <div class="card-body p-0">
                    <div class="main-box-blade p-3">
                        <div class="row">
                            <div class="col-sm-6">
                                <input type="hidden" class="form-control" id="hiddem" name="id" value="{{$data->id}}">
                                <div class="form-group">
                                    <label>{{ __('menus.ParentMenu') }}</label>
                                    <select class="form-control" id="parent_id" name="parent_id">
                                        <option selected value="#">Main Menu</option>
                                        @foreach($GipscommMenu as $GipscommMenus)
                                        <option value="{{ $GipscommMenus->id }}"
                                            {{ ($data->parent_id == $GipscommMenus->id) ? "selected" :""}}>
                                            {{ $GipscommMenus->name }}
                                        </option>
                                        @endforeach
                                    </select>
                                    @error('parent_id')
                                    <label id="parent_id-error" class="error" for="name">{{ $message }}</label>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>{{ __('menus.MenuName') }}</label>
                                    <input type="text" class="form-control" placeholder="{{ __('menus.MenuName') }}" id="name"
                                        name="name" value="{{$data->name}}">
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

@endsection