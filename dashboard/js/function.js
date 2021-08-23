//Count Dashboard Boxes 
function countDashboard(){
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getCountDashBoard",
            nameDB: $("#nameDashboardDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            (a['energy'] != null) ? $('#energy_count').text(a['energy']) : '';
            (a['mesurement'] != null) ? $('#mesurement_count').text(a['mesurement']) : '';
            (a['product'] != null) ? $('#product_count').text(a['product']) : '';
            (a['energy_consumed'][0] != null) ? $('#energy_consumed_count').text(a['energy_consumed'][0]['']) : '';
            $('#energy_not_consumed_table').html('');
            $('#energy_not_consumed_table').html(a['energy_not_consumed']);

            //<--Modal Values--
            (a['mesurement'] != null) ? $('.mesurement_count_modal').text(a['mesurement']) : '';
            (a['energy'] != null) ? $('.energy_count_modal').text(a['energy']) : '';
            (a['product'] != null) ? $('.product_count_modal').text(a['product']) : '';
            (a['energy_consumed'][0] != null) ? $('.energy_consumed_count_modal').text(a['energy_consumed'][0]['']) : '';
            // --end-->
           
        }
    });
}

//Selected Number of Records Mesurement
function getNumberRecordsMesurement(){
    var number_record_local_val = localStorage.getItem('number_record_measurement');
    if(number_record_local_val != undefined && number_record_local_val != null){
        $('#measurement_total_number_record').val(number_record_local_val);
    }
    else{
        $('#measurement_total_number_record').val('');
    }

    //6-8-2021---
    var selected_number_record = localStorage.getItem('selected_number_record_measurement');
    if(selected_number_record == undefined || selected_number_record == ''){
        selected_number_record = 5;
    }
    //----end-->
    var total_number_records = $('#measurement_total_number_record').val();
    var time_interval = $('#measurement_time_interval').val();
    var records_order_by_val = $('#measurement_records_order_by').val();
    var search_record = $('#measurement_search_record').val();

    $('.measurement_table_header').removeClass('row_click_table');
    $('.table-margin .table th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
    if(total_number_records == ''){
      var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
      $('#mesurement_select_table_entries').html(tr);
      $('#pagination_html').html('');
    }
    else{
      $.ajax({
          type: "POST",
          url: "php/retreive.php",
          async: false,
          dataType: 'json',
          data: {
              action: "getNumberRecordsMesurement",
              nameDB: $("#nameDashboardDB").val(),
              total_number_records : total_number_records,
              time_interval : time_interval,
              measurement_order_by_val : records_order_by_val,
              search_record : search_record,
              number_records : selected_number_record,
          },
          fail: function() {
              alert("failed!!")
          },
          success: function(a) {
            // a = JSON.parse(a);
            var thVal =  $('#measurement_record_table table thead tr').children('th:eq(4)').text();
            if(thVal == '' || thVal == undefined){
              $('#measurement_record_table table thead tr').children('th:eq(3)').after("<th>Status</th>"); 
            }
            $('#mesurement_select_table_entries').html(a['measurement_html']);
            $('#pagination_html').html(a['pagination_html']);
            $('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
            
            $('.table-margin').removeClass('margin-remove-table');
            $('#measurement_record_table table thead tr').children('th:eq(2)').text('Created Date');
            $('#measurement_record_table table thead tr').children('th:eq(3)').text('Total Units');

            var val_selected = localStorage.getItem('selected_number_record_measurement');
            $('#measurement_number_record option[value='+val_selected+']').prop('selected', 'selected');

            localStorage.setItem('query_data',JSON.stringify(a['query_data']));
          }
      });
    }
}

//Get Number Records Mesurement Pagination
function getNumberRecordsMesurementPagination(page_val,selected_number_record_measurement = 'false'){
    var number_records = $('#measurement_number_record').val();
    var time_interval = $('#measurement_time_interval').val();
    var records_order_by_val = $('#measurement_records_order_by').val();
    var search_record = $('#measurement_search_record').val();
    var total_number_records = $('#measurement_total_number_record').val();
    if(total_number_records == ''){
      var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
      $('#mesurement_select_table_entries').html(tr);
      $('#pagination_html').html('');
    }
    else{
      $.ajax({
          type: "POST",
          url: "php/retreive.php",
          async: false,
          dataType: 'json',
          data: {
              action: "getNumberRecordsMesurement",
              nameDB: $("#nameDashboardDB").val(),
              number_records : number_records,
              time_interval : time_interval,
              measurement_order_by_val : records_order_by_val,
              page_val : page_val,
              search_record : search_record,
              total_number_records : total_number_records,
              selected_number_record_measurement : selected_number_record_measurement
          },
          fail: function() {
              alert("failed!!")
          },
          success: function(a) {
            $('#mesurement_select_table_entries').html(a['measurement_html']);
            $('#pagination_html').html(a['pagination_html']);
            $('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
            
            var val_selected = localStorage.getItem('selected_number_record_measurement');
            $('#measurement_number_record option[value='+val_selected+']').prop('selected', 'selected');

            localStorage.setItem('query_data',JSON.stringify(a['query_data']));
          }
      });
    }

}

function rowClickMeasurementTableData(mst_id,data_type){
  var number_records = $('#measurement_number_record').val();  
  var total_number_records = $('#measurement_total_number_record').val();

  var records_order_by_val = $('#measurement_records_order_by').val();

  //Classes Add
  $('.measurement_table_header').addClass('row_click_table');
  $('.table-margin .table th').removeAttr('style');
  if(total_number_records == ''){
    var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
    $('#mesurement_select_table_entries').html(tr);
    $('#pagination_html').html('');
  }
  else{
    $.ajax({
      type : "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "rowClickMeasurementTableData",
          nameDB: $("#nameDashboardDB").val(),
          mst_id : mst_id,
          data_type : data_type,
          number_records : number_records,
          total_number_records : total_number_records,
          measurement_order_by_val : records_order_by_val,
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#measurement_record_table table thead tr').children('th:eq(4)').remove(); 

        $('#mesurement_select_table_entries').html(a['measurement_html']);
        $('#pagination_html').html(a['pagination_html']);
        $('.table-margin .table td').removeAttr('style');
        
        $('.table-margin').addClass('margin-remove-table');
        $('#measurement_record_table table thead tr').children('th:eq(2)').text('Date');
        $('#measurement_record_table table thead tr').children('th:eq(3)').text('Units Consumed');

        $('#measurement_number_record option[value='+number_records+']').prop('selected', 'selected');

        localStorage.setItem('query_data',JSON.stringify(a['query_data']));
      }
    });
  }
}

function rowClickMeasurementPaginationTableData(mst_id,data_type,page_value,selected_number_record_measurement = 'false'){
  var number_records = $('#measurement_number_record').val();
  var total_number_records = $('#measurement_total_number_record').val(); 
  var records_order_by_val = $('#measurement_records_order_by').val(); 
  if(total_number_records == ''){
    var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
    $('#mesurement_select_table_entries').html(tr);
    $('#pagination_html').html('');
  }
  else{
    $.ajax({
      type : "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "rowClickMeasurementTableData",
          nameDB: $("#nameDashboardDB").val(),
          mst_id : mst_id,
          data_type : data_type,
          number_records : number_records,
          page_val : page_value,
          selected_number_record_measurement : selected_number_record_measurement,
          total_number_records : total_number_records,
          measurement_order_by_val : records_order_by_val,
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#mesurement_select_table_entries').html(a['measurement_html']);
        $('#pagination_html').html(a['pagination_html']);
        $('.table-margin .table td').removeAttr('style');

        $('#measurement_number_record option[value='+number_records+']').prop('selected', 'selected');

        //LocalStorage
        localStorage.setItem('query_data',JSON.stringify(a['query_data']));
      }
    });
  }

}


function saveTableFormat(type){
  var row_enteries_length = $('#mesurement_select_table_entries tr').length;
  var query_data = localStorage.getItem('query_data');
  var tile_title = $('#title_modal_tile').val();
  if(query_data != undefined && query_data != null && query_data != '')
  {
    var measuremnt_table_height = $('#modal-height-input-measurement-hidden').val();
    var measurement_table_width = $('#modal-width-input-measurement-hidden').val();
    if(measuremnt_table_height != '' && measurement_table_width != ''){
      var measurement_preview_data = [];
      measurement_preview_data.push({'height':measuremnt_table_height,'width':measurement_table_width});
      localStorage.setItem('measurement_preview_data',JSON.stringify(measurement_preview_data));
    }
    if(row_enteries_length <= 5){
      $.ajax({
        type: "POST",
        url: "php/operations.php",
        async: false,
        dataType: 'json',
        data: {
            action: "saveTableFormat",
            nameDB: $("#nameDashboardDB").val(),
            query_data : JSON.parse(query_data),
            title : tile_title
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          // $('#dashboard_sidebar').click();
          //  $('#energy_select_table_entries').html(a['energy_html']);
          
          if(type == 'Measurement-table-format'){
            $('#measurement_modal_loader_div').show();
            $('.bd-example-modal-lg .modal-content').css('opacity','0.8');
            //Dashobard Pre Format
            $('#mesurement_count_div').css('height',145);
            $('#mesurement_count_div').css('width',285);

            $('#mesurement_count_div').addClass('col-md-3');
            $('#mesurement_count_div .card-body').addClass('row');
            $('#mesurement_count_content').addClass('col-md-12');

            $('#mesurement_count_div .card-body').removeClass('overflow-hide display-flex');
            $('#measurement_table_show').removeClass('ml-3');

            
            $('#mesurement_count_div').removeClass('tile-click-table');
            $('#mesurement_count_div').addClass('tiles-click');

            $('#measurement_table_show').hide();
            //--end->
            
            // $('#mesurement_count_div').click();
            $('#measurement_modal_loader').show();

            setTimeout(() => {
              $('#dashboard_sidebar').click();
              $('#measurement_modal_loader_div').hide();
              $('.bd-example-modal-lg .modal-content').css('opacity','1');
              $('.bd-example-modal-lg').modal('hide');
            }, 500);
          }
        }
      });
    }
  }
}

// <---16-8-2021---
function getTableFormatDashboard(){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getTableFormatDashboard",
        nameDB: $("#nameDashboardDB").val(),
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      if(a['data'] != '' && a['data'] != null){
        a['data'].forEach(value => {
            if(value['type'] == "Measurement"){
              $('#measuremet_dashboard_tile_title').text(value['tile_title']);
              $('#measurement_dashboard_table').html(a['dashboardMeasurementHtml']);
              $('#mesurement_count_div').show();
            }
        });
        
      }else{
        $('#measurement_dashboard_table').html(a['dashboardMeasurementHtml']);
      }
      
    }
  });

}
// --end--->

