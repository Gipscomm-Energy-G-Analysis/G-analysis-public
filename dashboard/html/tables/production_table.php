
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
                      <input type='text' id="all_product_input_text_field" class='form-control form-control-sm text-dark' placeholder='All Product' readonly >
                    </div>

                    <div class="form-group col-md-3 mt_pr_alignment" id="product_type_div">
                      <label for="product_type">Product Type</label>
                      <select class="form-control form-control-sm text-dark" id="product_type">
                        <option value='automatic'>Read in Automatically</option>
                        <option value='mannual'>Entered Manually</option>
                      </select>
                    </div>

                    <div class="form-group col-md-3 mt_pr_alignment" id="product_records_order_by_div" style="display: none">
                      <label for="product_records_order_by">Filter Units Consumed</label>
                      <select class="form-control form-control-sm text-dark" id="product_records_order_by">
                        <option value='desc'>Order By Max Units Consumed</option>
                        <option value='asc'>Order By Min Units Consumed</option>
                      </select>
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
                              <tbody id="all_product_table_entries">
                              
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
                  
                  <!-- <div class="form-group">
                    <label for="exampleFormControlSelect3">Select No. of Records</label>
                    <select class="form-control form-control-sm text-dark " id="product_number_record">
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div> -->
                  
                  <!-- <p class="card-description">
                    Add class <code>.table-striped</code>
                  </p> -->
                  <div class="table-responsive" id="product_select_table_entries_table_div">
                    <table class="table table-striped table-bordered" id="product_select_table_entries_table">
                      <thead id="product_select_table_entries_table_header">
                        <tr>
                          <!-- <th>
                            Product Name
                          </th> -->

                          <th>
                            Item Name
                          </th>

                          <!-- <th>
                            Time Interval
                          </th> -->
                          <th>
                            Created Date
                          </th>

                          <th>
                            Total Units
                          </th>

                          <!-- <th>
                            Status
                          </th> -->
                        </tr>
                      </thead>
                      <tbody id="product_select_table_entries">
                        <tr>
                          <td style="padding: 6px !important" class='text-center' colspan='5'>Please Select Product</td>
                        </tr>
                      
                      </tbody>
                    </table>

                    <div id="product_select_table_entries_pagination">
                    </div>
                  </div>

                  <input type="hidden" id="overall_count_product">
                  <input type="hidden" id="row_click_last_date_product">
                  <input type="hidden" id="analgen_config_id_input">

                  <div class="modal fade product_tile_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                <label for="modal-height-input-product" class="text-mute">Column</label>
                                <input type="number" class="form-control form-control-sm text-dark" id="modal-height-input-product" placeholder="Column">
                                <input type="hidden" id="modal-height-input-product-hidden" value="145">
                              </div>

                              <div class="form-group col-md-3">
                                <label for="modal-width-input-product" class="text-mute">Row</label>
                                <input type="number" class="form-control form-control-sm text-dark" id="modal-width-input-product" placeholder="Row">
                                <input type="hidden" id="modal-width-input-product-hidden" value="285">
                              </div>

                          </div>
                          <!-- --end -->
                          <!-- 23-8-21 -->
                          <div class="row dashboard_modal_tile gernerated_product_modal_tiles">
                          </div>
                          <!-- --end-- -->

                          <div id="product_modal_loader_div" style="display: none">
                            <img src="images/loader_dashboard.gif" id="product_modal_loader_image">
                          </div>
                        
                        </div>

                        <div class="modal-footer">
                          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-sm btn-success display-none" data-type="product-table-format"  id="save_table_btn_product">Save</button>
                          <button type="button" class="btn btn-sm btn-success display-none" data-type="Product"  id="update_table_btn_product">Update</button>
                        </div>

                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>   
      </div>
      <!-- main-panel ends -->