<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'G-Analysis') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link href="{{ asset('/assets/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/css/bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/css/style.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('/assets/images/favicon.png') }}">
    <!-- Bootstrap Scripts-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link id="mainStyle" type="text/css" rel="stylesheet" href="src/css/main_style.css" media="all">
    <link type="text/css" rel="stylesheet" href="{{ asset('/dist/js/jqueryui/jquery-ui.min.css') }}">
    <link type="text/css" rel="stylesheet" href="{{ asset('/dist/js/jqueryui/jquery-ui.structure.min.css') }}">
    <link type="text/css" rel="stylesheet" href="{{ asset('/dist/js/jqueryui/jquery-ui.theme.css') }}">
    <link type="text/css" rel="stylesheet" href="{{ asset('/dist/js/mathquill/mathquill.css') }}">

    <link href="{{ asset('/dist/css/pace-theme.min.css') }}" rel="stylesheet" />
    <!-- Tree View Script -->
    <link href="src/css/jquery.treeview.css" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!-- Dsashboard  css -->
    
    <!-- plugins:css -->
    <link rel="stylesheet" href="dashboard/vendors/ti-icons/css/themify-icons.css">
    <link rel="stylesheet" href="dashboard/vendors/base/vendor.bundle.base.css">
    <!-- endinject -->
    <!-- plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="dashboard/css/style.css">
    <link rel="stylesheet" href="dashboard/css/custom.css">
    <!-- endinject -->
    <link rel="shortcut icon" href="dashboard/images/G-Analysis/favicon.png" />

    <link rel="stylesheet" href="dashboard/css/jquery.multiselect.css" />
    <!-- 7-9-2021-- -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css"
        rel="stylesheet">
    <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/css/bootstrap-multiselect.css">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="production_dashboard/css/bootstrap-duallistbox.min.css">
    <link rel="stylesheet" href="production_dashboard/css/new.css">
</head>
