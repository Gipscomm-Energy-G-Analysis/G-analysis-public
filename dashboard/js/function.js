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

            //Table Not Found Check
            if(a['table_found'] == 'false'){
              var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Table Not Found</td></tr>';
              $('#mesurement_select_table_entries').html(htmlTableNotFound);  
            }

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

        // <----10-11-2021--
        if(a['queryLastDate'] != undefined && a['queryLastDate'] != ''){
          if(measurement_type == 'manually'){
            if(a['queryLastDate'][0]['type'] == '2'){
              $('#row_click_last_date').val(a['queryLastDate'][0]['on_week']+'-'+a['queryLastDate'][0]['on_date']);
            }
            else{
              $('#row_click_last_date').val(a['queryLastDate'][0]['on_date']);
            }
          }
          else if(measurement_type == 'automatic'){
            var date_data = a['queryLastDate'][0]['Time'];
            date_data = date_data.split(' ');
            $('#row_click_last_date').val(date_data[0]);
          }
        }
        else{
          $('#row_click_last_date').val('');
        }
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

        // <----10-11-2021--
        if(a['queryLastDate'] != undefined && a['queryLastDate'] != ''){
          if(measurement_type == 'manually'){
            if(a['queryLastDate'][0]['type'] == '2'){
              $('#row_click_last_date').val(a['queryLastDate'][0]['on_week']+'-'+a['queryLastDate'][0]['on_date']);
            }
            else{
              $('#row_click_last_date').val(a['queryLastDate'][0]['on_date']);
            }
          }
          else if(measurement_type == 'automatic'){
            var date_data = a['queryLastDate'][0]['Time'];
            date_data = date_data.split(' ');
            $('#row_click_last_date').val(date_data[0]);
          }
        }
        else{
          $('#row_click_last_date').val('');
        }
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

    $('.measurement_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
    
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

            $('#save_tile_id').val(a['max_id'][0]['max_id']);

            setTimeout(() => {
              $('#dashboard_sidebar').click();
              $('#measurement_modal_loader_div').hide();
              $('.bd-example-modal-lg .modal-content').css('opacity','1');
              $('.bd-example-modal-lg').modal('hide');

              // <---12-11-2021--
              // $('#save_position_tile').trigger('click');
              // --end--->
            }, 500);
            // $('#save_position_tile').attr('btn_click','table');
          }
        }
      });
    }
  }
}

// <---2-12-2021--
function saveTableFormatProduct(){
  var row_enteries_length = $('#product_select_table_entries tr').length;
  var query_data = localStorage.getItem('query_data');
  

  var table_other = $('#product_select_table_entries_table_div table tbody').children('tr:eq(0)').attr('data-table-other');
  if(query_data != undefined && query_data != null && query_data != '')
  {
    var product_table_height = $('#modal-height-input-product-hidden').val();
    var product_table_width = $('#modal-width-input-product-hidden').val();
    var input_height = $('#modal-height-input-product').val(); 
    var input_width = $('#modal-width-input-product').val();
    
    //<--23-8-2021---
    var last_index_tile = $('#total_records').val();
    // var table_length = $('.measurement_html_modal_'+last_index_tile+' table tbody tr').length;
    // $('.measurement_html_modal_'+last_index_tile+' .count_result_tile').text(table_length+' Records');

    $('.product_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
    
    var tile_html = $('.product_html_modal_'+last_index_tile).html();
    var tableHtml = $('.product_html_modal_'+last_index_tile+' table').html();
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
    if(product_table_height != '' && product_table_width != ''){
      var measurement_preview_data = [];
      measurement_preview_data.push({'height':product_table_height,'width':product_table_width});
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
            height: product_table_height,
            width : product_table_width,
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
          $('#product_modal_loader_div').show();
          $('.product_tile_modal .modal-content').css('opacity','0.8');

          $('#save_tile_id').val(a['max_id'][0]['max_id']);

          setTimeout(() => {
            $('#dashboard_sidebar').click();
            $('#product_modal_loader_div').hide();
            $('.product_tile_modal .modal-content').css('opacity','1');
            $('.product_tile_modal').modal('hide');

            // <---12-11-2021--
            // $('#save_position_tile').trigger('click');
            // --end--->
          }, 500);
          // $('#save_position_tile').attr('btn_click','table');
          
        }
      });
    }
  }
}
//-end-->

// <---24-12-2021---
function saveTableFormatProductAutomatic(){
  var row_enteries_length = $('#product_select_table_entries tr').length;
  var query_data = localStorage.getItem('query_data');
  

  var table_other = $('#product_select_table_entries_table_div table tbody').children('tr:eq(0)').attr('data-table-other');
  if(query_data != undefined && query_data != null && query_data != '')
  {
    var product_table_height = $('#modal-height-input-product-hidden').val();
    var product_table_width = $('#modal-width-input-product-hidden').val();
    var input_height = $('#modal-height-input-product').val(); 
    var input_width = $('#modal-width-input-product').val();
    
    var last_index_tile = $('#total_records').val();

    $('.product_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
    
    var tile_html = $('.product_html_modal_'+last_index_tile).html();
    var tableHtml = $('.product_html_modal_'+last_index_tile+' table').html();
    $('#total_records').remove();
    tile_html = tile_html.replace('total_records','');
    tile_html = tile_html.replace('hide_table_main','');

    var ar = localStorage.getItem('dashboard_tile_data');
    ar = JSON.parse(ar);
    var tile_title =ar['title_modal_tile'];
    var record_type_of_tile =ar['record_type_of_tile'];

    var type_data_tile =ar['type_data_tile'];
    if(product_table_height != '' && product_table_width != ''){
      var measurement_preview_data = [];
      measurement_preview_data.push({'height':product_table_height,'width':product_table_width});
      localStorage.setItem('measurement_preview_data',JSON.stringify(measurement_preview_data));
    }
    
    var prd_all_columns_automatic = $('#all_columns_product').val();
    var columnDataType = [];
    $('#all_columns_product option:selected').each(function(){
      var value =$(this).attr('data-type');
      columnDataType.push(value)
    });

    var db_table = $('#all_tables_product').val();

    if(row_enteries_length <= 5){
      $.ajax({
        type: "POST",
        url: "php/operations.php",
        async: false,
        dataType: 'json',
        data: {
            action: "saveTableFormatProductAutomatic",
            nameDB: $("#nameDashboardDB").val(),
            query_data : JSON.parse(query_data),
            title : tile_title,
            tile_html : tile_html,
            height: product_table_height,
            width : product_table_width,
            tableHtml : tableHtml,
            input_height : input_height,
            input_width : input_width,
            record_type_of_tile :record_type_of_tile,
            type_data_tile : type_data_tile,
            table_other : table_other,
            prd_all_columns_automatic : JSON.stringify(prd_all_columns_automatic),
            columnDataType : JSON.stringify(columnDataType),
            db_table : db_table
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          $('#product_modal_loader_div').show();
          $('.product_tile_modal .modal-content').css('opacity','0.8');

          // $('#save_tile_id_automatic').val(a['max_id'][0]['max_id']);
          $('#save_tile_id').val(a['max_id'][0]['max_id']);

          setTimeout(() => {
            $('#dashboard_sidebar').click();
            $('#product_modal_loader_div').hide();
            $('.product_tile_modal .modal-content').css('opacity','1');
            $('.product_tile_modal').modal('hide');

            // <---12-11-2021--
            // $('#save_position_tile').trigger('click');
            // --end--->
          }, 500);
          // $('#save_position_tile').attr('btn_click','table');
          
        }
      });
    }
  }
}

// ----end--->


// <---22-11-2021---
function saveTableFormatEnergy(type){
  var row_enteries_length = $('#energy_select_table_entries tr').length;
  var query_data = localStorage.getItem('query_data');

  var energyType = $('#energy_type').val();
  

  var table_other = $('#energy_record_table table tbody').children('tr:eq(0)').attr('data-table-other');
  if(query_data != undefined && query_data != null && query_data != '')
  {
    var energy_table_height = $('#modal-height-input-energy-hidden').val();
    var energy_table_width = $('#modal-width-input-energy-hidden').val();
    var input_height = $('#modal-height-input-energy').val(); 
    var input_width = $('#modal-width-input-energy').val();
    
    var last_index_tile = $('#total_records').val();

    $('.energy_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
    
    var tile_html = $('.energy_html_modal_'+last_index_tile).html();
    var tableHtml = $('.energy_html_modal_'+last_index_tile+' table').html();
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
    if(energy_table_height != '' && energy_table_width != ''){
      var measurement_preview_data = [];
      measurement_preview_data.push({'height':energy_table_height,'width':energy_table_width});
      localStorage.setItem('measurement_preview_data',JSON.stringify(measurement_preview_data));
    }
    if(row_enteries_length <= 5 || energyType == 'layer_modal'){
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
            height: energy_table_height,
            width : energy_table_width,
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
          
            $('#energy_modal_loader_div').show();
            $('.energy_tile_modal .modal-content').css('opacity','0.8');

            $('#save_tile_id').val(a['max_id'][0]['max_id']);

            setTimeout(() => {
              $('#dashboard_sidebar').click();
              $('#energy_modal_loader_div').hide();
              $('.energy_tile_modal .modal-content').css('opacity','1');
              $('.energy_tile_modal').modal('hide');

              // <---12-11-2021--
              // $('#save_position_tile').trigger('click');
              // --end--->
            }, 500);
            // $('#save_position_tile').attr('btn_click','table');
        }
      });
    }
  }
}
// --end-->

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

          // <---25-10-2021--
          if(value['tile_data_type'] == "overall_count"){
            value['tile_html']=value['tile_html'].replace("grid-margin", "overall_value_tile grid-margin");
          }
          else if(value['tile_data_type'] == "table"){
            value['tile_html']=value['tile_html'].replace("grid-margin", "table_tile grid-margin");
          }
          else if(value['tile_data_type'] == "chart"){
            value['tile_html']=value['tile_html'].replace("grid-margin", "chart_tile grid-margin");
          }
          // --end-->


          // <---21-10-2021--
          if(value['expand_view'] == 1 && value['tile_data_type'] == "chart"){
            // $('.'+id+'.tiles-click')
            value['tile_html']=value['tile_html'].replace("grid-margin", "chart_tile_expand_view grid-margin");
            value['tile_html']=value['tile_html'].replace("p-0 small-table", "p-0 small-table mt-0");

            var act_height = value['height'];
            var act_width = value['width'];

            var input_width = value['input_width'];
            var input_height = value['input_height'];

            var width_padding = '';
            //Width Checks
            if(input_width == "1" || input_width <= "0"){
              width_padding = 285;
            }
            else if(input_width == "2"){
              width_padding = 600;
            }
            else if(input_width == "3"){
              // value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 overflow-margin-3");
              width_padding = 915;
            }
            else if(input_width >= "4"){
              width_padding = 1230;
            }


            // <---26-10-2021---  //Height Add Class in Overflow
            if(input_height <=2){
              value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 chart_overflow_margin_2");
            }
            else if(input_height == 3){
              value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 chart_overflow_margin_3");
            }
            if(input_height >= 4){
              value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 chart_overflow_margin_4");
            }
            // --end-->
            value['tile_html'] = value['tile_html'].replace(act_height+'px', act_height+'px !important');
            value['tile_html'] = value['tile_html'].replace(act_width+'px', width_padding+'px !important');
          }
          // 1-11-2021--
          else if(value['outside_tile_checkbox'] == 1 && value['tile_data_type'] == "chart"){
            value['tile_html']=value['tile_html'].replace("grid-margin", "chart_tile_outside_structure grid-margin");
            var outside_tile_height = '';
            var outside_tile_width = '';
            var act_height = value['height'];
            var act_width = value['width'];
            if(value['outside_tile_input_width'] > 1 && value['outside_tile_input_height'] > 1)
            {
              value['tile_html']=value['tile_html'].replace("p-0 small-table", "p-0 small-table mt-0");
              value['tile_html']=value['tile_html'].replace("count_result_tile", "count_result_tile count_result_custom_width");
            }

            // Height Checks
            if(value['outside_tile_input_height'] <= 1){
                outside_tile_height = 145;
            }
            else if(value['outside_tile_input_height'] == 2){
              outside_tile_height = 290;
              value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 chart_overflow_margin_2");
            }
            else if(value['outside_tile_input_height'] == 3){
              outside_tile_height = 435;
              value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 chart_overflow_margin_3");
            }
            else if(value['outside_tile_input_height'] >= 4){
              outside_tile_height = 580;
              value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 chart_overflow_margin_4");
            }



            // Width Checks
            if(value['outside_tile_input_width'] <= 1){
              outside_tile_width = 285;
            }
            else if(value['outside_tile_input_width'] == "2"){
              outside_tile_width = 600;
            }
            else if(value['outside_tile_input_width'] == "3"){
              outside_tile_width = 915;
            }
            else if(value['outside_tile_input_width'] >= "4"){
              outside_tile_width = 1230;
            }
            value['tile_html']=  value['tile_html'].replace("grid-margin", "grid-margin outside_tile_height_"+outside_tile_height+" outside_tile_width_"+outside_tile_width);
            value['tile_html'] = value['tile_html'].replace(act_height+'px', outside_tile_height+'px !important');
            value['tile_html'] = value['tile_html'].replace(act_width+'px', outside_tile_width+'px !important');
          }

          // <---2-11-2021--
          var save_tile_id = $('#save_tile_id').val();
          // var save_tile_id_automatic = $('#save_tile_id_automatic').val();
          if(save_tile_id != '' && value['id'] == save_tile_id)
          {
            // var resultContain = value['tile_html'].includes("product_automatic_tile_card"); //False When Prd not Automatic tile
            // if(resultContain != true)
            // {
            //   value['tile_html'] = value['tile_html'].replace('card card-border', 'card card-border tile_border');
            //   $('#save_tile_id').val('');
            // }

            value['tile_html'] = value['tile_html'].replace('card card-border', 'card card-border tile_border');
            $('#save_tile_id').val('');
            
          }
          // if(save_tile_id_automatic != '' && value['id'] == save_tile_id_automatic)
          // {
          //   var resultContain = value['tile_html'].includes("product_automatic_tile_card"); //True When Prd Automatic tile
          //   if(resultContain == true)
          //   {
          //     value['tile_html'] = value['tile_html'].replace('card card-border product_automatic_tile_card', 'card card-border product_automatic_tile_card tile_border');
          //     $('#save_tile_id_automatic').val('');
          //   }
            
          // }
          // --end-->

          // <--9-11-21--
          // if(value['outside_tile_chart_display'] == '1' && value['tile_data_type'] == 'chart')
          // {
            
            
          // }
          // --end-->
          arHtml+='<div class="movetile">';
          arHtml +=value['tile_html'];
          arHtml+='</div>';
         
          // --end-->

          
          
          
        });
        $('#dashboard_count_div_tile').html(arHtml);
        $('#dashboard_count_div_tile .stretch-card').addClass('hide_table_main');

        $('#dashboard_count_div_tile .stretch-card').removeClass('col-md-3');
        $('#save_position_tile').show();

        //$('#dashboard_count_div_tile .stretch-card').draggable(); //<---8-9-2021---

        //  <----21-9-2021---
        $('#dashboard_count_div_tile .movetile').attr('draggable','true');
        var dragSrcEl = null;
        function handleDragStart(e) {
          $('#dashboard_count_div_tile .stretch-card').addClass('hide_table_main');
          this.style.opacity = '1.0';
          
          dragSrcEl = this;
      
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/html', this.innerHTML);
          
          var class_data =$(this).attr('class');
          var data_i = $(this).attr('data-i');
          $('#start_tile_data').attr('data-id',this.id);
          $('#start_tile_data').attr('data-class',class_data);
          $('#start_tile_data').attr('data-i',data_i);

        }
      
        function handleDragOver(e) {
          
          if (e.preventDefault) {
            e.preventDefault();
          }
      
          e.dataTransfer.dropEffect = 'move';
          
          return false;
        }
      
        function handleDragEnter(e) {
          this.classList.add('over');
        }
      
        function handleDragLeave(e) {
          this.classList.remove('over');
          
          // console.log('Leae',this.id);
          var class_data =$(this).attr('class');
          var data_i = $(this).attr('data-i');
          $('#drop_tile_data').attr('data-id',this.id);
          $('#drop_tile_data').attr('data-class',class_data);
          $('#drop_tile_data').attr('data-i',data_i);

         
        
        // --end-->
        }
      
        function handleDrop(e) {
          if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
          }
          
          if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
          }
          
          return false;
        }
      
        function handleDragEnd(e) {
          this.style.opacity = '1';
          
          items.forEach(function (item) {
            item.classList.remove('over');
          });

           //Start
          // setTimeout(()=>{
            var class_val_start = $('#start_tile_data').attr('data-class');
            var i_val_start = $('#start_tile_data').attr('data-i');
            var id_val_start = $('#start_tile_data').attr('data-id');

            var class_val_drop = $('#drop_tile_data').attr('data-class');
            var i_val_drop = $('#drop_tile_data').attr('data-i');
            var id_val_drop = $('#drop_tile_data').attr('data-id');
            
            if(class_val_start != undefined && class_val_drop != undefined && class_val_start != class_val_drop){
               
                // $('#'+id_val_start).attr('class',class_val_drop);
                // $('#'+id_val_start).attr('data-i',i_val_drop);
                // // $('#'+id_val_start).attr('id',id_val_drop);
                // // $('.'+class_val_drop).attr('id',id_val_drop);

                // $('#'+id_val_drop).attr('class',class_val_start);
                // $('#'+id_val_drop).attr('data-i',i_val_start);
                // // $('#'+id_val_drop).attr('id',id_val_start);
                // // $('.'+class_val_start).attr('id',id_val_start);
                
                // $('#'+id_val_start).addClass('hide_table_main ');
                // $('#'+id_val_drop).addClass('hide_table_main ');
            }

          // },1500);
        }
        
        
        let items = document.querySelectorAll('#dashboard_count_div_tile .movetile');
        items.forEach(function(item) {
          item.addEventListener('dragstart', handleDragStart, false);
          item.addEventListener('dragenter', handleDragEnter, false);
          item.addEventListener('dragover', handleDragOver, false);
          item.addEventListener('dragleave', handleDragLeave, false);
          item.addEventListener('drop', handleDrop, false);
          item.addEventListener('dragend', handleDragEnd, false);
        });

        
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
        $('#save_position_tile').hide();
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
        var table_length = $('.measurement_html_modal_'+last_id+' .save_table_div_show_table table tbody tr').length;
        $('.measurement_html_modal_'+last_id+' .count_result_tile').text(table_length+' Records');
      },1000)
      
      //  $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      //  $('.gernerated_measurement_modal_tiles .stretch-card').removeClass('hide_table_preview');
    }
  });

  // --end-->
}

