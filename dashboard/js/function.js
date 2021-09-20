//Count Dashboard Boxes
setTimeout(function () {
    $('.background-image').trigger('click');
},1000);

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
    // <---7-9-2021--
    var measurement_type = $('#measurement_type').val();
    // console.log(measurement_type);
    // if(measurement_type != 'manually'){
    //   var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Measurement Type Entered Manually</td></tr>";
    //   $('#mesurement_select_table_entries').html(tr);
    //   $('#pagination_html').html('');
    //   return false;
    // }
    // --end-->
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
              measurement_type : measurement_type
          },
          fail: function() {
              alert("failed!!")
          },
          success: function(a) {
            // a = JSON.parse(a);
            $('#mesurement_select_table_entries').html(a['measurement_html']);
            if(measurement_type == 'manually')
            {
              var thVal =  $('#measurement_record_table table thead tr').children('th:eq(4)').text();
              if(thVal == '' || thVal == undefined){
                $('#measurement_record_table table thead tr').children('th:eq(3)').after("<th>Status</th>"); 
              }
              $('#measurement_record_table table thead tr').children('th:eq(3)').text('Total Units');
              $('#measurement_record_table table thead tr').children('th:eq(2)').text('Created Date');
              $('#measurement_record_table table thead tr').children('th:eq(1)').text('Time Interval');
              $('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
            }
            else if(measurement_type == 'automatic'){
              $('#measurement_record_table table thead tr').children('th:eq(4)').remove(); 
              $('#measurement_record_table table thead tr').children('th:eq(3)').text('Values'); 
              $('#measurement_record_table table thead tr').children('th:eq(2)').text('Conv Factor');
              $('#measurement_record_table table thead tr').children('th:eq(1)').text('Time');
              $('.table-margin .table td').attr('style','padding: 8px !important;font-size: small !important;');
            }
            
            $('#pagination_html').html(a['pagination_html']);
            //$('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
            
            $('.table-margin').removeClass('margin-remove-table');
            // $('#measurement_record_table table thead tr').children('th:eq(2)').text('Created Date');
            // $('#measurement_record_table table thead tr').children('th:eq(3)').text('Total Units');

            var val_selected = localStorage.getItem('selected_number_record_measurement');
            $('#measurement_number_record option[value='+val_selected+']').prop('selected', 'selected');

            localStorage.setItem('query_data',JSON.stringify(a['query_data']));

            // <---02-9-2021--
            var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
            if(edit_value == 'true'){
                $('#modal_open_button').val('Update & Preview');
                $('#modal_open_button').attr('tile-edit','true');
            }
            else{
              $('#modal_open_button').val('Save & Preview');
              $('#modal_open_button').attr('tile-edit','false');
            }
            // --end-->

            // <---7-9-2021----
            setTimeout(()=>{
              var type_data = localStorage.getItem('dashboard_tile_data');
              type_data = JSON.parse(type_data);
              if(type_data['type_data_tile'] == 'overall_count')
              {
                $('#modal_open_button').hide();
              }
              else{
                $('#modal_open_button').show();
              }
            },500)
            
            // ---end--->
          }
      });
    }
}

//Get Number Records Mesurement Pagination
function getNumberRecordsMesurementPagination(page_val,selected_number_record_measurement = 'false'){
    // <---7-9-2021--
    var measurement_type = $('#measurement_type').val();
    // console.log(measurement_type);
    // if(measurement_type != 'manually'){
    //   var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Measurement Type Entered Manually</td></tr>";
    //   $('#mesurement_select_table_entries').html(tr);
    //   $('#pagination_html').html('');
    //   return false;
    // }
    // --end-->
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
              selected_number_record_measurement : selected_number_record_measurement,
              measurement_type : measurement_type
          },
          fail: function() {
              alert("failed!!")
          },
          success: function(a) {
            $('#mesurement_select_table_entries').html(a['measurement_html']);
            $('#pagination_html').html(a['pagination_html']);
            if(measurement_type == 'manually')
            {
              $('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
            }
            else if(measurement_type == 'automatic'){
              $('.table-margin .table td').attr('style','padding: 8px !important;font-size: small !important;');
            }
            
            var val_selected = localStorage.getItem('selected_number_record_measurement');
            $('#measurement_number_record option[value='+val_selected+']').prop('selected', 'selected');

            localStorage.setItem('query_data',JSON.stringify(a['query_data']));

            // <---02-9-2021--
            var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
            if(edit_value == 'true'){
                $('#modal_open_button').val('Update & Preview');
                $('#modal_open_button').attr('tile-edit','true');
            }
            else{
              $('#modal_open_button').val('Save & Preview');
              $('#modal_open_button').attr('tile-edit','false');
            }

            // <---7-9-2021----
            var type_data = localStorage.getItem('dashboard_tile_data');
            type_data = JSON.parse(type_data);
            if(type_data['type_data_tile'] == 'overall_count')
            {
              $('#modal_open_button').hide();
            }
            else{
              $('#modal_open_button').show();
            }
            // ---end--->
          }
      });
    }

}

