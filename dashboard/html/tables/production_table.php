
      <!-- partial -->
      <div class="main-panel" id="production_table_main_div" style="display: none">
         <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Produkte</h4>
                  
                  <div class="form-group">
                    <label for="exampleFormControlSelect3">Select No. of Records</label>
                    <select class="form-control form-control-sm text-dark " id="product_number_record">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <!-- <option value="40">40</option>
                      <option value="50">50</option> -->
                    </select>
                  </div>
                  
                  <!-- <p class="card-description">
                    Add class <code>.table-striped</code>
                  </p> -->
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>
                            Product Name
                          </th>

                          <th>
                            Item Name
                          </th>

                          <th>
                            Time Interval
                          </th>
                          <th>
                            Start
                          </th>
                          <th>
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody id="product_select_table_entries">
                      
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