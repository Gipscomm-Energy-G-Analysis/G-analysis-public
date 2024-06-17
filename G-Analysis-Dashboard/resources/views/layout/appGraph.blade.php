<!DOCTYPE html>
<html lang="en">
<head>
    @include('partials.header')
    @yield('headContent')
</head>
<body class="dark-mode hold-transition layout-top-nav">
<div class="wrapper">


    @yield('content')
    @include('partials.js-bar')

    @yield('jsContent')
    
</div>
</body>
</html>