function rowClickMeasurementTableData(mst_id,data_type){
  // <---7-9-2021--
  var measurement_type = $('#measurement_type').val();
  // console.log(measurement_type);
  // if(measurement_type != 'manually'){
  //   var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Measurement Type Entered Manually</td></tr>";
  //   $('#mesurement_select_table_entries').html(tr);
  //   $('#pagination_html').html('');
  //   return false;
  // }
  $('#mst_id_hidden').val(mst_id);
  
  // $('#measurement_record_table table tbody tr').children('td:eq(3)').text();
  var total_count = $("#mesurement_select_table_entries tr[data-mst='"+mst_id+"']").children('td:eq(3)').text();
  $('#overall_count').val(total_count);

  var record_name = $("#mesurement_select_table_entries tr[data-mst='"+mst_id+"']").children('td:eq(0)').text();
  $('#mst_id_hidden').attr('data-name',record_name);
  // --end-->

  var table_other = $('#measurement_record_table table tbody').children('tr:eq(0)').attr('data-table-other'); 
  $('#mst_id_hidden').attr('data-table-other',table_other);

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
          measurement_type : measurement_type
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#measurement_record_table table thead tr').children('th:eq(4)').remove(); 

        // <---15-9-2021---
        if(measurement_type == 'manually'){
          $('#measurement_record_table table thead tr').children('th:eq(1)').text('Time Interval');
          $('#measurement_record_table table thead tr').children('th:eq(2)').text('Date');
          $('#measurement_record_table table thead tr').children('th:eq(3)').text('Units Consumed');
        }
        else if(measurement_type == 'automatic'){
          $('#measurement_record_table table thead tr').children('th:eq(1)').text('Time');
          $('#measurement_record_table table thead tr').children('th:eq(2)').text('Conv Factor');
          $('#measurement_record_table table thead tr').children('th:eq(3)').text('Values');
        }
        // --end--->

        $('#mesurement_select_table_entries').html(a['measurement_html']);
        $('#pagination_html').html(a['pagination_html']);
        $('.table-margin .table td').removeAttr('style');
        
        $('.table-margin').addClass('margin-remove-table');
        // $('#measurement_record_table table thead tr').children('th:eq(2)').text('Date');
        // $('#measurement_record_table table thead tr').children('th:eq(3)').text('Units Consumed');

        $('#measurement_number_record option[value='+number_records+']').prop('selected', 'selected');

        localStorage.setItem('query_data',JSON.stringify(a['query_data']));

        // <---02-9-2021--
        var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
        if(edit_value == 'true'){
            $('#modal_open_button').val('Update & Preview');
            $('#modal_open_button').attr('tile-edit','true');
        }
        else{
          $('#modal_open_button').val('Save & Preview');
          $('#modal_open_button').attr('tile-edit','false');
        }

        // <---7-9-2021--
        setTimeout(()=>{
          $('#modal_open_button').show();
        },500)
        // --end-->
      }
    });
  }
}