// <---2-12-2021---
function generateHtmlProductTiles(type){
  var product_title = localStorage.getItem('product_title_modal_tile');
  var product_type = $('#product_type').val();
  // if(product_type == 'automatic')
  // {
  //   generateHtmlProductTilesAutomatic();
  // }
  // else{
    $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "generateHtmlProductTiles",
          nameDB: $("#nameDashboardDB").val(),
          product_title : product_title,
          type : type
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        // console.log(a);
        $('.gernerated_product_modal_tiles').html(a['tile_html']);

        var last_id = a['last_id'];
        setTimeout(()=>{
          var table_length = $('.product_html_modal_'+last_id+' .save_table_div_show_table table tbody tr').length;
          $('.product_html_modal_'+last_id+' .count_result_tile').text(table_length+' Records');
        },1000)
      }
    });
  // }

}

// --end-->

// <---24-12-2021--
function generateHtmlProductTilesAutomatic(){
  var product_title = localStorage.getItem('product_title_modal_tile');
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "generateHtmlProductTilesAutomatic",
        nameDB: $("#nameDashboardDB").val(),
        product_title : product_title,
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      // console.log(a);
      $('.gernerated_product_modal_tiles').html(a['tile_html']);

      var last_id = a['last_id'];
      setTimeout(()=>{
        var table_length = $('.product_html_modal_'+last_id+' .save_table_div_show_table table tbody tr').length;
        $('.product_html_modal_'+last_id+' .count_result_tile').text(table_length+' Records');
      },1000)
    }
  });
}
// --end-->

// <---22-11-2021---
function generateHtmlEnergyTiles(type){
  var energy_title = localStorage.getItem('energy_title_modal_tile');
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "generateHtmlEnergyTiles",
        nameDB: $("#nameDashboardDB").val(),
        energy_title : energy_title,
        type : type
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      // console.log(a);
       $('.gernerated_energy_modal_tiles').html(a['tile_html']);

      var last_id = a['last_id'];
      setTimeout(()=>{
        var table_length = $('.energy_html_modal_'+last_id+' .save_table_div_show_table table tbody tr').length;
        $('.energy_html_modal_'+last_id+' .count_result_tile').text(table_length+' Records');
      },1000)
    }
  });

}
// --end--->

// <---18-11-2021---
//Selected Number of Records Energy
function getNumberRecordsEnergy(){
  var energy_type = $('#energy_type').val();

  var open_end_layer = $('#open_end_layer').val();
  // <-----16-12-2021---
  getEnergyRecordsTableHeader(energy_type);

  // <----12-1-2022
  if(energy_type == 'layer_modal')
  {
    getNumberRecordsEnergyLayerModal();
    return false;
  }
  // --end-->
  // --end--->
  var number_record_local_val = localStorage.getItem('number_record_energy');
  if(number_record_local_val != undefined && number_record_local_val != null){
      $('#energy_total_number_record').val(number_record_local_val);
  }
  else{
      $('#energy_total_number_record').val('');
  }

  //6-8-2021---
  var selected_number_record = localStorage.getItem('selected_number_record_energy');
  if(selected_number_record == undefined || selected_number_record == ''){
      selected_number_record = 5;
  }
  //----end-->
  var total_number_records = $('#energy_total_number_record').val();
  var time_interval = $('#energy_time_interval').val();
  var records_order_by_val = $('#energy_records_order_by').val();
  var search_record = $('#energy_search_record').val();

  $('.energy_table_header').removeClass('row_click_table');
  $('.table-margin .table th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
  if(total_number_records == ''){
    var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsEnergy",
            nameDB: $("#nameDashboardDB").val(),
            total_number_records : total_number_records,
            time_interval : time_interval,
            energy_order_by_val : records_order_by_val,
            search_record : search_record,
            number_records : selected_number_record,
            energy_type : energy_type,
            open_end_layer : open_end_layer
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          // a = JSON.parse(a);
          // console.log(a['table_found']);
          $('#energy_select_table_entries').html(a['energy_html']);
          $('#open_end_layer_div').hide();

          //Table Not Found Check
          if(a['table_found'] == 'false'){
            var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Table Not Found</td></tr>';
            $('#energy_select_table_entries').html(htmlTableNotFound);  
          }

          if(energy_type == 'manually')
          {
            // var thVal =  $('#energy_record_table table thead tr').children('th:eq(4)').text();
            // if(thVal == '' || thVal == undefined){
            //   $('#energy_record_table table thead tr').children('th:eq(3)').after("<th>Status</th>"); 
            // }
            // $('#energy_record_table table thead tr').children('th:eq(3)').text('Total Units');
            // $('#energy_record_table table thead tr').children('th:eq(2)').text('Created Date');
            // $('#energy_record_table table thead tr').children('th:eq(1)').text('Time Interval');
            $('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
          }
          else if(energy_type == 'automatic'){
            // $('#energy_record_table table thead tr').children('th:eq(4)').remove(); 
            // $('#energy_record_table table thead tr').children('th:eq(3)').text('Values'); 
            // $('#energy_record_table table thead tr').children('th:eq(2)').text('Conv Factor');
            // $('#energy_record_table table thead tr').children('th:eq(1)').text('Time');
            $('.table-margin .table td').attr('style','padding: 8px !important;font-size: small !important;');
          }
          else if(energy_type == 'layer_modal'){
            $('#open_end_layer_div').show();
          }
          
          $('#pagination_html_energy').html(a['pagination_html_energy']);
          //$('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
          
          $('.table-margin').removeClass('margin-remove-table');
          // $('#energy_record_table table thead tr').children('th:eq(2)').text('Created Date');
          // $('#energy_record_table table thead tr').children('th:eq(3)').text('Total Units');

          var val_selected = localStorage.getItem('selected_number_record_energy');
          $('#energy_number_record option[value='+val_selected+']').prop('selected', 'selected');

          localStorage.setItem('query_data',JSON.stringify(a['query_data']));

          // <---02-9-2021--
          var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
          if(edit_value == 'true'){
              $('#energy_modal_open_button').val('Update & Preview');
              $('#energy_modal_open_button').attr('tile-edit','true');
          }
          else{
            $('#energy_modal_open_button').val('Save & Preview');
            $('#energy_modal_open_button').attr('tile-edit','false');
          }
          // --end-->

          // <---7-9-2021----
          setTimeout(()=>{
            var type_data = localStorage.getItem('dashboard_tile_data');
            type_data = JSON.parse(type_data);
            if(type_data['type_data_tile'] == 'overall_count')
            {
              $('#energy_modal_open_button').hide();
            }
            else{
              $('#energy_modal_open_button').show();
            }
          },500)

          // ---end--->
        }
    });
  }

}

function getNumberRecordsEnergyLayerModal(){
  var energy_type = $('#energy_type').val();

  var open_end_layer = $('#open_end_layer').val();
  // <-----16-12-2021---
  // getEnergyRecordsTableHeader(energy_type);

  
 
  // --end-->
  // --end--->
  var number_record_local_val = localStorage.getItem('number_record_energy');
  if(number_record_local_val != undefined && number_record_local_val != null){
      $('#energy_total_number_record').val(number_record_local_val);
  }
  else{
      $('#energy_total_number_record').val('');
  }

  //6-8-2021---
  // var selected_number_record = localStorage.getItem('selected_number_record_energy');
  // if(selected_number_record == undefined || selected_number_record == ''){
  //     selected_number_record = 5;
  // }

  // <---13-1-2022-
  // var date_val = $('#layer_modal_date').val();
  // var day_from_val = $('#day_from').val();
  // var day_to_val = $('#day_to').val();
  // --end--->

  // <----25-1-2022---
  var energy_measurement = $('#energy_measurement').val();
  var select_day_week = $('#select_day_week').val();
  var input_val_week_day = $('#input_val_week_day').val();

  // --end--->
  selected_number_record = 5;
  //----end-->
  var total_number_records = $('#energy_total_number_record').val();
  var time_interval = $('#energy_time_interval').val();
  var records_order_by_val = $('#energy_records_order_by').val();
  var search_record = $('#energy_search_record').val();

  $('.energy_table_header').removeClass('row_click_table');
  $('.table-margin .table th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
  if(energy_measurement == '' || select_day_week == '' || input_val_week_day == ''){
    var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    // console.log('Before Ajax');
    $('#energy_table_data_loader_div').show();
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getLayerTableEnergyData",
            nameDB: $("#nameDashboardDB").val(),
            mst_id : energy_measurement,
            select_day_week : select_day_week,
            input_val_week_day : input_val_week_day     
            // date_val : date_val,
            // day_from_val : day_from_val,
            // day_to_val : day_to_val

            // total_number_records : total_number_records,
            // time_interval : time_interval,
            // energy_order_by_val : records_order_by_val,
            // search_record : search_record,
            // number_records : selected_number_record,
            // energy_type : energy_type,
            // open_end_layer : open_end_layer
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          $('#energy_table_data_loader_div').hide();
          // console.log('After Ajax');
          // a = JSON.parse(a);
          // console.log(a);
          // console.log(a['table_found']);
          $('#energy_search_record').val('');
          $('#energy_record_table #energy_record_tb thead').html(a['energy_header']);
          $('#energy_select_table_entries').html(a['energy_html']);
          
          $('#open_end_layer_div').hide();

          //Table Not Found Check
          if(a['table_found'] == 'false'){
            var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Table Not Found</td></tr>';
            $('#energy_select_table_entries').html(htmlTableNotFound);  
          }

          $('#pagination_html_energy').html(a['pagination_html_energy']);
          //$('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
          
          $('.table-margin').removeClass('margin-remove-table');
          // $('#energy_record_table table thead tr').children('th:eq(2)').text('Created Date');
          // $('#energy_record_table table thead tr').children('th:eq(3)').text('Total Units');

          // var val_selected = localStorage.getItem('selected_number_record_energy');
          // $('#energy_number_record option[value='+val_selected+']').prop('selected', 'selected');

          localStorage.setItem('query_data',JSON.stringify(a['query_data']));

          // <---02-9-2021--
          var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
          if(edit_value == 'true'){
              $('#energy_modal_open_button').val('Update & Preview');
              $('#energy_modal_open_button').attr('tile-edit','true');
          }
          else{
            $('#energy_modal_open_button').val('Save & Preview');
            $('#energy_modal_open_button').attr('tile-edit','false');
          }
          // --end-->

          // <---7-9-2021----
          setTimeout(()=>{
            var type_data = localStorage.getItem('dashboard_tile_data');
            type_data = JSON.parse(type_data);
            if(type_data['type_data_tile'] == 'overall_count')
            {
              $('#energy_modal_open_button').hide();
            }
            else{
              $('#energy_modal_open_button').show();
            }
          },500)

          // ---end--->
        }
    });
  }

}


// <---17-01-2022--
function getNumberRecordsEnergyLayerModalPagination(page_value,selected_number_record_energy = 'false'){

  var number_record_local_val = localStorage.getItem('number_record_energy');
  if(number_record_local_val != undefined && number_record_local_val != null){
      $('#energy_total_number_record').val(number_record_local_val);
  }
  else{
      $('#energy_total_number_record').val('');
  }

  // <---13-1-2022-
  var date_val = $('#layer_modal_date').val();
  var day_from_val = $('#day_from').val();
  var day_to_val = $('#day_to').val();
  // --end--->
  // selected_number_record = 5;
  var number_records = $('#energy_number_record_layer').val();
  //----end-->
  $('.energy_table_header').removeClass('row_click_table');
  $('.table-margin .table th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
  if(date_val == '' || day_from_val == '' || day_to_val == ''){
    var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getLayerTableEnergyData",
            nameDB: $("#nameDashboardDB").val(),
            date_val : date_val,
            day_from_val : day_from_val,
            day_to_val : day_to_val,
            page_value : page_value,
            number_records : number_records,
            selected_number_record_energy : selected_number_record_energy
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          // a = JSON.parse(a);
          // console.log(a['table_found']);
          $('#energy_search_record').val('');
          $('#energy_record_table #energy_record_tb thead').html(a['energy_header']);
          $('#energy_select_table_entries').html(a['energy_html']);
          
          $('#open_end_layer_div').hide();

          //Table Not Found Check
          if(a['table_found'] == 'false'){
            var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Table Not Found</td></tr>';
            $('#energy_select_table_entries').html(htmlTableNotFound);  
          }

          $('#pagination_html_energy').html(a['pagination_html_energy']);
          //$('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
          
          $('.table-margin').removeClass('margin-remove-table');
          // $('#energy_record_table table thead tr').children('th:eq(2)').text('Created Date');
          // $('#energy_record_table table thead tr').children('th:eq(3)').text('Total Units');

          // var val_selected = localStorage.getItem('selected_number_record_energy');
          $('#energy_number_record_layer option[value='+number_records+']').prop('selected', 'selected');

          localStorage.setItem('query_data',JSON.stringify(a['query_data']));

          // <---02-9-2021--
          var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
          if(edit_value == 'true'){
              $('#energy_modal_open_button').val('Update & Preview');
              $('#energy_modal_open_button').attr('tile-edit','true');
          }
          else{
            $('#energy_modal_open_button').val('Save & Preview');
            $('#energy_modal_open_button').attr('tile-edit','false');
          }
          // --end-->

          // <---7-9-2021----
          setTimeout(()=>{
            var type_data = localStorage.getItem('dashboard_tile_data');
            type_data = JSON.parse(type_data);
            if(type_data['type_data_tile'] == 'overall_count')
            {
              $('#energy_modal_open_button').hide();
            }
            else{
              $('#energy_modal_open_button').show();
            }
          },500)

          // ---end--->
        }
    });
  }

}
// --end-->


// <--16-12-2021--
function getEnergyRecordsTableHeader(energy_type){
  var open_end_layer = $('#open_end_layer').val();
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getEnergyRecordsTableHeader",
        nameDB: $("#nameDashboardDB").val(),
        energy_type : energy_type,
        open_end_layer : open_end_layer
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#energy_record_table #energy_record_tb thead').html(a['table_header']);
    }
  });
}
// --end-->


//Get Number Records Energy Pagination
function getNumberRecordsEnergyPagination(page_val,energy_search_record = 'false'){
  var energy_type = $('#energy_type').val();
  var open_end_layer = $('#open_end_layer').val();
  // <-----17-12-2021---
  getEnergyRecordsTableHeader(energy_type);
  // --end--->
  var number_records = $('#energy_number_record').val();
  var time_interval = $('#energy_time_interval').val();
  var records_order_by_val = $('#energy_records_order_by').val();
  var search_record = $('#energy_search_record').val();
  var total_number_records = $('#energy_total_number_record').val();
  if(total_number_records == ''){
    var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsEnergy",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records,
            time_interval : time_interval,
            energy_order_by_val : records_order_by_val,
            page_val : page_val,
            search_record : search_record,
            total_number_records : total_number_records,
            energy_search_record : energy_search_record,
            energy_type : energy_type,
            open_end_layer  : open_end_layer
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          $('#energy_select_table_entries').html(a['energy_html']);
          $('#pagination_html_energy').html(a['pagination_html_energy']);
          if(energy_type == 'manually')
          {
            $('.table-margin .table td').attr('style','padding: 6px !important;font-size: small !important;');
          }
          else if(energy_type == 'automatic'){
            $('.table-margin .table td').attr('style','padding: 8px !important;font-size: small !important;');
          }
          
          var val_selected = localStorage.getItem('selected_number_record_energy');
          $('#energy_number_record option[value='+val_selected+']').prop('selected', 'selected');

          localStorage.setItem('query_data',JSON.stringify(a['query_data']));

          // <---02-9-2021--
          var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
          if(edit_value == 'true'){
              $('#energy_modal_open_button').val('Update & Preview');
              $('#energy_modal_open_button').attr('tile-edit','true');
          }
          else{
            $('#energy_modal_open_button').val('Save & Preview');
            $('#energy_modal_open_button').attr('tile-edit','false');
          }

          // <---7-9-2021----
          var type_data = localStorage.getItem('dashboard_tile_data');
          type_data = JSON.parse(type_data);
          if(type_data['type_data_tile'] == 'overall_count')
          {
            $('#energy_modal_open_button').hide();
          }
          else{
            $('#energy_modal_open_button').show();
          }
          // ---end--->
        }
    });
  }

}

function rowClickEnergyTableData(mst_id,data_type){
  var energy_type = $('#energy_type').val();
  // <-----16-12-2021---
  rowClickEnergyRecordsTableHeader(energy_type);
  // ---end--->
  $('#mst_id_hidden_energy').val(mst_id);
  
  var total_count = $("#energy_select_table_entries tr[data-mst='"+mst_id+"']").children('td:eq(3)').text();
  $('#overall_count_energy').val(total_count);

  var record_name = $("#energy_select_table_entries tr[data-mst='"+mst_id+"']").children('td:eq(0)').text();
  $('#mst_id_hidden_energy').attr('data-name',record_name);
  // --end-->

  var table_other = $('#energy_record_table table tbody').children('tr:eq(0)').attr('data-table-other'); 
  $('#mst_id_hidden_energy').attr('data-table-other',table_other);

  var number_records = $('#energy_number_record').val();  
  var total_number_records = $('#energy_total_number_record').val();

  var records_order_by_val = $('#energy_records_order_by').val();

  //Classes Add
  $('.energy_table_header').addClass('row_click_table');
  $('.table-margin .table th').removeAttr('style');
  if(total_number_records == ''){
    var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    $.ajax({
      type : "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "rowClickEnergyTableData",
          nameDB: $("#nameDashboardDB").val(),
          mst_id : mst_id,
          data_type : data_type,
          number_records : number_records,
          total_number_records : total_number_records,
          energy_order_by_val : records_order_by_val,
          energy_type : energy_type
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        // $('#energy_record_table table thead tr').children('th:eq(4)').remove(); 

        // // <---15-9-2021---
        // if(energy_type == 'manually'){
        //   $('#energy_record_table table thead tr').children('th:eq(1)').text('Time Interval');
        //   $('#energy_record_table table thead tr').children('th:eq(2)').text('Date');
        //   $('#energy_record_table table thead tr').children('th:eq(3)').text('Units Consumed');
        // }
        // else if(energy_type == 'automatic'){
        //   $('#energy_record_table table thead tr').children('th:eq(1)').text('Time');
        //   $('#energy_record_table table thead tr').children('th:eq(2)').text('Conv Factor');
        //   $('#energy_record_table table thead tr').children('th:eq(3)').text('Values');
        // }
        // // --end--->

        $('#energy_select_table_entries').html(a['energy_html']);
        $('#pagination_html_energy').html(a['pagination_html_energy']);
        $('.table-margin .table td').removeAttr('style');
        
        $('.table-margin').addClass('margin-remove-table');
        // $('#energy_record_table table thead tr').children('th:eq(2)').text('Date');
        // $('#energy_record_table table thead tr').children('th:eq(3)').text('Units Consumed');

        $('#energy_number_record option[value='+number_records+']').prop('selected', 'selected');

        localStorage.setItem('query_data',JSON.stringify(a['query_data']));

        // <---02-9-2021--
        var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
        if(edit_value == 'true'){
            $('#energy_modal_open_button').val('Update & Preview');
            $('#energy_modal_open_button').attr('tile-edit','true');
        }
        else{
          $('#energy_modal_open_button').val('Save & Preview');
          $('#energy_modal_open_button').attr('tile-edit','false');
        }

        // <---7-9-2021--
        setTimeout(()=>{
          $('#energy_modal_open_button').show();
        },500)
        // --end-->

        // <----10-11-2021--
        if(a['queryLastDate'] != undefined && a['queryLastDate'] != ''){
          if(energy_type == 'manually'){
            if(a['queryLastDate'][0]['type'] == '2'){
              $('#row_click_last_date_energy').val(a['queryLastDate'][0]['on_week']+'-'+a['queryLastDate'][0]['on_date']);
            }
            else{
              $('#row_click_last_date_energy').val(a['queryLastDate'][0]['on_date']);
            }
          }
          else if(energy_type == 'automatic'){
            var date_data = a['queryLastDate'][0]['Time'];
            date_data = date_data.split(' ');
            $('#row_click_last_date_energy').val(date_data[0]);
          }
        }
        else{
          $('#row_click_last_date_energy').val('');
        }
        // --end-->
      }
    });
  }
}

