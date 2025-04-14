@extends('layouts.app')
@section('content')
  <section class="main-allgemein mt-5 position-relative">
    <button class="Production-sec">Produktion</button>
    <div class="toggleswitch">
      <input type="checkbox" name="toggleswitch" class="toggleswitch-checkbox" id="myonoffswitch" checked>
      <label class="toggleswitch-label" for="myonoffswitch">
        <span class="toggleswitch-inner"></span>
        <span class="toggleswitch-switch"></span>
      </label>
    </div>

    <div class="main-box">
      <div class="container">
        <div class="p-2">
          <div class="row">
            <div class="col-lg-4">
              <div class="Organisation-sec">
                <form action="/action_page.php">
                  <label class="fs-12" for="Organisation">Organisation:</label>
                  <select class="fs-12" name="organisation" id="organisation">
                    <option value="">Please Select</option>
                    <option value="1" selected="">Agrodur Grosalski</option>
                  </select>
                </form>
              </div>

            </div>
            <div class="col-lg-4">
              <div class="text-end Organisation-sec">
                <form action="/action_page.php">
                  <label class="fs-12" for="property-data">Liegenschaft:</label>
                  <select class="fs-12 Organisation-sec" name="property-data" id="property-data">
                    <option value="">Please Select</option>
                    <option value="1" selected="">Agro-Bad Berleburg</option>
                    <option value="2">Agro-Radevormwald</option>
                  </select>
                </form>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="icon text-end">
                <span><img src="{{ asset('/assets/images/first.png') }}" class="img-fluid w-17" alt="first"></span>
                <span><img src="{{ asset('/assets/images/previous.png') }}" class="img-fluid w-17 me-2" alt="previous"></span>
                <span><img src="{{ asset('/assets/images/next.png') }}" class="img-fluid w-17 ms-2" alt="next"></span>
                <span><img src="{{ asset('/assets/images/last.png') }}" class="img-fluid w-17" alt="last"></span>
                <span><img src="{{ asset('/assets/images/search.png') }}" class="img-fluid w-17 ms-4" alt="search"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="Production-bg-color text-white">
          <p class="fw-light ms-1">
            Allgemein
          </p>
        </div>
        <div class="mb-2">
          <div class="row">
            <div class="col-lg-4">
              <img src="{{ asset('/assets/images/Blasanlage.jpg') }}" class="img-fluid blasan-img" alt="">
            </div>

            <div class="col-lg-4">
              <div class="inner-main">
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 text-hover ms-1">Anlage</label>
                  <input class="me-1" id="anlageProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 text-hover ms-1">Auftragsmenge</label>
                  <input class="me-1" id="AuftragsmengeProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 text-hover ms-1">Bestellung</label>
                  <input class="me-1" id="BestellungProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 text-hover ms-1">Artikel</label>
                  <input class="me-1" id="artikelProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 text-hover ms-1">Gutmenge</label>
                  <input class="me-1" id="GutmengeProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 text-hover ms-1">Ausschuss</label>
                  <input class="me-1" id="AusschussProd">
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="inner-main">
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 ms-1 text-hover">Programm</label>
                  <input class="me-1" id="anlageProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 ms-1 text-hover">Zeit_zyklus</label>
                  <input class="me-1" id="AuftragsmengeProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 ms-1 text-hover">Werkzeug</label>
                  <input class="me-1" id="BestellungProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 ms-1 text-hover">Kavitäten</label>
                  <input class="me-1" id="artikelProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 ms-1 text-hover">Letzte_störung</label>
                  <input class="me-1" id="GutmengeProd">
                </div>
                <div class="controlDiv controlDivProductionn">
                  <label class="fs-14 ms-1 text-hover">Bisher_produziert</label>
                  <input class="me-1" id="AusschussProd">
                </div>
              </div>
            </div>
          </div>
        </div>
    <div class="Production-bg-color text-white">
          <p class="ms-1 fw-light">
            Production Dynamic Columns
          </p>
        </div>
        <div class="mb-2">
          <div class="row">
            <div class="col-lg-6">
              <div class="controlDiv controlDivProductionn">
                <label class="fs-14 ms-1 text-hover">anl_ID</label>
                <input class="me-1" id="anl_ID">
              </div>
              <div class="controlDiv controlDivProductionn">
                <label class="fs-14 ms-1 text-hover">datumAnl</label>
                <input class="me-1" id="nummerAnl">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="controlDiv controlDivProductionn">
                <label class="fs-14 ms-1 text-hover">nummerAnl</label>
                <input class="me-1" id="nummerAnl">
              </div>
            </div>
          </div>
        </div>
        <!-- accordian -->

        <div class="accordion accordion-flush accordion-main-sec mb-5" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button acc-bg-color text-white collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Energy Charts
              </button>
              <div class="toggleswitch2 accordion-switch me-1">
                <input type="checkbox" name="toggleswitch" class="toggleswitch-checkbox" id="myonoffswitch2" checked>
                <label class="toggleswitch-label" for="myonoffswitch2">
                  <span class="toggleswitch-inner"></span>
                  <span class="toggleswitch-switch"></span>
                </label>
              </div>
            </h2>

            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">Es existieren keine Daten die ausgewertet werden können!
              </div>
            </div>
          </div>
          <!-- 2 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button text-white acc-bg-color collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Production Charts
              </button>
              <div class="toggleswitch3 accordion-switch me-1">
                <input type="checkbox" name="toggleswitch" class="toggleswitch-checkbox" id="myonoffswitch3" checked>
                <label class="toggleswitch-label" for="myonoffswitch3">
                  <span class="toggleswitch-inner"></span>
                  <span class="toggleswitch-switch"></span>
                </label>
              </div>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">

                <div class="row">
                  <div class="col-lg-4">
                    <h5 class="fs-14 ">Auftrag</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="orderFilterProduction" id="orderFilterProduction">
                          <option value="100899404">100899404</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <h5 class="fs-14">Graph Name</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="timeFilterIntervalProduction" id="timeFilterIntervalProduction">
                          <option value="Total Production">Total Production</option>
                          <option value="goods produced">goods produced</option>
                          <option value="Total Goods">Total Goods</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <h5 class="fs-14">No. of Records</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="timeFilterProduction" id="timeFilterProduction">
                          <option value="5" selected="">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="100">100</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
                <svg id="other_graph_div_svg" width="600" height="300" style="width: 624px; height: 300px;">

                  <g id="other_graph_div_svg_XAxisGrid_0">
                    <path id="other_graph_div_svg_XAxisMajorGridLines_0" fill="none" stroke-width="1" stroke="#DFDFDF"
                      opacity="1" stroke-dasharray=""
                      d="M 156.5 245.5 L 156.5 58.5 M 262.5 245.5 L 262.5 58.5 M 368.5 245.5 L 368.5 58.5 M 474.5 245.5 L 474.5 58.5 ">
                    </path>
                  </g>
                  <g id="other_graph_div_svg_YAxisGrid_1">
                    <path id="other_graph_div_svg_YAxisMajorGridLines_1" fill="none" stroke-width="1" opacity="1"
                      stroke-dasharray="" stroke="#DFDFDF"
                      d="M 50.5 213.5 L 580.5 213.5 M 50.5 182.5 L 580.5 182.5 M 50.5 151.5 L 580.5 151.5 M 50.5 120.5 L 580.5 120.5 M 50.5 89.5 L 580.5 89.5 ">
                    </path>
                  </g>
                  <defs>
                    <clipPath id="other_graph_div_svg_ChartAreaClipRect">

                    </clipPath>
                  </defs>
                  <g id="other_graph_div_svg_SeriesCollection" clip-path="url(#other_graph_div_svg_ChartAreaClipRect)">
                    <g id="other_graph_div_svg_SeriesGroup_0" transform="translate(50,58)"
                      clip-path="url(#other_graph_div_svg_SeriesGroup_0_ClipRect)">
                      <path id="other_graph_div_svg_Series0" fill="none" stroke-dasharray="" stroke-width="2"
                        stroke="black" stroke-linecap="butt" stroke-linejoin="round" opacity="1"
                        d="M 53 31.16666666666666 L 159 62.33333333333334 M 159 62.33333333333334 L 265 93.5 M 265 93.5 L 371 124.66666666666669 M 371 124.66666666666669 L 477 155.83333333333334 ">
                      </path>
                      <defs>
                        <clipPath id="other_graph_div_svg_SeriesGroup_0_ClipRect">
                          <rect id="other_graph_div_svg_SeriesGroup_0_ClipRect" x="0" y="0" width="530" height="187"
                            fill="white" stroke-width="1" stroke="transparent"></rect>
                        </clipPath>
                      </defs>
                    </g>
                    <g id="other_graph_div_svg_symbolGroup_0" transform="translate(50,58)" visibility="visible"
                      clip-path="url(#other_graph_div_svg_symbolGroup_0_ClipRect)">
                      <circle id="other_graph_div_svg_Series0_Point0_symbol" cx="53" cy="31.16666666666666"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="other_graph_div_svg_Series0_Point1_symbol" cx="159" cy="62.33333333333334"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="other_graph_div_svg_Series0_Point2_symbol" cx="265" cy="93.5" r="4.242640687119285"
                        fill="black" stroke-width="2" stroke="black" opacity="1" visibility="visible"></circle>
                      <circle id="other_graph_div_svg_Series0_Point3_symbol" cx="371" cy="124.66666666666669"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="other_graph_div_svg_Series0_Point4_symbol" cx="477" cy="155.83333333333334"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <defs>
                        <clipPath id="other_graph_div_svg_symbolGroup_0_ClipRect">
                          <rect id="other_graph_div_svg_symbolGroup_0_ClipRect" x="0" y="0" width="530" height="187"
                            fill="white" stroke-width="1" stroke="transparent"></rect>
                        </clipPath>
                      </defs>
                    </g>
                  </g>
                  <g id="other_graph_div_svg_XAxis">
                    <g id="other_graph_div_svg_XAxisLabels_0" cursor="default"><text
                        id="other_graph_div_svg_PrimaryAxis_XLabel_0" x="67.5" y="255.5" fill="#282828" font-size="11px"
                        font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        transform="rotate(45,103,255.5)" labelRotation="45"
                        labelPosition="outside">A1-954500020</text><text id="other_graph_div_svg_PrimaryAxis_XLabel_1"
                        x="173.5" y="255.5" fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal"
                        font-weight="regular" opacity="1" transform="rotate(45,209,255.5)" labelRotation="45"
                        labelPosition="outside">A2-954500020</text><text id="other_graph_div_svg_PrimaryAxis_XLabel_2"
                        x="279.5" y="255.5" fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal"
                        font-weight="regular" opacity="1" transform="rotate(45,315,255.5)" labelRotation="45"
                        labelPosition="outside">A3-954500020</text><text id="other_graph_div_svg_PrimaryAxis_XLabel_3"
                        x="385.5" y="255.5" fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal"
                        font-weight="regular" opacity="1" transform="rotate(45,421,255.5)" labelRotation="45"
                        labelPosition="outside">A4-954500020</text><text id="other_graph_div_svg_PrimaryAxis_XLabel_4"
                        x="491.5" y="255.5" fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal"
                        font-weight="regular" opacity="1" transform="rotate(45,527,255.5)" labelRotation="45"
                        labelPosition="outside">A5-954500020</text></g>
                    <g id="other_graph_div_svg_XAxis_Title_0" cursor="default"><text
                        id="other_graph_div_svg_XAxisTitle_0" x="315" y="275.92857142857144" fill="#282828"
                        font-size="14px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="middle">goods produced</text>
                      <rect id="other_graph_div_svg_XAxisTitleBorder_0" x="254" y="261.67857142857144" width="122"
                        height="19" fill="transparent" class="e-xaxistitleborder"></rect>
                    </g>
                    <line id="other_graph_div_svg_XAxisLine_0" x1="50.5" y1="245.5" x2="580.5" y2="245.5"
                      stroke-dasharray="" stroke-width="1" stroke="#8E8E8E" opacity="1"></line>
                    <path id="other_graph_div_svg_XAxisMajorTicks_0" fill="none" stroke-width="1" stroke="#8E8E8E"
                      d="M 50.5 250.5 L 50.5 245.5 M 156.5 250.5 L 156.5 245.5 M 262.5 250.5 L 262.5 245.5 M 368.5 250.5 L 368.5 245.5 M 474.5 250.5 L 474.5 245.5 M 580.5 250.5 L 580.5 245.5 ">
                    </path>
                  </g>
                  <g id="other_graph_div_svg_YAxis">
                    <g id="other_graph_div_svg_YAxisLabels_1" cursor="default"><text
                        id="other_graph_div_svg_SecondaryAxis_YLabel_0" x="39.5" y="248.75" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="end">
                        <tspan x="39.5" dy="0">0</tspan>
                      </text><text id="other_graph_div_svg_SecondaryAxis_YLabel_1" x="39.5" y="217.58333333333334"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="39.5" dy="0">1000</tspan>
                      </text><text id="other_graph_div_svg_SecondaryAxis_YLabel_2" x="39.5" y="186.41666666666669"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="39.5" dy="0">2000</tspan>
                      </text><text id="other_graph_div_svg_SecondaryAxis_YLabel_3" x="39.5" y="155.25" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="end">
                        <tspan x="39.5" dy="0">3000</tspan>
                      </text><text id="other_graph_div_svg_SecondaryAxis_YLabel_4" x="39.5" y="124.08333333333334"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="39.5" dy="0">4000</tspan>
                      </text><text id="other_graph_div_svg_SecondaryAxis_YLabel_5" x="39.5" y="92.91666666666666"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="39.5" dy="0">5000</tspan>
                      </text><text id="other_graph_div_svg_SecondaryAxis_YLabel_6" x="39.5" y="61.75" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="end">
                        <tspan x="39.5" dy="0">6000</tspan>
                      </text></g>
                    <line id="other_graph_div_svgSecondaryAxis_YAxisLine_1" x1="50.5" y1="58.5" x2="50.5" y2="245.5"
                      stroke-width="1" stroke-dasharray="" stroke="#8E8E8E" opacity="1"></line>
                    <path id="other_graph_div_svg_YAxisMajorTicks_1" fill="none" stroke-width="1" stroke="#8E8E8E"
                      d="M 44.5 245.5 L 50.5 245.5 M 44.5 213.5 L 50.5 213.5 M 44.5 182.5 L 50.5 182.5 M 44.5 151.5 L 50.5 151.5 M 44.5 120.5 L 50.5 120.5 M 44.5 89.5 L 50.5 89.5 M 44.5 58.5 L 50.5 58.5 ">
                    </path>
                  </g>
                </svg>

              </div>
            </div>
          </div>
          <!-- 3 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button text-white acc-bg-color collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Mixed Charts
              </button>
              <div class="toggleswitch4 accordion-switch me-1">
                <input type="checkbox" name="toggleswitch" class="toggleswitch-checkbox" id="myonoffswitch4" checked>
                <label class="toggleswitch-label" for="myonoffswitch4">
                  <span class="toggleswitch-inner"></span>
                  <span class="toggleswitch-switch"></span>
                </label>
              </div>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-lg-4">
                    <h5 class="fs-14">Auftrag</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="orderFilterMixed" id="orderFilterMixed">
                          <option value="100899404">(100899404)</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <h5 class="fs-14">Graph Name</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="timeFilterIntervalMixed" id="timeFilterIntervalMixed">
                          <option value="goods produced">goods produced</option>
                          <option value="Total Goods">Total Goods</option>
                          <option value="Energy Data">Energy Data</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <h5 class="fs-14">No. of Records</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="timeFilterMixed" id="timeFilterMixed">
                          <option value="5" selected="">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="100">100</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>

                <svg id="mixed_graph_plot_div_svg" width="600" height="300" style="width: 624px; height: 300px;">
                  <rect id="mixed_graph_plot_div_svg_SvgRect" x="0" y="0" width="600" height="300" fill="transparent"
                    opacity="0.3" stroke-width="0" stroke="transparent" class="e-chartborder"></rect>
                  <rect id="mixed_graph_plot_div_svg_ChartArea" x="89" y="58" width="407" height="187"
                    fill="transparent" stroke-width="0.5" opacity="0.3" stroke="Gray" class="e-chartareaborder"></rect>
                  <g id="mixed_graph_plot_div_svg_XAxisGrid_0">
                    <path id="mixed_graph_plot_div_svg_XAxisMajorGridLines_0" fill="none" stroke-width="1"
                      stroke="#DFDFDF" opacity="1" stroke-dasharray=""
                      d="M 171.5 245.5 L 171.5 58.5 M 252.5 245.5 L 252.5 58.5 M 334.5 245.5 L 334.5 58.5 M 415.5 245.5 L 415.5 58.5 ">
                    </path>
                  </g>
                  <g id="mixed_graph_plot_div_svg_YAxisGrid_1">
                    <path id="mixed_graph_plot_div_svg_YAxisMajorGridLines_1" fill="none" stroke-width="1" opacity="1"
                      stroke-dasharray="" stroke="#DFDFDF"
                      d="M 89.5 213.5 L 496.5 213.5 M 89.5 182.5 L 496.5 182.5 M 89.5 151.5 L 496.5 151.5 M 89.5 120.5 L 496.5 120.5 M 89.5 89.5 L 496.5 89.5 ">
                    </path>
                  </g>
                  <g id="mixed_graph_plot_div_svg_YAxisGrid_2">
                    <path id="mixed_graph_plot_div_svg_YAxisMajorGridLines_2" fill="none" stroke-width="1"
                      stroke-dasharray="" stroke="#DFDFDF"
                      d="M 89.5 213.5 L 496.5 213.5 M 89.5 182.5 L 496.5 182.5 M 89.5 151.5 L 496.5 151.5 M 89.5 120.5 L 496.5 120.5 M 89.5 89.5 L 496.5 89.5 ">
                    </path>
                  </g>
                  <defs>
                    <clipPath id="mixed_graph_plot_div_svg_ChartAreaClipRect">
                      <rect id="mixed_graph_plot_div_svg_ChartAreaClipRect" x="89" y="58" width="407" height="187"
                        fill="white" stroke-width="1" stroke="Gray"></rect>
                    </clipPath>
                  </defs>
                  <g id="mixed_graph_plot_div_svg_SeriesCollection"
                    clip-path="url(#mixed_graph_plot_div_svg_ChartAreaClipRect)">
                    <g id="mixed_graph_plot_div_svg_SeriesGroup_0" transform="translate(89,58)"
                      clip-path="url(#mixed_graph_plot_div_svg_SeriesGroup_0_ClipRect)">
                      <path id="mixed_graph_plot_div_svg_Series0" fill="none" stroke-dasharray="" stroke-width="2"
                        stroke="black" stroke-linecap="butt" stroke-linejoin="round" opacity="1"
                        d="M 40.7 31.16666666666666 L 122.1 62.33333333333334 M 122.1 62.33333333333334 L 203.5 93.5 M 203.5 93.5 L 284.9 124.66666666666669 M 284.9 124.66666666666669 L 366.3 155.83333333333334 ">
                      </path>
                      <defs>
                        <clipPath id="mixed_graph_plot_div_svg_SeriesGroup_0_ClipRect">
                          <rect id="mixed_graph_plot_div_svg_SeriesGroup_0_ClipRect" x="0" y="0" width="407"
                            height="187" fill="white" stroke-width="1" stroke="transparent"></rect>
                        </clipPath>
                      </defs>
                    </g>
                    <g id="mixed_graph_plot_div_svg_symbolGroup_0" transform="translate(89,58)" visibility="visible"
                      clip-path="url(#mixed_graph_plot_div_svg_symbolGroup_0_ClipRect)">
                      <circle id="mixed_graph_plot_div_svg_Series0_Point0_symbol" cx="40.7" cy="31.16666666666666"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series0_Point1_symbol" cx="122.1" cy="62.33333333333334"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series0_Point2_symbol" cx="203.5" cy="93.5"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series0_Point3_symbol" cx="284.9" cy="124.66666666666669"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series0_Point4_symbol" cx="366.3" cy="155.83333333333334"
                        r="4.242640687119285" fill="black" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <defs>
                        <clipPath id="mixed_graph_plot_div_svg_symbolGroup_0_ClipRect">
                          <rect id="mixed_graph_plot_div_svg_symbolGroup_0_ClipRect" x="0" y="0" width="407"
                            height="187" fill="white" stroke-width="1" stroke="transparent"></rect>
                        </clipPath>
                      </defs>
                    </g>
                    <g id="mixed_graph_plot_div_svg_SeriesGroup_1" transform="translate(89,58)"
                      clip-path="url(#mixed_graph_plot_div_svg_SeriesGroup_1_ClipRect)">
                      <path id="mixed_graph_plot_div_svg_Series1" fill="none" stroke-dasharray="" stroke-width="2"
                        stroke="blue" stroke-linecap="butt" stroke-linejoin="round" opacity="1"
                        d="M 40.7 180.0117519429525 L 122.1 47.964541259765625 M 122.1 47.964541259765625 L 203.5 153.00560890706382 M 203.5 153.00560890706382 L 284.9 117.55867309570313 M 284.9 117.55867309570313 L 366.3 186.69269929297764 ">
                      </path>
                      <defs>
                        <clipPath id="mixed_graph_plot_div_svg_SeriesGroup_1_ClipRect">
                          <rect id="mixed_graph_plot_div_svg_SeriesGroup_1_ClipRect" x="0" y="0" width="407"
                            height="187" fill="white" stroke-width="1" stroke="transparent"></rect>
                        </clipPath>
                      </defs>
                    </g>
                    <g id="mixed_graph_plot_div_svg_symbolGroup_1" transform="translate(89,58)" visibility="visible"
                      clip-path="url(#mixed_graph_plot_div_svg_symbolGroup_1_ClipRect)">
                      <circle id="mixed_graph_plot_div_svg_Series1_Point0_symbol" cx="40.7" cy="180.0117519429525"
                        r="4.242640687119285" fill="blue" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series1_Point1_symbol" cx="122.1" cy="47.964541259765625"
                        r="4.242640687119285" fill="blue" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series1_Point2_symbol" cx="203.5" cy="153.00560890706382"
                        r="4.242640687119285" fill="blue" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series1_Point3_symbol" cx="284.9" cy="117.55867309570313"
                        r="4.242640687119285" fill="blue" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <circle id="mixed_graph_plot_div_svg_Series1_Point4_symbol" cx="366.3" cy="186.69269929297764"
                        r="4.242640687119285" fill="blue" stroke-width="2" stroke="black" opacity="1"
                        visibility="visible"></circle>
                      <defs>
                        <clipPath id="mixed_graph_plot_div_svg_symbolGroup_1_ClipRect">
                          <rect id="mixed_graph_plot_div_svg_symbolGroup_1_ClipRect" x="0" y="0" width="407"
                            height="187" fill="white" stroke-width="1" stroke="transparent"></rect>
                        </clipPath>
                      </defs>
                    </g>
                  </g>
                  <g id="mixed_graph_plot_div_svg_XAxis">
                    <g id="mixed_graph_plot_div_svg_XAxisLabels_0" cursor="default"><text
                        id="mixed_graph_plot_div_svg_PrimaryAxis_XLabel_0" x="93.5" y="255.5" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        transform="rotate(45,129,255.5)" labelRotation="45"
                        labelPosition="outside">A1-954500020</text><text
                        id="mixed_graph_plot_div_svg_PrimaryAxis_XLabel_1" x="175.5" y="255.5" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        transform="rotate(45,211,255.5)" labelRotation="45"
                        labelPosition="outside">A2-954500020</text><text
                        id="mixed_graph_plot_div_svg_PrimaryAxis_XLabel_2" x="256.5" y="255.5" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        transform="rotate(45,292,255.5)" labelRotation="45"
                        labelPosition="outside">A3-954500020</text><text
                        id="mixed_graph_plot_div_svg_PrimaryAxis_XLabel_3" x="337.5" y="255.5" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        transform="rotate(45,373,255.5)" labelRotation="45"
                        labelPosition="outside">A4-954500020</text><text
                        id="mixed_graph_plot_div_svg_PrimaryAxis_XLabel_4" x="419.5" y="255.5" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        transform="rotate(45,455,255.5)" labelRotation="45" labelPosition="outside">A5-954500020</text>
                    </g>
                    <g id="mixed_graph_plot_div_svg_XAxis_Title_0" cursor="default"><text
                        id="mixed_graph_plot_div_svg_XAxisTitle_0" x="292.5" y="275.92857142857144" fill="#282828"
                        font-size="14px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="middle">goods produced</text>
                      <rect id="mixed_graph_plot_div_svg_XAxisTitleBorder_0" x="231.5" y="261.67857142857144"
                        width="122" height="19" fill="transparent" class="e-xaxistitleborder"></rect>
                    </g>
                    <line id="mixed_graph_plot_div_svg_XAxisLine_0" x1="89.5" y1="245.5" x2="496.5" y2="245.5"
                      stroke-dasharray="" stroke-width="1" stroke="#8E8E8E" opacity="1"></line>
                    <path id="mixed_graph_plot_div_svg_XAxisMajorTicks_0" fill="none" stroke-width="1" stroke="#8E8E8E"
                      d="M 89.5 250.5 L 89.5 245.5 M 171.5 250.5 L 171.5 245.5 M 252.5 250.5 L 252.5 245.5 M 334.5 250.5 L 334.5 245.5 M 415.5 250.5 L 415.5 245.5 M 496.5 250.5 L 496.5 245.5 ">
                    </path>
                  </g>
                  <g id="mixed_graph_plot_div_svg_YAxis">
                    <g id="mixed_graph_plot_div_svg_YAxisLabels_1" cursor="default"><text
                        id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_0" x="78.5" y="248.75" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="end">
                        <tspan x="78.5" dy="0">0</tspan>
                      </text><text id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_1" x="78.5" y="217.58333333333334"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="78.5" dy="0">1000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_2" x="78.5" y="186.41666666666669"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="78.5" dy="0">2000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_3" x="78.5" y="155.25"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="78.5" dy="0">3000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_4" x="78.5" y="124.08333333333334"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="78.5" dy="0">4000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_5" x="78.5" y="92.91666666666666"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="78.5" dy="0">5000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_SecondaryAxis_YLabel_6" x="78.5" y="61.75"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="end">
                        <tspan x="78.5" dy="0">6000</tspan>
                      </text></g>
                    <g id="mixed_graph_plot_div_svg_YAxisTitleGroup_1" cursor="default"><text
                        id="mixed_graph_plot_div_svg_YAxisTitle_1" x="29" y="151.5" fill="#282828" labelRotation="-90"
                        transform="rotate(-90,29,151.5)" font-size="14px" font-family="Segoe UI" font-style="Normal"
                        font-weight="regular" opacity="1" text-anchor="middle" dominant-baseline="middle">goods
                        produced</text>
                      <rect id="mixed_graph_plot_div_svg_YAxisTitleBorder_1" x="19.5" y="90.5" width="19" height="122"
                        fill="transparent" class="e-yaxistitleborder"></rect>
                    </g>
                    <line id="mixed_graph_plot_div_svgSecondaryAxis_YAxisLine_1" x1="89.5" y1="58.5" x2="89.5"
                      y2="245.5" stroke-width="1" stroke-dasharray="" stroke="#8E8E8E" opacity="1"></line>
                    <path id="mixed_graph_plot_div_svg_YAxisMajorTicks_1" fill="none" stroke-width="1" stroke="#8E8E8E"
                      d="M 83.5 245.5 L 89.5 245.5 M 83.5 213.5 L 89.5 213.5 M 83.5 182.5 L 89.5 182.5 M 83.5 151.5 L 89.5 151.5 M 83.5 120.5 L 89.5 120.5 M 83.5 89.5 L 89.5 89.5 M 83.5 58.5 L 89.5 58.5 ">
                    </path>
                    <g id="mixed_graph_plot_div_svg_YAxisLabels_2" cursor="default"><text
                        id="mixed_graph_plot_div_svg_Energy_YLabel_0" x="506.5" y="248.75" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="start">
                        <tspan x="506.5" dy="0">0</tspan>
                      </text><text id="mixed_graph_plot_div_svg_Energy_YLabel_1" x="506.5" y="217.58333333333334"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="start">
                        <tspan x="506.5" dy="0">2000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_Energy_YLabel_2" x="506.5" y="186.41666666666669"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="start">
                        <tspan x="506.5" dy="0">4000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_Energy_YLabel_3" x="506.5" y="155.25" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="start">
                        <tspan x="506.5" dy="0">6000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_Energy_YLabel_4" x="506.5" y="124.08333333333334"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="start">
                        <tspan x="506.5" dy="0">8000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_Energy_YLabel_5" x="506.5" y="92.91666666666666"
                        fill="#282828" font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular"
                        opacity="1" text-anchor="start">
                        <tspan x="506.5" dy="0">10000</tspan>
                      </text><text id="mixed_graph_plot_div_svg_Energy_YLabel_6" x="506.5" y="61.75" fill="#282828"
                        font-size="11px" font-family="Segoe UI" font-style="Normal" font-weight="regular" opacity="1"
                        text-anchor="start">
                        <tspan x="506.5" dy="0">12000</tspan>
                      </text></g>
                    <g id="mixed_graph_plot_div_svg_YAxisTitleGroup_2" cursor="default"><text
                        id="mixed_graph_plot_div_svg_YAxisTitle_2" x="562" y="151.5" fill="#282828" labelRotation="90"
                        transform="rotate(90,562,151.5)" font-size="14px" font-family="Segoe UI" font-style="Normal"
                        font-weight="regular" opacity="1" text-anchor="middle" dominant-baseline="middle">Energy
                        Consuption</text>
                      <rect id="mixed_graph_plot_div_svg_YAxisTitleBorder_2" x="552.5" y="83" width="19" height="137"
                        fill="transparent" class="e-yaxistitleborder"></rect>
                    </g>
                    <path id="mixed_graph_plot_div_svg_YAxisMajorTicks_2" fill="none" stroke-width="1" stroke="#8E8E8E"
                      d="M 501.5 245.5 L 496.5 245.5 M 501.5 213.5 L 496.5 213.5 M 501.5 182.5 L 496.5 182.5 M 501.5 151.5 L 496.5 151.5 M 501.5 120.5 L 496.5 120.5 M 501.5 89.5 L 496.5 89.5 M 501.5 58.5 L 496.5 58.5 ">
                    </path>
                  </g>
                  <g id="mixed_graph_plot_div_svg_CrosshairGroup" visibility="visible">
                    <defs>
                      <clipPath id="mixed_graph_plot_div_svg_ClipRectTrack_0">
                        <rect id="mixed_graph_plot_div_svg_ClipRectTrack_0" x="0" y="0" width="407" height="187"
                          fill="white" stroke-width="1" stroke="Gray"></rect>
                      </clipPath>
                    </defs>
                  </g>
                </svg>

              </div>
            </div>
          </div>
          <!-- 4 -->
          <div class="accordion-item ">
            <h2 class="accordion-header" id="flush-headingfour">
              <button class="accordion-button text-white  acc-bg-color collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false"
                aria-controls="flush-collapsefour">
                KPI Charts
              </button>
              <div class="toggleswitch5 accordion-switch me-1">
                <input type="checkbox" name="toggleswitch" class="toggleswitch-checkbox" id="myonoffswitch5" checked>
                <label class="toggleswitch-label" for="myonoffswitch5">
                  <span class="toggleswitch-inner"></span>
                  <span class="toggleswitch-switch"></span>
                </label>
              </div>
            </h2>
            <div id="flush-collapsefour" class="accordion-collapse collapse" aria-labelledby="flush-headingfour"
              data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <div class="row">
                  <div class="col-lg-3">
                    <h5 class="fs-14">Machines</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="graph-machine" id="graph-machine">
                          <option value="19">572-1</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <h5 class="fs-14">Instanz</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="cars" id="cars">
                          <option value="volvo">Agrodur Grosalski</option>
                          <option value="saab">Saab</option>
                          <option value="opel">Opel</option>
                          <option value="audi">Audi</option>
                        </select>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <h5 class="fs-14">Kennzahl</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="cars" id="cars">
                          <option value="volvo">Agrodur Grosalski</option>
                          <option value="saab">Saab</option>
                          <option value="opel">Opel</option>
                          <option value="audi">Audi</option>
                        </select>
                      </form>
                    </div>
                  </div>

                  <div class="col-lg-3">
                    <h5 class="fs-14">letzte x Aufträge</h5>
                    <div class="auftrag-sec">
                      <form action="/action_page.php">
                        <select class="fs-12" name="kpiRecordFilter" id="kpiRecordFilter">
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  <script>
    $('.btn-toggle').click(function () {
      $(this).find('.btn').toggleClass('active');
      if ($(this).find('.btn-primary').size() > 0) {
        $(this).find('.btn').toggleClass('btn-primary');
      }
      $(this).find('.btn').toggleClass('btn-default');
    });
  </script>
@endsection
@section('jsScript')

@endsection