function rowClickMeasurementPaginationTableData(mst_id,data_type,page_value,selected_number_record_measurement = 'false'){
  // <---7-9-2021--
  var measurement_type = $('#measurement_type').val();
  // console.log(measurement_type);
  // if(measurement_type != 'manually'){
  //   var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Measurement Type Entered Manually</td></tr>";
  //   $('#mesurement_select_table_entries').html(tr);
  //   $('#pagination_html').html('');
  //   return false;
  // }
  // --end--> 
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
          measurement_type : measurement_type
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

        // <---02-9-2021--
        var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
        if(edit_value == 'true'){
            $('#modal_open_button').val('Update & Preview');
            $('#modal_open_button').attr('tile-edit','true');
        }
        else{
          $('#modal_open_button').val('Save & Preview');
          $('#modal_open_button').attr('tile-edit','false');
        }

         // <---7-9-2021--
         $('#modal_open_button').show();
         // --end-->
      }
    });
  }

}


function saveTableFormat(type){
  var row_enteries_length = $('#mesurement_select_table_entries tr').length;
  var query_data = localStorage.getItem('query_data');
  

  var table_other = $('#measurement_record_table table tbody').children('tr:eq(0)').attr('data-table-other');
  if(query_data != undefined && query_data != null && query_data != '')
  {
    var measuremnt_table_height = $('#modal-height-input-measurement-hidden').val();
    var measurement_table_width = $('#modal-width-input-measurement-hidden').val();
    var input_height = $('#modal-height-input-measurement').val(); 
    var input_width = $('#modal-width-input-measurement').val();
    
    //<--23-8-2021---
    var last_index_tile = $('#total_records').val();
    // var table_length = $('.measurement_html_modal_'+last_index_tile+' table tbody tr').length;
    // $('.measurement_html_modal_'+last_index_tile+' .count_result_tile').text(table_length+' Records');
    
    var tile_html = $('.measurement_html_modal_'+last_index_tile).html();
    var tableHtml = $('.measurement_html_modal_'+last_index_tile+' table').html();
    $('#total_records').remove();
    tile_html = tile_html.replace('total_records','');
    tile_html = tile_html.replace('hide_table_main','');

    // <----01-9-2021---
    var ar = localStorage.getItem('dashboard_tile_data');
    ar = JSON.parse(ar);
    var tile_title =ar['title_modal_tile'];
    var record_type_of_tile =ar['record_type_of_tile'];
    var type_data_tile =ar['type_data_tile'];
    // --end->
  // --end-->
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
            title : tile_title,
            tile_html : tile_html,
            height: measuremnt_table_height,
            width : measurement_table_width,
            tableHtml : tableHtml,
            input_height : input_height,
            input_width : input_width,
            record_type_of_tile :record_type_of_tile,
            type_data_tile : type_data_tile,
            table_other : table_other
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
  $('.dashboard_count_div').html('');
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
        $('.dashboard_count_div').html('');
        var arHtml = '';
        a['data'].forEach(value => {
            if(value['type'] == "Measurement"){
              $('#measuremet_dashboard_tile_title').text(value['tile_title']);
              $('#measurement_dashboard_table').html(a['dashboardMeasurementHtml']);
              $('#mesurement_count_div').show();
             
            }
            // console.log(value['id']);
            // console.log(value['id'])
          value['tile_html']=value['tile_html'].replace("grid-margin", value['id']+" grid-margin");

          // <---27-8-2021--
          value['tile_html']=value['tile_html'].replace("id_val", value['id']+" id_val");
          value['tile_html']=value['tile_html'].replace("edit_val", value['id']+" edit_val");
          // end-->

          // <---1-9-2021---

          // --end-->
          arHtml +=value['tile_html'];
          
        });
        $('#dashboard_count_div_tile').html(arHtml);
        $('#dashboard_count_div_tile .stretch-card').addClass('hide_table_main');

        $('#dashboard_count_div_tile .stretch-card').draggable(); //<---8-9-2021---
        // $('#dashboard_count_div_tile .count_result_tile').text(a['total_record']+' Records');
        // $('#dashboard_count_div_tile .action-modal-button-div').removeClass('col-md-12');
                // $('#dashboard_count_div_tile .stretch-card').css('height',145);
        // $('#dashboard_count_div_tile .stretch-card').css('width',285);

        // $('#dashboard_count_div_tile .stretch-card').addClass('col-md-3');
        // $('#dashboard_count_div_tile .stretch-card .card-body').addClass('row');
        // $('#dashboard_count_div_tile .stretch-card .card-body div:first-child').addClass('col-md-12');

        // $('#dashboard_count_div_tile .stretch-card .card-body').removeClass('overflow-hide display-flex');
        // $('#dashboard_count_div_tile .stretch-card .card-body').removeClass('ml-3');

        
        // $('#dashboard_count_div_tile .stretch-card').removeClass('tile-click-table');
        // $('#dashboard_count_div_tile .stretch-card').addClass('tiles-click');

        // $('.save_table_div_show_table').hide();    
    
        
      }else{
        $('#measurement_dashboard_table').html(a['dashboardMeasurementHtml']);
      }
      
    }
  });

}
// --end--->