// <---15-2-2022---
function rowClickEnergyLayer(name_val,valid_from,valid_to,time_from,time_to){
  var energy_measurement = $('#energy_measurement').val();
  var select_day_week = $('#select_day_week').val();
  var input_val_week_day = $('#input_val_week_day').val();

  $('.energy_table_header').removeClass('row_click_table');
  if(energy_measurement == '' || select_day_week == '' || input_val_week_day == ''){
    var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "rowClickEnergyLayer",
            nameDB: $("#nameDashboardDB").val(),
            mst_id : energy_measurement,
            name_val : name_val,
            valid_from : valid_from,
            valid_to : valid_to,
            time_from: time_from,
            time_to: time_to,
            input_val_week_day : input_val_week_day,
            select_day_week : select_day_week
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
          
          $('#energy_record_table #energy_record_tb thead').html(a['energy_header']);
          $('#energy_select_table_entries').html(a['energy_html']);
          
          $('#open_end_layer_div').hide();

          $('#pagination_html_energy').html(a['pagination_html_energy']);
          $('.table-margin').removeClass('margin-remove-table');

          localStorage.setItem('query_data',JSON.stringify(a['query_data']));

          var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
          if(edit_value == 'true'){
              $('#energy_modal_open_button').val('Update & Preview');
              $('#energy_modal_open_button').attr('tile-edit','true');
          }
          else{
            $('#energy_modal_open_button').val('Save & Preview');
            $('#energy_modal_open_button').attr('tile-edit','false');
          }
          setTimeout(()=>{
            var type_data = localStorage.getItem('dashboard_tile_data');
            type_data = JSON.parse(type_data);
            if(type_data['type_data_tile'] == 'overall_count')
            {
              $('#energy_modal_open_button').hide();
            }
            else{
              $('#energy_modal_open_button').show();
            }
          },500)

          // ---end--->
        }
    });
  }
} 
// --end--->


var tableCallCount = 1;
var tableClearInterval;
var sumAllValue = 0;
function rowClickEnergyTableDataLayer(valid_from,valid_to,click_row_array){

  var date_val = $('#layer_modal_date').val();
  var day_from_val = $('#day_from').val();
  var day_to_val = $('#day_to').val();


  var record_name = $("#energy_select_table_entries tr[valid_from='"+valid_from+"']").children('td:eq(0)').text();
  $('#layer_modal').attr('data-name',record_name);
  // --end-->

  var table_other = $('#energy_record_table table tbody').children('tr:eq(0)').attr('data-table-other'); 
  $('#layer_modal').attr('data-table-other',table_other);


  //Classes Add
  $('.energy_table_header').addClass('row_click_table');
  $('.table-margin .table th').removeAttr('style');

  // <----14-1-2022--
  // var click_row_array = [];
  // $("#energy_select_table_entries tr[valid_from='"+valid_from+"'] td").each((key,val)=>{
  //   click_row_array.push(val.innerHTML);
  // })
  // console.log(click_row_array);
  // --end--->

  if(date_val == '' || day_from_val == '' || day_to_val == ''){
    var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    tableClearInterval = setInterval(()=>{
      rowClickEnergyDataLayerAjax(valid_from,valid_to,click_row_array);
    },1000)
  }
}

// <---19-1-2022--
function rowClickEnergyDataLayerAjax(valid_from,valid_to,click_row_array){
  $('#energy_table_data_loader_div').show();
    $.ajax({
      type : "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "rowClickEnergyTableDataLayer",
          nameDB: $("#nameDashboardDB").val(),
          valid_from : valid_from,
          valid_to : valid_to,
          click_row_array : JSON.stringify(click_row_array),
          tableCallCount : tableCallCount
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        // console.log(a);
        $('#energy_table_data_loader_div').hide();
        $('#energy_record_table #energy_record_tb thead').html(a['energy_header']);
        // $('#energy_select_table_entries').html(a['energy_html']);
        $('#pagination_html_energy').html(a['pagination_html_energy']);

        // <--17-1-2022--
       
        $('.table-margin .table td').removeAttr('style');
        
        $('.table-margin').addClass('margin-remove-table');
        // $('#energy_record_table table thead tr').children('th:eq(2)').text('Date');
        // $('#energy_record_table table thead tr').children('th:eq(3)').text('Units Consumed');

        // $('#energy_number_record option[value='+number_records+']').prop('selected', 'selected');

        localStorage.setItem('query_data',JSON.stringify(a['query_data']));

        // <---02-9-2021--
        var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
        if(edit_value == 'true'){
            $('#energy_modal_open_button').val('Update & Preview');
            $('#energy_modal_open_button').attr('tile-edit','true');
        }
        else{
          $('#energy_modal_open_button').val('Save & Preview');
          $('#energy_modal_open_button').attr('tile-edit','false');
        }

        var arTileData = localStorage.getItem('dashboard_tile_data');
        arTileData = JSON.parse(arTileData);
        if(arTileData['type_data_tile'] == 'table')
        {
          setTimeout(()=>{
            $('#energy_modal_open_button').show();
          },500)
        }
        else{
          setTimeout(()=>{
            $('#energy_modal_open_button').hide();
          },500)
        }

        // <---19-1-2022--
        // if(tableCallCount == 1 && a['table_found'] == 'false'){
        //   var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Table Not Found</td></tr>';
        //   $('#energy_select_table_entries').html(htmlTableNotFound);  
        // }

        if(tableCallCount == 1 && a['sum_value'] == '' && a['table_found'] == 'true') //Data Not Found
        {
          tableCallCount = 1;
          sumAllValue = 0;
          clearInterval(tableClearInterval);
          $('#energy_table_data_loader_div').hide();
          var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Data Not Found</td></tr>';
          $('#energy_select_table_entries').html(htmlTableNotFound); 
          $('#pagination_html_energy').html(''); 
          return false;

        }
        else if(a['sum_value'] == '' && a['table_found'] == 'true')  //Data Found and Stop function
        {
          tableCallCount = 1;
          sumAllValue = 0;
          $('#energy_table_data_loader_div').hide();
          clearInterval(tableClearInterval);
          return false;
          
        }
        else if((a['sum_value'] != '' || a['sum_value'] >=0) && a['table_found'] == 'true'){
          sumAllValue += parseFloat(a['sum_value']);
          $('#energy_table_data_loader_div').show();
          // console.log('Sum All Value',sumAllValue);
          var rowData = '';
          for(var i = 0; i <= click_row_array.length; i++)
          {
            if(i == click_row_array.length)
            {
              rowData+="<td>"+sumAllValue+"</td>";
            }
            else{
              rowData+="<td>"+click_row_array[i]+"</td>";
            }
          }
          $('#energy_select_table_entries').html(rowData); 
        }
        tableCallCount++;
        // --end-->
     
      }
    });
  }
// --end-->

// <--16-12-2021--
function rowClickEnergyRecordsTableHeader(energy_type){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "rowClickEnergyRecordsTableHeader",
        nameDB: $("#nameDashboardDB").val(),
        energy_type : energy_type
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#energy_record_table #energy_record_tb thead').html(a['table_header']);
    }
  });
}
// --end-->

function rowClickEnergyPaginationTableData(mst_id,data_type,page_value,selected_number_record_energy = 'false'){
  // <---7-9-2021--
  var energy_type = $('#energy_type').val();
  // <-----16-12-2021---
   rowClickEnergyRecordsTableHeader(energy_type);
  // ---end--->
  var number_records = $('#energy_number_record').val();
  var total_number_records = $('#energy_total_number_record').val(); 
  var records_order_by_val = $('#energy_records_order_by').val(); 
  if(total_number_records == ''){
    var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
    $('#energy_select_table_entries').html(tr);
    $('#pagination_html_energy').html('');
  }
  else{
    $.ajax({
      type : "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "rowClickEnergyTableData",
          nameDB: $("#nameDashboardDB").val(),
          mst_id : mst_id,
          data_type : data_type,
          number_records : number_records,
          page_val : page_value,
          selected_number_record_energy : selected_number_record_energy,
          total_number_records : total_number_records,
          energy_order_by_val : records_order_by_val,
          energy_type : energy_type
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#energy_select_table_entries').html(a['energy_html']);
        $('#pagination_html_energy').html(a['pagination_html_energy']);
        $('.table-margin .table td').removeAttr('style');

        $('#energy_number_record option[value='+number_records+']').prop('selected', 'selected');

        //LocalStorage
        localStorage.setItem('query_data',JSON.stringify(a['query_data']));

        // <---02-9-2021--
        var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
        if(edit_value == 'true'){
            $('#energy_modal_open_button').val('Update & Preview');
            $('#energy_modal_open_button').attr('tile-edit','true');
        }
        else{
          $('#energy_modal_open_button').val('Save & Preview');
          $('#energy_modal_open_button').attr('tile-edit','false');
        }

         // <---7-9-2021--
         $('#energy_modal_open_button').show();
         // --end-->

        // <----10-11-2021--
        if(a['queryLastDate'] != undefined && a['queryLastDate'] != ''){
          if(energy_type == 'manually'){
            if(a['queryLastDate'][0]['type'] == '2'){
              $('#row_click_last_date_energy').val(a['queryLastDate'][0]['on_week']+'-'+a['queryLastDate'][0]['on_date']);
            }
            else{
              $('#row_click_last_date_energy').val(a['queryLastDate'][0]['on_date']);
            }
          }
          else if(energy_type == 'automatic'){
            var date_data = a['queryLastDate'][0]['Time'];
            date_data = date_data.split(' ');
            $('#row_click_last_date_energy').val(date_data[0]);
          }
        }
        else{
          $('#row_click_last_date_energy').val('');
        }
        // --end-->
      }
    });
  }

}

// --end-->

//Selected Number of Records Product
function getNumberRecordsProduct(page_val = 1){
    // var number_records = $('#product_number_record').val();
    var product_type = $('#product_type').val();
    // <---13-12-2021---
    if(product_type == 'automatic'){
      var tr = "<tr><td colspan='5' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Product Type Entered Mannually</td></tr>";
      $('#all_product_table_entries').html(tr);
      $('#pagination_all_product').html('');
      return false;
    }
    // --end-->
    
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsProduct",
            nameDB: $("#nameDashboardDB").val(),
            // number_records : number_records,
            page_val : page_val,
            product_type : product_type
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#all_product_table_entries').html(a['product_html']);
           $('#pagination_all_product').html(a['pagination_html']);
           $('#all_product_table_entries tr td').attr('style','padding: 12px !important; font-size: small');
            
           if(a['table_found'] == 'false')
           {
            var tr = "<tr><td colspan='5' style='padding: 12px !important; font-size: small' class='text-center'>Table Not Found</td></tr>";
            $('#all_product_table_entries').html(tr);
           }
        }
    });
}

function getNumberRecordsProductAutomatic(page_val = 1){
  $('#product_field_div').hide();
  $('.automatic_product_div').show();
  // var number_records = $('#product_number_record').val();

  // <---22-12-2021---
  var all_tables_product = $('#all_tables_product').val();
  var all_columns_product = $('#all_columns_product').val();
  var total_number_records = $('#product_total_number_record').val();
  if(total_number_records == '')
  {
    var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Total No. Record</td></tr>";
    $('#product_select_table_entries').html(tr);
    $('#product_select_table_entries_pagination').html('');
    return false;
  }
  else if(all_tables_product == '' || all_columns_product.length == 0)
  {
    var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Column</td></tr>";
    $('#product_select_table_entries').html(tr);
    $('#product_select_table_entries_pagination').html('');
    return false;
  }
  var columnDataType = [];
  $('#all_columns_product option:selected').each(function(){
    var value =$(this).attr('data-type');
    columnDataType.push(value)
  });
  // ---end--->

  var product_type = $('#product_type').val();
  
  $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "getNumberRecordsProductAutomatic",
          nameDB: $("#nameDashboardDB").val(),
          // number_records : number_records,
          page_val : page_val,
          product_type : product_type,
          all_tables_product : all_tables_product,
          total_number_records : total_number_records,
          all_columns_product : JSON.stringify(all_columns_product),
          columnDataType : JSON.stringify(columnDataType),
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#product_select_table_entries').html(a['product_html']);
        $('#product_select_table_entries_table_div table thead').html(a['product_table_header']);
        $('#product_select_table_entries_pagination').html(a['pagination_html']);


        $('#product_select_table_entries_table thead tr th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
        $('#product_select_table_entries_table tbody tr td').attr('style','padding: 6px !important;font-size: small !important;');


        $('#product_records_order_by_div').hide();
        localStorage.setItem('query_data',JSON.stringify(a['query_data']));

        var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
        if(edit_value == 'true'){
            $('#product_modal_open_button').val('Update & Preview');
            $('#product_modal_open_button').attr('tile-edit','true');
        }
        else{
          $('#product_modal_open_button').val('Save & Preview');
          $('#product_modal_open_button').attr('tile-edit','false');
        }
       
        var type_data = localStorage.getItem('dashboard_tile_data');
        type_data = JSON.parse(type_data);
        if(type_data['type_data_tile'] == 'overall_count')
        {
          $('#product_modal_open_button').hide();
        }
        else{
          $('#product_modal_open_button').show();
        }
        // ---end--->
         
      }
  });
}

function getAllProductTables(){
  $('#product_field_div').hide();
  $('.automatic_product_div').show();
  // var number_records = $('#product_number_record').val();
  var product_type = $('#product_type').val();
  var nameDB = $("#nameDashboardDB").val();
  $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "getAllProductTables",
          nameDB: nameDB,
          product_type : product_type,
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        // <---21-12-2021---
        if(a['all_tables'] != '')
        {
          var all_table = "<option value=''>Please Select Table</option>";;
          a['all_tables'].forEach((val)=>{
            all_table +="<option value='"+val['name']+"'>"+val['name']+"</option>";
          });
          $('#all_tables_product').html(all_table);

          var selectHTML = "<label for='product_type'>Columns</label>";
          selectHTML += "<select class='form-control form-control-sm text-dark'id='all_columns_product'>";
          selectHTML+= "<option value=''>Please Select Column</option>";
          selectHTML += "</select>";
          $('#all_columns_product_div').html(selectHTML);
          
          // var column_option = "<option value=''>Please Select Column</option>";
          // $('#all_columns_product').html(column_option);

          
        }
        else{
          var all_table = "<option>No Data</option>";
          $('#all_tables_product').html(all_table);
          $('#all_columns_product').hide();
        }

        var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Column</td></tr>";
        $('#product_select_table_entries').html(tr);
        $('#product_select_table_entries_pagination').html('');
        // --end--->
      }
  });
}

