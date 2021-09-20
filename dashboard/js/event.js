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
        getNumberRecordsMesurement(); 
    });

    $(document).on('click','.row_click', function(){
        var data_type = $(this).attr('data-type');
        var mst_id = $(this).attr('data-mst');
        var name_val = $(this).children('td:first').text();
        $('#measurement_search_record').val(name_val);
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
        $("#"+div_id).fadeOut("20");
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
            var count_html = "<h4 class='text-muted record-name-overall-count'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"</h4>";
            
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
            var count_html = "<h4 class='text-muted record-name-overall-count'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"</h4>";
            
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
            $('.dashboard_count_div .stretch-card').css('height',145);
            $('.dashboard_count_div .stretch-card').css('width',285);

            $('.dashboard_count_div .stretch-card').addClass('col-md-3');
            $('.dashboard_count_div .stretch-card .card-body').addClass('row');
            $('.dashboard_count_div .stretch-card .card-body div:first-child').addClass('col-md-12');

            $('.dashboard_count_div .stretch-card .card-body').removeClass('overflow-hide display-flex');
            $('.dashboard_count_div .stretch-card .card-body').removeClass('ml-3');

            
            $('.dashboard_count_div .stretch-card').removeClass('tile-click-table');
            $('.dashboard_count_div .stretch-card').addClass('tiles-click');
            $('.dashboard_count_div .stretch-card').addClass('hide_table_main');

            $('.save_table_div_show').hide();
            $('.action-modal-button-div').removeClass('col-md-12');

            // <---3-9-2021---
            // $('.dashboard_count_div canvas').removeAttr('id');    
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
        else if(record_type_of_tile == "measurement" && type_data_tile == "chart")
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getChartTileDashboard();
            getChartTimeIntervalRecord();
            dashboardChart();
            $('#measurement-height-chart').val('');
            $('#measurement-height-chart-hidden').val('145');
            $('#measurement-width-chart').val('');
            $('#measurement-width-chart-hidden').val('285');
            $('#dashboard_tile_modal_chart').modal('show');
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
            if(height_val <= 0){
                $('#measurement-height-chart').val('');
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
            if(width_val <= 0){
                $('#measurement-width-chart').val('');
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
    });

    $(document).on('change','#chart_record_filter',function(){
       chartRecordFilter(); 
    });

    // <---7-9-2021----
    $(document).on('change','#measurement_type', function(){
        var val = $(this).val();
        // if(val == 'manually')
        // {
            getNumberRecordsMesurement();
        // }
        // else{
        //     var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Measurement Type Entered Manually</td></tr>";
        //     $('#mesurement_select_table_entries').html(tr);
        // }
    })


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