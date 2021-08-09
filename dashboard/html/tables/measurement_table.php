
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
                      <input type="hidden" id='row_click_table_input'>
                      <table class="table table-striped table-bordered table-hover">
                        <thead class="measurement_table_header">
                          <tr>
                            <th>
                              Name
                            </th>
                            <th>
                              Time Interval
                            </th>
                            <th>
                              Created Date
                            </th>
                            <th>
                              Total Units
                            </th>
                            <th>
                              Status
                            </th>
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

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- main-panel ends -->