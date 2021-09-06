<!-- partial -->
<div class="main-panel" id="dashboard_main_div" style="display: none">
        <div class="content-wrapper">
          <div class="row heading-margin-top">
            <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="font-weight-bold mb-0 text-muted">Instrumententafel</h4>
                </div>
                <!-- <div>
                    <button type="button" class="btn btn-primary btn-icon-text btn-rounded">
                      <i class="ti-clipboard btn-icon-prepend"></i>Report
                    </button>
                </div> -->
              </div>
                <!-- 27-6-2021-- -->
              <div class="row" style="display: none">  
                <div class="form-group col-md-6">
                  <label class="text-dark mt-3" for="dashboard_select_tag">Select Records</label>
                  <select class="form-control form-control-sm text-muted" multiple name="dashboard_select_tag[]" id="dashboard_select_tag">
                    <!-- <option value="">Select Records</option> -->
                    <option value="mesurement_count_div" description="Measurement Entries Count">Messstellen</option>
                    <option value="product_count_div" description="Product Entries Count">Produkte</option>
                    <option value="energy_count_div" description="Energy Entries Count">Energiedaten</option>
                    <option value="energy_consumed_div" description="Energy Consumed 30 Days Entries">Energiedaten Consumed 30 Days</option>
                    <option value="five_days_energy_consumed" description="Energy Consumed 05 Days Entries">Energiedaten Consumed 05 Days</option>
                    <!-- <option value="40">40</option>
                    <option value="50">50</option> -->
                  </select>
                </div>
               
                <div class="form-group col-md-6">
                  <button id='save_select_changes' class="badge badge-success custom-btn">Save Changes</button>
                </div>
            </div>
              <!-- -end -->
            </div>
          </div>

          <!-- 20-8-2021-- -->
          <button type="button" class="btn btn-success btn-sm mb-3" id="dashboard_add_tile" data-toggle="modal" data-target="#dashboard_tile_modal">Add Tile</button>

          <div class="modal fade" id="dashboard_tile_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="text-mute text-dark">Instrumententafel</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="row">
                    <input type="hidden" id="modal-open" value="false">
                    <div class="col-md-3 form-group">
                      <label for="title_modal_tile">Title Name</label>
                      <input type="text" placeholder="Title" name="title_modal_tile" required id="title_modal_tile" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-3">
                      <label for="record_type_of_tile">Type of Record</label>
                      <select class="form-control form-control-sm text-dark" id="record_type_of_tile">
                          <option value="measurement" description="Measurement Entries Count">Messstellen</option>
                          <option value="product" description="Product Entries Count">Produkte</option>
                          <option value="energy" description="Energy Entries Count">Energiedaten</option>
                          <option value="energy_consumed_30_days" description="Energy Consumed 30 Days Entries">Energiedaten Consumed 30 Days</option>
                          <option value="five_days_energy_consumed_tile" description="Energy Consumed 05 Days Entries">Energiedaten Consumed 05 Days</option>
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="type_data_tile">Type of Data</label>
                      <select class="form-control form-control-sm text-dark" id="type_data_tile">
                          <option value="table">Table</option>
                          <option value="chart">Chart</option>
                      </select>
                    </div>

                    <div id="save_btn_tile_div">
                      <input type="button" id="save_and_proceed_btn_dashboard" data-edit="false" class="btn btn-sm btn-success save_and_proceed_btn_dashboard" value="Save & Proceed">
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- end -->

          <!-- 02-9-2021-- -->
          <!-- <button type="button" style="display: none" class="btn btn-success btn-sm mb-3" id="dashboard_add_tile_chart" data-toggle="modal" data-target="#dashboard_tile_modal_chart">Add Chart</button> -->
          <div class="modal fade" id="dashboard_tile_modal_chart" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg max-width-modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="text-mute text-dark">Instrumententafel Chart</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="row">
                    <div class="form-group col-md-3">
                      <label for="measurement-height-chart" class="text-mute">Column</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="measurement-height-chart" placeholder="Column">
                      <input type="hidden" id="measurement-height-chart-hidden" value="145">
                    </div>

                    <div class="form-group col-md-3">
                      <label for="measurement-width-chart" class="text-mute">Row</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="measurement-width-chart" placeholder="Row">
                      <input type="hidden" id="measurement-width-chart-hidden" value="285">
                    </div>
                  </div>
                  
                  <div class="row dashboard_chart_tiles">
                    
                  </div>

                  <div id="measurement_modal_loader_div_chart" style="display: none">
                    <img src="images/loader_dashboard.gif" id="measurement_modal_loader_image_chart">
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                  <!-- <div id="save_btn_tile_div"> -->
                    <input type="button" id="save_and_proceed_btn_dashboard_chart" data-edit="false" class="btn btn-sm btn-success save_and_proceed_btn_dashboard_chart" value="Save & Proceed">
                    <!-- </div> -->
                </div>
              </div>
            </div>
          </div>
          <!-- --end- -->


          <div class="row dashboard_count_div" id="dashboard_count_div_tile">
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width tiles-click" id="mesurement_count_div" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div id="mesurement_count_content" class="col-md-12">
                      <p class="card-title text-md-center text-xl-left" id="measuremet_dashboard_tile_title">Messstellen</p>
                      <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                        <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="mesurement_count"></h3>
                        <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                      </div>  
                      <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"><small></small></span></p>
                  </div>
                  
                  <div class="col-md-9 save_table_div_show overflow-hide" id="measurement_table_show" style="display: none">
                    <div class="save_table_height">    
                        <table class="table table-striped table-bordered table-hover"  id="measurement_dashboard_table">
                        </table>
                    </div>
                    <div class="pagination_save_table" style="display: none">
                        <ul class="pagination">
                          <li class="page-item ">
                              <a class="page-link" href="javascript:void(0);" aria-label="Previous">
                                  <span aria-hidden="true">«</span>
                                  <span class="sr-only">Previous</span>
                              </a>
                          </li>
                          <li class="page-item">
                              <a class="page-link" href="javascript:void(0);">Page</a>
                          </li>
                          
                          <li style="display: block" class="page-item"><input type="number" readonly class="save_pagination_input_val pagination_input_val page-link"></li>
                          <li class="page-item"><a class="page-link" href="javascript:void(0);">of</a></li>
                          <li class="page-item"><a class="page-link " href="javascript:void(0);">1</a></li>
                          
                          <li class="page-item " >
                            <a class="page-link" style="background: #d6d6d6; color: black" href="javascript:void(0);" aria-label="Next">
                                <span aria-hidden="true">»</span>
                                <span class="sr-only">Next</span>
                            </a>
                          </li>

                          <li class="page-item">
                              <select class="page-link" id="save_measurement_number_record">
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                  <option value="20">20</option>
                                  <option value="30">30</option>
                                  <option value="50">50</option>
                              </select>
                          </li>
                        </ul>
                    </div>
                  </div>
                  <!-- <div class="col-md-9 image_div_show overflow-hide" style="display: none">
                     <img src="upload/screenshot_table_body.png" id="screenshot_image" alt="Image Not Available" height="167px" width="593px">
                  </div> -->
                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width tiles-click" id="product_count_div" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div id="product_count_content" class="col-md-12">
                      <p class="card-title text-md-center text-xl-left">Produkte</p>
                      <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                        <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="product_count"></h3>
                        <i class="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                      </div>  
                      <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"><small></small></span></p>
                  </div>

                  <div class="col-md-9 save_table_div_show overflow-hide" id="product_table_show" style="display: none">
                     
                  </div>

                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width tiles-click" id="energy_count_div" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div class="col-md-12" id="energy_count_content">
                    <p class="card-title text-md-center text-xl-left">Energiedaten Entry</p>
                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="energy_count"></h3>
                      <i class="ti-agenda icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                    </div>  
                    <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"><small></small></span></p>
                  </div>

                  <div class="col-md-9 save_table_div_show overflow-hide" id="energy_table_show" style="display: none">
                      
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width tiles-click" id="energy_consumed_div" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div class="col-md-12" id="energy_consumed_content"> 
                    <p class="card-title text-md-center text-xl-left">Energiedaten Consumed</p>
                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="energy_consumed_count"></h3><p class="energy_unit text-muted">kWh</p>
                      <i class="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                    </div>  
                    <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"></span></p>
                  </div>

                  <div class="col-md-9 save_table_div_show overflow-hide" id="energy_consumed_table_show" style="display: none">
                     
                  </div>


                </div>
              </div>
            </div>
            <!-- 27-7-2021 -->
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width  tiles-click" id="five_days_energy_consumed" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div class="col-md-12" id="energy_consumed_five_day_content">
                    <p class="card-title text-md-center text-xl-left">Energiedaten Consumed</p>
                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="five_days_energy_count"></h3><p class="energy_unit text-muted">kWh</p>
                      <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                    </div>  
                    <p class="mb-0 mt-2 text-success">(05 days)<span class="text-black ml-1"><small></small></span></p>
                  </div>
                  
                  <div class="col-md-9 save_table_div_show overflow-hide" id="energy_consumed_five_day_table_show" style="display: none">
                     
                  </div>
                </div>
              </div>
            </div>
            <!-- --end-- -->
          </div>
          
          <div class="row dashboard_count_div_chart">
            <div class="col-md-6 grid-margin stretch-card" id="energy_graph_chart" style="display: none">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Energiedaten One Month</p>
                  <p class="text-muted font-weight-light">Received overcame oh sensible so at an. Formed do change merely to county it. Am separate contempt domestic to to oh. On relation my so addition branched.</p>
                  <div id="sales-legend" class="chartjs-legend mt-4 mb-2"></div>
                  <!-- <canvas id="sales-chart"></canvas> -->
                </div>
             
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card" id="energy_circle_chart" style="display: none">
              <div class="card border-bottom-0">
                <div class="card-body pb-0">
                  <p class="card-title">Energiedaten details</p>
                  <p class="text-muted font-weight-light">The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review</p>
              
                </div>
                <!-- <canvas id="order-chart" class="w-100"></canvas> -->
                  <canvas id="north-america-chart"></canvas>
                  <div id="north-america-legend"></div>
              </div>
            </div>
          </div>
          <div class="row" style="display: none">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-2">Energiedaten Consumed</p>
                  <div class="table-responsive table-not-consumed">
                    <table class="table table-hover table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Time Interval</th>
                          <th>Start</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody id="energy_not_consumed_table">
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 28-7-2021 -->
          <div class="row dashboard_count_div">
            <div class="col-md-12 grid-margin stretch-card" id="five_days_energy_consumed_table_div" style="display: none">
              <div class="card card-border">
                <div class="card-body">
                  <p class="card-title mb-2">Energiedaten Consumed Five days</p>
                  <div class="table-responsive table-not-consumed">
                    <table class="table table-hover table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Time Interval</th>
                          <th>Day</th>
                          <th>Date</th>
                          <th>Units Consumed</th>
                        </tr>
                      </thead>
                      <tbody id="five_days_energy_consumed_table">
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- --end-- -->
        </div>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <footer class="footer">
          <!-- <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © bootstrapdash.com 2020</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Free <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap dashboard templates</a> from Bootstrapdash.com</span>
          </div> -->
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->