
      <!-- partial -->
      <div class="main-panel" id="production_table_main_div" style="display: none">
         <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Produkte</h4>

                  <!-- 26-11-2021 -->
                  <div class="row">
                    <div class="form-group col-md-3" id="product_field_div">
                      <img src="images/search.png" id="all_product_image">
                      <input type='text' class='form-control form-control-sm text-dark' placeholder='All Product' readonly >
                    </div>
                  </div>

                  <div class="modal fade modal_all_products" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg max-width-modal">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="text-mute text-dark">Instrumententafel</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div class="modal-body">
                          <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>
                                    Product Name
                                  </th>

                                  <!-- <th>
                                    Item Name
                                  </th> -->

                                  <!-- <th>
                                    Time Interval
                                  </th> -->
                                  <th>
                                    Start
                                  </th>
                                  <!-- <th>
                                    Status
                                  </th> -->
                                </tr>
                              </thead>
                              <tbody id="product_select_table_entries">
                              
                              </tbody>
                            </table>
                          </div>

                          <div class="pagination_all_product_div" id="pagination_all_product">
                          </div>
                        </div>
                         

                        <div class="modal-footer">
                          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                       
                      </div>
                    </div>
                  </div>









                  <!-- --end-- -->
                  
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