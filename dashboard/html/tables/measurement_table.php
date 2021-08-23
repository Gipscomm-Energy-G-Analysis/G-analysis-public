
      <!-- partial -->
      <div class="main-panel" id="measurement_table_main_div" style="display: none">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Messstellen</h4>
                  
                  <div class="row">
                    
                    <div class="form-group col-md-3">
                      <label for="measurement_time_interval">Select Time Interval</label>
                      <select class="form-control form-control-sm text-dark" id="measurement_time_interval">
                        <option value="1">Days</option>
                        <option value="2">Weeks</option>
                        <option value="3">Months</option>
                        <option value="4">Years</option>
                        <!-- <option value="40">40</option>
                        <option value="50">50</option> -->
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="measurement_records_order_by">Filter Units Consumed</label>
                      <select class="form-control form-control-sm text-dark" id="measurement_records_order_by">
                        <option value="order_by_desc">Order By Max Units Consumed</option>
                        <option value="order_by_asc">Order By Min Units Consumed</option>
                        <!-- <option value="five_days_measurement_records">Messstellen 05 Days Records</option> -->
                      </select>
                    </div>

                    <!-- <div class="form-group col-md-2" style="display: none">
                      <label for="measurement_number_record">Select No. of Records</label>
                       <input type="number" class="form-control form-control-sm text-dark" id="measurement_number_record" minlength="5" maxlength="50" placeholder="Select No. of Records">
                       <span class='measurement_number_record_error text-danger'></span>
                      </div> -->

                      <div class="form-group col-md-3">
                      <label for="measurement_number_record">Select Total No. of Records</label>
                       <input type="number" class="form-control form-control-sm text-dark" id="measurement_total_number_record" placeholder="Select Total No. of Records">
                       <span class='measurement_number_record_error text-danger'></span>
                      </div>

                  </div>

                  <div class="row">
                    <div class="form-group col-md-12">
                      <label for="measurement_search_record">Search Records</label>
                      <input type="text" class="form-control form-control-sm text-dark" id="measurement_search_record" placeholder="Search Records">
                    </div>
                    
                    <div class="table-responsive col-md-12 table-margin" id="measurement_record_table">
                      <table class="table table-striped table-bordered table-hover" id="measurement_record_tb">
                        <thead class="measurement_table_header">
                          <tr>
                            <th>Name</th>
                            <th>Time Interval</th>
                            <th>Created Date</th>
                            <th>Total Units</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody id="mesurement_select_table_entries">
                        
                        </tbody>
                      </table>
                    </div>

                  </div>
                  <!-- <p class="card-description">
                    Add class <code>.table-striped</code>
                  </p> -->
                 
                  <!-- 30-7-2021 -->
                  <div class="pagination_html" id="pagination_html">
                  </div>

                  <!-- Modal -->
                 <!-- Large modal -->
                  <button type="button" style="display: none" class="btn btn-primary" id="modal_open_button" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>

                  <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg max-width-modal">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="text-mute text-dark">Instrumententafel</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div class="modal-body">
                          <!-- Height and Width -->
                          <div class="row">
                              <div class="form-group col-md-3">
                                <label for="modal-height-input-measurement" class="text-mute">Height</label>
                                <input type="number" class="form-control form-control-sm text-dark" id="modal-height-input-measurement" placeholder="Height">
                                <input type="hidden" id="modal-height-input-measurement-hidden" value="145">
                              </div>

                              <div class="form-group col-md-3">
                                <label for="modal-width-input-measurement" class="text-mute">Width</label>
                                <input type="number" class="form-control form-control-sm text-dark" id="modal-width-input-measurement" placeholder="Width">
                                <input type="hidden" id="modal-width-input-measurement-hidden" value="285">
                              </div>

                          </div>
                          <!-- --end -->
                          <div class="row dashboard_modal_tile">
                            <div class="grid-margin actual_tile_height actual_tile_width stretch-card " id="measurement_count_tile_modal">
                              <div class="card card-border">
                                <div class="card-body overflow-hide display-flex">
                                  <div id="" class="">
                                      <p class="card-title text-md-center text-xl-left" id="measurement_tile_heading_modal">Messstellen</p>
                                      <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                        <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 mesurement_count_modal" ></h3>
                                        <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                                      </div>  
                                      <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"><small></small></span></p>
                                  </div>
                                  
                                  <div class="overflow-hide ml-3">
                                    <div class=""> 
                                      <table class="table table-striped table-bordered table-hover" id="measurement_modal_table">
                                      </table>                        
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="grid-margin actual_tile_height actual_tile_width stretch-card " id="product_count_tile_modal" style="display: none">
                              <div class="card card-border">
                                <div class="card-body overflow-hide display-flex">
                                  <div id="" class="">
                                      <p class="card-title text-md-center text-xl-left">Produkte</p>
                                      <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                        <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 product_count_modal"></h3>
                                        <i class="ti-user icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                                      </div>  
                                      <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"><small></small></span></p>
                                  </div>

                                  <div class="overflow-hide ml-3">
                                    <div class=""> 
                                      <table class="table table-striped table-bordered table-hover">
                                      </table>                        
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div class="grid-margin actual_tile_height actual_tile_width stretch-card " id="energy_count_tile_modal" style="display: none">
                              <div class="card card-border">
                                <div class="card-body overflow-hide display-flex">
                                  <div class="" id="">
                                    <p class="card-title text-md-center text-xl-left">Energiedaten Entry</p>
                                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 energy_count_modal"></h3>
                                      <i class="ti-agenda icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                                    </div>  
                                    <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"><small></small></span></p>
                                  </div>
                                

                                  <div class="overflow-hide ml-3">
                                    <div class=""> 
                                      <table class="table table-striped table-bordered table-hover">
                                      </table>                        
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="grid-margin actual_tile_height actual_tile_width stretch-card " id="energy_consumed_tile_modal" style="display: none">
                              <div class="card card-border">
                                <div class=" card-body overflow-hide display-flex">
                                  <div class="" id=""> 
                                    <p class="card-title text-md-center text-xl-left">Energiedaten Consumed</p>
                                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 energy_consumed_count_modal"></h3><p class="energy_unit text-muted">kWh</p>
                                      <i class="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                                    </div>  
                                    <p class="mb-0 mt-2 text-success">(30 days)<span class="text-black ml-1"></span></p>
                                  </div>

                                  <div class="overflow-hide ml-3">
                                    <div class=""> 
                                      <table class="table table-striped table-bordered table-hover">
                                      </table>                        
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <!-- 27-7-2021 -->
                            <div class="grid-margin actual_tile_height actual_tile_width stretch-card" id="five_days_energy_consumed_tile_modal" style="display: none">
                              <div class="card card-border">
                                <div class="card-body overflow-hide display-flex">
                                  <div class="" id="">
                                    <p class="card-title text-md-center text-xl-left">Energiedaten Consumed</p>
                                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0 five_days_energy_count_modal">0</h3><p class="energy_unit text-muted">kWh</p>
                                      <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                                    </div>  
                                    <p class="mb-0 mt-2 text-success">(05 days)<span class="text-black ml-1"><small></small></span></p>
                                  </div>
                                  
                                  <div class="overflow-hide ml-3">
                                    <div class=""> 
                                      <table class="table table-striped table-bordered table-hover">
                                      </table>                        
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- --end-- -->
                          </div>

                          <div id="measurement_modal_loader_div" style="display: none">
                            <img src="images/loader_dashboard.gif" id="measurement_modal_loader_image">
                          </div>
                        
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-sm btn-success" data-type="Measurement-table-format"  id="save_table_btn">Save</button>
                        </div>

                       
                      </div>
                    </div>
                  </div>
                  <!-- --end -->

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- main-panel ends -->