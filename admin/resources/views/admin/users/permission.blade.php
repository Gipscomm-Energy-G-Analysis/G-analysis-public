@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">{{ __('permission.mainHeading') }}</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('permission.breadcrumb') }}</a></li>
                    <li class="breadcrumb-item active">{{ __('permission.subBreadcrumb') }}</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
@endsection
@section('body')
<!-- Main row -->

<div class="card card-secondary">
    <div class="card-header">
        <h3 class="card-title">{{ __('permission.mainHeading') }}</h3>
    </div>

    <div class="card-body">
        <form action="" method="post">
            <div class="row">
                <div class="col-sm-3">
                    @csrf
                    <div class="form-group">
                        <label>{{ __('permission.Choose') }}</label>
                        <select name="user" class="form-control" id="user">
                            @foreach($data as $details)
                            <option value="user">{{$details->name}}</option>
                            @endforeach
                        </select>
                    </div>
                    <!--  -->

                    <!--  -->
                    <div>
                        @foreach($permission as $permissionss)
                        <input type="checkbox" id='permission' name="permission" value="permission">
                        <label for="permission">{{$permissionss->name}}</label><br>
                        @endforeach
                    </div>
                </div>
            </div>
        </form>
    </div>

</div>

<!-- /.row (main row) -->




@endsection