// <---23-8-21--
function generateHtmlMeasurementTiles(type){
  var measurement_title = localStorage.getItem('measurement_title_modal_tile');
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "generateHtmlMeasurementTiles",
        nameDB: $("#nameDashboardDB").val(),
        measurement_title : measurement_title,
        type : type
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      // console.log(a);
       $('.gernerated_measurement_modal_tiles').html(a['tile_html']);

      var last_id = a['last_id'];
      setTimeout(()=>{
        var table_length = $('.measurement_html_modal_'+last_id+' table tbody tr').length;
        $('.measurement_html_modal_'+last_id+' .count_result_tile').text(table_length+' Records');
      },1000)
      
      //  $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      //  $('.gernerated_measurement_modal_tiles .stretch-card').removeClass('hide_table_preview');
    }
  });

  // --end-->
}

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
                            label: 'One Month Measurement',
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
$(document).on('click','.stretch-card',function(){


var id=$(this).attr('class');

id=id.split(" ")[0];
getDimentions(id);
setTimeout(function () {
    $('.'+id+'.tiles-click').removeClass('hide_table_main');
    $('.'+id+'.tiles-click').removeClass('col-md-3');
    $('.'+id+'.tiles-click').css('width',localStorage.getItem('width')+'px');
    $('.'+id+'.tiles-click').css('height',localStorage.getItem('height')+'px');
    // <---30-8-2021--
    $('.'+id+' .card-body').removeClass('row');
    // --end-->

    // <---03-9-2021--
    $('.'+id+'.tiles-click .card-body div:first-child').removeClass('col-md-12');
    // --end--->
},1000);

})
function getDimentions(id) {
    $.ajax({
        type : "POST",
        url : 'php/retreive.php',
        async: false,
        dataType: 'json',
        data: {
            action: "getDimentions",
            id: id,
            nameDB: $("#nameDashboardDB").val()
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            // console.log(a.data.width);
           localStorage.setItem('width',a.data.width);
           localStorage.setItem('height',a.data.height);

           

          //  <---2-9-2021--
          $('.chart-width canvas').attr('id','sales-chart-none');
          $('.chartjs-size-monitor').remove();
          var type_data_val = a['data']['tile_data_type'];
          if(type_data_val == "chart"){
            // $('.'+id+'.tiles-click .card-body').addClass('display-flex');
            // $('.'+id+'.tiles-click .card-body div:first-child').css('width','20%');
            // $('.'+id+'.tiles-click .card-body div:first-child').removeClass('col-md-12');
            // $('.'+id+'.tiles-click .card-body .ml-3').removeClass('overflow-hide');

            var tile_html = $('.'+id+'.tiles-click').html();
            tile_html = tile_html.replace('sales-chart-none','sales-chart');
            $('.'+id+'.tiles-click').html(tile_html);
            dashboardChart();
          }
          else if(type_data_val == "overall_count"){
            var mst_id = a['data']['mst_id'];
            getTileClickOverAllCount(id,mst_id);
          }
          else if(type_data_val == "table"){
            getTableDashboardData(id);
          }
          // --show-->

        }
    });
}

function deleteTile(id_val){
  $.ajax({
    type : "POST",
    url : 'php/operations.php',
    async: false,
    dataType: 'json',
    data: {
        action: "deleteTile",
        id: id_val,
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      // setTimeout(()=>{
        getTableFormatDashboard();
      // },1500); 
    }
});


}