// <---22-12-2021--
function getAllColumnProductTables(edit_tile_all_columns = false){
  $('#product_field_div').hide();
  $('.automatic_product_div').show();
  // var number_records = $('#product_number_record').val();
  var table_name = $('#all_tables_product').val();
  var nameDB = $("#nameDashboardDB").val();
  $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "getAllColumnProductTables",
          nameDB: nameDB,
          table_name : table_name
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        if(a['all_columns'] != '')
        {
          // var all_table = "<option value=''>Please Select Column</option>";
          $('#all_columns_product_div').html('');
          var all_table = '';
          a['all_columns'].forEach((val)=>{
            all_table +="<option value='"+val['column_name']+"' data-type='"+val['data_type']+"'>"+val['column_name']+"</option>";
          });
          $('#all_columns_product').html(all_table);

          // <----23-12-2021---
          var selectHTML = "<label for='product_type'>Columns</label>";
          selectHTML += "<select class='form-control form-control-sm text-dark' multiple id='all_columns_product'>";
          selectHTML+= all_table;
          selectHTML += "</select>";
          $('#all_columns_product_div').html(selectHTML);
          // --end-->
          $('#all_columns_product').multiselect({
            columns: 1,
            placeholder: 'Please Select Column',
            search: true,
          });
          $('#all_columns_product').multiselect('refresh');

          // <----31-12-2021-- Autoplopluate Code
          if(edit_tile_all_columns != false)
          {
            var all_columns = JSON.parse(edit_tile_all_columns);
            var options = [];
            var flag = 0; 
            for(var i = 0; i <  a['all_columns'].length; i++)
            {
              for(var j = 0; j < all_columns.length; j++)
              {
                if(a['all_columns'][i]['column_name'] == all_columns[j])
                {
                  flag = 1;
                  break;
                }
                else{
                   flag = 0;
                }
              }

              if(flag == 1)
              {
                var val = {
                  name   : all_columns[j],
                  value  : all_columns[j],
                  optionAttributes: ['data-type'],
                  // data_type : a['all_columns'][i]['data_type'],
                  checked: true,

                };
                options.push(val);
              }
              else{
                var val = {
                  name   : a['all_columns'][i]['column_name'],
                  value  : a['all_columns'][i]['column_name'],
                  optionAttributes: ['data-type'],
                  // data_type : a['all_columns'][i]['data_type'],
                  checked: false
                };
                options.push(val);
              }
            }
            $('#all_columns_product[multiple]')
            .multiselect('loadOptions', options );
          }
          // --end-->

          var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Column</td></tr>";
          $('#product_select_table_entries').html(tr);
          $('#product_select_table_entries_pagination').html('');
        }
        else{
          var selectHTML = "<label for='product_type'>Columns</label>";
          selectHTML += "<select class='form-control form-control-sm text-dark'id='all_columns_product'>";
          selectHTML+= "<option value=''>Please Select Column</option>";
          selectHTML += "</select>";
          $('#all_columns_product_div').html(selectHTML);

          var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>No Data</td></tr>";
          $('#product_select_table_entries').html(tr);
          $('#product_select_table_entries_pagination').html('');
        }
      }
  });
}
// --end->

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
            // <---OlD Chart---
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
             // --end-->
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
function tiles_click(div_id,prd_automatic_tile){
  if(prd_automatic_tile == true)
  {
    $('.'+div_id+'.product_automatic_tile').fadeIn("1000");
  }
  else{
    $('.'+div_id+'.tiles-click').fadeIn("1000");
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
$(document).on('click','.movetile .stretch-card',function(){


var id=$(this).attr('class');

id=id.split(" ")[0];
var classPrdAutomatic = $(this).hasClass('product_automatic_tile');
getDimentions(id,classPrdAutomatic);
setTimeout(function () {
  tile_prd_automatic = localStorage.getItem('tile_dashboard_prd_type_automatic');
  if(tile_prd_automatic != null && tile_prd_automatic != undefined && tile_prd_automatic == 'true')
  {
    $('.'+id+'.product_automatic_tile').removeClass('hide_table_main');
    $('.'+id+'.product_automatic_tile').removeClass('col-md-3');
    $('.'+id+'.product_automatic_tile').css('width',localStorage.getItem('width')+'px');
    $('.'+id+'.product_automatic_tile').css('height',localStorage.getItem('height')+'px');
    $('.'+id+'.product_automatic_tile .card-body').removeClass('row');
    $('.'+id+'.product_automatic_tile .card-body div:first-child').removeClass('col-md-12');
    $('.'+id+'.product_automatic_tile').parent('div').removeClass('col-md-3');
    setTimeout( ()=>{
      localStorage.removeItem('tile_dashboard_prd_type_automatic');
    },1500)
  }
  else{
    $('.'+id+'.tiles-click').removeClass('hide_table_main');
    $('.'+id+'.tiles-click').removeClass('col-md-3');

    // <---25-10-2021-----
    var expand_view = localStorage.getItem('expand_view');
    if(expand_view != null && expand_view != undefined && expand_view == "1"){
      var height_expand = localStorage.getItem('height')+'px';
      var width_expand = localStorage.getItem('width')+'px';
      $('.'+id+'.tiles-click').attr('style', "height: "+height_expand+" !important; width: "+width_expand+" !important;");
    }
    else{
      $('.'+id+'.tiles-click').css('width',localStorage.getItem('width')+'px');
      $('.'+id+'.tiles-click').css('height',localStorage.getItem('height')+'px');
    }
    // <---30-8-2021--
    $('.'+id+'.tiles-click .card-body').removeClass('row');
    // --end-->

    // <---03-9-2021--
    $('.'+id+'.tiles-click .card-body div:first-child').removeClass('col-md-12');
    // --end--->

    // <---22-9-2021---
    $('.'+id+'.tiles-click').parent('div').removeClass('col-md-3');
  }
    // ---end-->
},1000);

})
function getDimentions(id,classPrdAutomatic) {
    $.ajax({
        type : "POST",
        url : 'php/retreive.php',
        async: false,
        dataType: 'json',
        data: {
            action: "getDimentions",
            id: id,
            nameDB: $("#nameDashboardDB").val(),
            classPrdAutomatic : classPrdAutomatic
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
            // console.log(a.data.width);
          //  localStorage.setItem('width',a.data.width);
           localStorage.setItem('height',a.data.height);
           localStorage.setItem('expand_view',a.data.expand_view);
           
          //  <--25-10-2021---
            var input_width = a['data']['input_width'];

            var width_padding = '285';
            //Width Checks
            if(input_width == "1" || input_width <= "0"){
              width_padding = 285;
            }
            else if(input_width == "2"){
              width_padding = 600; //285 * 2 + 30 Padding
            }
            else if(input_width == "3"){
              width_padding = 915;
            }
            else if(input_width >= "4"){
              width_padding = 1230;
            }
            localStorage.setItem('width',width_padding);
            // --end-->

            // <---1-11-2021---
            var tileClickData = '';
            if(a['data']['outside_tile_checkbox'] == '1' && a['data']['tile_data_type'] == 'chart')
            {
              // Height Checks
              var outside_tile_height = '';
              var outside_tile_width = '';
              if(a['data']['outside_tile_input_height'] <= 1){
                outside_tile_height = 145;
              }
              else if(a['data']['outside_tile_input_height'] == 2){
                outside_tile_height = 290;
              }
              else if(a['data']['outside_tile_input_height'] == 3){
                outside_tile_height = 435;
              }
              else if(a['data']['outside_tile_input_height'] >= 4){
                outside_tile_height = 580;
              }

              // Width Checks
              if(a['data']['outside_tile_input_width'] <= 1){
                outside_tile_width = 285;
              }
              else if(a['data']['outside_tile_input_width'] == "2"){
                outside_tile_width = 600;
              }
              else if(a['data']['outside_tile_input_width'] == "3"){
                outside_tile_width = 915;
              }
              else if(a['data']['outside_tile_input_width'] >= "4"){
                outside_tile_width = 1230;
              }

              var arTileData = {'div_id' : id , 'outside_tile_height' : outside_tile_height , 'outside_tile_width' : outside_tile_width};
              localStorage.setItem('tile_click_data',JSON.stringify(arTileData));

              // <--comment code--
              // var input_width = a['data']['input_width'];
              // var input_height = a['data']['input_height'];

              // var act_width = '';
              // var act_height = '';
              // //Width Checks
              // if(input_width == "1" || input_width <= "0"){
              //   act_width = 285;
              // }
              // else if(input_width == "2"){
              //   act_width = 600;
              // }
              // else if(input_width == "3"){
              //   // value['tile_html']=value['tile_html'].replace("overflow-hide ml-3", "overflow-hide ml-3 overflow-margin-3");
              //   act_width = 915;
              // }
              // else if(input_width >= "4"){
              //   act_width = 1230;
              // }


              // // <---26-10-2021---  //Height Add Class in Overflow
              // if(input_height <= 1){
              //   act_height = 145;
              // }
              // if(input_height ==2){
              //   act_height = 290;
              // }
              // else if(input_height == 3){
              //   act_height = 435;
              // }
              // if(input_height >= 4){
              //   act_height = 580;
              // }
              // // --end-->
              // var arTileData = {'div_id' : id , 'outside_tile_height' : outside_tile_height , 'outside_tile_width' : outside_tile_width, 'act_height' :act_height ,'act_width' : act_width};
              // localStorage.setItem('tile_click_data',JSON.stringify(arTileData));
            }
            // ---end-->

          //  <---2-9-2021--
          // $('.chart-width canvas').attr('id','sales-chart-none');
          $('.chartjs-size-monitor').remove();
          var type_data_val = a['data']['tile_data_type'];
          if(type_data_val == "chart"){
            // $('.'+id+'.tiles-click .card-body').addClass('display-flex');
            // $('.'+id+'.tiles-click .card-body div:first-child').css('width','20%');
            // $('.'+id+'.tiles-click .card-body div:first-child').removeClass('col-md-12');
            // $('.'+id+'.tiles-click .card-body .ml-3').removeClass('overflow-hide');

            
            // <--6-10-2021--
            var chart_type = a['data']['chart_type'];
            var mst_id = a['data']['mst_id'];
            var chart_filter_value = a['data']['chart_filter'];
            var record_type_of_tile = a['data']['tile_record_type'];
            

            var tile_html = $('.'+id+'.tiles-click').html();
            if(chart_type == 'line_chart'){
              tile_html = tile_html.replace('lineChart-none','lineChart');
            }
            else if(chart_type == 'area_chart'){
              tile_html = tile_html.replace('areaChart-none','areaChart');
            }
            else if(chart_type == 'pie_chart'){
              tile_html = tile_html.replace('pieChart-none','pieChart');
            }
            else if(chart_type == 'bar_chart'){
              tile_html = tile_html.replace('barChart-none','barChart');
            }
            $('.'+id+'.tiles-click').html(tile_html);
            $('.dashboard_chart_tiles').html(''); //Add Chart Tiles Remove Other wise Chat not implemented
            // dashboardChart();
            if(record_type_of_tile == 'product')
            {
              var analgen_config_id = a['data']['prd_anlagen_config_id'];
              getClickDashboardChartProduct(id,record_type_of_tile,analgen_config_id,chart_filter_value,chart_type);
            }
            else{
              getClickDashboardChart(id,record_type_of_tile,mst_id,chart_filter_value,chart_type);
            }
            

            // <--23-11-2021---
            // console.log('working');
            // $('.tiles-click').dblclick(function(){
            //   alert('working');
              var pathname = window.location.pathname;
              var arPathname = pathname.split('/');
              if(arPathname.length > 3){
                  window.open('/'+arPathname[1]+'/dashboard/html/dashboard/chart_new.php','_blank');
              }
              else{
                  window.open('/dashboard/html/dashboard/chart_new.php','_blank');
              }
            // });
            // ---end-->
            // setTimeout( function(){
            //   $(document).on('dblclick','.'+id+'.tiles-click', function (){
            //     // $('.tiles-click').dblclick(function(){
            //     //   alert('working');
            //     var pathname = window.location.pathname;
            //     var arPathname = pathname.split('/');
            //     if(arPathname.length > 3){
            //         window.open('/'+arPathname[1]+'/dashboard/html/dashboard/chart_new.php','_blank');
            //     }
            //     else{
            //         window.open('/dashboard/html/dashboard/chart_new.php','_blank');
            //     }
            //   });
            // },1000);
             


           
          }
          else if(type_data_val == "overall_count"){
            var mst_id = a['data']['mst_id'];
            getTileClickOverAllCount(id,mst_id);
          }
          else if(type_data_val == "table"){
            // console.log(a['data']);
            if(a['data']['tile_record_type'] == 'product' && a['data']['table_other'] == 'true')
            {
              // localStorage.setItem('tile_dashboard_prd_type_automatic','true');
              getTableDashboardDataProductAutomatic(id,a['data']['query_data_records']);

               // <----30-12-2021---
              $('.'+id+'.tiles-click').dblclick(function(){
                // alert('Working');
                // <----17-11-2021---
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                if(arPathname.length > 3){
                    window.open('/'+arPathname[1]+'/dashboard/html/dashboard/chart_new.php','_blank');
                }
                else{
                    window.open('/dashboard/html/dashboard/chart_new.php','_blank');
                }
                // --end-->
              });
            // --end--->
            }
            else if(a['data']['tile_record_type'] == 'energy' && a['data']['table_other'] == 'SchichtModelleAll'){
              getTableDashboardDataEnergyLayer(id);

              $('.'+id+'.tiles-click').dblclick(function(){
                // alert('Working');
                // <----17-11-2021---
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                if(arPathname.length > 3){
                    window.open('/'+arPathname[1]+'/dashboard/html/dashboard/chart_new.php','_blank');
                }
                else{
                    window.open('/dashboard/html/dashboard/chart_new.php','_blank');
                }
                // --end-->
              });

            }
            else{
              getTableDashboardData(id);
                // <--23-11-2021---
              $('.'+id+'.tiles-click').dblclick(function(){
                // alert('Working');
                // <----17-11-2021---
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                if(arPathname.length > 3){
                    window.open('/'+arPathname[1]+'/dashboard/html/dashboard/chart_new.php','_blank');
                }
                else{
                    window.open('/dashboard/html/dashboard/chart_new.php','_blank');
                }
                // --end-->
              });
              // ---end-->
            }
            
          }
          // --show-->

        }
    });
}

function deleteTile(id_val,product_automatic_tile){
  var nameDb = '';
  if(product_automatic_tile == true)
  {
    nameDb = "gipscomm";
  }
  else{
    nameDb = $("#nameDashboardDB").val();
  }
  
  $.ajax({
    type : "POST",
    url : 'php/operations.php',
    async: false,
    dataType: 'json',
    data: {
        action: "deleteTile",
        id: id_val,
        nameDB: nameDb
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
        var table_length = $('.measurement_html_modal_'+i_val+' .save_table_div_show_table table tbody tr').length;
        $('.measurement_html_modal_'+i_val+' .count_result_tile').text(table_length+' Records');
      },1000);
      
      // $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+i_val).css('height',a['data']['height']);
      $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+i_val).css('width',a['data']['width']);
      $('#modal-height-input-measurement-hidden').val(a['data']['height']);
      $('#modal-width-input-measurement-hidden').val(a['data']['width']);
      (a['data']['input_height'] != 0) ? $('#modal-height-input-measurement').val(a['data']['input_height']) : $('#modal-height-input-measurement').val('');
      (a['data']['input_width'] != 0) ? $('#modal-width-input-measurement').val(a['data']['input_width']) : $('#modal-width-input-measurement').val('');

      $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+i_val+' .card-border').addClass('tile_border');
    }
  });

}

// <--24-11-2021--
function edit_tile_energy(type,edit_id){
  var i_val = localStorage.getItem('edit-i-value');
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var energy_title = ar['title_modal_tile'];
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditTilesEnergy",
        id: edit_id,
        type, type,
        i_value : i_val,
        energy_title : energy_title,
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      var i_val = localStorage.getItem('edit-i-value');

      $('.gernerated_energy_modal_tiles').html(a['tile_html']);
      setTimeout(()=>{
        var table_length = $('.energy_html_modal_'+i_val+' .save_table_div_show_table table tbody tr').length;
        $('.energy_html_modal_'+i_val+' .count_result_tile').text(table_length+' Records');
      },1000);
      
      // $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+i_val).css('height',a['data']['height']);
      $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+i_val).css('width',a['data']['width']);
      $('#modal-height-input-energy-hidden').val(a['data']['height']);
      $('#modal-width-input-energy-hidden').val(a['data']['width']);
      (a['data']['input_height'] != 0) ? $('#modal-height-input-energy').val(a['data']['input_height']) : $('#modal-height-input-energy').val('');
      (a['data']['input_width'] != 0) ? $('#modal-width-input-energy').val(a['data']['input_width']) : $('#modal-width-input-energy').val('');

      $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+i_val+' .card-border').addClass('tile_border');

    }
  });

}
// --end--->

// <--6-12-2021--
function edit_tile_product(type,edit_id){
  var i_val = localStorage.getItem('edit-i-value');
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var product_title = ar['title_modal_tile'];
  var product_type = $('#product_type').val();
  // if(product_type == 'automatic')
  // {
  //   edit_tile_product_automatic(type,edit_id);
  // }else{
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditTilesProduct",
        id: edit_id,
        type, type,
        i_value : i_val,
        product_title : product_title,
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      var i_val = localStorage.getItem('edit-i-value');

      $('.gernerated_product_modal_tiles').html(a['tile_html']);
      setTimeout(()=>{
        var table_length = $('.product_html_modal_'+i_val+' .save_table_div_show_table table tbody tr').length;
        $('.product_html_modal_'+i_val+' .count_result_tile').text(table_length+' Records');
      },1000);
      
      // $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      $('.gernerated_product_modal_tiles #product_count_tile_modal_'+i_val).css('height',a['data']['height']);
      $('.gernerated_product_modal_tiles #product_count_tile_modal_'+i_val).css('width',a['data']['width']);
      $('#modal-height-input-product-hidden').val(a['data']['height']);
      $('#modal-width-input-product-hidden').val(a['data']['width']);
      (a['data']['input_height'] != 0) ? $('#modal-height-input-product').val(a['data']['input_height']) : $('#modal-height-input-product').val('');
      (a['data']['input_width'] != 0) ? $('#modal-width-input-product').val(a['data']['input_width']) : $('#modal-width-input-product').val('');

      $('.gernerated_product_modal_tiles #product_count_tile_modal_'+i_val+' .card-border').addClass('tile_border');

    }
  });
  // }

}
// --end--->

// <----3-1-2022--
function edit_tile_product_automatic(type,edit_id){
  var i_val = localStorage.getItem('edit-i-value');
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var product_title = ar['title_modal_tile'];
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditTilesProductAutomatic",
        id: edit_id,
        type, type,
        i_value : i_val,
        product_title : product_title,
        nameDB: $("#nameDashboardDB").val()
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      var i_val = localStorage.getItem('edit-i-value');

      $('.gernerated_product_modal_tiles').html(a['tile_html']);
      setTimeout(()=>{
        var table_length = $('.product_html_modal_'+i_val+' .save_table_div_show_table table tbody tr').length;
        $('.product_html_modal_'+i_val+' .count_result_tile').text(table_length+' Records');
      },1000);
      
      // $('.gernerated_measurement_modal_tiles .count_result_tile').text(a['total_record']+' Records');
      $('.gernerated_product_modal_tiles #product_count_tile_modal_'+i_val).css('height',a['data']['height']);
      $('.gernerated_product_modal_tiles #product_count_tile_modal_'+i_val).css('width',a['data']['width']);
      $('#modal-height-input-product-hidden').val(a['data']['height']);
      $('#modal-width-input-product-hidden').val(a['data']['width']);
      (a['data']['input_height'] != 0) ? $('#modal-height-input-product').val(a['data']['input_height']) : $('#modal-height-input-product').val('');
      (a['data']['input_width'] != 0) ? $('#modal-width-input-product').val(a['data']['input_width']) : $('#modal-width-input-product').val('');

      $('.gernerated_product_modal_tiles #product_count_tile_modal_'+i_val+' .card-border').addClass('tile_border');

    }
  });

}
// --end--->

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

  $('.measurement_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');

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

        $('#save_tile_id').val(id);
        
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

// <----24-8-2021----
function updateTileRecordEnergy(){
  var id = localStorage.getItem('edit-measurement-tile');
  var input_height = $('#modal-height-input-energy').val();
  var input_width = $('#modal-width-input-energy').val();
  var height = $('#modal-height-input-energy-hidden').val();
  var width = $('#modal-width-input-energy-hidden').val();
  var table_other = $('#energy_record_table table tbody').children('tr:eq(0)').attr('data-table-other');

  // <---1-9-2021----
  var query_data = localStorage.getItem('query_data');

  var last_index_tile = $('#total_records').val();

  $('.energy_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');

  var tile_html = $('.energy_html_modal_'+last_index_tile).html();
  var tableHtml = $('.energy_html_modal_'+last_index_tile+' table').html();
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
        $('#energy_modal_loader_div').show();
        $('.energy_tile_modal .modal-content').css('opacity','0.8');

        $('#save_tile_id').val(id);
        
        setTimeout(() => {
          $('#dashboard_sidebar').click();
          $('#energy_modal_loader_div').hide();
          $('.energy_tile_modal .modal-content').css('opacity','1');
          $('.energy_tile_modal').modal('hide');
        }, 500);
      }
    });
  }

}

// <---6-12-2021---
function updateTileRecordProduct(){
  var id = localStorage.getItem('edit-measurement-tile');
  var input_height = $('#modal-height-input-product').val();
  var input_width = $('#modal-width-input-product').val();
  var height = $('#modal-height-input-product-hidden').val();
  var width = $('#modal-width-input-product-hidden').val();
  var table_other = $('#product_select_table_entries_table_div table tbody').children('tr:eq(0)').attr('data-table-other');

  // <---1-9-2021----
  var query_data = localStorage.getItem('query_data');

  var last_index_tile = $('#total_records').val();

  $('.product_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');

  var tile_html = $('.product_html_modal_'+last_index_tile).html();
  var tableHtml = $('.product_html_modal_'+last_index_tile+' table').html();
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
        $('#product_modal_loader_div').show();
        $('.product_tile_modal .modal-content').css('opacity','0.8');

        $('#save_tile_id').val(id);
        
        setTimeout(() => {
          $('#dashboard_sidebar').click();
          $('#product_modal_loader_div').hide();
          $('.product_tile_modal .modal-content').css('opacity','1');
          $('.product_tile_modal').modal('hide');
        }, 500);
      }
    });
  }

}
// --end--->

