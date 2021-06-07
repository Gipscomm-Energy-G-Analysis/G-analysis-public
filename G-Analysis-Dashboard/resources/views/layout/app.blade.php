<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.header')
    @yield('headContent')
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
    //loading html
    @include('partials.preloader')
    //top navigation
    @include('partials.top-nav')
    //side-bar navigation
    @include('partials.sidebar')

    @yield('content')
    //common js
    @include('partials.js-bar')

    @yield('jsContent')
    //footer html
    @include('partials.footer')
</div>
</body>
</html>