function edit_tile(type,edit_id){
  var i_val = localStorage.getItem('edit-i-value');
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var measurement_title = ar['title_modal_tile'];
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditTiles",
        id: edit_id,
        type, type,
        i_value : i_val,
        measurement_title : measurement_title,
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      var i_val = localStorage.getItem('edit-i-value');
      $('.gernerated_measurement_modal_tiles').html(a['tile_html']);
      
      // <---1-8-2021---
      // $('.gernerated_measurement_modal_tiles #total_records').val(i_val);
      // --end-->
      setTimeout(()=>{
        var table_length = $('.measurement_html_modal_'+i_val+' table tbody tr').length;
        $('.measurement_html_modal_'+i_val+' .count_result_tile').text(table_length+' Records');
      },1000);
      
      // $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+i_val).css('height',a['data']['height']);
      $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+i_val).css('width',a['data']['width']);
      $('#modal-height-input-measurement-hidden').val(a['data']['height']);
      $('#modal-width-input-measurement-hidden').val(a['data']['width']);
      (a['data']['input_height'] != 0) ? $('#modal-height-input-measurement').val(a['data']['input_height']) : $('#modal-height-input-measurement').val('');
      (a['data']['input_width'] != 0) ? $('#modal-width-input-measurement').val(a['data']['input_width']) : $('#modal-width-input-measurement').val('');
    }
  });

}

// <----31-8-2021----
function updateTileRecord(){
  var id = localStorage.getItem('edit-measurement-tile');
  var input_height = $('#modal-height-input-measurement').val();
  var input_width = $('#modal-width-input-measurement').val();
  var height = $('#modal-height-input-measurement-hidden').val();
  var width = $('#modal-width-input-measurement-hidden').val();
  var table_other = $('#measurement_record_table table tbody').children('tr:eq(0)').attr('data-table-other');

  // <---1-9-2021----
  var query_data = localStorage.getItem('query_data');

  var last_index_tile = $('#total_records').val();

  var tile_html = $('.measurement_html_modal_'+last_index_tile).html();
  var tableHtml = $('.measurement_html_modal_'+last_index_tile+' table').html();
  $('#total_records').remove();
  // tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');

  // <----01-9-2021---
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];
  // --end-->

  if(id != null && id != undefined){
    $.ajax({
      type : "POST",
      url : 'php/operations.php',
      async: false,
      dataType: 'json',
      data: {
          action: "updateTileRecord",
          id: id,
          query_data : JSON.parse(query_data),
          title : tile_title,
          tile_html :tile_html,
          input_height :input_height,
          input_width :input_width,
          height : height,
          width : width,
          record_type_of_tile : record_type_of_tile,
          type_data_tile : type_data_tile,
          table_other : table_other,
          nameDB: $("#nameDashboardDB").val()
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#measurement_modal_loader_div').show();
        $('.bd-example-modal-lg .modal-content').css('opacity','0.8');
        
        setTimeout(() => {
          $('#dashboard_sidebar').click();
          $('#measurement_modal_loader_div').hide();
          $('.bd-example-modal-lg .modal-content').css('opacity','1');
          $('.bd-example-modal-lg').modal('hide');
        }, 500);
      }
    });
  }

}

function getEditDataDashboard(id,i_value){
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditDataDashboard",
        id: id,
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      a['data'].forEach((val)=>{
        $('#title_modal_tile').val(val['tile_title']);
        $('#record_type_of_tile option[value=' + val['tile_record_type'] + ']').prop('selected', 'selected');
        $('#type_data_tile option[value=' + val['tile_data_type'] + ']').prop('selected', 'selected');
        localStorage.setItem('edit-measurement-tile',id);
        localStorage.setItem('edit-i-value',i_value);
        $('#save_and_proceed_btn_dashboard').val('Update & Proceed');
        $('#save_and_proceed_btn_dashboard').attr('data-edit','true');
        $("#type_data_tile").attr('disabled','disabled');
      });
    }
  });

}

