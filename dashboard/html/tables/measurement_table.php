
      <!-- partial -->
      <div class="main-panel" id="measurement_table_main_div" style="display: none">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Messstellen</h4>
                  
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="measurement_number_record">Select No. of Records</label>
                      <select class="form-control form-control-sm text-dark" id="measurement_number_record">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <!-- <option value="40">40</option>
                        <option value="50">50</option> -->
                      </select>
                    </div>

                    <div class="form-group col-md-6">
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
                  </div>
                  
                  <!-- <p class="card-description">
                    Add class <code>.table-striped</code>
                  </p> -->
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>
                            Name
                          </th>
                          <th>
                            Time Interval
                          </th>
                          <th>
                            Date
                          </th>
                          <th>
                            Units
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- main-panel ends -->