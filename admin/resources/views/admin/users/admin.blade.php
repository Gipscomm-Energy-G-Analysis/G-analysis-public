@extends('admin.main-layout')

@section('content-header')
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Admin</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="{{route('dashboard')}}">Dashboard</a></li>
                    <li class="breadcrumb-item active">Admin</li>
                </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
@endsection
@section('body')
<!-- Main row -->
<section class="main-sec-admin">
    <div class="row">
        <div class="container-fluid">

            <form action="" method="post" id="admin-form">
                @csrf


                <div class="card card-secondary">
                    <div class="card-header">
                        <h3 class="card-title">General</h3>
                    </div>

                    <div class="card-body p-0">
                        <form>
                            <section class="w-50 p-2 ml-2 ">
                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>re Group:</label>
                                            <select class="form-control">
                                                <option>Gypsum Comm Energy</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Client/Group:</label>
                                            <select class="form-control">
                                                <option>Agrodur Group</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div class="main-box-blade p-3">
                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>Title</label>
                                            <input type="text" class="form-control" placeholder="Title ..." id="title"
                                                name="title">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Surname</label>
                                            <input type="text" class="form-control" placeholder="Surname ..."
                                                id="surname" name="surname">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>First Name</label>
                                            <input type="text" class="form-control" placeholder="First Name ..."
                                                id="first_name" name="first_name">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>E-mail</label>
                                            <input type="text" class="form-control" placeholder="E-mail ..." id="email"
                                                name="email">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>Phone</label>
                                            <input type="text" class="form-control" placeholder="Phone ..." id="phone"
                                                name="phone">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>Fax</label>
                                            <input type="text" class="form-control" placeholder="Fax ..." id="fax"
                                                name="fax">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>Mobile Phone</label>
                                            <input type="text" class="form-control" placeholder="Mobile Phone ..."
                                                id="mobile" name="mobile">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label>User Name</label>
                                            <input type="text" class="form-control" placeholder="User Name ..."
                                                id="user_name" name="user_name">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="text" class="form-control" placeholder="Password ..."
                                                id="password" name="password">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </form>
                        <div class="card card-secondary">
                            <div class="card-header">
                                <h3 class="card-title">Roles and Permissions</h3>
                            </div>
                        </div>
                    </div>
                    <div class="card-sec-submit d-flex justify-content-end">
                        <button type="submit" class="btn btn-secondary mr-2">Submit</button>
                        <button type="submit" class="btn btn-default float-right">Cancel</button>
                    </div>
                </div>

            </form>

        </div>
    </div>
</section>

<!-- /.row (main row) -->
@endsection