// <--2-9-2021---
function getChartTileDashboard(){
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        measurement_title : ar['title_modal_tile'],
        action: "getChartDataDashboard",
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('.dashboard_chart_tiles').html(a['tile_html']);
      
    }
  });
}
// --end-->

// <---02-9-2021----
function saveDashboardTileChart(){
  var measuremnt_table_height = $('#measurement-height-chart-hidden').val();
  var measurement_table_width = $('#measurement-width-chart-hidden').val();
  var input_height = $('#measurement-height-chart').val(); 
  var input_width = $('#measurement-width-chart').val();
  
  //<--23-8-2021---
  var last_index_tile = $('#total_records_chart').val();
  // var table_length = $('.measurement_html_modal_'+last_index_tile+' table tbody tr').length;
  // $('.measurement_html_modal_'+last_index_tile+' .count_result_tile').text(table_length+' Records');
  
  var tile_html = $('.dashboard_chart_tile_html_'+last_index_tile).html();
  $('#total_records_chart').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');
  tile_html = tile_html.replace("sales-chart",'sales-chart-none');
  // console.log(tile_html);
  // return false;

  // <----01-9-2021---
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];
    // --end->
// --end-->
  $.ajax({
    type: "POST",
    url: "php/operations.php",
    async: false,
    dataType: 'json',
    data: {
        action: "saveTileChart",
        nameDB: $("#nameDashboardDB").val(),
        title : tile_title,
        tile_html : tile_html,
        height: measuremnt_table_height,
        width : measurement_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div_chart').show();
      $('#dashboard_tile_modal_chart .modal-content').css('opacity','0.8');
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div_chart').hide();
        $('#dashboard_tile_modal_chart .modal-content').css('opacity','1');
        $('#dashboard_tile_modal_chart').modal('hide');
      }, 500);
    }
  });
}

// --end-->

// <----3-9-2021---
function getChartTimeIntervalRecord(){
 var time_interval = $('#time_interval_chart').val();
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getChartTimeIntervalRecord",
        nameDB: $("#nameDashboardDB").val(),
        time_interval:time_interval
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      var select_html = '';
      if(a != ''){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        select_html+="<option value=''>Select "+record_type_of_tile+"</option>";
        a.forEach((val)=>{
          select_html+="<option value='"+val['mst_ID']+"' type='"+val['iBdeType']+"' total_value='"+val['val']+"'>"+val['mstIMw']+"</option>";
        });
        $('#chart_record_filter_div').show();
        $("#chart_record_filter option[value='']").prop('selected','selected');
      }
      else{
        select_html+="<option>No Record Found</option>";
        $('#chart_record_filter_div').hide();
      }
      $('#chart_records').html(select_html);
    }
  });
}
// --end-->


// <----6-9-2021---
function chartRecordFilter(){
  var filterVal = $('#chart_record_filter').val();
  var mst_id = $('#chart_records').val();
  if(filterVal != '' && mst_id != ''){
    var type = $('#chart_records option:selected').attr('type');
    $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "getChartRecordFilter",
          nameDB: $("#nameDashboardDB").val(),
          mst_id:mst_id,
          type : type
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {

        // var areaData = {
        //   labels: ["2013", "2014", "2015", "2016", "2017"],
        //   datasets: [{
        //     label: '# of Votes',
        //     data: [12, 19, 3, 5, 2, 3],
        //     backgroundColor: [
        //       'rgba(255, 99, 132, 0.2)',
        //       'rgba(54, 162, 235, 0.2)',
        //       'rgba(255, 206, 86, 0.2)',
        //       'rgba(75, 192, 192, 0.2)',
        //       'rgba(153, 102, 255, 0.2)',
        //       'rgba(255, 159, 64, 0.2)'
        //     ],
        //     borderColor: [
        //       'rgba(255,99,132,1)',
        //       'rgba(54, 162, 235, 1)',
        //       'rgba(255, 206, 86, 1)',
        //       'rgba(75, 192, 192, 1)',
        //       'rgba(153, 102, 255, 1)',
        //       'rgba(255, 159, 64, 1)'
        //     ],
        //     borderWidth: 1,
        //     fill: true, // 3: no fill
        //   }]
        // };

        // var areaOptions = {
        //   plugins: {
        //     filler: {
        //       propagate: true
        //     }
        //   }
        // }

        // if ($("#areaChart").length) {
        //   var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
        //   var areaChart = new Chart(areaChartCanvas, {
        //     type: 'line',
        //     data: areaData,
        //     options: areaOptions
        //   });
        // }
      
       
      }
    });

  }
}
// ---end-->

