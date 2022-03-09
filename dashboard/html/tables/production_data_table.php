
      <!-- partial -->
      <div class="main-panel" id="production_data_table_main_div" style="display: none">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Produktionsdaten</h4>
                  
                  <div class="form-group">
                    <label for="exampleFormControlSelect3">Anzahl Datensätze auswählen</label>
                    <select class="form-control form-control-sm text-dark" id="production_data_number_record">
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
                            Name
                          </th>

                          <th>
                            Item Name
                          </th>

                          <th>
                            Zeitintervall
                          </th>
                          <th>
                            Start
                          </th>
                         
                        </tr>
                      </thead>
                      <tbody id="production_data_select_table_entries">
                      
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