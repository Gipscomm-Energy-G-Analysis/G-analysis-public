<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link type="text/css" rel="stylesheet" href="https://g-analysis.com/dist/css/jquery.dataTables.min.css"/>
<link type="text/css" rel="stylesheet" href="https://g-analysis.com/dist/css/buttons.dataTables.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<script type="text/javascript" src="https://g-analysis.com/dist/js/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script type="text/javascript" src="https://g-analysis.com/dist/js/ej.web.all.min.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/dist/js/jquery.dataTables.min.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/src/js/fpCore.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/src/js/fpChart2.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/dist/js/DataMachine.min.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/src/js/DataTranslator.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/dist/js/fpGeometry.min.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/src/js/formula.js" defer></script>
<script type="text/javascript" src="https://g-analysis.com/dist/js/math.min.js" defer></script>
<script type="text/javascript" src="/dashboard/js/graph-chart-popup.js" defer></script>
<script type="text/javascript">
  // Default Configuration
  /**
   * Initializes the global configuration for Toastr notifications.
   * Sets default options such as positioning, duration, and animation effects.
   */
    $(document).ready(function() {
      toastr.options = {
        'closeButton': true,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-right',
        'preventDuplicates': false,
        'showDuration': '1000',
        'hideDuration': '1000',
        'timeOut': '3000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut',
      }
    });
  // Toast Image and Progress Bar
  /**
   * Click handler for displaying a sample Toastr notification with an image.
   * Triggers an informational toast when the element with ID 'image' is clicked.
   */
    $('#image').click(function(event) {
      toastr.options.progressBar = true,
      toastr.info('<img src="https://image.flaticon.com/icons/svg/34/34579.svg" style="width:150px;">', 'Toast Image')
    });
  // Toast Position
  /**
   * Click handler for testing Toastr notification positions based on user selection.
   * Retrieves the selected position value and displays a sample notification at that location.
   */
    $('#position').click(function(event) {
      var pos = $('input[name=position]:checked', '#positionForm').val();
      toastr.options.positionClass = "toast-" + pos;
      toastr.options.preventDuplicates = false;
      toastr.info('This sample position', 'Toast Position')
    });
</script>
  <link rel="stylesheet" href= "//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css"> 
  <script src="//code.jquery.com/jquery-1.12.4.js"> </script> 
  <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"> </script> 
  <style> 
    #gfg {  
     text-align: justify; 
    } 
  </style> 
  <script> 
  /**
   * Initializes the dashboard navigation tabs using jQuery UI.
   * Sets up the tab structure for the element with ID 'gfg'.
   */
    $(document).ready(function () { 
      /**
       * Optional handler for when tabs are created.
       */
      $("#gfg").on('tabscreate', function () { 
      }); 
  
      $("#gfg").tabs(); 
    }); 
  </script> 
