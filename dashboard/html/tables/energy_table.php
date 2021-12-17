
      <!-- partial -->
      <div class="main-panel" id="energy_table_main_div" style="display: none">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Energiedaten</h4>
                  <!-- 17-11-2021 -->
                  <div class="row">
                    <div class="form-group col-md-3">
                      <label for="energy_type">Energy Type</label>
                      <select class="form-control form-control-sm text-dark" id="energy_type">
                        <option value="automatic">Read in Automatically</option>
                        <option value="manually">Entered Manually</option>
                        <option value="layer_model">SchichtModelle</option>
                      </select>
                    </div>


                    
                    <div class="form-group col-md-3">
                      <label for="energy_time_interval">Select Time Interval</label>
                      <select class="form-control form-control-sm text-dark" id="energy_time_interval">
                        <option value="1">Days</option>
                        <option value="2">Weeks</option>
                        <option value="3">Months</option>
                        <option value="4">Years</option>
                        <!-- <option value="40">40</option>
                        <option value="50">50</option> -->
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="energy_records_order_by" id="energy_record_order_by_label">Filter Units Consumed</label>
                      <select class="form-control form-control-sm text-dark" id="energy_records_order_by">
                        <option value="order_by_desc">Maximum</option>
                        <option value="order_by_asc">Minimum</option>
                        <!-- <option value="five_days_measurement_records">Messstellen 05 Days Records</option> -->
                      </select>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="energy_number_record">Select Total No. of Records</label>
                       <input type="number" class="form-control form-control-sm text-dark" id="energy_total_number_record" placeholder="Select Total No. of Records">
                       <span class='energy_number_record_error text-danger'></span>
                    </div>

                  </div>

                  <div class="row">
                    <div class="form-group col-md-12">
                      <label for="energy_search_record">Search Records</label>
                      <input type="text" class="form-control form-control-sm text-dark" id="energy_search_record" placeholder="Search Records">
                    </div>
                    
                    <div class="table-responsive col-md-12 table-margin" id="energy_record_table">
                      <table class="table table-striped table-bordered table-hover" id="energy_record_tb">
                        <thead class="energy_table_header">
                          <tr>
                            <th>Name</th>
                            <th>Time Interval</th>
                            <th>Created Date</th>
                            <th>Total Units</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody id="energy_select_table_entries">
                        
                        </tbody>
                      </table>
                    </div>

                    <input type="hidden" id="mst_id_hidden_energy">
                    <input type="hidden" id="overall_count_energy">
                    <input type="hidden" id="row_click_last_date_energy">
                  </div>
                 
                  <div class="pagination_html_energy" id="pagination_html_energy">
                  </div>
                  <!-- end -->

                  <!-- 22-11-2021-- -->
                  <div class="modal fade bd-example-modal-lg energy_tile_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                <label for="modal-height-input-energy" class="text-mute">Column</label>
                                <input type="number" class="form-control form-control-sm text-dark" id="modal-height-input-energy" placeholder="Column">
                                <input type="hidden" id="modal-height-input-energy-hidden" value="145">
                              </div>

                              <div class="form-group col-md-3">
                                <label for="modal-width-input-energy" class="text-mute">Row</label>
                                <input type="number" class="form-control form-control-sm text-dark" id="modal-width-input-energy" placeholder="Row">
                                <input type="hidden" id="modal-width-input-energy-hidden" value="285">
                              </div>

                          </div>
                          <!-- --end -->
                          <!-- 23-8-21 -->
                          <div class="row dashboard_modal_tile gernerated_energy_modal_tiles">
                          </div>
                          <!-- --end-- -->

                          <div id="energy_modal_loader_div" style="display: none">
                            <img src="images/loader_dashboard.gif" id="energy_modal_loader_image">
                          </div>
                        
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-sm btn-success display-none"  id="save_table_btn_energy">Save</button>
                          <button type="button" class="btn btn-sm btn-success display-none" data-type="Energy"  id="update_table_btn_energy">Update</button>
                        </div>

                       
                      </div>
                    </div>
                  </div>
                  <!-- ---end--- -->
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
      <!-- main-panel ends -->