//Selected Number of Records Energy
function getNumberRecordsEnergy(){
    var number_records = $('#energy_number_record').val();
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsEnergy",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#energy_select_table_entries').html(a['energy_html']);
        }
    });
}

//Selected Number of Records Product
function getNumberRecordsProduct(){
    var number_records = $('#product_number_record').val();
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsProduct",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#product_select_table_entries').html(a['product_html']);
        }
    });
}


//Select Number of Record Producttion Data
function getNumberRecordsProductionData(){
    var number_records = $('#production_data_number_record').val();
    $.ajax({
        type : "POST",
        url : 'php/retreive.php',
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsProductionData",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#production_data_select_table_entries').html(a['production_data_html']);
        }
    });
}


//Get Alerts
function getAlerts(){
    $.ajax({
        type : "POST",
        url : 'php/retreive.php',
        async: false,
        dataType: 'json',
        data: {
            action: "getAlerts",
            nameDB: $("#nameDashboardDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#alerts_min_max_null_mesurement_tables').html(a['alerts_min_max_null_mesurement_tables']);
           $('#alerts_min_max_null_product_tables').html(a['alerts_min_max_null_product_tables']);
           $('#alerts_min_max_null_energy_tables').html(a['alerts_min_max_null_energy_tables']);
        }
    });
}

function dashboardChart(){
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getDashBoardChart",
            nameDB: $("#nameDashboardDB").val(),
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            var ar = [];

            for(var i = 0; i < a['energy_chart_ar'].length; i++){
                ar.push(a['energy_chart_ar'][i][0]['val'] != null ? a['energy_chart_ar'][i][0]['val']  : 0);
               
            }

            //Circle Chart
            var arTimeInterval = [];
            var totalEnergyConsumed = a['totalEnergyConsumed'][0]['val'] != null ? a['totalEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[0] =  a['daysEnergyConsumed'][0]['val'] != null  ? a['daysEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[1] =  a['weekEnergyConsumed'][0]['val'] != null  ? a['weekEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[2] =  a['monthEnergyConsumed'][0]['val'] != null  ? a['monthEnergyConsumed'][0]['val'] : 0;
            arTimeInterval[3] =  a['yearEnergyConsumed'][0]['val'] != null  ?  a['yearEnergyConsumed'][0]['val'] : 0;
            // console.log('arTimeinterval',arTimeInterval);
            // console.log('totalEnergyConsumed',totalEnergyConsumed);
            (function($) {
                'use strict';
                $(function() {
                  if ($("#sales-chart").length) {
                    var SalesChartCanvas = $("#sales-chart").get(0).getContext("2d");
                    var SalesChart = new Chart(SalesChartCanvas, {
                      type: 'bar',
                      data: {
                        //labels: ["Jan", "Feb", "Mar", "Apr", "May","june", "july","Aug","Sep","Oct","Nov","Dec"],
                        labels: ["5", "10", "15", "20", "25","30"],
                        datasets: [
                          // {
                          //   label: 'Last Months Energy',
                          //   data: [0,10, 30, 40, 10,50,60,70,10,58,14,74],
                          //   backgroundColor: '#8EB0FF'
                          // },
                          {
                            label: 'One Month Energy',
                            data: ar,
                            backgroundColor: '#316FFF'
                          }
                        ]
                      },
                      options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        layout: {
                          padding: {
                            left: 0,
                            right: 0,
                            top: 20,
                            bottom: 0
                          }
                        },
                        scales: {
                          yAxes: [{
                            display: true,
                            gridLines: {
                              display: false,
                              drawBorder: false
                            },
                            ticks: {
                              display: false,
                              min: 0,
                              max: 1500
                            }
                          }],
                          xAxes: [{
                            stacked: false,
                            ticks: {
                              beginAtZero: true,
                              fontColor: "#9fa0a2"
                            },
                            gridLines: {
                              color: "rgba(0, 0, 0, 0)",
                              display: false
                            },
                            barPercentage: 1
                          }]
                        },
                        legend: {
                          display: false
                        },
                        elements: {
                          point: {
                            radius: 0
                          }
                        }
                      },
                    });
                    document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();
                  }

                  //Circle Chart
                  if ($("#north-america-chart").length) {
                    var areaData = {
                      labels: ["Days", "Weeks", "Months", "Years"],
                      datasets: [{
                          data: arTimeInterval,
                          backgroundColor: [
                            "#71c016", "#8caaff", "#248afd","#e86425"
                          ],
                          borderColor: "rgba(0,0,0,0)"
                        }
                      ]
                    };
                    var areaOptions = {
                      responsive: true,
                      maintainAspectRatio: true,
                      segmentShowStroke: false,
                      cutoutPercentage: 78,
                      elements: {
                        arc: {
                            borderWidth: 4
                        }
                      },      
                      legend: {
                        display: false
                      },
                      tooltips: {
                        enabled: true
                      },
                      legendCallback: function(chart) { 
                        var text = [];
                        text.push('<div class="report-chart">');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Days</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[0]+'</p>');
                          text.push('</div>');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Weeks</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[1]+'</p>');
                          text.push('</div>');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Months</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[2]+'</p>');
                          text.push('</div>');
                          text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[3] + '"></div><p class="mb-0">Years</p></div>');
                          text.push('<p class="mb-0">'+arTimeInterval[3]+'</p>');
                          text.push('</div>');
                        text.push('</div>');
                        return text.join("");
                      },
                    }
                    var northAmericaChartPlugins = {
                      beforeDraw: function(chart) {
                        var width = chart.chart.width,
                            height = chart.chart.height,
                            ctx = chart.chart.ctx;
                    
                        ctx.restore();
                        var fontSize = 3.125;
                        ctx.font = "600 " + fontSize + "em sans-serif";
                        ctx.textBaseline = "middle";
                        ctx.fillStyle = "#000";
                    
                        var text = totalEnergyConsumed,
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = height / 2;
                            // textX = 785,
                            // textY = 900
                    
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                      }
                    }
                    var northAmericaChartCanvas = $("#north-america-chart").get(0).getContext("2d");
                    var northAmericaChart = new Chart(northAmericaChartCanvas, {
                      type: 'doughnut',
                      data: areaData,
                      options: areaOptions,
                      plugins: northAmericaChartPlugins
                    });
                    document.getElementById('north-america-legend').innerHTML = northAmericaChart.generateLegend();
                  }
                });
              })(jQuery);
        }
    });
    
}