// <---3-1-2022--
function updateTileRecordProductAutomatic(){
  var id = localStorage.getItem('edit-measurement-tile');
  var input_height = $('#modal-height-input-product').val();
  var input_width = $('#modal-width-input-product').val();
  var height = $('#modal-height-input-product-hidden').val();
  var width = $('#modal-width-input-product-hidden').val();
  var table_other = $('#product_select_table_entries_table_div table tbody').children('tr:eq(0)').attr('data-table-other');

  // <---1-9-2021----
  var query_data = localStorage.getItem('query_data');

  var last_index_tile = $('#total_records').val();

  $('.product_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');

  var tile_html = $('.product_html_modal_'+last_index_tile).html();
  var tableHtml = $('.product_html_modal_'+last_index_tile+' table').html();
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

  // <---3-1-2022---
  var prd_all_columns_automatic = $('#all_columns_product').val();
  var columnDataType = [];
  $('#all_columns_product option:selected').each(function(){
    var value =$(this).attr('data-type');
    columnDataType.push(value)
  });

  var db_table = $('#all_tables_product').val();
  // --end--->

  if(id != null && id != undefined){
    $.ajax({
      type : "POST",
      url : 'php/operations.php',
      async: false,
      dataType: 'json',
      data: {
          action: "updateTileRecordProductAutomatic",
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
          nameDB: $("#nameDashboardDB").val(),
          prd_all_columns_automatic : JSON.stringify(prd_all_columns_automatic),
          columnDataType : JSON.stringify(columnDataType),
          db_table : db_table
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        $('#product_modal_loader_div').show();
        $('.product_tile_modal .modal-content').css('opacity','0.8');

        // $('#save_tile_id_automatic').val(id);
        $('#save_tile_id').val(id);
        
        setTimeout(() => {
          $('#dashboard_sidebar').click();
          $('#product_modal_loader_div').hide();
          $('.product_tile_modal .modal-content').css('opacity','1');
          $('.product_tile_modal').modal('hide');
        }, 500);
      }
    });
  }

}
// --end-->

function getEditDataDashboard(id,i_value,product_automatic_tile = false){
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditDataDashboard",
        id: id,
        nameDB: $("#nameDashboardDB").val(),
        product_automatic_tile : product_automatic_tile
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
        if(val['tile_data_type'] == "chart"){
          $('#save_and_proceed_btn_dashboard').attr('data-edit-chart','true');
        }
        else{
          $('#save_and_proceed_btn_dashboard').attr('data-edit','true');
        }
        $("#type_data_tile").attr('disabled','disabled');
        
        // val['tile_record_type'] == 'product' && val['table_other'] == 'true'
        if(val['tile_record_type'] == 'product' && val['table_other'] == 'true')
        {
          $("#record_type_of_tile").attr('disabled','disabled');
          $("#product_type option[value='automatic']").prop('selected','selecetd');
          $("#product_type").attr('disabled','disabled');
          $('#edit_product_tile_automatic').attr('db_name',val['database_name']);
          $('#edit_product_tile_automatic').attr('db_table',val['database_table']);
          $('#edit_product_tile_automatic').attr('all_column',JSON.stringify(a['all_columns']));
          $('#edit_tile_click_manually').attr('data_click','false');
        }
        else{
          $("#record_type_of_tile").removeAttr('disabled');
          $("#product_type").attr('disabled','disabled');
          $('#edit_product_tile_automatic').attr('db_name','');
          $('#edit_product_tile_automatic').attr('db_table','');
          $('#edit_product_tile_automatic').attr('all_column','');
          $('#edit_tile_click_manually').attr('data_click','true');
        }
      });
    }
  });

}

// <--2-9-2021---
function getChartTileDashboard(){
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var record_type_of_tile = ar['record_type_of_tile'];
  $('#dashboard_loader_div').show();
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        measurement_title : ar['title_modal_tile'],
        action: "getChartDataDashboard",
        record_type_of_tile : record_type_of_tile,
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

// <--7-10-02021----
function getEditChartTileDashboard(){
  var ar = localStorage.getItem('dashboard_tile_data');
  var id = localStorage.getItem('edit-measurement-tile');
  var i_value = localStorage.getItem('edit-i-value');
  ar = JSON.parse(ar);
  $('#dashboard_loader_div').show();
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditChartDataDashboard",
        nameDB: $("#nameDashboardDB").val(),
        measurement_title : ar['title_modal_tile'],
        id : id,
        i_value : i_value
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('.dashboard_chart_tiles').html(a['tile_html']);
      $("#time_interval_chart option[value='"+a.chart_time_interval+"']").prop('selected','selected');
      getChartTimeIntervalRecord();
      // var chart_records = $('#chart_records').val();
      setTimeout(()=>{
          $("#chart_records option[value='"+a.mst_id+"']").prop('selected','selected');
          $("#chart_record_filter option[value='"+a.chart_filter+"']").prop('selected','selected');
          $("#chart_type option[value='"+a.chart_type+"']").prop('selected','selected');
          $('#measurement-height-chart').val(a.data['input_height']);
          $('#measurement-height-chart-hidden').val(a.data['height']);
          $('#measurement-width-chart').val(a.data['input_width']);
          $('#measurement-width-chart-hidden').val(a.data['width']);
          $('#measurement_count_tile_modal_chart_'+i_value).css('height',a['data']['height']);
          $('#measurement_count_tile_modal_chart_'+i_value).css('width',a['data']['width']);

          $('#chart_outer_table_limit_column').val(a['data']['outer_table_column_limit']);

          // <---
          
          $('.dashboard_chart_tile_html_'+i_value+' #measurement_count_tile_modal_chart_'+i_value+' .card-border').addClass('tile_border');
          $('.dashboard_chart_outer_tile_html_'+i_value+' #measurement_count_outer_tile_modal_chart_'+i_value+' .card-border').addClass('tile_border');

          // 1-11-2021---
          if(a['data']['outside_tile_checkbox'] == 1 && a['data']['tile_data_type'] == "chart"){
            var outside_tile_height = '';
            var outside_tile_width = '';
            // Height Checks
            if(a['data']['outside_tile_input_height'] <= 1){
                outside_tile_height = 145;
            }
            else if(a['data']['outside_tile_input_height'] == 2){
              outside_tile_height = 290;
            }
            else if(a['data']['outside_tile_input_height'] == 3){
              outside_tile_height = 435;
            }
            else if(a['data']['outside_tile_input_height'] >= 4){
              outside_tile_height = 580;
            }

            // Width Checks
            if(a['data']['outside_tile_input_width'] <= 1){
              outside_tile_width = 285;
            }
            else if(a['data']['outside_tile_input_width'] == "2"){
              outside_tile_width = 570;
            }
            else if(a['data']['outside_tile_input_width'] == "3"){
              outside_tile_width = 855;
            }
            else if(a['data']['outside_tile_input_width'] >= "4"){
              outside_tile_width = 1140;
            }
            $('#measurement_count_outer_tile_modal_chart_'+i_value).css('height',outside_tile_height);
            $('#measurement_count_outer_tile_modal_chart_'+i_value).css('width',outside_tile_width);

          }
          
          // --end-->
          chartRecordFilter();
      },200);
      // <---21-10-2021--
      if(a['data']['expand_view'] == 1){
        $('#expand_view_chart').prop('checked',true);
        $('#expand_view_chart').val('1');
      }
      else if(a['data']['outside_tile_checkbox'] == 1)
      {
        $('#chart_outside_tile_structure').prop('checked',true);
        $('#chart_outside_tile_structure').val('1');

        $('.chart_outisde_tile_controls').show();
        a['data']['outside_tile_input_height'] != 0 ? $('#chart_height_outer_structure').val(a['data']['outside_tile_input_height']) : $('#chart_height_outer_structure').val('');
        a['data']['outside_tile_input_width'] != 0  ? $('#chart_width_outer_structure').val(a['data']['outside_tile_input_width']) : $('#chart_width_outer_structure').val('');
      }
      else{
        $('#expand_view_chart').prop('checked',false);
        $('#expand_view_chart').val('0');

        $('#chart_outside_tile_structure').prop('checked',false);
        $('#chart_outside_tile_structure').val('0');

        $('.chart_outisde_tile_controls').hide();
        $('#chart_height_outer_structure').val('');
        $('#chart_width_outer_structure').val('');
      }
      // --end-->
      
    }
  });
}
// --end-->

// <---25-11-2021---
function getEditChartTileDashboardEnergy(){
  var ar = localStorage.getItem('dashboard_tile_data');
  var id = localStorage.getItem('edit-measurement-tile');
  var i_value = localStorage.getItem('edit-i-value');
  ar = JSON.parse(ar);
  $('#dashboard_loader_div').show();
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditChartDataDashboardEnergy",
        nameDB: $("#nameDashboardDB").val(),
        energy_title : ar['title_modal_tile'],
        id : id,
        i_value : i_value
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('.dashboard_chart_tiles').html(a['tile_html']);
      $("#time_interval_chart option[value='"+a.chart_time_interval+"']").prop('selected','selected');
      getChartTimeIntervalRecord();
      // var chart_records = $('#chart_records').val();
      setTimeout(()=>{
          $("#chart_records option[value='"+a.mst_id+"']").prop('selected','selected');
          $("#chart_record_filter option[value='"+a.chart_filter+"']").prop('selected','selected');
          $("#chart_type option[value='"+a.chart_type+"']").prop('selected','selected');
          $('#measurement-height-chart').val(a.data['input_height']);
          $('#measurement-height-chart-hidden').val(a.data['height']);
          $('#measurement-width-chart').val(a.data['input_width']);
          $('#measurement-width-chart-hidden').val(a.data['width']);
          $('#measurement_count_tile_modal_chart_'+i_value).css('height',a['data']['height']);
          $('#measurement_count_tile_modal_chart_'+i_value).css('width',a['data']['width']);

          $('#chart_outer_table_limit_column').val(a['data']['outer_table_column_limit']);

          // <---
          
          $('.dashboard_chart_tile_html_'+i_value+' #energy_count_tile_modal_chart_'+i_value+' .card-border').addClass('tile_border');
          $('.dashboard_chart_outer_tile_html_'+i_value+' #energy_count_outer_tile_modal_chart_'+i_value+' .card-border').addClass('tile_border');

          // 1-11-2021---
          if(a['data']['outside_tile_checkbox'] == 1 && a['data']['tile_data_type'] == "chart"){
            var outside_tile_height = '';
            var outside_tile_width = '';
            // Height Checks
            if(a['data']['outside_tile_input_height'] <= 1){
                outside_tile_height = 145;
            }
            else if(a['data']['outside_tile_input_height'] == 2){
              outside_tile_height = 290;
            }
            else if(a['data']['outside_tile_input_height'] == 3){
              outside_tile_height = 435;
            }
            else if(a['data']['outside_tile_input_height'] >= 4){
              outside_tile_height = 580;
            }

            // Width Checks
            if(a['data']['outside_tile_input_width'] <= 1){
              outside_tile_width = 285;
            }
            else if(a['data']['outside_tile_input_width'] == "2"){
              outside_tile_width = 570;
            }
            else if(a['data']['outside_tile_input_width'] == "3"){
              outside_tile_width = 855;
            }
            else if(a['data']['outside_tile_input_width'] >= "4"){
              outside_tile_width = 1140;
            }
            $('#energy_count_outer_tile_modal_chart_'+i_value).css('height',outside_tile_height);
            $('#energy_count_outer_tile_modal_chart_'+i_value).css('width',outside_tile_width);

          }
          
          // --end-->
          chartRecordFilter();
      },200);
      // <---21-10-2021--
      if(a['data']['expand_view'] == 1){
        $('#expand_view_chart').prop('checked',true);
        $('#expand_view_chart').val('1');
      }
      else if(a['data']['outside_tile_checkbox'] == 1)
      {
        $('#chart_outside_tile_structure').prop('checked',true);
        $('#chart_outside_tile_structure').val('1');

        $('.chart_outisde_tile_controls').show();
        a['data']['outside_tile_input_height'] != 0 ? $('#chart_height_outer_structure').val(a['data']['outside_tile_input_height']) : $('#chart_height_outer_structure').val('');
        a['data']['outside_tile_input_width'] != 0  ? $('#chart_width_outer_structure').val(a['data']['outside_tile_input_width']) : $('#chart_width_outer_structure').val('');
      }
      else{
        $('#expand_view_chart').prop('checked',false);
        $('#expand_view_chart').val('0');

        $('#chart_outside_tile_structure').prop('checked',false);
        $('#chart_outside_tile_structure').val('0');

        $('.chart_outisde_tile_controls').hide();
        $('#chart_height_outer_structure').val('');
        $('#chart_width_outer_structure').val('');
      }
      // --end-->
      
    }
  });
}
// ---end--.>

// <---9-12-2021--
function getEditChartTileDashboardProduct(){
  var ar = localStorage.getItem('dashboard_tile_data');
  var id = localStorage.getItem('edit-measurement-tile');
  var i_value = localStorage.getItem('edit-i-value');
  ar = JSON.parse(ar);
  $('#dashboard_loader_div').show();
  $.ajax({
    type : "POST",
    url : 'php/retreive.php',
    async: false,
    dataType: 'json',
    data: {
        action: "getEditChartDataDashboardProduct",
        nameDB: $("#nameDashboardDB").val(),
        product_title : ar['title_modal_tile'],
        id : id,
        i_value : i_value
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('.dashboard_chart_tiles').html(a['tile_html']);
      getChartTimeIntervalRecordProduct();
      // var chart_records = $('#chart_records').val();
      setTimeout(()=>{
          $("#chart_records_product option[value='"+a.prd_id+"']").prop('selected','selected');
          getChartSelectProductItem();
          $("#chart_records_product_item option[value='"+a.analgen_config_id+"']").prop('selected','selected');
          $("#chart_record_filter option[value='"+a.chart_filter+"']").prop('selected','selected');
          $("#chart_type option[value='"+a.chart_type+"']").prop('selected','selected');
          $('#measurement-height-chart').val(a.data['input_height']);
          $('#measurement-height-chart-hidden').val(a.data['height']);
          $('#measurement-width-chart').val(a.data['input_width']);
          $('#measurement-width-chart-hidden').val(a.data['width']);
          $('#measurement_count_tile_modal_chart_'+i_value).css('height',a['data']['height']);
          $('#measurement_count_tile_modal_chart_'+i_value).css('width',a['data']['width']);

          $('#chart_outer_table_limit_column').val(a['data']['outer_table_column_limit']);

          // <---
          
          $('.dashboard_chart_tile_html_'+i_value+' #product_count_tile_modal_chart_'+i_value+' .card-border').addClass('tile_border');
          $('.dashboard_chart_outer_tile_html_'+i_value+' #product_count_outer_tile_modal_chart_'+i_value+' .card-border').addClass('tile_border');

          // 1-11-2021---
          if(a['data']['outside_tile_checkbox'] == 1 && a['data']['tile_data_type'] == "chart"){
            var outside_tile_height = '';
            var outside_tile_width = '';
            // Height Checks
            if(a['data']['outside_tile_input_height'] <= 1){
                outside_tile_height = 145;
            }
            else if(a['data']['outside_tile_input_height'] == 2){
              outside_tile_height = 290;
            }
            else if(a['data']['outside_tile_input_height'] == 3){
              outside_tile_height = 435;
            }
            else if(a['data']['outside_tile_input_height'] >= 4){
              outside_tile_height = 580;
            }

            // Width Checks
            if(a['data']['outside_tile_input_width'] <= 1){
              outside_tile_width = 285;
            }
            else if(a['data']['outside_tile_input_width'] == "2"){
              outside_tile_width = 570;
            }
            else if(a['data']['outside_tile_input_width'] == "3"){
              outside_tile_width = 855;
            }
            else if(a['data']['outside_tile_input_width'] >= "4"){
              outside_tile_width = 1140;
            }
            $('#product_count_outer_tile_modal_chart_'+i_value).css('height',outside_tile_height);
            $('#product_count_outer_tile_modal_chart_'+i_value).css('width',outside_tile_width);

          }
          
          // --end-->
          chartRecordFilterProduct();
      },200);
      // <---21-10-2021--
      if(a['data']['expand_view'] == 1){
        $('#expand_view_chart').prop('checked',true);
        $('#expand_view_chart').val('1');
      }
      else if(a['data']['outside_tile_checkbox'] == 1)
      {
        $('#chart_outside_tile_structure').prop('checked',true);
        $('#chart_outside_tile_structure').val('1');

        $('.chart_outisde_tile_controls').show();
        a['data']['outside_tile_input_height'] != 0 ? $('#chart_height_outer_structure').val(a['data']['outside_tile_input_height']) : $('#chart_height_outer_structure').val('');
        a['data']['outside_tile_input_width'] != 0  ? $('#chart_width_outer_structure').val(a['data']['outside_tile_input_width']) : $('#chart_width_outer_structure').val('');
      }
      else{
        $('#expand_view_chart').prop('checked',false);
        $('#expand_view_chart').val('0');

        $('#chart_outside_tile_structure').prop('checked',false);
        $('#chart_outside_tile_structure').val('0');

        $('.chart_outisde_tile_controls').hide();
        $('#chart_height_outer_structure').val('');
        $('#chart_width_outer_structure').val('');
      }
      // --end-->
      
    }
  });
}
// ---end--->

