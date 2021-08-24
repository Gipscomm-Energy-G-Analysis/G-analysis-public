<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.header')
    @yield('headContent')
</head>
<body class="dark-mode hold-transition layout-top-nav">
<div class="wrapper">
    @include('partials.preloader')
    @include('partials.top-nav')
    @include('partials.sidebar')

    @yield('content')
    @include('partials.js-bar')

    @yield('jsContent')
    
</div>
<!-- @include('partials.footer') -->
</body>
</html>