function energy_consumed_five_days(){
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getDataFiveDaysEnergyConsumeed",
        nameDB: $("#nameDashboardDB").val(),
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
       $('#five_days_energy_consumed_table').html(a['five_days_energy_data']);
       if(a['totalSumDataEnergyConsumed'][0]['val'] == null){
          $('#five_days_energy_count').text(0);
       }
       else{
          $('#five_days_energy_count').text(a['totalSumDataEnergyConsumed'][0]['val']);
          $('.five_days_energy_count_modal').text(a['totalSumDataEnergyConsumed'][0]['val']);
       }
    }
  });
}

// <---18-8-2021---
function tiles_click(div_id){
  $('#'+div_id).fadeIn("1000");
  switch(div_id){
    case'mesurement_count_div':
        
        // $("#mesurement_count_div").fadeIn("slow", 0.15);
        // <---17-8-2021---
        var measurement_preview_data =  localStorage.getItem('measurement_preview_data');
        if(measurement_preview_data != null && measurement_preview_data != undefined)
        {   
            measurement_preview_data = JSON.parse(measurement_preview_data);
            height =  measurement_preview_data[0]['height'];
            width = measurement_preview_data[0]['width'];
            $('#mesurement_count_div').css('height',height);
            $('#mesurement_count_div').css('width',width);
            //console.log(JSON.parse(measurement_preview_data['height']));
        }
        else{
            $('#mesurement_count_div').css('height',145);
            $('#mesurement_count_div').css('width',285);
        }
        
        $('#mesurement_count_div').removeClass('col-md-3');
        $('#mesurement_count_div').removeClass('col-md-12');
        $('#mesurement_count_div .card-body').removeClass('row');
        $('#mesurement_count_content').removeClass('col-md-12');
        $('#measurement_table_show').removeClass('col-md-9');

        $('#mesurement_count_div .card-body').addClass('overflow-hide display-flex');
        $('#measurement_table_show').addClass('ml-3');

        
        $('#mesurement_count_div').addClass('tile-click-table');
        $('#mesurement_count_div').removeClass('tiles-click');

        $('#measurement_table_show').show();

        // --end--->


        // $(this).addClass('col-md-12');
        // $(this).addClass('click-tile-height');
        // $(this).addClass('tile-click-table');
        // $(this).removeClass('tiles-click');
        // $('#mesurement_count_content').addClass('col-md-3');
        // $('#mesurement_count_content').removeClass('col-md-12');
        // $('#measurement_table_show').show();
  
    break;

    case'product_count_div':

        $('#product_count_div').css('height',145);
        $('#product_count_div').css('width',285);
        $('#product_count_div').removeClass('col-md-3');
        $('#product_count_div').removeClass('col-md-12');
        $('#product_count_div .card-body').removeClass('row');
        $('#product_count_content').removeClass('col-md-12');
        $('#product_table_show').removeClass('col-md-9');

        $('#product_count_div .card-body').addClass('overflow-hide display-flex');
        $('#product_table_show').addClass('ml-3');

        
        $('#product_count_div').addClass('tile-click-table');
        $('#product_count_div').removeClass('tiles-click');

        $('#product_table_show').show();

        
        // $(this).addClass('col-md-12');
        // $(this).addClass('click-tile-height');
        // $(this).addClass('tile-click-table');
        // $(this).removeClass('tiles-click');
        // // $('#mesurement_count_div').hide();    
        // $('#product_count_content').addClass('col-md-3');
        // $('#product_count_content').removeClass('col-md-12');
        // $('#product_table_div_show').show();

        
    break;

    case'energy_count_div':

        $('#energy_count_div').css('height',145);
        $('#energy_count_div').css('width',285);
        $('#energy_count_div').removeClass('col-md-3');
        $('#energy_count_div').removeClass('col-md-12');
        $('#energy_count_div .card-body').removeClass('row');
        $('#energy_count_content').removeClass('col-md-12');
        $('#energy_table_show').removeClass('col-md-9');

        $('#energy_count_div .card-body').addClass('overflow-hide display-flex');
        $('#energy_table_show').addClass('ml-3');

        
        $('#energy_count_div').addClass('tile-click-table');
        $('#energy_count_div').removeClass('tiles-click');

        $('#energy_table_show').show();

        // $(this).addClass('col-md-12');
        // $(this).addClass('click-tile-height');
        // $(this).addClass('tile-click-table');
        // $(this).removeClass('tiles-click');
        // // $('#mesurement_count_div').hide();
        // // $('#product_count_div').hide();    
        // $('#energy_count_content').addClass('col-md-3');
        // $('#energy_count_content').removeClass('col-md-12');
        // $('#energy_table_show').show();     
       
    break;

    case 'energy_consumed_div':
        $('#energy_consumed_div').css('height',145);
        $('#energy_consumed_div').css('width',285);
        $('#energy_consumed_div').removeClass('col-md-3');
        $('#energy_consumed_div').removeClass('col-md-12');
        $('#energy_consumed_div .card-body').removeClass('row');
        $('#energy_consumed_content').removeClass('col-md-12');
        $('#energy_consumed_table_show').removeClass('col-md-9');

        $('#energy_consumed_div .card-body').addClass('overflow-hide display-flex');
        $('#energy_consumed_table_show').addClass('ml-3');

        
        $('#energy_consumed_div').addClass('tile-click-table');
        $('#energy_consumed_div').removeClass('tiles-click');

        $('#energy_consumed_table_show').show();

        // $(this).addClass('col-md-12');
        // $(this).addClass('click-tile-height');
        // $(this).addClass('tile-click-table');
        // $(this).removeClass('tiles-click');
        // // $('#mesurement_count_div').hide();
        // // $('#product_count_div').hide(); 
        // // $('#energy_count_div').hide();   
        // $('#energy_consumed_content').addClass('col-md-3');
        // $('#energy_consumed_content').removeClass('col-md-12');
        // $('#energy_consumed_table_show').show();
    
    break;

    case 'five_days_energy_consumed':
        $('#five_days_energy_consumed').css('height',145);
        $('#five_days_energy_consumed').css('width',285);
        $('#five_days_energy_consumed').removeClass('col-md-3');
        $('#five_days_energy_consumed').removeClass('col-md-12');
        $('#five_days_energy_consumed .card-body').removeClass('row');
        $('#energy_consumed_five_day_content').removeClass('col-md-12');
        $('#energy_consumed_five_day_table_show').removeClass('col-md-9');

        $('#five_days_energy_consumed .card-body').addClass('overflow-hide display-flex');
        $('#energy_consumed_five_day_table_show').addClass('ml-3');

        
        $('#five_days_energy_consumed').addClass('tile-click-table');
        $('#five_days_energy_consumed').removeClass('tiles-click');

        $('#energy_consumed_five_day_table_show').show();

        // $(this).addClass('col-md-12');
        // $(this).addClass('click-tile-height');
        // $(this).addClass('tile-click-table');
        // $(this).removeClass('tiles-click');
        // // $('#mesurement_count_div').hide();
        // // $('#product_count_div').hide(); 
        // // $('#energy_count_div').hide();  
        // // $('#energy_consumed_div').hide();
        // $('#energy_consumed_five_day_content').addClass('col-md-3');
        // $('#energy_consumed_five_day_content').removeClass('col-md-12');
        // $('#energy_consumed_five_day_table_show').show();
    break;
  }
}
// ---end-->