// <---02-9-2021----
function saveDashboardTileChart(){
  var chart_records = $('#chart_records').val();
  var chart_record_filter = $('#chart_record_filter').val();
  //console.log('chart_recorda Value ',chart_records);
  //console.log('chart_recorda Filter ',chart_record_filter);
  if(chart_records == '' || chart_record_filter == ''){
      return false;
  }
  $('.small-table').attr('style','display:block');
  var chart_type = $('#chart_type').val();
  var measuremnt_table_height = $('#measurement-height-chart-hidden').val();
  var measurement_table_width = $('#measurement-width-chart-hidden').val();
  var input_height = $('#measurement-height-chart').val(); 
  var input_width = $('#measurement-width-chart').val();
  var chart_outer_table_limit_column  = $('#chart_outer_table_limit_column').val();
  
  //<--23-8-2021---
  var last_index_tile = $('#total_records_chart').val();
  // var table_length = $('.measurement_html_modal_'+last_index_tile+' table tbody tr').length;
  // $('.measurement_html_modal_'+last_index_tile+' .count_result_tile').text(table_length+' Records');
  
  //-- 2-11-2021--
  $('.dashboard_chart_tile_html_'+last_index_tile+' .card-border').removeClass('tile_border');
  // -end-->
  
  var tile_html = $('.dashboard_chart_tile_html_'+last_index_tile).html();
  $('#total_records_chart').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');

  var expand_view = $('#expand_view_chart').val();

  // <---6-10-2021--
  if(chart_type == "line_chart"){
    tile_html = tile_html.replace("lineChart",'lineChart-none');  
  }
  else if(chart_type == "area_chart"){
    tile_html = tile_html.replace("areaChart",'areaChart-none');
  }
  else if(chart_type == "pie_chart"){
    tile_html = tile_html.replace("pieChart",'pieChart-none');
  }
  else if(chart_type == "bar_chart"){
    tile_html = tile_html.replace("barChart",'barChart-none');
  }
  var chart_time_interval = $('#time_interval_chart').val();
  // --end->
  // console.log(tile_html);
  // return false;

  // <----01-9-2021---
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];
    // --end->
  // console.log('mst_id',chart_records);
  // console.log('Chart_type',chart_type);
  // console.log('chart_record_filter',chart_record_filter);

  // <----1-11-2021--
  var outside_chart_checkbox = $('#chart_outside_tile_structure').val();
  var outside_chart_input_height =  $('#chart_height_outer_structure').val();
  var outside_chart_input_width = $('#chart_width_outer_structure').val();

  var outside_chart_display  = $('#display_chart_outside_tile').val();

  if(outside_chart_checkbox == 0){
    outside_chart_input_height = '';
    outside_chart_input_width = '';
  }
  // -end---->
  // <--25-11-2021--
  var type_tile = '';
  if(record_type_of_tile == 'measurement')
  {
    type_tile = "Measurement";
  }
  else if(record_type_of_tile == 'energy')
  {
    type_tile = "Energy";
  }
  // --end-->

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
        type_data_tile : type_data_tile,
        mst_id : chart_records,
        chart_record_filter : chart_record_filter,
        chart_type : chart_type,
        chart_time_interval : chart_time_interval,
        expand_view : expand_view,
        outside_chart_checkbox : outside_chart_checkbox,
        outside_chart_input_height : outside_chart_input_height,
        outside_chart_input_width : outside_chart_input_width,
        outside_chart_display : outside_chart_display,
        chart_outer_table_limit_column : chart_outer_table_limit_column,
        type : type_tile
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div_chart').show();
      $('#dashboard_tile_modal_chart .modal-content').css('opacity','0.8');

      $('#expand_view_chart').prop('checked',false);
      $('#expand_view_chart').val('0');
      $('#save_tile_id').val(a['max_id'][0]['max_id']);
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div_chart').hide();
        $('#dashboard_tile_modal_chart .modal-content').css('opacity','1');
        $('#dashboard_tile_modal_chart').modal('hide');
        // window.location.reload();
        // <---12-11-2021--
        // $('#save_position_tile').trigger('click');
        // --end--->
      }, 500);
      // $('#save_position_tile').attr('btn_click','chart');
    }
  });
}

// --end-->

// <----8-12-2021--
function saveDashboardTileChartProduct(){
  var chart_records_product = $('#chart_records_product').val();
  var analgen_config_id = $('#chart_records_product_item').val();
  var chart_record_filter = $('#chart_record_filter').val();
  //console.log('chart_recorda Value ',chart_records);
  //console.log('chart_recorda Filter ',chart_record_filter);
  if(chart_records_product == '' || analgen_config_id == '' || chart_record_filter == ''){
      return false;
  }
  $('.small-table').attr('style','display:block');
  var chart_type = $('#chart_type').val();
  var measuremnt_table_height = $('#measurement-height-chart-hidden').val();
  var measurement_table_width = $('#measurement-width-chart-hidden').val();
  var input_height = $('#measurement-height-chart').val(); 
  var input_width = $('#measurement-width-chart').val();
  var chart_outer_table_limit_column  = $('#chart_outer_table_limit_column').val();
  
  var last_index_tile = $('#total_records_chart').val();
  
  $('.dashboard_chart_tile_html_'+last_index_tile+' .card-border').removeClass('tile_border');
  
  var tile_html = $('.dashboard_chart_tile_html_'+last_index_tile).html();
  $('#total_records_chart').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');

  var expand_view = $('#expand_view_chart').val();

  if(chart_type == "line_chart"){
    tile_html = tile_html.replace("lineChart",'lineChart-none');  
  }
  else if(chart_type == "area_chart"){
    tile_html = tile_html.replace("areaChart",'areaChart-none');
  }
  else if(chart_type == "pie_chart"){
    tile_html = tile_html.replace("pieChart",'pieChart-none');
  }
  else if(chart_type == "bar_chart"){
    tile_html = tile_html.replace("barChart",'barChart-none');
  }

  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];

  var outside_chart_checkbox = $('#chart_outside_tile_structure').val();
  var outside_chart_input_height =  $('#chart_height_outer_structure').val();
  var outside_chart_input_width = $('#chart_width_outer_structure').val();

  var outside_chart_display  = $('#display_chart_outside_tile').val();

  if(outside_chart_checkbox == 0){
    outside_chart_input_height = '';
    outside_chart_input_width = '';
  }
  var type_tile = 'Product';

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
        type_data_tile : type_data_tile,
        chart_record_filter : chart_record_filter,
        chart_type : chart_type,
        expand_view : expand_view,
        outside_chart_checkbox : outside_chart_checkbox,
        outside_chart_input_height : outside_chart_input_height,
        outside_chart_input_width : outside_chart_input_width,
        outside_chart_display : outside_chart_display,
        chart_outer_table_limit_column : chart_outer_table_limit_column,
        type : type_tile,
        analgen_config_id : analgen_config_id
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div_chart').show();
      $('#dashboard_tile_modal_chart .modal-content').css('opacity','0.8');

      $('#expand_view_chart').prop('checked',false);
      $('#expand_view_chart').val('0');
      $('#save_tile_id').val(a['max_id'][0]['max_id']);
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div_chart').hide();
        $('#dashboard_tile_modal_chart .modal-content').css('opacity','1');
        $('#dashboard_tile_modal_chart').modal('hide');
        // window.location.reload();
        // <---12-11-2021--
        // $('#save_position_tile').trigger('click');
        // --end--->
      }, 500);
      // $('#save_position_tile').attr('btn_click','chart');
    }
  });
}
// --end--->

// <----3-9-2021---
function getChartTimeIntervalRecord(){
 var time_interval = $('#time_interval_chart').val();
 var arDashboard = localStorage.getItem('dashboard_tile_data');
 arDashboard = JSON.parse(arDashboard);
 var record_type_of_tile_set = arDashboard['record_type_of_tile'];
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getChartTimeIntervalRecord",
        nameDB: $("#nameDashboardDB").val(),
        time_interval:time_interval,
        record_type_of_tile : record_type_of_tile_set
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      var select_html = '';
      if(a != ''){
        if(a['table_found'] == 'false')
        {
          select_html="<option value=''>Table Not Found</option>";
        }
        else if(a['data'] != '')
        {
          var ar = localStorage.getItem('dashboard_tile_data');
          ar = JSON.parse(ar);
          var record_type_of_tile = ar['record_type_of_tile'];
          select_html+="<option value=''>Select "+record_type_of_tile+"</option>";
          if(record_type_of_tile == 'measurement' && a['data'].length > 0){
            a['data'].forEach((val)=>{
              select_html+="<option value='"+val['mst_ID']+"' type='"+val['iBdeType']+"' total_value='"+val['val']+"'>"+val['mstIMw']+"</option>";
            });
          }
          else if(record_type_of_tile == 'energy' && a['data'].length > 0){
            a['data'].forEach((val)=>{
              select_html+="<option value='"+val['mst_ID']+"' type='2' total_value='"+val['val']+"'>"+val['nameMST']+"</option>";
            });
          }
          $('#chart_record_filter_div').show();
          $('#chart_record_type_div').show();
          $("#chart_record_filter option[value='']").prop('selected','selected');
          $('#save_and_proceed_btn_dashboard_chart').attr('disabled',false);
        }
      }
      else{
        select_html+="<option value=''>No Record Found</option>";
        $('#chart_record_filter_div').hide();
        $('#chart_record_type_div').hide();
        $('#save_and_proceed_btn_dashboard_chart').attr('disabled',true);
      }
      $('#chart_records').html(select_html);
    }
  });
}
// --end-->

// <----07-12-2021--
function getChartTimeIntervalRecordProduct(){
  var arDashboard = localStorage.getItem('dashboard_tile_data');
  arDashboard = JSON.parse(arDashboard);
  var record_type_of_tile_set = arDashboard['record_type_of_tile'];
   $.ajax({
     type: "POST",
     url: "php/retreive.php",
     async: false,
     dataType: 'json',
     data: {
         action: "getChartTimeIntervalRecordProduct",
         nameDB: $("#nameDashboardDB").val(),
         record_type_of_tile : record_type_of_tile_set
     },
     fail: function() {
         alert("failed!!")
     },
     success: function(a) {
       var select_html = '';
       if(a != ''){
        if(a['table_found'] == 'false')
        {
          select_html="<option value=''>Table Not Found</option>";
        }
        else if(a['data'] != '' && a['data'].length > 0)
        {
         var ar = localStorage.getItem('dashboard_tile_data');
         ar = JSON.parse(ar);
         var record_type_of_tile = ar['record_type_of_tile'];
         select_html+="<option value=''>Select "+record_type_of_tile+"</option>";
         a['data'].forEach((val)=>{
            select_html+="<option value='"+val['prd_id']+"' type='"+val['iBdeType']+"'>"+val['namePrd']+"</option>";
         });
         $('#chart_record_filter_div').show();
         $('#chart_record_type_div').show();
         $("#chart_record_filter option[value='']").prop('selected','selected');
         $("#chart_records_product_item option[value='']").prop('selected','selected');
         $('#save_and_proceed_btn_dashboard_chart').attr('disabled',false);
        }
       }
       else{
         select_html+="<option value=''>No Record Found</option>";
         $('#chart_record_filter_div').hide();
         $('#chart_record_type_div').hide();
         $('#save_and_proceed_btn_dashboard_chart').attr('disabled',true);
       }
       $('#chart_records_product').html(select_html);
     }
   });
 }


 function getChartSelectProductItem(){
  var prd_id = $('#chart_records_product').val();
  var arDashboard = localStorage.getItem('dashboard_tile_data');
  arDashboard = JSON.parse(arDashboard);
  var record_type_of_tile_set = arDashboard['record_type_of_tile'];
   $.ajax({
     type: "POST",
     url: "php/retreive.php",
     async: false,
     dataType: 'json',
     data: {
         action: "getChartSelectProductItem",
         nameDB: $("#nameDashboardDB").val(),
         record_type_of_tile : record_type_of_tile_set,
         prd_id : prd_id
     },
     fail: function() {
         alert("failed!!")
     },
     success: function(a) {
       var select_html = '';
       if(a != ''){
         select_html+="<option value=''>Select Item</option>";
         a.forEach((val)=>{
            select_html+="<option value='"+val['iBdePrdktConf_ID']+"' total_value='"+val['val']+"'>"+val['bezeichnungAnl']+"</option>";
         });
         $('#chart_record_filter_div').show();
         $('#chart_record_type_div').show();
         $("#chart_record_filter option[value='']").prop('selected','selected');
         $('#save_and_proceed_btn_dashboard_chart').attr('disabled',false);
       }
       else{
         select_html+="<option value=''>No Record Found</option>";
         $('#chart_record_filter_div').hide();
         $('#chart_record_type_div').hide();
         $('#save_and_proceed_btn_dashboard_chart').attr('disabled',true);
         var html_canvas_chart = "<canvas></canvas>";
         var div_i_id = $('#total_records_chart').val();
         $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
         $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
       }
       $('#chart_records_product_item').html(select_html);
     }
   });
 }
//  ---end--->


// <----6-9-2021---
function chartRecordFilter(){
  var dashboard_tile_data = JSON.parse(localStorage.getItem('dashboard_tile_data'));
  var record_type_of_tile = dashboard_tile_data['record_type_of_tile'];
  if(record_type_of_tile == 'product')
  { 
    chartRecordFilterProduct();
    return false;
  }

  var filterVal = $('#chart_record_filter').val();
  var mst_id = $('#chart_records').val();
  var mst_value = $("#chart_records option:selected").text();
  var mst_input_value = $('#total_records_chart').val();
  var chart_type = $('#chart_type').val();
  var mst_check = $('#save_and_proceed_btn_dashboard').val();

  var time_interval_value  = $('#time_interval_chart').val();
  if(mst_check == 'Update & Proceed'){
    $('.chart_text_edit_' + mst_input_value).text(mst_value+'('+filterVal+' Days)');
  }else{
    $('.chart_text_' + mst_input_value).text(mst_value+'('+filterVal+' Days)');
  }
  var chart_outer_table_limit_column = $('#chart_outer_table_limit_column').val();
  if(filterVal != '' && mst_id != '' && mst_id != null){
    var type = $('#chart_records option:selected').attr('type');
    $('#measurement_modal_loader_div_chart').show();
    $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "getChartRecordFilter",
          nameDB: $("#nameDashboardDB").val(),
          mst_id:mst_id,
          type : type,
          filterVal : filterVal,
          record_type_of_tile : record_type_of_tile,
          chart_outer_table_limit_column : chart_outer_table_limit_column
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        // $('#td_text_' + mst_input_value).text(mst_value);
        // $('#td_two_text_' + mst_input_value).text(a['count_val'][9]);
        // $('#td_outer_tile_two_text_' + mst_input_value).text(a['count_val'][9]); //<----29-10-2021--

        // <---11-11-2021---
        if(a['count_sum'] != ''){
          $('#td_two_text_' + mst_input_value).text(a['count_sum']);
          $('#td_outer_tile_two_text_' + mst_input_value).text(a['count_sum']);
        }
        // --end-->

        // <---20-10-2021---
        if(a['countDate'] != ''){
          if(a['countDate'][0]['type'] == "2"){ //Week Case
            $('#td_text_' + mst_input_value).text(a['countDate'][0]['on_week']+'-'+a['countDate'][0]['on_date']);
            $('#td_outer_tile_text_' + mst_input_value).text(a['countDate'][0]['on_week']+'-'+a['countDate'][0]['on_date']);
          }
          else{
            $('#td_text_' + mst_input_value).text(a['countDate'][0]['on_date']);
            $('#td_outer_tile_text_' + mst_input_value).text(a['countDate'][0]['on_date']);
          }
        } 
        // --end-->

        // <---12-11-2021--
        $('#measurement_modal_loader_div_chart').hide();
        var div_id_html = $('#total_records_chart').val();
        $('.dashboard_chart_tile_html_'+div_id_html+' .small-table table tbody').html(a['outer_table_html']);
        $('.dashboard_chart_outer_tile_html_'+div_id_html+' .small-table table tbody').html(a['outer_table_html']);
        // -end--->

        if(chart_type == "line_chart"){
          var html_canvas_chart = "<canvas id='lineChart'></canvas>";
          var div_i_id = $('#total_records_chart').val();
          $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
          $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

          // <--24-11-2021---
          $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
          $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
          // --end-->

          var html_chart_outer_tile = "<div id='chart_outer_tile_div'><canvas id='lineChartOutSideTile'></canvas></div>";
          $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
          $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_chart_outer_tile);

          var data = {
            labels: a['count_days'],
            datasets: [{
              label: 'Consumption',
              data: a['count_val'],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              fill: false
            }]
          };

          var options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
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
        
          };

          if ($("#lineChart").length) {
            var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, {
              type: 'line',
              data: data,
              options: options
            });
          }

          if ($("#lineChartOutSideTile").length) {
            var lineChartCanvas = $("#lineChartOutSideTile").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, {
              type: 'line',
              data: data,
              options: options
            });
          }

        }
        else if (chart_type == "area_chart"){
        var html_canvas_chart = "<canvas id='areaChart'></canvas>";
        var div_i_id = $('#total_records_chart').val();
        $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

        // <---25-11-2021---
        $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        //--end-->

        // <--8-11-2021---
        var html_chart_outer_tile = "<div id='chart_outer_tile_div'><canvas id='areaChartOutSideTile'></canvas></div>";
        $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_chart_outer_tile);
        // --end-->
        
        // console.log('Working');
        var areaData = {
          // <--X Axis Value---
          // labels: ["2013", "2014", "2015", "2016", "2017","2019","2021","2023"],
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            // <--Y Axix Value--
            // data: [12, 19, 3, 5, 2, 3,25,105],
            // data : [], 
            data: a['count_val'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: true, // 3: no fill
          }]
        };

        var areaOptions = {
          plugins: {
            filler: {
              propagate: true
            }
          }
        }

        if ($("#areaChart").length) {
          var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
          var areaChart = new Chart(areaChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }

        if ($("#areaChartOutSideTile").length) {
          var areaChartCanvas = $("#areaChartOutSideTile").get(0).getContext("2d");
          var areaChart = new Chart(areaChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      
       
      }
      else if(chart_type == "pie_chart"){
        var html_canvas_chart = "<canvas id='pieChart'></canvas>";
        var div_i_id = $('#total_records_chart').val();
        $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

        // <---25-11-2021---
        $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        // --end-->

        // <--8-11-2021---
        var html_chart_outer_tile = "<div id='chart_outer_tile_div'><canvas id='pieChartOutSideTile'></canvas></div>";
        $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_chart_outer_tile);
        // --end-->

        var doughnutPieData = {
          datasets: [{
            //data: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 2
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 3
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 4
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 5
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 6
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 7
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 8
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              // 'rgba(255, 206, 86, 0.5)',
              // 'rgba(75, 192, 192, 0.5)',
              // 'rgba(153, 102, 255, 0.5)',
              // 'rgba(255, 159, 64, 0.5)'

        
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              //4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels : a['count_days']
          
          
        };
        var doughnutPieOptions = {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        };
        
        if ($("#pieChart").length) {
          var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
          });
        }

        if ($("#pieChartOutSideTile").length) {
          var pieChartCanvas = $("#pieChartOutSideTile").get(0).getContext("2d");
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
          });
        }
      }
      else if(chart_type == "bar_chart"){
        var html_canvas_chart = "<canvas id='barChart'></canvas>";
        var div_i_id = $('#total_records_chart').val();
        $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

        // <-----25-11-2021--
        $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        // --end--->

        // <--8-11-2021---
        var html_chart_outer_tile = "<div id='chart_outer_tile_div'><canvas id='barChartOutSideTile'></canvas></div>";
        $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_chart_outer_tile);
        // --end-->

        var data = {
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            // data: [10, 19, 3, 5, 2, 3],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 2
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 3
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 4
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 5
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 6
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 7
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 8
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            fill: false
          }]
        };

        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
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
      
        };


        if($("#barChart").length) {
          var barChartCanvas = $("#barChart").get(0).getContext("2d");
          // This will get the first returned node in the jQuery collection.
          var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
          });
        }

        if($("#barChartOutSideTile").length) {
          var barChartCanvas = $("#barChartOutSideTile").get(0).getContext("2d");
          // This will get the first returned node in the jQuery collection.
          var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
          });
        }

      }
        // <---8-11-2021---
        var display_chart_outside_tile_val = $('#display_chart_outside_tile').val();
        if(display_chart_outside_tile_val  == 1){
          $('#chart_outer_tile_div').show();
        }
        else{
          $('#chart_outer_tile_div').hide();
        }
        // ---end-->
      
      }
    });

  }
  else{
    var html_canvas_chart = "<canvas></canvas>";
    var div_i_id = $('#total_records_chart').val();
    $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
    $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

    // <---25-11-2021--
    $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
    $('#energy_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
    // -end-->

    // <--8-11-2021---
    var html_chart_outer_tile = "<div id='chart_outer_tile_div'><canvas></canvas></div>";
    $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
    $('#measurement_count_outer_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_chart_outer_tile);
    // --end-->
  }
}
// ---end-->

// <----7-12-2021---
function chartRecordFilterProduct(){
  var prd_id = $('#chart_records_product').val();
  var analgen_config_id = $('#chart_records_product_item').val();
  var filterVal = $('#chart_record_filter').val();
  var mst_value = $("#chart_records_product_item option:selected").text();
  var mst_input_value = $('#total_records_chart').val();
  var dashboard_tile_data = JSON.parse(localStorage.getItem('dashboard_tile_data'));
  var record_type_of_tile = dashboard_tile_data['record_type_of_tile'];

  var chart_type = $('#chart_type').val();
  var mst_check = $('#save_and_proceed_btn_dashboard').val();

  if(mst_check == 'Update & Proceed'){
    $('.chart_text_edit_' + mst_input_value).text(mst_value+'('+filterVal+' Days)');
  }else{
    $('.chart_text_' + mst_input_value).text(mst_value+'('+filterVal+' Days)');
  }
  var chart_outer_table_limit_column = $('#chart_outer_table_limit_column').val();
  if(prd_id != '' && analgen_config_id != '' && filterVal != ''){
    $('#measurement_modal_loader_div_chart').show();
    $.ajax({
      type: "POST",
      url: "php/retreive.php",
      async: false,
      dataType: 'json',
      data: {
          action: "getChartRecordFilterProduct",
          nameDB: $("#nameDashboardDB").val(),
          analgen_config_id:analgen_config_id,
          filterVal : filterVal,
          record_type_of_tile : record_type_of_tile,
          chart_outer_table_limit_column : chart_outer_table_limit_column
      },
      fail: function() {
          alert("failed!!")
      },
      success: function(a) {
        // <---12-11-2021--
        $('#measurement_modal_loader_div_chart').hide();
        var div_id_html = $('#total_records_chart').val();
        $('.dashboard_chart_tile_html_'+div_id_html+' .small-table table tbody').html(a['outer_table_html']);
        $('.dashboard_chart_outer_tile_html_'+div_id_html+' .small-table table tbody').html(a['outer_table_html']);
        // -end--->

        if(chart_type == "line_chart"){
          var html_canvas_chart = "<canvas id='lineChart'></canvas>";
          var div_i_id = $('#total_records_chart').val();
          // <--8-12-2021---
          $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
          $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
          // --end-->

          var data = {
            labels: a['count_days'],
            datasets: [{
              label: 'Consumption',
              data: a['count_val'],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              fill: false
            }]
          };

          var options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
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
        
          };

          if ($("#lineChart").length) {
            var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, {
              type: 'line',
              data: data,
              options: options
            });
          }

        }
        else if (chart_type == "area_chart"){
        var html_canvas_chart = "<canvas id='areaChart'></canvas>";
        var div_i_id = $('#total_records_chart').val();
        // <---25-11-2021---
        $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        //--end-->
        
        // console.log('Working');
        var areaData = {
          // <--X Axis Value---
          // labels: ["2013", "2014", "2015", "2016", "2017","2019","2021","2023"],
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            // <--Y Axix Value--
            // data: [12, 19, 3, 5, 2, 3,25,105],
            // data : [], 
            data: a['count_val'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: true, // 3: no fill
          }]
        };

        var areaOptions = {
          plugins: {
            filler: {
              propagate: true
            }
          }
        }

        if ($("#areaChart").length) {
          var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
          var areaChart = new Chart(areaChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
       
      }
      else if(chart_type == "pie_chart"){
        var html_canvas_chart = "<canvas id='pieChart'></canvas>";
        var div_i_id = $('#total_records_chart').val();

        // <---8-12-2021---
        $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        // --end-->

        var doughnutPieData = {
          datasets: [{
            //data: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 2
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 3
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 4
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 5
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 6
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 7
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 8
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              // 'rgba(255, 206, 86, 0.5)',
              // 'rgba(75, 192, 192, 0.5)',
              // 'rgba(153, 102, 255, 0.5)',
              // 'rgba(255, 159, 64, 0.5)'

        
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              //4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels : a['count_days']
          
          
        };
        var doughnutPieOptions = {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        };
        
        if ($("#pieChart").length) {
          var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
          });
        }
      
      }
      else if(chart_type == "bar_chart"){
        var html_canvas_chart = "<canvas id='barChart'></canvas>";
        var div_i_id = $('#total_records_chart').val();
        // <-----8-12-2021--
        $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        // --end--->

        var data = {
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            // data: [10, 19, 3, 5, 2, 3],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 2
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 3
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 4
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 5
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 6
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 7
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 8
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            fill: false
          }]
        };

        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
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
      
        };


        if($("#barChart").length) {
          var barChartCanvas = $("#barChart").get(0).getContext("2d");
          // This will get the first returned node in the jQuery collection.
          var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
          });
        }

      }
      
      }
    });

  }
  else{
    var html_canvas_chart = "<canvas></canvas>";
    var div_i_id = $('#total_records_chart').val();
    $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
    $('#product_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
   
  }
}
// --end-->

