<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@include('layouts.header')
<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light  bg-gray">
            <div class="container-fluid">
            <a class="navbar-brand ms-3 me-5" href="{{ url('/') }}"><img src="{{ asset('/assets/images/g_analysis.png') }}" class="logo-analyis" alt="g-analysis"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse mt-1 ms-5" id="navbarSupportedContent">

                <!-- Example single danger button -->
            
                <ul class="navbar-nav mx-auto  fs-6">
                <li class="dropdown nav-item hov-color custom-drop me-3">
                    <a class="nav-link active hov-color" aria-current="page" href="{{ route('evaluations') }}" >Auswertungen</a>
                        <div class="megamenu-panel">
                            <div class="megamenu-lists">
                                <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">Berichte</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                                </ul>
                                <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">Berichte</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                                </ul>

                                <ul class="dropdown-menu drop-custom p-3 ">
                                <h5 class="fs-6 fw-bold ms-3">Berichte</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                        class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                                </ul>
                            </div>
                        </div>
                </li>
                <li class="dropdown nav-item custom-drop me-3">
                    <a class="nav-link hov-color" href="{{ route('basedata') }}">Stammdaten</a>
                        <div class="megamenu-panel">
                            <div class="megamenu-lists">
                            <ul class="dropdown-menu drop-custom p-3 ">
                                <h5 class="fs-6 fw-bold ms-3">Another action</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>
                            <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">Something else here</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>

                            <ul class="dropdown-menu drop-custom p-3 ">
                                <h5 class="fs-6 fw-bold ms-3">One more</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>
                            </div>
                        </div>
                </li>
                <li class="dropdown nav-item custom-drop me-3">
                    <a class="nav-link hov-color" href="{{ route('manually') }}">Manuell</a>
                        <div class="megamenu-panel">
                            <div class="megamenu-lists">
                            <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">Rechteverwaltung</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Energieträger</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>
                            <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">Unternehmensstruktur</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text"  href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>

                            <ul class="dropdown-menu drop-custom p-3 ">
                                <h5 class="fs-6 fw-bold ms-3">Anlagenverwaltung</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>
                            </div>
                        </div>
                </li>
                <li class="dropdown nav-item custom-drop me-3">
                    <a class="nav-link hov-color" href="{{ route('options') }}">Optionen</a>
                        <div class="megamenu-panel">
                            <div class="megamenu-lists">
                            <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">In.Messwerte</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>
                            <ul class="dropdown-menu drop-custom p-3">
                                <h5 class="fs-6 fw-bold ms-3">Ex.Rechnungen</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>

                            <ul class="dropdown-menu drop-custom p-3 ">
                                <h5 class="fs-6 fw-bold ms-3">Schichtdaten</h5>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Berichte</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Another action</a></li>
                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Something else here</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>Separated link</a></li>


                                <li class="nav-item"><a class="nav-link line-inner-side hov-inner-text" href="#"><span
                                    class="br-company-about-detail-sign">-
                                    </span>One more separated link</a></li>
                            </ul>
                            </div>
                        </div>
                </li>
                <li class="nav-item ms-3">
                    <a class="nav-link hov-color" href="{{ route('help') }}">Hilfe</a>
                </li>
                <a class="navbar-brand " href="{{ route('signout') }}"><img src="{{ asset('/assets/images/logout2.png') }}" class="img-fluid" alt="g-analysis"></a>
                </ul>
            
                <a class="navbar-brand text-end" href="#"><img src="{{ asset('/assets/images/config.png') }}" class="img-fluid config-img" alt="g-analysis"></a>
            </div>
            </div>
        </nav>
        <main class="py-4">
            @yield('content')
        </main>
    </div>
@yield('jsSripts')
@include('layouts.scripts')
</body>
@extends('layouts.footer')
</html>