// <----29-7-2021---
function saveDashboardSelect(arData){
  arData = JSON.stringify(arData);
  $.ajax({
    type : "POST",
    url : 'php/operations.php',
    async: false,
    dataType: 'json',
    data: {
        action: "saveDashboardSelect",
        nameDB: $("#nameDashboardDB").val(),
        arData : arData
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      console.log(a);
    }
  });
}


// <--09-8-2021-- Sort Code
// function comparer(index,tableHeaderValue) {
//   return function(a, b) {
//       var valA = getCellValue(a, index), valB = getCellValue(b, index)
//       if(tableHeaderValue == 'Total Units' || tableHeaderValue == 'Units Consumed'){
//           var arA = valA.split(' ');
//           valA = arA[0];
//           var arB = valB.split(' ');
//           valB = arB[0];
//       }
//       // console.log('First value',valA);
//       // console.log('Second value',valB);
//       return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
//   }
// }
// function getCellValue(row, index){ return $(row).children('td').eq(index).text() }
// --end->


// <---12-8-2021---- Screen Shot Code
// function screenshot(){
//   var table_row_count = $('#mesurement_select_table_entries tr').length;
//   if(table_row_count <= 5){
//     $('#image_div canvas').remove();
    
//     html2canvas($('#measurement_record_tb'),{background: '#fff'}).then(function(canvas) {
//       var table_body = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
//       id = 'table_body';
//       moveScreenshot(table_body, id);
//     });

//     // html2canvas($('#pagination_html'),{background: '#fff'}).then(function(canvas) {
//     //   // $('#image_div').append(canvas);
//     //   table_pagination = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
//     //   id="table_pagination";
//     //   moveScreenshot(table_pagination, id);
//     // });
    
//   }
// }

// function moveScreenshot(table_image, id){
//   $.ajax({
//     type : "POST",
//     url : 'php/retreive.php',
//     async: false,
//     dataType: 'json',
//     cache : false,
//     data: {
//         action: "moveMeasurementTableScreenShot",
//         nameDB: $("#nameDashboardDB").val(),
//         image : table_image,
//         id : id
//         // table_pagination : table_pagination
//     },
//     fail: function() {
//         alert("failed!!")
//     },
//     success: function(a) {
//       // window.location.reload();
//       // window.history.forward(1);s
//     }
//  });

// }
//-----end-->

// ---end-->