<!-- partial -->
<div class="main-panel" id="dashboard_main_div" style="display: none">
        <div class="content-wrapper">
          <div class="row heading-margin-top">
            <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                </div>
              </div>
              <div class="row" style="display: none">  
                <div class="form-group col-md-6">
                  <label class="text-dark mt-3" for="dashboard_select_tag">Datensätze auswählen</label>
                  <select class="form-control form-control-sm text-muted" multiple name="dashboard_select_tag[]" id="dashboard_select_tag">
                    <option value="mesurement_count_div" description="Measurement Entries Count">Messstellen</option>
                    <option value="product_count_div" description="Product Entries Count">Produkte</option>
                    <option value="energy_count_div" description="Energy Entries Count">Energiedaten</option>
                  </select>
                </div>
               
                <div class="form-group col-md-6">
                  <button id='save_select_changes' class="badge badge-success custom-btn">Änderungen speichern</button>
                </div>
            </div>
            </div>
          </div>
          <div id="gfg" class="dash-tab"> 
            <ul> 
              <li><a id = "gfg1_li" href="#gfg1" data-value="Graph" class="btn btn-success btn-sm mb-3">Diagramm</a></li> 
              <li><a id = "gfg2_li" href="#gfg2" data-value="table" class="btn btn-success btn-sm mb-3">Tabelle</a></li> 
              <li><a id = "gfg3_li" href="#gfg3" data-value="chart" class="btn btn-success btn-sm mb-3">Wert</a></li>
              <li><a type="button" class="btn btn-success btn-sm mb-3" id="dashboard_add_tile" data-toggle="modal" data-target="#dashboard_tile_modal" onclick="dashboardTileCount()">Auswertung hinzufügen</a></li> 
              <li><a type="button" class="btn btn-success btn-sm mb-3" btn_click='dashboard' style="display: none" id="save_position_tile">Struktur speichern</a></li> 
              <li><a id = "gfg4_li" href="#gfg4" data-value="messstellen" class="btn btn-success btn-sm mb-3">Messstellen</a></li> 
              <li><a id = "gfg5_li" href="#gfg5" data-value="zeitvergleich" class="btn btn-success btn-sm mb-3">Zeitvergleich</a></li> 
              <li><a id = "gfg6_li" href="#gfg6" data-value="kennzahlen" class="btn btn-success btn-sm mb-3">Kennzahlen</a></li>
              <li><a id = "gfg7_li" href="#gfg7" data-value="manuell" class="btn btn-success btn-sm mb-3">Manuell Data</a></li>
              <li><a id = "gfg8_li" href="#gfg8" data-value="manuell15min" class="btn btn-success btn-sm mb-3">Manuell 15min Data</a></li>   
            </ul> 
  
        <div id="gfg1" style = "display: none;"> 
          <span style = "display:none;"> Graphs Data be loaded </span>
           
        </div> 
  
        <div id="gfg2" style = "display: none;"> 
          <span style = "display:none;"> Tables Data be loaded</span>
           
        </div> 
        <div id="gfg3" style = "display: none;"> 
          <span style = "display:none;"> Charts Data be loaded</span>
           
        </div>
        <div id="gfg4" style = "display: none;"> 
          <!--Gespeicherte Diagrammliste-->
          <div class="savedGraphSection">
            <div id="messstellen_tile_loader_div" style = "display: none;">
              <img src="images/loader_dashboard.gif" id="tile_loader_image">
            </div>
            <div id="messstellenSavedGraphContainer">
              <div class="bartitle">Messstellen Saved Graph</div>
                <table id="messstellenDiagrammeListe" class="stripe hover row-border compact dt-left custom"
                    style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                    <thead>
                        <tr>
                            <th>gDia_ID</th>
                            <th>Bezeichnung</th>
                            <th>Beschreibung</th>
                            <th>Typ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
          </div>
        </div> 
        <div id="gfg5" style = "display: none;"> 
          <!--Gespeicherte Diagrammliste-->
          <div class="savedGraphSection">
            <div id="zeitvergleich_tile_loader_div" style = "display: none;">
              <img src="images/loader_dashboard.gif" id="tile_loader_image">
            </div>
            <div id="zeitvergleichSavedGraphContainer">
              <div class="bartitle">Zeitvergleich Saved Graph</div>
                <table id="zeitvergleichDiagrammeListe" class="stripe hover row-border compact dt-left custom"
                    style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                    <thead>
                        <tr>
                            <th>gDia_ID</th>
                            <th>Bezeichnung</th>
                            <th>Beschreibung</th>
                            <th>Typ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
          </div>
           
        </div> 
        <div id="gfg6" style = "display: none;">
          <!--Gespeicherte Diagrammliste-->
          <div class="savedGraphSection">
            <div id="kennzahlen_tile_loader_div" style = "display: none;">
              <img src="images/loader_dashboard.gif" id="tile_loader_image">
            </div>
            <div id="kennzahlenSavedGraphContainer">
              <div class="bartitle">Kennzahlen Saved Graph</div>
                <table id="kennzahlenDiagrammeListe" class="stripe hover row-border compact dt-left custom"
                    style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                    <thead>
                        <tr>
                            <th>gDia_ID</th>
                            <th>Bezeichnung</th>
                            <th>Beschreibung</th>
                            <th>Typ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
          </div>
           
        </div>  
        <div id="gfg7" style = "display: none;">
          <!--Imported Manuell Data-->
          <div class="importedManuellSection">
            <div id="importedManuellDataContainer">
              <div class="bartitle">Imported Manuell Data</div>
              <div class="tab-section">
                <!-- Tab Navigation -->
                <div class="tab-container">
                    <div class="tab active" data-target="tab1">Tage</div>
                    <div class="tab" data-target="tab2">Stunden</div>
                    <div class="tab" data-target="tab3">Monate</div>
                    <div class="tab" data-target="tab4">Jahre</div>
                </div>
                <div id="tile_loader_div" style="display: none;">
                    <img src="/dashboard/images/loader_dashboard.gif" id="tile_loader_image">
                </div>
                <!-- Tab Content -->
                <div id="tab1" class="tab-content active">
                  <table id="importManuellDataDayListe" class="stripe hover row-border compact dt-left custom"
                      style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Channel Name</th>
                              <th>MST Name</th>
                              <th>Value</th>
                              <th>Power</th>
                          </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
                </div>
                <div id="tab2" class="tab-content">
                  <table id="importManuellDataHourListe" class="stripe hover row-border compact dt-left custom"
                      style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Channel Name</th>
                              <th>MST Name</th>
                              <th>Value</th>
                              <th>Power</th>
                          </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
                </div>
                <div id="tab3" class="tab-content">
                  <table id="importManuellDataMonthListe" class="stripe hover row-border compact dt-left custom"
                      style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Channel Name</th>
                              <th>MST Name</th>
                              <th>Value</th>
                              <th>Power</th>
                          </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
                </div>
                <div id="tab4" class="tab-content">
                  <table id="importManuellDataYearListe" class="stripe hover row-border compact dt-left custom"
                      style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Channel Name</th>
                              <th>MST Name</th>
                              <th>Value</th>
                              <th>Power</th>
                          </tr>
                      </thead>
                      <tbody></tbody>
                  </table>
                </div>
            </div>
            </div>
          </div>
           
        </div>
        <div id="gfg8" style = "display: none;">
          <!--Imported Manuell 15min Data-->
          <div class="importedManuell15minSection">
            <div id="importedManuell15minDataContainer">
              <div id="manuell15min_tile_loader_div" style = "display: none;">
                <img src="images/loader_dashboard.gif" id="tile_loader_image">
              </div>
              <div class="bartitle">Import Manuell 15min Data</div>
              <table id="importManuell15minDataListe" class="stripe hover row-border compact dt-left custom"
                      style="font-size:12px;margin-top:10px;text-align:left;border:1px solid black;margin-right:10px;">
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Channel Name</th>
                              <th>Time Server</th>
                              <th>Value</th>
                              <th>Power</th>
                          </tr>
                      </thead>
                      <tbody></tbody>
              </table>
            </div>
          </div>
           
        </div>

       
    </div> 
          <div class="modal fade" id="dashboard_tile_modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="text-mute text-dark">Dashboard</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="row">
                    <input type="hidden" id="modal-open" value="false">
                    <div class="col-md-3 form-group">
                      <label for="title_modal_tile">Name</label>
                      <input type="text" placeholder="Kachelname" name="title_modal_tile" required id="title_modal_tile" class="form-control form-control-sm">
                    </div>
                    <div class="form-group col-md-3">
                      <label for="record_type_of_tile">Art des Datensatzes</label>
                      <select class="form-control form-control-sm text-dark" id="record_type_of_tile">
                          <option value="energy" description="Energy Entries Count">Messtellen-Energie</option>
                          <option value="product" description="Product Entries Count">Alarm-Info Board</option>
                          <option value="measurement" description="Measurement Entries Count">Messtellen-Betrieb</option>
                          <option value="graph" description="Save Graph">Graph</option>
                      </select>
                    </div>

                    <div class="form-group col-md-3 tile-type">
                      <label for="type_data_tile">Art der Daten</label>
                      <select class="form-control form-control-sm text-dark" id="type_data_tile">
                          <option value="table">Tabelle</option>
                          <option value="chart">Diagramm</option>
                          <option value="overall_count">Wert</option>
                      </select>
                    </div>

                    <div id="save_btn_tile_div">
                      <input type="button" id="save_and_proceed_btn_dashboard" data-edit="false" class="btn btn-sm btn-success save_and_proceed_btn_dashboard" value="Speichern & fortfahren">
                    </div>
                    <input type="hidden" id="edit_product_tile_automatic">
                    <input type="hidden" id="edit_tile_click_manually">
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Schließen</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="dashboard_tile_modal_chart" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg max-width-modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="text-mute text-dark">Dashboard Diagramm</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="row">
                    <div class="form-group col-md-2">
                      <label for="measurement-height-chart" class="text-mute">Spalte</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="measurement-height-chart" placeholder="Spalte">
                      <input type="hidden" id="measurement-height-chart-hidden" value="145">
                    </div>

                    <div class="form-group col-md-2">
                      <label for="measurement-width-chart" class="text-mute">Zeile</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="measurement-width-chart" placeholder="Reihe">
                      <input type="hidden" id="measurement-width-chart-hidden" value="285">
                    </div>
                    <div class="form-group col-md-2" id="energy_type_dashboard_chart_div">
                      <label for="time_interval_chart" class="text-mute">Datentyp</label>
                      <select class="form-control form-control-sm text-dark" id="energy_type_dashboard_chart">
                        <option value="automatic">Automatisch</option>
                        <option value="manually">Manuell</option>
                        <option value="layer_modal">SchichtModelle</option>
                      </select>
                    </div> 
                    <div class="form-group col-md-2 energy_automatic_div" id="energy_chart_measurement_div_automatic">
                      <label for="energy_chart_measurement_automatic" class="text-mute">Messstelle auswählen</label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="energy_chart_measurement_automatic" multiple>
                        <option value="">Messstelle auswählen</option>
                      </select>
                    </div>

                    <div class="form-group energy_automatic_div col-md-2">
                      <label for="energy_chart_layer_range_automatic" class="text-mute">Bereich</label>
                      <span class='mandatory_sign'>*</span>
                      <input type="number" class="form-control form-control-sm text-dark" id="energy_chart_layer_range_automatic" placeholder="Enter Value">
                      <span class="energy_chart_layer_automatic_range_error text-danger"></span>
                    </div>

                    <!-- *Energy Layer Modal Div -->
                    <div class="form-group col-md-2 energy_chart_layer_div" id="energy_chart_measurement_div">
                      <label for="time_interval_chart" class="text-mute">Messstelle auswählen</label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="energy_chart_measurement">
                        <option value="">Messstelle auswählen</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2 energy_chart_layer_div" id="energy_chart_layer_filter_div">
                      <label for="time_interval_chart" class="text-mute">Filter auswählen</label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="energy_chart_layer_filter">
                        <option value="">Filter auswählen</option>
                        <option value="day">Tage</option>
                        <option value="week">Wochen</option>
                      </select>
                      <span class="energy_chart_layer_filter_error text-danger"></span>
                    </div>

                    <div class="form-group energy_chart_layer_div col-md-2">
                      <label for="energy_chart_layer_range" class="text-mute">Bereich</label>
                      <span class='mandatory_sign'>*</span>
                      <input type="number" class="form-control form-control-sm text-dark" id="energy_chart_layer_range" placeholder="Enter Value">
                      <span class="energy_chart_layer_range_error text-danger"></span>
                    </div>

                    <div class="form-group col-md-2" id="save_graph_div" style="display:none;">
                      <label for="save_graph_chart" class="text-mute">Saved Graph</label>
                      <span class="mandatory_sign">*</span>
                      <select class="form-control form-control-sm text-dark save_graph_chart" id="save_graph_chart">
                        <option value="" disabled selected>Select Graph</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="graph_table_div" style="display:none;">
                      <label for="graph_table_chart" class="text-mute">Graph Type</label>
                      <select class="form-control form-control-sm text-dark graph_table_chart" id="graph_table_chart">
                        <option value="graph" >Graph</option>
                        <option value="table" >Table</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="measurement_point_div" style="display:none;">
                      <label for="measurement_point_chart" class="text-mute">Measurement Point</label>
                      <select class="form-control form-control-sm text-dark measurement_table_option measurement_point_chart" id="measurement_point_chart">
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="measurement_point_year_div" style="display:none;">
                      <label for="measurement_point_year" class="text-mute">Date Filter</label>
                      <select class="form-control form-control-sm text-dark measurement_table_option knz_option measurement_point_year" id="measurement_point_year">
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="numberofday" style="display:none;">
                      <label for="number_of_day" class="text-mute">Number of Days</label>
                      <select class="form-control form-control-sm text-dark number_of_day" id="number_of_day">
                        <option value="10" >10 day</option>
                        <option value="20" >20 day</option>
                        <option value="30" >30 day</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="auto_refresh_div" style="display:none;">
                      <label for="auto_refresh_hourly" class="text-mute">Auto Refresh</label>
                      <select class="form-control form-control-sm text-dark auto_refresh_hourly" id="auto_refresh_hourly">
                        <option value="1" >1 Hour</option>
                        <option value="2" >2 Hour</option>
                        <option value="3" >3 Hour</option>
                        <option value="4" >4 Hour</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2 isLiveGraph" id="isLiveGraph" style="display:none; top: 30px;">
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                        Live Graph
                          <input type="checkbox" class="text-mute form-check-input" id="is_live_graph" name="islive" value="0">  
                        </label>
                      </div>
                    </div>

                    <div class="form-group col-md-2" id="newGraph" style="display:none; top: 22px;">
                      <div class="form-check form-check-primary">
                        <a href="javascript:void(0);" id="mstVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click">
                        <input type="button" id="creategraph" class="btn btn-sm btn-success" value="Create New Graph"></a> 
                      </div>
                    </div>

                    <div class="form-group col-md-2" id="time_interval_div">
                      <label for="time_interval_chart" class="text-mute">Zeitintervall</label>
                      <select class="form-control form-control-sm text-dark" id="time_interval_chart">
                        <option value="1">Tage</option>
                        <option value="2">Wochen</option>
                        <option value="3">Monate</option>
                        <option value="4">Jahre</option>
                      </select>
                    </div>
                    
                    
                    <div class="form-group col-md-2" id="chart_record_div">
                      <label for="chart_records" class="text-mute" id="chart_records_label"></label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="chart_records">
                      </select>
                    </div>

                    <div class="form-group col-md-2 chart_product_div" id="chart_record_product_div">
                      <label for="chart_records_product" class="text-mute" id="chart_records_label_product"></label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="chart_records_product">
                      </select>
                    </div>

                    <div class="form-group col-md-2 chart_product_div" id="chart_record_product_item_div">
                      <label for="chart_records_product_item" class="text-mute">Menüpunkt wählen</label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="chart_records_product_item">
                        <option value=''>Menüpunkt wählen</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="chart_record_filter_div">
                      <label for="chart_record_filter" class="text-mute">Filter</label>
                      <span class='mandatory_sign'>*</span>
                      <select class="form-control form-control-sm text-dark" id="chart_record_filter">
                        <option value=''>Filter auswählen</option>
                        <option value="10">letzte 10 Datensätze</option>
                        <option value="20">letzte 20 Datensätze</option>
                        <option value="30">letzte 30 Datensätze</option>
                        <option value="all">Alle Datensätze</option>
                      </select>
                    </div>

                    <div class="form-group col-md-2" id="chart_record_type_div">
                      <label for="chart_type" class="text-mute">Diagramm Typ</label>
                      <select class="form-control form-control-sm text-dark" id="chart_type">
                        <option value="line_chart">Liniendiagramm</option>
                        <option value="area_chart">Flächendiagramm</option>
                        <option value="pie_chart">Kuchendiagramm</option>
                        <option value="bar_chart">Balkendiagramm</option>
                      </select>
                    </div>

                    <diV class="form-group col-md-2 expandViewChart">
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                        Ansicht erweitern
                          <input type="checkbox" class="text-mute form-check-input" id="expand_view_chart" name="expand_view" value="0">  
                        </label>
                      </div>
                    </div>
                    
                    <diV class="form-group col-md-2 outsideView">
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          Äußere Kachelstruktur
                          <input type="checkbox" class="text-mute form-check-input" id="chart_outside_tile_structure" name="chart_outside_tile_structure" value="0">  
                        </label>
                      </div>
                    </div>
                    
                    <div class="form-group col-md-2 chart_outisde_tile_controls" style="display: none">
                      <label for="chart_height_outer_structure" class="text-mute">Äußere Kachelspalte</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="chart_height_outer_structure" placeholder="Outer Column">
                    </div>

                    <div class="form-group col-md-2 chart_outisde_tile_controls"  style="display: none">
                      <label for="chart_width_outer_structure" class="text-mute">Außerhalb der Kachelreihe</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="chart_width_outer_structure" placeholder="Outer Row">
                    </div>

                    <div class="form-group col-md-2 chart_outisde_tile_controls" style="display: none">
                      <label for="chart_outer_table_limit_column" class="text-mute">Spaltenlimit</label>
                      <input type="number" class="form-control form-control-sm text-dark" id="chart_outer_table_limit_column" placeholder="Limit Column" value='1'>
                    </div>
                    
                    <diV class="form-group col-md-2" style="display: none">
                      <div class="form-check form-check-primary">
                        <label class="form-check-label">
                          Outside Tile Chart
                          <input type="checkbox" class="text-mute form-check-input" id="display_chart_outside_tile" name="display_chart_outside_tile" value="0">  
                        </label>
                      </div>
                    </div>

                    <div class="form-group col-md-3">
                      <input type="button" class="btn btn-sm btn-success click_common_btn_chart" id="chart_btn_click" value='Show Results'>  
                    </div>


                  </div>
                  
                  <div class="row dashboard_chart_tiles">
                    
                  </div>

                  <div id="measurement_modal_loader_div_chart" style="display: none">
                    <img src="images/loader_dashboard.gif" id="measurement_modal_loader_image_chart">
                  </div>

                  <div id="dashboard_loader_div" style="display: none">
                    <img src="images/loader_dashboard.gif" id="dashboard_loader_image">
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Schließen</button>
                    <input type="button" id="save_and_proceed_btn_dashboard_chart" data-edit="false" data-edit-chart='false' class="btn btn-sm btn-success save_and_proceed_btn_dashboard_chart" value="Speichern & fortfahren">

                    <input type="button" id="update_and_proceed_btn_dashboard_chart"  class="btn btn-sm btn-success update_and_proceed_btn_dashboard_chart" value="Update & Proceed">
                </div>
              </div>
            </div>
          </div>
            <input type="hidden" id="start_tile_data">
            <input type="hidden" id="drop_tile_data">

          <input type="hidden" id='save_tile_id'>
          <input type="hidden" id='save_tile_id_automatic'>
          <div class="row dashboard_count_div"  id="dashboard_count_div_tile">
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width tiles-click" id="mesurement_count_div" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div id="mesurement_count_content" class="col-md-12">
                      <p class="card-title text-md-center text-xl-left" id="measuremet_dashboard_tile_title">Messstellen</p>
                      <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                        <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="mesurement_count"></h3>
                        <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                      </div>  
                      <p class="mb-0 mt-2 text-success">(30 Tage)<span class="text-black ml-1"><small></small></span></p>
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
                                  <span class="sr-only">das Vorhergehende</span>
                              </a>
                          </li>
                          <li class="page-item">
                              <a class="page-link" href="javascript:void(0);">Seite</a>
                          </li>
                          
                          <li style="display: block" class="page-item"><input type="number" readonly class="save_pagination_input_val pagination_input_val page-link"></li>
                          <li class="page-item"><a class="page-link" href="javascript:void(0);">of</a></li>
                          <li class="page-item"><a class="page-link " href="javascript:void(0);">1</a></li>
                          
                          <li class="page-item " >
                            <a class="page-link" style="background: #d6d6d6; color: black" href="javascript:void(0);" aria-label="Next">
                                <span aria-hidden="true">»</span>
                                <span class="sr-only">das Nächste</span>
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
                      <p class="mb-0 mt-2 text-success">(30 Tage)<span class="text-black ml-1"><small></small></span></p>
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
                    <p class="card-title text-md-center text-xl-left">Energiedaten Eintrag</p>
                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="energy_count"></h3>
                      <i class="ti-agenda icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                    </div>  
                    <p class="mb-0 mt-2 text-success">(30 Tage)<span class="text-black ml-1"><small></small></span></p>
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
                    <p class="card-title text-md-center text-xl-left">Energiedaten Verbrauch</p>
                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="energy_consumed_count"></h3><p class="energy_unit text-muted">kWh</p>
                      <i class="ti-layers-alt icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                    </div>  
                    <p class="mb-0 mt-2 text-success">(30 Tage)<span class="text-black ml-1"></span></p>
                  </div>

                  <div class="col-md-9 save_table_div_show overflow-hide" id="energy_consumed_table_show" style="display: none">
                     
                  </div>


                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card dashboard_tile_height dashboard_tile_width  tiles-click" id="five_days_energy_consumed" style="display: none">
              <div class="card card-border">
                <div class="row card-body">
                  <div class="col-md-12" id="energy_consumed_five_day_content">
                    <p class="card-title text-md-center text-xl-left">Energiedaten Verbrauch</p>
                    <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                      <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0" id="five_days_energy_count"></h3><p class="energy_unit text-muted">kWh</p>
                      <i class="ti-calendar icon-md text-muted mb-0 mb-md-3 mb-xl-0"></i>
                    </div>  
                    <p class="mb-0 mt-2 text-success">(05 Tage)<span class="text-black ml-1"><small></small></span></p>
                  </div>
                  
                  <div class="col-md-9 save_table_div_show overflow-hide" id="energy_consumed_five_day_table_show" style="display: none">
                     
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="row dashboard_count_div_chart">
            <div class="col-md-6 grid-margin stretch-card" id="energy_graph_chart" style="display: none">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Energiedaten ein Monat</p>
                  <p class="text-muted font-weight-light">Received overcame oh sensible so at an. Formed do change merely to county it. Am separate contempt domestic to to oh. On relation my so addition branched.</p>
                  <div id="sales-legend" class="chartjs-legend mt-4 mb-2"></div>
                </div>
             
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card" id="energy_circle_chart" style="display: none">
              <div class="card border-bottom-0">
                <div class="card-body pb-0">
                  <p class="card-title">Energiedaten details</p>
                  <p class="text-muted font-weight-light">The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review</p>
              
                </div>
                  <canvas id="north-america-chart"></canvas>
                  <div id="north-america-legend"></div>
              </div>
            </div>
          </div>
          <div class="row" style="display: none">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-2">Energiedaten Verbrauch</p>
                  <div class="table-responsive table-not-consumed">
                    <table class="table table-hover table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Zeitintervall</th>
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
          <div class="row dashboard_count_div">
            <div class="col-md-12 grid-margin stretch-card" id="five_days_energy_consumed_table_div" style="display: none">
              <div class="card card-border">
                <div class="card-body">
                  <p class="card-title mb-2">Energiedaten 5 Tage Verbrauch</p>
                  <div class="table-responsive table-not-consumed">
                    <table class="table table-hover table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Zeitintervall</th>
                          <th>Tag</th>
                          <th>Datum</th>
                          <th>Verbrauch</th>
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
        </div>
        <input type="hidden" id="username" value="">
        <footer class="footer">
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->