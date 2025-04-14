@extends('admin.main-layout')

@section('content-header')

<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('company.mainHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('company.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('company.mainHeading') }}</li>
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
            <form action="{{route('create-company-form')}}" method="post" id="company-form">
                @csrf

                <div class="card card-secondary">
                    <div class="card-header">
                        <h3 class="card-title">{{ __('company.AddCompany') }}</h3>
                    </div>

                    <div class="card-body p-0">
                        <div class="main-box-blade p-3">
                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('company.title') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.title') }}" id="title"
                                            name="title" value="{{ old('title') }}">
                                        @error('title')
                                        <label id="title-error" class="error" for="title">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('company.surname') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.surname') }}" id="surname"
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
                                        <label>{{ __('company.firstName') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.firstName') }}" id="first_name"
                                            name="first_name" value="{{ old('first_name') }}">
                                        @error('first_name')
                                        <label id="first_name-error" class="error"
                                            for="first_name">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('company.email') }}</label>
                                        <input type="email" class="form-control" placeholder="{{ __('company.email') }}" id="email"
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
                                        <label>{{ __('company.phone') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.phone') }}" id="phone"
                                            name="phone" value="{{ old('phone') }}">
                                        @error('phone')
                                        <label id="phone-error" class="error" for="phone">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('company.fax') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.fax') }}" id="fax" name="fax"
                                            value="{{ old('fax') }}">
                                        @error('fax')
                                        <label id="fax-error" class="error" for="fax">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('company.mobilePhone') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.mobilePhone') }}" id="mobile"
                                            name="mobile" value="{{ old('mobile') }}">
                                        @error('mobile')
                                        <label id="mobile-error" class="error" for="mobile">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label>{{ __('company.userName') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.userName') }}" id="user_name"
                                            name="user_name" value="{{ old('user_name') }}">
                                        @error('user_name')
                                        <label id="user_name-error" class="error" for="user_name">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">

                                    <div class="form-group">
                                        <label>{{ __('company.companyName') }}</label>
                                        <input type="text" class="form-control" placeholder="{{ __('company.companyName') }}"
                                            id="companyName" name="companyName" value="{{ old('companyName') }}">
                                        @error('companyName')
                                        <label id="companyName-error" class="error"
                                            for="companyName">{{ $message }}</label>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-sec-submit d-flex justify-content-end">
                        <a href="{{ route('menu-list') }}"><button type="button"
                                class="btn btn-default mr-2">{{ __('company.cancel') }}</button></a>
                        <button type="submit" class="btn btn-secondary save-menu float-right">{{ __('company.submit') }}</button>
                    </div>
                </div>

            </form>

        </div>
    </div>
</section>
<!-- /.row (main row) -->

@endsection