// <---8-9-2021----
function saveOverallCountTile(){
  var measuremnt_table_height = $('#modal-height-input-measurement-hidden').val();
  var measurement_table_width = $('#modal-width-input-measurement-hidden').val();
  var input_height = $('#modal-height-input-measurement').val(); 
  var input_width = $('#modal-width-input-measurement').val();
  var mst_ID = $('#mst_id_hidden').val();
  var data_table_other = $('#mst_id_hidden').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  $('.measurement_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
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
        data_table_other : data_table_other,
        type : 'Measurement'
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div').show();
      $('.bd-example-modal-lg .modal-content').css('opacity','0.8');

      $('#save_tile_id').val(a['max_id'][0]['max_id']);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div').hide();
        $('.bd-example-modal-lg .modal-content').css('opacity','1');
        $('.bd-example-modal-lg').modal('hide');

        // <---12-11-2021--
        // $('#save_position_tile').trigger('click');
        // --end--->
      }, 500);
      // $('#save_position_tile').attr('btn_click','overall_count');
    }
  });
}
// --end-->

// <---23-11-2021---
function saveOverallCountTileEnergy(){
  var energy_table_height = $('#modal-height-input-energy-hidden').val();
  var energy_table_width = $('#modal-width-input-energy-hidden').val();
  var input_height = $('#modal-height-input-energy').val(); 
  var input_width = $('#modal-width-input-energy').val();
  var mst_ID = $('#mst_id_hidden_energy').val();
  var data_table_other = $('#mst_id_hidden_energy').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  $('.energy_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
  var tile_html = $('.energy_html_modal_'+last_index_tile).html();
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
        height: energy_table_height,
        width : energy_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        mst_ID : mst_ID,
        data_table_other : data_table_other,
        type : 'Energy'
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#energy_modal_loader_div').show();
      $('.energy_tile_modal .modal-content').css('opacity','0.8');

      $('#save_tile_id').val(a['max_id'][0]['max_id']);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#energy_modal_loader_div').hide();
        $('.energy_tile_modal .modal-content').css('opacity','1');
        $('.energy_tile_modal ').modal('hide');

        // <---12-11-2021--
        // $('#save_position_tile').trigger('click');
        // --end--->
      }, 500);
      // $('#save_position_tile').attr('btn_click','overall_count');
    }
  });
}
// -end--->

// <---3-12-2021---
function saveOverallCountTileProduct(){
  var product_table_height = $('#modal-height-input-product-hidden').val();
  var product_table_width = $('#modal-width-input-product-hidden').val();
  var input_height = $('#modal-height-input-product').val(); 
  var input_width = $('#modal-width-input-product').val();
  var analgen_config_id = $('#analgen_config_id_input').val();
  var data_table_other = $('#analgen_config_id_input').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  $('.product_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
  var tile_html = $('.product_html_modal_'+last_index_tile).html();
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
        height: product_table_height,
        width : product_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        analgen_config_id : analgen_config_id,
        data_table_other : data_table_other,
        type : 'Product'
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#product_modal_loader_div').show();
      $('.product_tile_modal .modal-content').css('opacity','0.8');

      $('#save_tile_id').val(a['max_id'][0]['max_id']);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#product_modal_loader_div').hide();
        $('.product_tile_modal .modal-content').css('opacity','1');
        $('.product_tile_modal ').modal('hide');

        // <---12-11-2021--
        // $('#save_position_tile').trigger('click');
        // --end--->
      }, 500);
      // $('#save_position_tile').attr('btn_click','overall_count');
    }
  });
}
// ---end--->

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
      if(a['total_sum'] != '' && a['name_value'] != ''){
        $('.'+id+'.tiles-click .save_table_div_show_table .record-name-overall-count').text(a['name_value']);
        $('.'+id+'.tiles-click .save_table_div_show_table .text-overall-count').text(a['total_sum']+'(value)');
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

      // <----17-11-2021----
      var chart_tile_click_data = {'table_html' : a['dashboardMeasurementHtml'],'tile_click_type' : 'table'}
      localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));
      // -end->

      $('.'+id+'.tiles-click .save_table_div_show_table .table').html('');
      $('.'+id+'.tiles-click .save_table_div_show_table .table').html(a['dashboardMeasurementHtml']);
    }
  });
}

function getTableDashboardDataProductAutomatic(id,queryDataRecords){
  // $("#nameDashboardDB").val(),
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getTableDashboardDataProductAutomatic",
        nameDB: $("#nameDashboardDB").val(),
        id:id,
        queryDataRecords : queryDataRecords
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {

      // <----17-11-2021----
      var chart_tile_click_data = {'table_html' : a['dashboardMeasurementHtml'],'tile_click_type' : 'table'}
      localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));
      // -end->

      $('.'+id+'.tiles-click .save_table_div_show_table .table').html('');
      $('.'+id+'.tiles-click .save_table_div_show_table .table').html(a['dashboardMeasurementHtml']);
    }
  });
}

// <----16-02-2021--
function getTableDashboardDataEnergyLayer(id){
  // $("#nameDashboardDB").val(),
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getTableDashboardDataEnergyLayer",
        nameDB: $("#nameDashboardDB").val(),
        id:id,
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {

      var chart_tile_click_data = {'table_html' : a['dashboardMeasurementHtml'],'tile_click_type' : 'table'}
      localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));

      $('.'+id+'.tiles-click .save_table_div_show_table .table').html('');
      $('.'+id+'.tiles-click .save_table_div_show_table .table').html(a['dashboardMeasurementHtml']);
    }
  });
}

// ---end-->

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
  $('.measurement_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
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
        data_other : data_other,
        type : 'Measurement'
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div').show();
      $('.bd-example-modal-lg .modal-content').css('opacity','0.8');
      
      $('#save_tile_id').val(id);
      
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

// <--24-11-21--
function updateTileRecordOverallCountEnergy()
{
  var id = localStorage.getItem('edit-measurement-tile');
  var energy_table_height = $('#modal-height-input-energy-hidden').val();
  var energy_table_width = $('#modal-width-input-energy-hidden').val();
  var input_height = $('#modal-height-input-energy').val(); 
  var input_width = $('#modal-width-input-energy').val();
  var mst_ID = $('#mst_id_hidden_energy').val();
  var data_other = $('#mst_id_hidden_energy').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  $('.energy_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
  var tile_html = $('.energy_html_modal_'+last_index_tile).html();
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
        height: energy_table_height,
        width : energy_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        mst_ID : mst_ID,
        data_other : data_other,
        type : 'Energy'
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#energy_modal_loader_div').show();
      $('.energy_tile_modal .modal-content').css('opacity','0.8');
      
      $('#save_tile_id').val(id);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#energy_modal_loader_div').hide();
        $('.energy_tile_modal .modal-content').css('opacity','1');
        $('.energy_tile_modal').modal('hide');
      }, 500);
     
    }
  });
}
// --end-->

function updateTileRecordOverallCountProduct()
{
  var id = localStorage.getItem('edit-measurement-tile');
  var product_table_height = $('#modal-height-input-product-hidden').val();
  var product_table_width = $('#modal-width-input-product-hidden').val();
  var input_height = $('#modal-height-input-product').val(); 
  var input_width = $('#modal-width-input-product').val();
  var analgen_config_id = $('#analgen_config_id_input').val();
  var data_table_other = $('#analgen_config_id_input').attr('data-table-other');
  
  var last_index_tile = $('#total_records').val();
  $('.product_html_modal_'+last_index_tile+' .card-border').removeClass('tile_border');
  var tile_html = $('.product_html_modal_'+last_index_tile).html();
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
        height: product_table_height,
        width : product_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        data_other : data_table_other,
        analgen_config_id : analgen_config_id,
        type : 'Product'
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#product_modal_loader_div').show();
      $('.product_tile_modal .modal-content').css('opacity','0.8');
      
      $('#save_tile_id').val(id);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#product_modal_loader_div').hide();
        $('.product_tile_modal .modal-content').css('opacity','1');
        $('.product_tile_modal').modal('hide');
      }, 500);
     
    }
  });
}


// <----22-9-2021---
function saveDashboardTilePosititon(ar){
  $.ajax({
    type: "POST",
    url: "php/operations.php",
    async: false,
    dataType: 'json',
    data: {
        action: "saveDashboardTilePosititon",
        nameDB: $("#nameDashboardDB").val(),
        data:  JSON.stringify(ar),
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      if(a['Staus'] == 200)
      {
        var btn_click = $('#save_position_tile').attr('btn_click');
        if(btn_click == "dashboard")
        {
          alert('Successfully Saved');
        }
        else if(btn_click == 'table' || btn_click == 'overall_count' || btn_click == 'chart'){
          $('#save_position_tile').attr('btn_click','dashboard');
        }
      }
      
    }
  });
}
// --end-->

// <----28-9-2021----
function getDatabaseList(){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getDatabaseList",
        nameDB : "gipscomm",
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#dashboard_database_list').html('');
      var listHTML = '';
      if(a != ''){
        $.each( a, (key,val)=>{
          listHTML += "<option value='"+val['nameMan']+"'  dashboardbValue='"+val['dbName']+"'>"+val['nameMan']+"</option>";
        });
        $('#dashboard_database_list').html(listHTML);
        var localStorageDb = localStorage.getItem('dashboardDBName');
        $("#dashboard_database_list option[value='"+localStorageDb+"']").prop('selected','selected');
      }
    }
  });
}
// ---end--->

function getClickDashboardChart(id,record_type_of_tile,mst_id,chart_filter_value,chart_type){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getClickDashboardChart",
        nameDB : $("#nameDashboardDB").val(),
        mst_id : mst_id,
        chart_filter_value : chart_filter_value,
        record_type_of_tile : record_type_of_tile
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {

      // <----17-11-2021----
      var chart_tile_click_data = {'count_days' : a['count_days'],'count_val': a['count_val'],'chart_type' : chart_type,'tile_click_type' : 'chart'}
      localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));
      // -end->
      var tile_html = $('.'+id+'.tiles-click').html();
      if(chart_type == "line_chart"){
        // var html_canvas_chart = "<canvas id='lineChart'></canvas>";
        // var div_i_id = $('#total_records_chart').val();
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        
        var data = {
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            data: a['count_val'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
          }]
        };

        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
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
      
        };

        if ($("#lineChart").length) {
          var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
          var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: data,
            options: options
          });
        }

        // <---9-11-2021--
        // if ($("#lineChartOutSideTile").length) {
        //   var lineChartCanvas = $("#lineChartOutSideTile").get(0).getContext("2d");
        //   var lineChart = new Chart(lineChartCanvas, {
        //     type: 'line',
        //     data: data,
        //     options: options
        //   });
        // }
        // --end->

        // tile_html = tile_html.replace('lineChart-none','lineChart');
        // $('.'+id+'.tiles-click').html(tile_html);

      }
      else if (chart_type == "area_chart"){
          // var html_canvas_chart = "<canvas id='areaChart'></canvas>";
          // var div_i_id = $('#total_records_chart').val();
          // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
          // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        
          // console.log('Working');
          var areaData = {
            // <--X Axis Value---
            // labels: ["2013", "2014", "2015", "2016", "2017","2019","2021","2023"],
            labels: a['count_days'],
            datasets: [{
              label: 'Consumption',
              // <--Y Axix Value--
              // data: [12, 19, 3, 5, 2, 3,25,105],
              // data : [], 
              data: a['count_val'],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              fill: true, // 3: no fill
            }]
          };

          var areaOptions = {
            plugins: {
              filler: {
                propagate: true
              }
            }
          }

          if ($('#areaChart').length) {
            var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
            var areaChart = new Chart(areaChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }
          // setTimeout(()=>{
          //   tile_html = tile_html.replace('areaChart','areaChart-none');
          //   $('.'+id+'.tiles-click').html(tile_html);
          // },15000);
          
      }
      else if(chart_type == "pie_chart"){
        // var html_canvas_chart = "<canvas id='pieChart'></canvas>";
        // var div_i_id = $('#total_records_chart').val();
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        var doughnutPieData = {
          datasets: [{
            //data: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 2
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 3
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 4
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 5
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 6
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 7
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 8
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              // 'rgba(255, 206, 86, 0.5)',
              // 'rgba(75, 192, 192, 0.5)',
              // 'rgba(153, 102, 255, 0.5)',
              // 'rgba(255, 159, 64, 0.5)'

        
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              //4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels : a['count_days']
          
          
        };
        var doughnutPieOptions = {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        };
        
        if ($("#pieChart").length) {
          var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
          });
        }
      }
      else if(chart_type == "bar_chart"){
        // var html_canvas_chart = "<canvas id='barChart'></canvas>";
        // var div_i_id = $('#total_records_chart').val();
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

        var data = {
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            // data: [10, 19, 3, 5, 2, 3],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 2
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 3
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 4
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 5
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 6
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 7
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 8
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            fill: false
          }]
        };

        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
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
      
        };


        if($("#barChart").length) {
          var barChartCanvas = $("#barChart").get(0).getContext("2d");
          // This will get the first returned node in the jQuery collection.
          var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
          });
        }
      }
    }
  });

}