// <---8-9-2021----
function saveOverallCountTile(){
  var measuremnt_table_height = $('#modal-height-input-measurement-hidden').val();
  var measurement_table_width = $('#modal-width-input-measurement-hidden').val();
  var input_height = $('#modal-height-input-measurement').val(); 
  var input_width = $('#modal-width-input-measurement').val();
  var mst_ID = $('#mst_id_hidden').val();
  var data_table_other = $('#mst_id_hidden').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  var tile_html = $('.measurement_html_modal_'+last_index_tile).html();
  $('#total_records').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');
  // <----01-9-2021---
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];
    // --end->
// --end-->
  $.ajax({
    type: "POST",
    url: "php/operations.php",
    async: false,
    dataType: 'json',
    data: {
        action: "saveOverallCountTile",
        nameDB: $("#nameDashboardDB").val(),
        title : tile_title,
        tile_html : tile_html,
        height: measuremnt_table_height,
        width : measurement_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        mst_ID : mst_ID,
        data_table_other : data_table_other
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div').show();
      $('.bd-example-modal-lg .modal-content').css('opacity','0.8');
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div').hide();
        $('.bd-example-modal-lg .modal-content').css('opacity','1');
        $('.bd-example-modal-lg').modal('hide');
      }, 500);
    }
  });
}
// --end-->

// <---09-8-2021--
function getTileClickOverAllCount(id,mst_id){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getTileClickOverAllCount",
        nameDB: $("#nameDashboardDB").val(),
        id:id,
        mst_id : mst_id
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      if(a['total_sum'] != '' && a['name_value']){
        $('.'+id+'.tiles-click .save_table_div_show_table .record-name-overall-count').text(a['name_value']);
        $('.'+id+'.tiles-click .save_table_div_show_table .text-overall-count').text(a['total_sum']);
        $('#dashboard_count_div_tile '+'.'+id+'.tiles-click .count_result_tile').text(a['measurement_type']);
      }
    }
  });
}
// ---end-->

function getTableDashboardData(id){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getTableDashboardData",
        nameDB: $("#nameDashboardDB").val(),
        id:id,
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('.'+id+'.tiles-click .save_table_div_show_table .table').html('');
      $('.'+id+'.tiles-click .save_table_div_show_table .table').html(a['dashboardMeasurementHtml']);
    }
  });
}

// <--13-9-21--
function updateTileRecordOverallCount()
{
  var id = localStorage.getItem('edit-measurement-tile');
  var measuremnt_table_height = $('#modal-height-input-measurement-hidden').val();
  var measurement_table_width = $('#modal-width-input-measurement-hidden').val();
  var input_height = $('#modal-height-input-measurement').val(); 
  var input_width = $('#modal-width-input-measurement').val();
  var mst_ID = $('#mst_id_hidden').val();
  var data_other = $('#mst_id_hidden').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  var tile_html = $('.measurement_html_modal_'+last_index_tile).html();
  $('#total_records').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');
  // <----01-9-2021---
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];
  $.ajax({
    type: "POST",
    url: "php/operations.php",
    async: false,
    dataType: 'json',
    data: {
        action: "updateTileRecordOverallCount",
        nameDB: $("#nameDashboardDB").val(),
        id : id,
        title : tile_title,
        tile_html : tile_html,
        height: measuremnt_table_height,
        width : measurement_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        mst_ID : mst_ID,
        data_other : data_other
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div').show();
      $('.bd-example-modal-lg .modal-content').css('opacity','0.8');
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div').hide();
        $('.bd-example-modal-lg .modal-content').css('opacity','1');
        $('.bd-example-modal-lg').modal('hide');
      }, 500);
     
    }
  });
}
// --end-->

// <---16-9-2021---
// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }
// --end-->


// ---end-->
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