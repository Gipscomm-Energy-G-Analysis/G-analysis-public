$(document).ready( function(){

    var dashboardDBStorage = localStorage.getItem('dashboardDB');
    $('#nameDashboardDB').val(dashboardDBStorage);
    //Hide All Files
    $('#charts_main_div').hide();
    $('#dashboard_main_div').show();
    $('#energy_table_main_div').hide();
    $('#measurement_table_main_div').hide();
    $('#production_data_table_main_div').hide();
    $('#production_table_main_div').hide();
    $('#wert_main_div').hide();
    $('#alerts_table_main_div').hide();
    $('#help_table_main_div').hide();

    $('.footer').html('');
    $('#energy_not_consumed_table').html('');

     // <---22-7-2021--
     $('.container-fluid nav').addClass('background-image');
     $('#dashboard_main_div .content-wrapper').addClass('background-image');
     $('.footer').addClass('background-image');
     $('.sidebar_redirect').addClass('text-dark');
     // --end-->

    // <---31-8-2021---
    // Edit Local Storage Remove
    localStorage.removeItem('edit-measurement-tile');
    localStorage.removeItem('edit-i-value');
    // localStorage.removeItem('dashboard_tile_data');
    // --end-->
    

    $('.nav-item .sidebar_redirect,.nav-item .nav_bar_redirect').on('click', function(){
        var  id_val = $(this).attr('id');
        $('#help_video').get(0).play();    
        $('#help_video').get(0).pause();
        switch(id_val){
            case'dashboard_sidebar':
                $('#charts_main_div').hide();
                $('#dashboard_main_div').show();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                countDashboard();
                energy_consumed_five_days();
                getTableFormatDashboard();
                // dashboardChart();

                // <---31-8-2021---
                // Edit Local Storage Remove
                localStorage.removeItem('edit-measurement-tile');
                localStorage.removeItem('edit-i-value');
                // localStorage.removeItem('dashboard_tile_data');
                // --end-->
                break;
            
            case "charts_sidebar":
                var dashboardDBChart = localStorage.getItem('dashboardDBName');
                localStorage.setItem('dashboardDBChart',dashboardDBChart);
                localStorage.removeItem('dashboardDBName');
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                var mainDirectory = arPathname.length > 2 ? '/'+arPathname[1] : arPathname[0];
                // window.open('/'+mainDirectory+'/main.html','_self');
                if(arPathname.length > 3){
                    window.open('/'+arPathname[1]+'/main.html','_self');
                }
                else{
                    window.open('/main.html','_self');
                }
                // window.open(mainDirectory+'/main.html','_self');
                $('#charts_main_div').show();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                break;

            case "measurement_sidebar_option":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').show();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                // getNumberRecordsMesurement();
                // <---5-8--2021--
                var number_record_local_val = localStorage.getItem('number_record_measurement');
                if(number_record_local_val != undefined && number_record_local_val != null){
                    $('#measurement_total_number_record').val(number_record_local_val);
                    $('#measurement_search_record').val('');
                    getNumberRecordsMesurement();
                    // return false;
                }
                else{
                    $('#measurement_total_number_record').val('');
                }
                // $('#mesurement_select_table_entries').html('');
                // $('#pagination_html').html('');
                // $('#measurement_search_record').val('');
                // $('.table-margin').removeClass('margin-remove-table');
                // $('.measurement_table_header').removeClass('row_click_table');
                //-end-->
                break;

            case "product_sidebar_option":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').show();
                $('#wert_main_div').hide();
                getNumberRecordsProduct();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                break;

            case "energy_sidebar_option":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').show();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                getNumberRecordsEnergy();
                break;

            case "production_data_sidebar_option":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').show();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                getNumberRecordsProductionData();
                break;

            case "wert_sidebar":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').show();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                break;

            case "notification_nav_bar":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').show();
                $('#help_table_main_div').hide();
                getAlerts();
                break;

            case "help_nav_bar":
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').show();
                $('#help_video').get(0).play();    
                break;

            case "home_nav_bar":
                var dashboardDBChart = localStorage.getItem('dashboardDBName');
                localStorage.setItem('dashboardDbRedirectHome',dashboardDBChart);
                localStorage.removeItem('dashboardDBName');
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                console.log('pathname',pathname);
                console.log('ar pathname',arPathname);
                //return false;
                // var mainDirectory = arPathname.length > 2 ? '/'+arPathname[1] : arPathname[0];
                // window.open('/'+mainDirectory+'/main.html','_self');
                if(arPathname.length > 3){
                    window.open('/'+arPathname[1]+'/main.html','_self');
                }
                else{
                    window.open('/main.html','_self');
                }
                break;
        }
    });

    // <---Count Dashboard Entries--
    countDashboard();
    // dashboardChart();
    energy_consumed_five_days();
    getTableFormatDashboard();
    getDatabaseList();
    // getDashboardSelectOption();


    //Mesurement
    $(document).on('change','#measurement_time_interval,#measurement_records_order_by',function(){
        var id_val = $(this).attr('id');
        if(id_val == 'measurement_records_order_by'){
            var data_type = $('#row_click_table').attr('data_type');
            var data_mst = $('#row_click_table').attr('data_mst');
            if(data_type != undefined && data_mst != undefined && data_type != '' && data_mst != ''){
                rowClickMeasurementTableData(data_mst,data_type);
            }
            else{
                getNumberRecordsMesurement();
            }
        }else{
            getNumberRecordsMesurement();
        }
        
    });
    $(document).on('blur change', '#measurement_total_number_record', function(){
        // getNumberRecordsMesurement(); 
        var val = $(this).val();
        if(val <=0){
            $('.measurement_number_record_error').text('Value always be greater than 0');
            $('#measurement_total_number_record').val('');
           
            var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
            $('#mesurement_select_table_entries').html(tr);
            $('#pagination_html').html('');
            $('#measurement_search_record').val();
            localStorage.removeItem('number_record_measurement');
           
            $('.measurement_number_record_error').fadeIn('slow');
            setTimeout( function(){
                $('.measurement_number_record_error').fadeOut('slow');
            },3000);
        }
        else{
            $('.measurement_number_record_error').text('');
            localStorage.setItem('number_record_measurement',val);
            // var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Click on Search Bar</td></tr>";
            // $('#mesurement_select_table_entries').html(tr);
            var data_type = $('#row_click_table').attr('data_type');
            var data_mst = $('#row_click_table').attr('data_mst');
            if(data_type != undefined && data_mst != undefined && data_type != '' && data_mst != ''){
                rowClickMeasurementTableData(data_mst,data_type);
            }
            else{
                getNumberRecordsMesurement();
            }
        }
    });

    $(document).on('keypress keyup blur focusin', '#measurement_search_record', function(){
        $('#measurement_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
        $('#measurement_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');
        getNumberRecordsMesurement(); 
    });

    $(document).on('click','.row_click', function(){
        var data_type = $(this).attr('data-type');
        var mst_id = $(this).attr('data-mst');
        var name_val = $(this).children('td:first').text();
        $('#measurement_search_record').val(name_val);
        $('#measurement_records_order_by option:contains("Order By Max Units Consumed")').text('Maximum');
        $('#measurement_records_order_by option:contains("Order By Min Units Consumed")').text('Minimum');
        rowClickMeasurementTableData(mst_id,data_type);
    })


    $(document).on('click', '.page_count_val', function(){
        var id = $(this).attr('id');
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        var page_value = $('div').find('li.active').find('input').val();
        if(id != undefined && id == 'previous_pagination_val'){
            var find_prev_val = $('div').find('li.active').prev('li').prev('li').find('input').val();
            page_value = find_prev_val;
        }
        else if(id != undefined && id == 'next_pagination_val'){
            var find_next_val = $('div').find('li.active').next('li').find('input').val();
            page_value = find_next_val;

        }
        if(data_type != '' && mst_id != '' && data_type != undefined && mst_id != undefined){
            rowClickMeasurementPaginationTableData(mst_id,data_type,page_value);
        }
        else{
            getNumberRecordsMesurementPagination(page_value); 
        }
      
    });

    //<--- 6-8-2021--
    $(document).on('blur','.pagination_input_val', function(){
        var page_value = $(this).val(); //$(this).val();
        var id = $(this).attr('id');
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        var last_input_val = $('#last_input_val').text();
        if(parseInt(page_value) <= 0){
            alert('Value Always Be greater than 0');
            page_value = 1;
            $(this).val(page_value);

        }
        else if(parseInt(page_value) > parseInt(last_input_val)){
            alert('Value Can not Be greater than end Page');
            page_value = 1;
            $(this).val(page_value);
        }
        
        if(data_type != '' && mst_id != '' && data_type != undefined && mst_id != undefined){
            rowClickMeasurementPaginationTableData(mst_id,data_type,page_value);
        }
        else{
            getNumberRecordsMesurementPagination(page_value); 
        }

    })

    $(document).on('change','#measurement_number_record', function(){
        var page_value = $('div').find('li.active').find('input').val();
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        var val = $(this).val();
        localStorage.setItem('selected_number_record_measurement',val);
        if(data_type != '' && mst_id != '' && data_type != undefined && mst_id != undefined){
            rowClickMeasurementPaginationTableData(mst_id,data_type,page_value,measurement_search_record = 'true');
        }
        else{
            getNumberRecordsMesurementPagination(page_value,measurement_search_record = 'true'); 
        }

    })
    // --end>

    //Energy Select Table
    $(document).on('change','#energy_number_record',function(){
        getNumberRecordsEnergy();
    });

    //Product
    $(document).on('change','#product_number_record',function(){
        getNumberRecordsProduct();
    });

    //Production Data 
    $(document).on('change','#production_data_number_record',function(){
        getNumberRecordsProductionData();
    });

    // <<---29-7-2021--
    $(document).on('click', '#save_select_changes' , function(){
        var arData = [];
        $('#dashboard_select_tag :selected').each(function(index){
            var div_id = $(this).val();
            var description = $(this).attr('description');
            arData.push({
                'div_id_val' : div_id, 'description_val' : description 
            })
        })
        // if(arData.length > 0){
        //     saveDashboardSelect(arData);
        // }
     
    });
    // --end-->

    $(document).on('click', '.tiles-click', function(){
        var div_id = $(this).attr('id');
        // console.log($(this).attr('data-i'));
        $("#"+div_id).fadeOut("20");
        $(".small-table_"+$(this).attr('data-i')).hide();
        tiles_click(div_id);
    });

    //<--15-8-2021--
    $(document).on('click','#save_table_btn', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count')
        {
            saveOverallCountTile();
        }
        else{
            var type = $(this).attr('data-type');
            saveTableFormat(type);
        }
    })
    //-end-->
    
    // <---16-8-2021--
    $(document).on('click','.tile-click-table', function(){
        var id_val = $(this).attr('id');
        switch(id_val){
            case 'mesurement_count_div':
                $('#tables_sidebar').click();
                $('#measurement_sidebar_option').click();
            break;
            
            case 'product_count_div':
                $('#tables_sidebar').click();
                $('#product_sidebar_option').click();
            break;
            
            case 'energy_count_div':
                $('#tables_sidebar').click();
                $('#energy_sidebar_option').click();
            break;
        }
    });
    // --end-->

    // <---17-8-2021---
    $(document).on('blur change','#modal-height-input-measurement,#modal-width-input-measurement', function(){
        var id_val = $(this).attr('id');
        var total_records = $('#total_records').val();
        var ar = [];
        if(id_val == "modal-height-input-measurement"){
            $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).removeClass('col-md-3');
            $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).removeClass('actual_tile_height');
            var height_val = $('#modal-height-input-measurement').val();
            if(height_val <= 0){
                $('#modal-height-input-measurement').val('');
                height_value = 145;
                $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).css('height',height_value);
                $('#modal-height-input-measurement-hidden').val(height_value);

            }
            else{
                // height_val = parseInt(height_val)+1;
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }

                $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).css('height',height_value);
                $('#modal-height-input-measurement-hidden').val(height_value);
            }
        }
        else if(id_val == "modal-width-input-measurement")
        {
            $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).removeClass('col-md-3');
            $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).removeClass('actual_tile_width');
            var width_val = $('#modal-width-input-measurement').val();
            if(width_val <=0 ){
                $('#modal-width-input-measurement').val('');
                width_value = 285;
                $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-measurement-hidden').val(width_value);
                // alert('Width Always be equal to greater than to actual Width');
                // $('#modal-width-input-measurement').val(width_val);
            }
            else{
                // width_val = parseInt(width_val) + 1;
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-measurement-hidden').val(width_value);
            }
            
        }
        
    });


    $(document).on('click','#modal_open_button', function(){
        var edit_id = localStorage.getItem('edit-measurement-tile');
        var tile_edit_value = $(this).attr('tile-edit');
        var ar = localStorage.getItem('dashboard_tile_data');
        dashboard_tile_data = JSON.parse(ar);
        var type_data_tile = dashboard_tile_data['type_data_tile'];
        var measurement_type = $('#measurement_type').val();
      
        if(tile_edit_value == 'false' && type_data_tile == "overall_count"){
            $('#save_table_btn').removeClass('display-none');
            $('#update_table_btn_measurement').addClass('display-none');
            $('.bd-example-modal-lg').modal('show');
            // <----08-9--2021---
            var type = "Measurement";
            generateHtmlMeasurementTiles(type);

            // --end-->
            var countValue = $('#overall_count').val();
            var record_name = $('#mst_id_hidden').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.measurement_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.measurement_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            // <----17-9-2021----
            $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');

            // --end--->

            //<--Edit and Delete Button
            // $('.measurement_html_modal_'+last_div_index+' .action-modal-button-div .edit_val').addClass('edit_btn_tile_count');
            // $('.measurement_html_modal_'+last_div_index+' .action-modal-button-div img').removeClass('edit_btn_tile');
            // $('.measurement_html_modal_'+last_div_index+' .action-modal-button-div img').removeClass('id_val delete_btn_tile');
            

            $('#modal-height-input-measurement').attr('disabled',true);
            $('#modal-width-input-measurement').attr('disabled',true);

            $('#modal-height-input-measurement').val('1');
            $('#modal-width-input-measurement').val('1');
            $('#modal-height-input-measurement-hidden').val(145);
            $('#modal-width-input-measurement-hidden').val(285);

            setTimeout(()=>{
                $('.measurement_html_modal_'+last_div_index+' .count_result_tile').text(measurement_type);
            },1100);

        }
        else if(tile_edit_value == 'false' && type_data_tile == 'table'){
            $('#save_table_btn').removeClass('display-none');
            $('#update_table_btn_measurement').addClass('display-none');
            var tableLength = $('#mesurement_select_table_entries tr').length;
            if(parseInt(tableLength) <= 5){
                $('.bd-example-modal-lg').modal('show');
                // <----20-8--2021---
                var type = "Measurement";
                generateHtmlMeasurementTiles(type);
                // --end-->
                var last_div_index = $('#total_records').val();
                var table_html = $('#measurement_record_tb').html();
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table').html(table_html);
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table thead ,.measurement_html_modal_'+last_div_index+' #measurement_modal_table tbody tr').removeAttr('class');
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table tbody').removeAttr('id');

                // <---23-8-2021---
                $('#modal-height-input-measurement-hidden').val(145);
                $('#modal-height-input-measurement').val('');
                $('#modal-width-input-measurement-hidden').val(285);
                $('#modal-width-input-measurement').val('');
                // --end-->

                $('#modal-height-input-measurement').attr('disabled',false);
                $('#modal-width-input-measurement').attr('disabled',false);

            }
            else{
                alert('Records are Always be less than 5');
            }
        }
        else if(tile_edit_value == 'true' && type_data_tile == 'table'){ //Table Edit Case
            var tableLength = $('#mesurement_select_table_entries tr').length;
            if(parseInt(tableLength) <= 5){
                $('#save_table_btn').addClass('display-none');
                $('#update_table_btn_measurement').removeClass('display-none');
                $('.bd-example-modal-lg').modal('show');
                var type = "Measurement";
                edit_tile(type,edit_id);
                var last_div_index = $('#total_records').val();
                var table_html = $('#measurement_record_tb').html();
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table').html(table_html);
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table thead ,.measurement_html_modal_'+last_div_index+' #measurement_modal_table tbody tr').removeAttr('class');
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table tbody').removeAttr('id');

                $('#modal-height-input-measurement').attr('disabled',false);
                $('#modal-width-input-measurement').attr('disabled',false);
            }
            else{
                alert('Records are Always be less than 5');
            }
        }
        else if(tile_edit_value == 'true' && type_data_tile == 'overall_count'){ //Overall Tile Edit
            $('#save_table_btn').addClass('display-none');
            $('#update_table_btn_measurement').removeClass('display-none');
            $('.bd-example-modal-lg').modal('show');
            var type = "Measurement";
            edit_tile(type,edit_id);
            var countValue = $('#overall_count').val();
            var record_name = $('#mst_id_hidden').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.measurement_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.measurement_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

             // <----17-9-2021----
             $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
             $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
             $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');
 
             // --end--->
             
            //<--Edit and Delete Button
            // $('.measurement_html_modal_'+last_div_index+' .action-modal-button-div .edit_val').addClass('edit_btn_tile_count');
            // $('.measurement_html_modal_'+last_div_index+' .action-modal-button-div img').removeClass('edit_btn_tile');
            // $('.measurement_html_modal_'+last_div_index+' .action-modal-button-div img').removeClass('id_val delete_btn_tile');
            

            $('#modal-height-input-measurement').attr('disabled',true);
            $('#modal-width-input-measurement').attr('disabled',true);

            $('#modal-height-input-measurement').val('1');
            $('#modal-width-input-measurement').val('1');
            $('#modal-height-input-measurement-hidden').val(145);
            $('#modal-width-input-measurement-hidden').val(285);

            setTimeout(()=>{
                $('.measurement_html_modal_'+last_div_index+' .count_result_tile').text(measurement_type);
            },1100);
        }

    })
    // --end->

    // <---20-8-2021----

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#mesurement_count_div,#product_count_div,#energy_count_div,#energy_consumed_div,#five_days_energy_consumed').length) {
            // $('.dashboard_count_div .stretch-card').css('height',145);
            // $('.dashboard_count_div .stretch-card').css('width',285);

            // $('.dashboard_count_div .movetile').addClass('col-md-3');
            $('.dashboard_count_div .stretch-card .card-body').addClass('row');
            $('.dashboard_count_div .stretch-card .card-body div:first-child').addClass('col-md-12');

            $('.dashboard_count_div .stretch-card .card-body').removeClass('overflow-hide display-flex');
            $('.dashboard_count_div .stretch-card .card-body').removeClass('ml-3');

            
            $('.dashboard_count_div .stretch-card').removeClass('tile-click-table');
            $('.dashboard_count_div .stretch-card').addClass('tiles-click');
            $('.dashboard_count_div .stretch-card').addClass('hide_table_main');

            $('.save_table_div_show').hide();
            $('.action-modal-button-div').removeClass('col-md-12');

            // $('.dashboard_count_div .stretch-card .small-table').show();

            // <----25-10-2021---
            $('.dashboard_count_div .movetile .overall_value_tile .card-body').removeClass('row');
            $('.dashboard_count_div .movetile .overall_value_tile .card-body div:first-child').removeClass('col-md-12');
            // --end-->


            // // <---7-10-2021---
            // console.log('Click Working');
            // var tile_html = $('.dashboard_count_div').html();
            // // // <---7-10-2021--
            //     tile_html = tile_html.replace("lineChart",'lineChart-none'); 
            //     tile_html = tile_html.replace("areaChart",'areaChart-none');
            //     tile_html = tile_html.replace("pieChart",'pieChart-none');
            //     tile_html = tile_html.replace("barChart",'barChart-none');
            // $('.dashboard_count_div').html(tile_html);

            // <---3-9-2021---
            // $('.dashboard_count_div canvas').removeAttr('id'); 
            
            // <---8-10-2021---
            $('.dashboard_count_div canvas').each(function(){
                var id = $(this).attr('id');
                if(id == 'areaChart'){
                    $(this).attr('id','areaChart-none');
                }
                else if(id == 'lineChart'){
                    $(this).attr('id','lineChart-none');
                }
                else if(id == 'pieChart'){
                    $(this).attr('id','pieChart-none');
                }
                else if(id == 'barChart'){
                    $(this).attr('id','barChart-none');
                }
            });
            // --end-->  
            // <---20-10-2021---
            // $('.dashboard_count_div .small-table').show();
            // --end--> 
            
            // --end-->
        }
        
    });


    // ---end--->

    // <----20-8-2021--
    $(document).on('click', '.save_and_proceed_btn_dashboard', function(e){
        $('#modal_open_button').val('Save & Preview');
        $('#modal_open_button').attr('tile-edit','false');
        var title_modal_tile = $('#title_modal_tile').val();
        if(title_modal_tile == ''){
            alert('Tiitle Can not be Empty');
            return false;
        
        }
        e.preventDefault();
        var record_type_of_tile =  $('#record_type_of_tile').val();
        var type_data_tile = $('#type_data_tile').val();
        var data_edit_chart = $(this).attr('data-edit-chart');
        if(record_type_of_tile == "measurement" && (type_data_tile == "table" || type_data_tile == 'overall_count') ){
            $('#tables_sidebar').click();
            $('#measurement_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');
            localStorage.setItem('measurement_title_modal_tile',title_modal_tile);
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            
            var edit_value = $(this).attr('data-edit');
            if(edit_value == 'true'){
                $('#modal_open_button').val('Update & Preview');
                $('#modal_open_button').attr('tile-edit','true');
            }
        }
        else if(record_type_of_tile == "product" && type_data_tile == "table"){
            $('#tables_sidebar').click();
            $('#product_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');
        }
        else if(record_type_of_tile == "energy" && type_data_tile == "table"){
            $('#tables_sidebar').click();
            $('#energy_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');
        }
        //chart
        else if(record_type_of_tile == "measurement" && type_data_tile == "chart" && data_edit_chart == 'false')
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getChartTileDashboard();
            $('#time_interval_chart option[value=1]').prop('selected','selected');
            getChartTimeIntervalRecord();
            dashboardChart();
            $('#measurement-height-chart').val('2');
            $('#measurement-height-chart-hidden').val('290');
            $('#measurement-width-chart').val('2');
            $('#measurement-width-chart-hidden').val('570');
            $('#dashboard_tile_modal_chart').modal('show');
            $('#chart_records_label').text('Select '+record_type_of_tile);
            $('#update_and_proceed_btn_dashboard_chart').hide();
            $('#save_and_proceed_btn_dashboard_chart').show();

        }
        else if(record_type_of_tile == "measurement" && type_data_tile == "chart" && data_edit_chart == 'true')
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            //getChartTimeIntervalRecord();
            getEditChartTileDashboard();
        
            $('#dashboard_tile_modal_chart').modal('show');
            $('#update_and_proceed_btn_dashboard_chart').show();
            $('#save_and_proceed_btn_dashboard_chart').hide();
            $('#chart_records_label').text('Select '+record_type_of_tile);

        }
        $('#title_modal_tile').val('');
        $('#record_type_of_tile option[value=measurement]').prop('selected','selected');
        $('#type_data_tile option[value=table').prop('selected', 'selected');
        
    });
    // --end-->

    // 23-8-2021---
    $(document).on('click','.delete_btn_tile',function(){
        var confResult = confirm('Are you sure want to Delete');
        if(confResult == true){
            var id=$(this).attr('class');
            id_val =id.split(" ")[0];
            deleteTile(id_val);
        }
        
    })
    //--end-->

    // <----30-8-2021---
    $(document).on('click','.edit_btn_tile',function(){
     
        var id=$(this).attr('class');
        var i_value = $(this).attr('data-i-value');
        id_val =id.split(" ")[0];
        getEditDataDashboard(id_val,i_value);
        $('#dashboard_tile_modal').modal('show');   

        // if(data_type == "Measurement"){
        //     var id=$(this).attr('class');
        //     var i_value = $(this).attr('data-i-value');
        //     id_val =id.split(" ")[0];
        //     $('#tables_sidebar').click();
        //     $('#measurement_sidebar_option').click();
        //     $('#dashboard_tile_modal').modal('hide');
        //     localStorage.setItem('edit-measurement-tile',id_val)
        //     localStorage.setItem('edit-i-value',i_value);
        //     $('#modal_open_button').val('Update & Preview');
        // }

    });
    // --end-->

    // <----31-8-2021---
    $(document).on('click','#update_table_btn_measurement', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'table')
        {
            updateTileRecord();
        }
        else if(ar['type_data_tile'] == 'overall_count')
        {
            updateTileRecordOverallCount();
        }
        
    })
    // --end--

    // <----01-9-2021---
    $(document).on('click','#dashboard_add_tile', function(){
        $('#save_and_proceed_btn_dashboard').val('Save & Proceed');
        $('#save_and_proceed_btn_dashboard').attr('data-edit','false');
        $('#save_and_proceed_btn_dashboard').attr('data-edit-chart','false');
        

        $("#type_data_tile").removeAttr('disabled');
    });
    // --end-->

    // <----02-9-2021---
    $(document).on('blur change','#measurement-height-chart,#measurement-width-chart', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records_chart').val();
        if(id == 'measurement-height-chart')
        {
            $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
            $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            var height_val = $('#measurement-height-chart').val();
            if(height_val <= 1){
                $('#measurement-height-chart').val(2);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).css('height',height_value);
                $('#measurement-height-chart-hidden').val(height_value);
            }
            
            
            
        }
        else if(id == 'measurement-width-chart'){
            $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
            $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            var width_val = $('#measurement-width-chart').val();
            if(width_val <= 1){
                $('#measurement-width-chart').val(2);
            }
            else{
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).css('width',width_value);
                $('#measurement-width-chart-hidden').val(width_value);
            }

        }
    })
    // --end-->

    // <---02-8-2021----
    $(document).on('click', '#save_and_proceed_btn_dashboard_chart', function(){
        saveDashboardTileChart();
    })
    // --end-->

    $(document).on('change','#time_interval_chart',function(){
        getChartTimeIntervalRecord();
        chartRecordFilter();
    });

    $(document).on('change','#chart_record_filter',function(){
       chartRecordFilter(); 
    });

    // <---7-9-2021----
    $(document).on('change','#measurement_type', function(){
        var val = $(this).val();
        if(val == 'automatic'){
            $('#measurement_records_order_by option:contains("Order By Max Units Consumed")').text('Maximum');
            $('#measurement_records_order_by option:contains("Order By Min Units Consumed")').text('Minimum');
        }else{
            $('#measurement_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
            $('#measurement_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');   
        }
        // if(val == 'manually')
        // {
            getNumberRecordsMesurement();
        // }
        // else{
        //     var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Measurement Type Entered Manually</td></tr>";
        //     $('#mesurement_select_table_entries').html(tr);
        // }
    })

    // <---21-9-2021---
    $(document).on('click','#save_position_tile', function(){
        let tilelength = $('#dashboard_count_div_tile .stretch-card').length;
        if(tilelength > 0){
            var ar = [];
            $('#dashboard_count_div_tile .stretch-card').each(function(i,val){
                var id = $(this).attr('class');
                id_val =id.split(" ")[0];
                ar.push({'id': id_val , 'position' : i});
            });
            saveDashboardTilePosititon(ar);
        }
    });
    // ---end-->


    //<----28-9-2021---
    $(document).on('click','.dashboard_menu_click', function(){
        var id_val = $(this).attr('id');
        localStorage.setItem('dashboard_menu_click_option',id_val);
        var pathname = window.location.pathname;
        var arPathname = pathname.split('/');
        if(arPathname.length > 3){
            window.open('/'+arPathname[1]+'/main.html','_self');
        }
        else{
            window.open('/main.html','_self');
        }
    });
    // --end-->


    // <---30-9-2021---
    $(document).on('change','#dashboard_database_list',function(){
        var val = $(this).val();
        // var dashboardDbName = $(this).attr("dashboardbValue");
        var dashboardDbName = $('option:selected', this).attr('dashboardbValue');
        // console.log(dashboardDbName);
        localStorage.setItem('dashboardDBName',val);
        localStorage.setItem('dashboardDB',dashboardDbName);

    });
    // -end-->

    // <---3-9-2021--
    $(document).on('change','#chart_records,#chart_type', function(){
        chartRecordFilter();
    });
    // --end-->

    // <--7-10-2021---
    $(document).on('click','.edit_btn_tile_chart',function(){
        var id=$(this).attr('class');
        var i_value = $(this).attr('data-i-value');
        id_val =id.split(" ")[0];
        getEditDataDashboard(id_val,i_value);
        $('#dashboard_tile_modal').modal('show');   
    });
    // --end---->
    
    // <---7-10-2021--
    $(document).on('click','#update_and_proceed_btn_dashboard_chart', function(){
        updateDashboardChart();
    });
    // --end--->

    // <----20-10-2021---
    $(document).on('click','#expand_view_chart', ()=>{
        var valIsChecked = $('#expand_view_chart').is(":checked");
        if(valIsChecked == true){
            $('#expand_view_chart').val("1");
        }
        else{
            $('#expand_view_chart').val("0");
        }
    });
    // --end-->


    // <---22-10-2021--
    // $("body").not($(".dashboard_count_div .movetile")).click(function(){
    //     // console.log("323");
    // });

    $(document).on('click', function (event) {
        // console.log($(event.target).closest('#dashboard_count_div_tile .movetile .tiles-click').length);
        if (!$(event.target).closest('#dashboard_count_div_tile .movetile .tiles-click').length) {
          // ... clicked on the 'body', but not inside of #menutop
          //   getTableFormatDashboard();
          // console.log('Working on a OutSide tile');
          var tileClickData = localStorage.getItem('tileDashboardClickData');
          if(tileClickData != null && tileClickData != undefined){
            tileClickData = JSON.parse(tileClickData);
            console.log(tileClickData['height']);
          }
            
        }
    });
    // --end-->


    // // <---1-10-2021--
    // // Graph
    // // window.onload = function () {

    //     var chart = new CanvasJS.Chart("chartContainer", {
    //         animationEnabled: true,
    //         theme: "light2",
    //         title:{
    //             text: "Site Traffic"
    //         },
    //         axisX:{
    //             valueFormatString: "DD MMM",
    //             crosshair: {
    //                 enabled: true,
    //                 snapToDataPoint: true
    //             }
    //         },
    //         axisY: {
    //             title: "Number of Visits",
    //             includeZero: true,
    //             crosshair: {
    //                 enabled: true
    //             }
    //         },
    //         toolTip:{
    //             shared:true
    //         },  
    //         legend:{
    //             cursor:"pointer",
    //             verticalAlign: "bottom",
    //             horizontalAlign: "left",
    //             dockInsidePlotArea: true,
    //             itemclick: toogleDataSeries
    //         },
    //         data: [{
    //             type: "line",
    //             showInLegend: true,
    //             name: "Total Visit",
    //             markerType: "square",
    //             xValueFormatString: "DD MMM, YYYY",
    //             color: "#F08080",
    //             dataPoints: [
    //                 { x: new Date(2017, 0, 3), y: 650 },
    //                 { x: new Date(2017, 0, 4), y: 700 },
    //                 { x: new Date(2017, 0, 5), y: 710 },
    //                 { x: new Date(2017, 0, 6), y: 658 },
    //                 { x: new Date(2017, 0, 7), y: 734 },
    //                 { x: new Date(2017, 0, 8), y: 963 },
    //                 { x: new Date(2017, 0, 9), y: 847 },
    //                 { x: new Date(2017, 0, 10), y: 853 },
    //                 { x: new Date(2017, 0, 11), y: 869 },
    //                 { x: new Date(2017, 0, 12), y: 943 },
    //                 { x: new Date(2017, 0, 13), y: 970 },
    //                 { x: new Date(2017, 0, 14), y: 869 },
    //                 { x: new Date(2017, 0, 15), y: 890 },
    //                 { x: new Date(2017, 0, 16), y: 930 }
    //             ]
    //         },
    //         {
    //             type: "line",
    //             showInLegend: true,
    //             name: "Unique Visit",
    //             lineDashType: "dash",
    //             dataPoints: [
    //                 { x: new Date(2017, 0, 3), y: 510 },
    //                 { x: new Date(2017, 0, 4), y: 560 },
    //                 { x: new Date(2017, 0, 5), y: 540 },
    //                 { x: new Date(2017, 0, 6), y: 558 },
    //                 { x: new Date(2017, 0, 7), y: 544 },
    //                 { x: new Date(2017, 0, 8), y: 693 },
    //                 { x: new Date(2017, 0, 9), y: 657 },
    //                 { x: new Date(2017, 0, 10), y: 663 },
    //                 { x: new Date(2017, 0, 11), y: 639 },
    //                 { x: new Date(2017, 0, 12), y: 673 },
    //                 { x: new Date(2017, 0, 13), y: 660 },
    //                 { x: new Date(2017, 0, 14), y: 562 },
    //                 { x: new Date(2017, 0, 15), y: 643 },
    //                 { x: new Date(2017, 0, 16), y: 570 }
    //             ]
    //         }]
    //     });
    //     chart.render();
        
    //     function toogleDataSeries(e){
    //         console.log(e)
    //         if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    //             e.dataSeries.visible = false;
    //         } else{
    //             e.dataSeries.visible = true;
    //         }
    //         chart.render();
    //     }
        
    //     // }
    // --end-->

    // $(document).on('click','#dashboard_drag_btn', function(){
    //     $('#dashboard_count_div_tile .stretch-card').draggable();
    // })

    // $(document).on('click','#reset_drag_btn', function(){
    //     getTableFormatDashboard();
    //     $(document).trigger('click');
    //     $('#dashboard_count_div_tile .stretch-card').draggable();
    // })
    // --end-->

    
    
    // <---12-8-2021----
    // $('#mesurement_count_div').hover(
    //     function(){
    //         $(this).addClass('col-md-12');
    //         $(this).css('height','262px');
    //         $('#mesurement_count_content').addClass('col-md-3');
    //         $('#mesurement_count_content').removeClass('col-md-12');
    //         $('#measurement_table_show').show();
    //     },
    //     function(){
    //         $(this).removeClass('col-md-12');
    //         $(this).css('height','auto')
    //         $('#mesurement_count_content').addClass('col-md-12');
    //         $('#mesurement_count_content').removeClass('col-md-3');
    //         $('#measurement_table_show').hide();
    //     }
    // )

    // $('#product_count_div').hover(
    //     function(){
    //         $(this).addClass('col-md-12');
    //         $(this).css('height','262px');
    //         $('#mesurement_count_div').hide();    
    //         $('#product_count_content').addClass('col-md-3');
    //         $('#product_count_content').removeClass('col-md-12');
    //         $('#product_table_div_show').show();

    //     },
    //     function(){
    //         $(this).removeClass('col-md-12');
    //         $(this).css('height','auto');
    //         $('#mesurement_count_div').show();    
    //         $('#product_count_content').addClass('col-md-12');
    //         $('#product_count_content').removeClass('col-md-3');
    //         $('#product_table_div_show').hide();
    //     }
    // )


    
    // $('#energy_count_div').hover(
    //     function(){
    //         $(this).addClass('col-md-12');
    //         $(this).css('height','262px');
    //         $('#mesurement_count_div').hide();
    //         $('#product_count_div').hide();    
    //         $('#energy_count_content').addClass('col-md-3');
    //         $('#energy_count_content').removeClass('col-md-12');
    //         $('#energy_table_show').show();
            

    //     },
    //     function(){
    //         $(this).removeClass('col-md-12');
    //         $(this).css('height','auto');
    //         $('#mesurement_count_div').show(); 
    //         $('#product_count_div').show();   
    //         $('#energy_count_content').addClass('col-md-12');
    //         $('#energy_count_content').removeClass('col-md-3');
    //         $('#energy_table_show').hide();
    //     }
    // )


    // $('#energy_consumed_div').hover(
    //     function(){
    //         $(this).addClass('col-md-12');
    //         $(this).css('height','262px');
    //         $('#mesurement_count_div').hide();
    //         $('#product_count_div').hide(); 
    //         $('#energy_count_div').hide();   
    //         $('#energy_consumed_content').addClass('col-md-3');
    //         $('#energy_consumed_content').removeClass('col-md-12');
    //         $('#energy_consumed_table_show').show();
            

    //     },
    //     function(){
    //         $(this).removeClass('col-md-12');
    //         $(this).css('height','auto');
    //         $('#mesurement_count_div').show(); 
    //         $('#product_count_div').show(); 
    //         $('#energy_count_div').show();  
    //         $('#energy_consumed_content').addClass('col-md-12');
    //         $('#energy_consumed_content').removeClass('col-md-3');
    //         $('#energy_consumed_table_show').hide();
    //     }
    // )


    // $('#five_days_energy_consumed').hover(
    //     function(){
    //         $(this).addClass('col-md-12');
    //         $(this).css('height','262px');
    //         $('#mesurement_count_div').hide();
    //         $('#product_count_div').hide(); 
    //         $('#energy_count_div').hide();  
    //         $('#energy_consumed_div').hide();
    //         $('#energy_consumed_five_day_content').addClass('col-md-3');
    //         $('#energy_consumed_five_day_content').removeClass('col-md-12');
    //         $('#energy_consumed_five_day_table_show').show();
            

    //     },
    //     function(){
    //         $(this).removeClass('col-md-12');
    //         $(this).css('height','auto');
    //         $('#mesurement_count_div').show(); 
    //         $('#product_count_div').show(); 
    //         $('#energy_count_div').show();  
    //         $('#energy_consumed_div').show();
    //         $('#energy_consumed_five_day_content').addClass('col-md-12');
    //         $('#energy_consumed_five_day_content').removeClass('col-md-3');
    //         $('#energy_consumed_five_day_table_show').hide();
    //     }
    // )




    // <--Sorting -----
    // $('#measurement_record_table table .measurement_table_header th').click(function(){
    //     var table = $(this).parents('table').eq(0)
    //     var tableHeaderValue = $(this).text();
    //     if(tableHeaderValue == 'Time Interval' || tableHeaderValue == 'Status'){
    //         return false;
    //     }
    //     var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index(),tableHeaderValue))
    //     this.asc = !this.asc
    //     // var asc = this.asc
    //     // if(asc == true){
    //     //     $(this).find('i').removeClass('ti-arrow-circle-down');
    //     //     $(this).find('i').addClass('ti-arrow-circle-up');
    //     // }
    //     // else{
    //     //     $(this).find('i').removeClass('ti-arrow-circle-up');
    //     //     $(this).find('i').addClass('ti-arrow-circle-down');

    //     // }
    //     if (!this.asc){rows = rows.reverse()}
    //     for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    // });
    ///--end----->
   


    
    //Screenshot Code 
    // $(document).on('click','#screenshot_button', function(){
    //     var val = alert("Screenshot Captured Successfully");
    //     screenshot();
    // });
    // --end-->



   

})