// <----8-12-2021---
function getClickDashboardChartProduct(id,record_type_of_tile,analgen_config_id,chart_filter_value,chart_type){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getClickDashboardChartProduct",
        nameDB : $("#nameDashboardDB").val(),
        analgen_config_id : analgen_config_id,
        chart_filter_value : chart_filter_value,
        record_type_of_tile : record_type_of_tile
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {

      var chart_tile_click_data = {'count_days' : a['count_days'],'count_val': a['count_val'],'chart_type' : chart_type,'tile_click_type' : 'chart'}
      localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));
      var tile_html = $('.'+id+'.tiles-click').html();
      if(chart_type == "line_chart"){
        // var html_canvas_chart = "<canvas id='lineChart'></canvas>";
        // var div_i_id = $('#total_records_chart').val();
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        
        var data = {
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            data: a['count_val'],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
          }]
        };

        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
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
      
        };

        if ($("#lineChart").length) {
          var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
          var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: data,
            options: options
          });
        }

        // <---9-11-2021--
        // if ($("#lineChartOutSideTile").length) {
        //   var lineChartCanvas = $("#lineChartOutSideTile").get(0).getContext("2d");
        //   var lineChart = new Chart(lineChartCanvas, {
        //     type: 'line',
        //     data: data,
        //     options: options
        //   });
        // }
        // --end->

        // tile_html = tile_html.replace('lineChart-none','lineChart');
        // $('.'+id+'.tiles-click').html(tile_html);

      }
      else if (chart_type == "area_chart"){
          // var html_canvas_chart = "<canvas id='areaChart'></canvas>";
          // var div_i_id = $('#total_records_chart').val();
          // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
          // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        
          // console.log('Working');
          var areaData = {
            // <--X Axis Value---
            // labels: ["2013", "2014", "2015", "2016", "2017","2019","2021","2023"],
            labels: a['count_days'],
            datasets: [{
              label: 'Consumption',
              // <--Y Axix Value--
              // data: [12, 19, 3, 5, 2, 3,25,105],
              // data : [], 
              data: a['count_val'],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              fill: true, // 3: no fill
            }]
          };

          var areaOptions = {
            plugins: {
              filler: {
                propagate: true
              }
            }
          }

          if ($('#areaChart').length) {
            var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
            var areaChart = new Chart(areaChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }
          // setTimeout(()=>{
          //   tile_html = tile_html.replace('areaChart','areaChart-none');
          //   $('.'+id+'.tiles-click').html(tile_html);
          // },15000);
          
      }
      else if(chart_type == "pie_chart"){
        // var html_canvas_chart = "<canvas id='pieChart'></canvas>";
        // var div_i_id = $('#total_records_chart').val();
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);
        var doughnutPieData = {
          datasets: [{
            //data: [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 2
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 3
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 4
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 5
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 6
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 7
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              // 8
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',

              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              // 'rgba(255, 206, 86, 0.5)',
              // 'rgba(75, 192, 192, 0.5)',
              // 'rgba(153, 102, 255, 0.5)',
              // 'rgba(255, 159, 64, 0.5)'

        
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              //4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
          }],
      
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels : a['count_days']
          
          
        };
        var doughnutPieOptions = {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        };
        
        if ($("#pieChart").length) {
          var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
          var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
          });
        }
      }
      else if(chart_type == "bar_chart"){
        // var html_canvas_chart = "<canvas id='barChart'></canvas>";
        // var div_i_id = $('#total_records_chart').val();
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html('');
        // $('#measurement_count_tile_modal_chart_'+div_i_id+' .save_table_div_show_table').html(html_canvas_chart);

        var data = {
          labels: a['count_days'],
          datasets: [{
            label: 'Consumption',
            // data: [10, 19, 3, 5, 2, 3],
            data : a['count_val'],
            backgroundColor: [
              // 1
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 2
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 3
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 4
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 5
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 6
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 7
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              // 8
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              // 1
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 2
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 3
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 4
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 5
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 6
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              
              // 7
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              // 8
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',

              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            fill: false
          }]
        };

        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
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
      
        };


        if($("#barChart").length) {
          var barChartCanvas = $("#barChart").get(0).getContext("2d");
          // This will get the first returned node in the jQuery collection.
          var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: data,
            options: options
          });
        }
      }
    }
  });

}
// --end-->

// <---7-10-2021---
function updateDashboardChart(){
  var mst_input_value = $('#total_records_chart').val();
  $('.chart_text_edit_'+mst_input_value).attr('class', 'mb-0 mt-2 text-success count_result_tile chart_text_'+mst_input_value);
  $('.chart_text_'+mst_input_value).removeClass('chart_text_edit_'+mst_input_value);
  var chart_records = $('#chart_records').val();
  var chart_record_filter = $('#chart_record_filter').val();
  //console.log('chart_recorda Value ',chart_records);
  //console.log('chart_recorda Filter ',chart_record_filter);
  if(chart_records == '' || chart_record_filter == ''){
      return false;
  }
  $('.small-table').attr('style','display:block');
  var chart_type = $('#chart_type').val();
  var measuremnt_table_height = $('#measurement-height-chart-hidden').val();
  var measurement_table_width = $('#measurement-width-chart-hidden').val();
  var input_height = $('#measurement-height-chart').val(); 
  var input_width = $('#measurement-width-chart').val();
  var chart_outer_table_limit_column = $('#chart_outer_table_limit_column').val();
  
  //<--23-8-2021---
  var last_index_tile = $('#total_records_chart').val();
  // var table_length = $('.measurement_html_modal_'+last_index_tile+' table tbody tr').length;
  // $('.measurement_html_modal_'+last_index_tile+' .count_result_tile').text(table_length+' Records');
  
  //-- 2-11-2021--
  $('.dashboard_chart_tile_html_'+last_index_tile+' .card-border').removeClass('tile_border');
  // -end-->

  var tile_html = $('.dashboard_chart_tile_html_'+last_index_tile).html();
  $('#total_records_chart').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');

  // <---21-10-2021--
  var expand_view = $('#expand_view_chart').val();
  // --emd-->

  // <---6-10-2021--
  if(chart_type == "line_chart"){
    tile_html = tile_html.replace("lineChart",'lineChart-none');  
  }
  else if(chart_type == "area_chart"){
    tile_html = tile_html.replace("areaChart",'areaChart-none');
  }
  else if(chart_type == "pie_chart"){
    tile_html = tile_html.replace("pieChart",'pieChart-none');
  }
  else if(chart_type == "bar_chart"){
    tile_html = tile_html.replace("barChart",'barChart-none');
  }
  var chart_time_interval = $('#time_interval_chart').val();
  // --end->
  // console.log(tile_html);
  // return false;

  // <----01-9-2021---
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];

  var id = localStorage.getItem('edit-measurement-tile');
    // --end->
  // console.log('mst_id',chart_records);
  // console.log('Chart_type',chart_type);
  // console.log('chart_record_filter',chart_record_filter);

  // <----1-11-2021--
  var outside_chart_checkbox = $('#chart_outside_tile_structure').val();
  var outside_chart_input_height =  $('#chart_height_outer_structure').val();
  var outside_chart_input_width = $('#chart_width_outer_structure').val();

  if(outside_chart_checkbox == 0){
    outside_chart_input_height = '';
    outside_chart_input_width = '';
  }
  // -end---->

  // <---25-11-2021--
  var type_tile = '';
  if(record_type_of_tile == 'measurement')
  {
    type_tile = 'Measurement';  
  }
  else if(record_type_of_tile == 'energy'){
    type_tile = 'Energy';
  }
  // --end->

// --end-->
  $.ajax({
    type: "POST",
    url: "php/operations.php",
    async: false,
    dataType: 'json',
    data: {
        action: "updateDashboardChart",
        nameDB: $("#nameDashboardDB").val(),
        title : tile_title,
        tile_html : tile_html,
        height: measuremnt_table_height,
        width : measurement_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        mst_id : chart_records,
        chart_record_filter : chart_record_filter,
        chart_type : chart_type,
        chart_time_interval : chart_time_interval,
        id : id,
        expand_view : expand_view,
        outside_chart_checkbox : outside_chart_checkbox,
        outside_chart_input_height : outside_chart_input_height,
        outside_chart_input_width : outside_chart_input_width,
        chart_outer_table_limit_column : chart_outer_table_limit_column,
        type : type_tile
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div_chart').show();
      $('#dashboard_tile_modal_chart .modal-content').css('opacity','0.8');

      $('#expand_view_chart').prop('checked',false);
      $('#expand_view_chart').val('0');

      $('#save_tile_id').val(id);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div_chart').hide();
        $('#dashboard_tile_modal_chart .modal-content').css('opacity','1');
        $('#dashboard_tile_modal_chart').modal('hide');
        // window.location.reload();
      }, 500);
    }
  });
  
}
// --end-->

// <---09-12-2021---
function updateDashboardChartProduct(){
  var mst_input_value = $('#total_records_chart').val();
  $('.chart_text_edit_'+mst_input_value).attr('class', 'mb-0 mt-2 text-success count_result_tile chart_text_'+mst_input_value);
  $('.chart_text_'+mst_input_value).removeClass('chart_text_edit_'+mst_input_value);
  var chart_records_product = $('#chart_records').val();
  var chart_record_filter = $('#chart_record_filter').val();
  var chart_records_product_item = $('#chart_records_product_item').val();

  if(chart_records_product == '' || chart_records_product_item == '' || chart_record_filter == ''){
      return false;
  }
  $('.small-table').attr('style','display:block');
  var chart_type = $('#chart_type').val();
  var measuremnt_table_height = $('#measurement-height-chart-hidden').val();
  var measurement_table_width = $('#measurement-width-chart-hidden').val();
  var input_height = $('#measurement-height-chart').val(); 
  var input_width = $('#measurement-width-chart').val();
  var chart_outer_table_limit_column = $('#chart_outer_table_limit_column').val();
  
  var last_index_tile = $('#total_records_chart').val();
  
  $('.dashboard_chart_tile_html_'+last_index_tile+' .card-border').removeClass('tile_border');

  var tile_html = $('.dashboard_chart_tile_html_'+last_index_tile).html();
  $('#total_records_chart').remove();
  tile_html = tile_html.replace('total_records','');
  tile_html = tile_html.replace('hide_table_main','');

  var expand_view = $('#expand_view_chart').val();

  if(chart_type == "line_chart"){
    tile_html = tile_html.replace("lineChart",'lineChart-none');  
  }
  else if(chart_type == "area_chart"){
    tile_html = tile_html.replace("areaChart",'areaChart-none');
  }
  else if(chart_type == "pie_chart"){
    tile_html = tile_html.replace("pieChart",'pieChart-none');
  }
  else if(chart_type == "bar_chart"){
    tile_html = tile_html.replace("barChart",'barChart-none');
  }
  var ar = localStorage.getItem('dashboard_tile_data');
  ar = JSON.parse(ar);
  var tile_title =ar['title_modal_tile'];
  var record_type_of_tile =ar['record_type_of_tile'];
  var type_data_tile =ar['type_data_tile'];

  var id = localStorage.getItem('edit-measurement-tile');

  var outside_chart_checkbox = $('#chart_outside_tile_structure').val();
  var outside_chart_input_height =  $('#chart_height_outer_structure').val();
  var outside_chart_input_width = $('#chart_width_outer_structure').val();

  if(outside_chart_checkbox == 0){
    outside_chart_input_height = '';
    outside_chart_input_width = '';
  }

  var type_tile = 'Product';

  $.ajax({
    type: "POST",
    url: "php/operations.php",
    async: false,
    dataType: 'json',
    data: {
        action: "updateDashboardChart",
        nameDB: $("#nameDashboardDB").val(),
        title : tile_title,
        tile_html : tile_html,
        height: measuremnt_table_height,
        width : measurement_table_width,
        input_height : input_height,
        input_width : input_width,
        record_type_of_tile :record_type_of_tile,
        type_data_tile : type_data_tile,
        analgen_config_id : chart_records_product_item,
        chart_record_filter : chart_record_filter,
        chart_type : chart_type,
        id : id,
        expand_view : expand_view,
        outside_chart_checkbox : outside_chart_checkbox,
        outside_chart_input_height : outside_chart_input_height,
        outside_chart_input_width : outside_chart_input_width,
        chart_outer_table_limit_column : chart_outer_table_limit_column,
        type : type_tile
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#measurement_modal_loader_div_chart').show();
      $('#dashboard_tile_modal_chart .modal-content').css('opacity','0.8');

      $('#expand_view_chart').prop('checked',false);
      $('#expand_view_chart').val('0');

      $('#save_tile_id').val(id);
      
      setTimeout(() => {
        $('#dashboard_sidebar').click();
        $('#measurement_modal_loader_div_chart').hide();
        $('#dashboard_tile_modal_chart .modal-content').css('opacity','1');
        $('#dashboard_tile_modal_chart').modal('hide');
        // window.location.reload();
      }, 500);
    }
  });
  
}
// ---end--->

// <---29-11-2021---
function getAllProductClickTableHTML(prd_id,page_val = 1,order_by = 'desc'){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getAllProductClickTable",
        nameDB: $("#nameDashboardDB").val(),
        prd_id : prd_id,
        page_val : page_val,
        order_by : order_by
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      if(a != ''){

        // var thVal =  $('#product_select_table_entries_table thead tr').children('th:eq(4)').text();
        // if(thVal == '' || thVal == undefined){
        //   $('#product_select_table_entries_table thead tr').children('th:eq(3)').after("<th>Status</th>"); 
        // }

        // $('#product_select_table_entries_table thead tr').children('th:eq(2)').text('Created Date');
        // $('#product_select_table_entries_table thead tr').children('th:eq(3)').text('Total Units');

        $('#product_select_table_entries').html(a['product_html']);
        $('#product_select_table_entries_pagination').html(a['pagination_html']);
        $('#product_select_table_entries_table_div table thead').html(a['product_table_header']);

        $('#product_select_table_entries_table thead tr th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
        $('#product_select_table_entries_table tbody tr td').attr('style','padding: 6px !important;font-size: small !important;');
        $('#product_select_table_entries_table thead tr').children('th:eq(2)').text('Created Date');

        $('#product_records_order_by_div').show();
        localStorage.setItem('query_data',JSON.stringify(a['query_data']));

         var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
         if(edit_value == 'true'){
             $('#product_modal_open_button').val('Update & Preview');
             $('#product_modal_open_button').attr('tile-edit','true');
         }
         else{
           $('#product_modal_open_button').val('Save & Preview');
           $('#product_modal_open_button').attr('tile-edit','false');
         }

         var type_data = localStorage.getItem('dashboard_tile_data');
         type_data = JSON.parse(type_data);
         if(type_data['type_data_tile'] == 'overall_count')
         {
           $('#product_modal_open_button').hide();
         }
         else{
           $('#product_modal_open_button').show();
         }
         // ---end--->
      }
    }
  });

}
// ---end--->


// <-----30-11-2021---
function rowClickParticularProductEntry(analgen_config_id,page_val = 1,order_by = 'desc'){
  // $('#measurement_record_table table tbody tr').children('td:eq(3)').text();
  var total_count = $("#product_select_table_entries tr[analgen_config_id='"+analgen_config_id+"']").children('td:eq(3)').text();
  $('#overall_count_product').val(total_count);

  var record_name = $("#product_select_table_entries tr[analgen_config_id='"+analgen_config_id+"']").children('td:eq(0)').text();
  $('#analgen_config_id_input').attr('data-name',record_name);
  // --end-->

  var table_other = $('#product_select_table_entries').children('tr:eq(0)').attr('data-table-other'); 
  $('#analgen_config_id_input').attr('data-table-other',table_other);
  $('#analgen_config_id_input').val(analgen_config_id);
  // console.log('Worrking Function');
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "rowClickParticularProductEntry",
        nameDB: $("#nameDashboardDB").val(),
        analgen_config_id : analgen_config_id,
        page_val : page_val,
        order_by : order_by
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      // $('#product_select_table_entries_table thead tr').children('th:eq(4)').remove();
      
      // $('#product_select_table_entries_table thead tr').children('th:eq(2)').text('Date');
      // $('#product_select_table_entries_table thead tr').children('th:eq(3)').text('Units Consumed');

      $('#product_select_table_entries').html(a['product_html']);
      $('#product_select_table_entries_pagination').html(a['pagination_html']);
      $('#product_select_table_entries_table_div table thead').html(a['product_table_header']);

      $('#product_select_table_entries_table thead tr th').attr('style','padding:  10px 6px 10px 6px !important;font-size: small !important;');
      $('#product_select_table_entries_table tbody tr td').attr('style','padding: 6px !important;font-size: small !important;');
      $('#product_select_table_entries_table thead tr').children('th:eq(2)').text('Date');

      localStorage.setItem('query_data',JSON.stringify(a['query_data']));


      var edit_value = $('#save_and_proceed_btn_dashboard').attr('data-edit');
      if(edit_value == 'true'){
          $('#product_modal_open_button').val('Update & Preview');
          $('#product_modal_open_button').attr('tile-edit','true');
      }
      else{
        $('#product_modal_open_button').val('Save & Preview');
        $('#product_modal_open_button').attr('tile-edit','false');
      }

      setTimeout(()=>{
        $('#product_modal_open_button').show();
      },500)


      // <---2-12-2021---
      if(a['queryLastDate'] != undefined && a['queryLastDate'] != ''){
        if(a['queryLastDate'][0]['type'] == '2'){
          $('#row_click_last_date_product').val(a['queryLastDate'][0]['on_week']+'-'+a['queryLastDate'][0]['on_date']);
        }
        else{
          $('#row_click_last_date_product').val(a['queryLastDate'][0]['on_date']);
        }
       
      }
      else{
        $('#row_click_last_date_product').val('');
      }
      // ---end-->
    }
  });
}
// ---end--->


//<----25-1-2022---
function getAllMeasurementEnergy(){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getAllMeasurementEnergy",
        nameDB: $("#nameDashboardDB").val(),
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#energy_measurement').html(a['measurement_html']);
      if(a['table_found'] == "false"){
        var htmlTableNotFound = '<tr><td colspan="50" class="text-center">Table Not Found</td></tr>';
        $('#energy_select_table_entries').html(htmlTableNotFound);
        $('#pagination_html_energy').html('');  
      }
      else{
        var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
        $('#energy_select_table_entries').html(tr);
        $('#pagination_html_energy').html('');
      }
    }
  }); 
}
// --end---> 

// <----18-02-2022----
function getEnergyMeasurementChart(){
  $.ajax({
    type: "POST",
    url: "php/retreive.php",
    async: false,
    dataType: 'json',
    data: {
        action: "getEnergyMeasurementChart",
        nameDB: $("#nameDashboardDB").val(),
    },
    fail: function() {
        alert("failed!!")
    },
    success: function(a) {
      $('#energy_chart_measurement').html(a['measurement_html']);
      if(a['table_found'] == "false"){
        var htmlTableNotFound = '<option>Table Not Found</option>';
        $('#energy_chart_measurement').html(htmlTableNotFound);
        $('.energy_chart_layer_div').hide();
        $('#energy_chart_measurement').show();
      }
      else{
        $('.energy_chart_layer_div').show();
      }
      $('#time_interval_div').hide();
      $('#chart_record_div').hide();
      $('#chart_record_filter_div').hide()
    }
  });
}
// -end---->

// <---18-1-2022--
// var i = 1;
// function test(){
//   console.log('function calling');
//   i++;
//   console.log(i);

//   if(i == 10)
//   {
//     clearInterval(a);
//   }
// }

// var a = setInterval(test,1000);
// --end--->

// <---16-9-2021---
// function allowDrop(ev) {
//   var classVal = $(ev.path[0]).attr('class');
//   // console.log(classVal);
//   // if(classVal == 'row dashboard_count_div')
//   // {
//   //   ev.preventDefault();
//   // }
//   ev.preventDefault();
//   // var position = ev.position();
//   // var id = $(ev.srcElement.firstElementChild.id);
// }

// function drag(ev) {
//   // console.log(ev.target.id);
//   console.log(ev);
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   // console.log(ev.target);
//   var data = ev.dataTransfer.getData("text");
//   console.log('Data Value',ev.target.appendChild(document.getElementById(data)));
//   ev.target.appendChild(document.getElementById(data));

// }
// --end-->

// <----21-9-2021---

  // document.addEventListener('DOMContentLoaded', (event) => {
    
  // });


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