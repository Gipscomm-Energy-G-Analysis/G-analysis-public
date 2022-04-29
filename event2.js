$(document).ready( function(){
    // setTimeout(function () {
    //     getDimentions();
    //  },500);
    var dashboardDBStorage = localStorage.getItem('dashboardDB');
    if(dashboardDBStorage=='' || dashboardDBStorage==null){
        dashboardDBStorage='g002_badber';
    }
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
                setTimeout(function () {

                    showexpandedchart();

                },1000);

                // localStorage.removeItem('dashboard_tile_data');
                // --end-->
                break;
            
            // case "charts_sidebar":
            //     var dashboardDBChart = localStorage.getItem('dashboardDBName');
            //     localStorage.setItem('dashboardDBChart',dashboardDBChart);
            //     localStorage.removeItem('dashboardDBName');
            //     var pathname = window.location.pathname;
            //     var arPathname = pathname.split('/');
            //     var mainDirectory = arPathname.length > 2 ? '/'+arPathname[1] : arPathname[0];
            //     // window.open('/'+mainDirectory+'/main.html','_self');
            //     if(arPathname.length > 3){
            //         window.open('/'+arPathname[1]+'/main.html','_self');
            //     }
            //     else{
            //         window.open('/main.html','_self');
            //     }
            //     // window.open(mainDirectory+'/main.html','_self');
            //     $('#charts_main_div').show();
            //     $('#dashboard_main_div').hide();
            //     $('#energy_table_main_div').hide();
            //     $('#measurement_table_main_div').hide();
            //     $('#production_data_table_main_div').hide();
            //     $('#production_table_main_div').hide();
            //     $('#wert_main_div').hide();
            //     $('#alerts_table_main_div').hide();
            //     $('#help_table_main_div').hide();
            //     break;

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
                // $('.Product').show();
                $('#production_table_main_div').show();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();

                var tr= "<tr><td colspan='5' class='text-center' style='padding: 6px;'>Please Select Product</td></tr>";
                $('#product_select_table_entries').html(tr);
                $('#product_select_table_entries_pagination').html('');
                $('#all_product_input_text_field').val('');
                $('#product_records_order_by_div').hide();

                // getNumberRecordsProduct();
                $("#product_type option[value='automatic']").prop('selected','selecetd');
                var number_record_local_val = localStorage.getItem('number_record_product');
                if(number_record_local_val != undefined && number_record_local_val != null){
                    $('#product_total_number_record').val(number_record_local_val);
                }
                getAllProductTables();
                // getNumberRecordsProductAutomatic();


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

                // <--18-11-2021--
                var number_record_local_val = localStorage.getItem('number_record_energy');
                if(number_record_local_val != undefined && number_record_local_val != null){
                    $('#energy_total_number_record').val(number_record_local_val);
                    $('#energy_search_record').val('');
                    //getNumberRecordsEnergy(); //03-3-2022
                    // return false;

                    $('#energy_automatic_input').val('');
                    getAllMeasurementEnergyAutomatic();
                }
                else{
                    $('#energy_total_number_record').val('');
                    $('#energy_search_record').val('');
                    // getNumberRecordsEnergy(); //03-3-2022


                    $('#energy_automatic_input').val('');
                    getAllMeasurementEnergyAutomatic();
                }
                // ---end--->
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
                $('#help_video').get(1).play();    
                break;

            case "home_nav_bar":
                var dashboardDBChart = localStorage.getItem('dashboardDBName');
                localStorage.setItem('dashboardDbRedirectHome',dashboardDBChart);
                localStorage.removeItem('dashboardDBName');
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                // console.log('pathname',pathname);
                // console.log('ar pathname',arPathname);
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
    getDatabaseList();
    setTimeout( ()=>{
        $('#dashboard_database_list').trigger('change');
        getTableFormatDashboard();
        $('#dashboard_main_div').click();
    },500);
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


    
    // <----17-11-2021---
    //Energy
    $(document).on('change','#energy_time_interval,#energy_records_order_by',function(){
        var id_val = $(this).attr('id');
        if(id_val == 'energy_records_order_by'){
            var data_type = $('#row_click_table_energy').attr('data_type');
            var data_mst = $('#row_click_table_energy').attr('data_mst');
            if(data_type != undefined && data_mst != undefined && data_type != '' && data_mst != ''){
                rowClickEnergyTableData(data_mst,data_type);
            }
            else{
                getNumberRecordsEnergy();
            }
        }else{
            getNumberRecordsEnergy();
        }
        
    });
    // --end-->

    
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
                // rowClickMeasurementTableData(data_mst,data_type);
            }
            else{
                // getNumberRecordsMesurement();
            }
        }
    });


    // <---17-11-2021--
    $(document).on('blur change', '#energy_total_number_record', function(){
        var val = $(this).val();
        if(val <=0){
            $('.energy_number_record_error').text('Value always be greater than 0');
            $('#energy_total_number_record').val('');
           
            var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select Total No. of Records</td></tr>";
            $('#energy_select_table_entries').html(tr);
            $('#pagination_html_energy').html('');
            $('#energy_search_record').val();
            localStorage.removeItem('number_record_energy');
           
            $('.energy_number_record_error').fadeIn('slow');
            setTimeout( function(){
                $('.energy_number_record_error').fadeOut('slow');
            },3000);
        }
        else{
            $('.energy_number_record_error').text('');
            localStorage.setItem('number_record_energy',val);
            
            var data_type = $('#row_click_table_energy').attr('data_type');
            var data_mst = $('#row_click_table_energy').attr('data_mst');
            if(data_type != undefined && data_mst != undefined && data_type != '' && data_mst != ''){
                // rowClickEnergyTableData(data_mst,data_type);
            }
            else{
                // getNumberRecordsEnergy();
            }
        }
    });
    // --end-->

    $(document).on('keypress keyup blur focusin', '#measurement_search_record', function(){
        $('#measurement_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
        $('#measurement_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');
        getNumberRecordsMesurement(); 
    });

    // <---17-11-2021---
    $(document).on('keypress keyup blur focusin', '#energy_search_record', function(){
        $('#energy_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
        $('#energy_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');
        var energy_type = $('#energy_type').val();
        if(energy_type == 'manually')
        {
            getNumberRecordsEnergy(); 
        }
        
    });
    // --end--->

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

    
    // <---18-11-2021---

    $(document).on('click','.row_click_energy', function(){
        var energy_type = $('#energy_type').val();

        if(energy_type == 'layer_modal')
        {
            // var valid_from = $(this).attr('valid_from');
            // var valid_to = $(this).attr('valid_to');
            // var name_val = $(this).children('td:first').text();
            // $('#energy_search_record').val(name_val);
            // console.log($(this).children('td:eq(1)'));
            // <---14-01-2021---
            // var click_row_array = [];
            // $(this).closest('tr').find('td').each((key,val)=>{
            //     click_row_array.push(val.innerHTML);
            // });
            // console.log(click_row_array); 
            // --end--->

            // <-----15-2-2021---
            var name_val = $(this).children('td:eq(0)').text();
            var valid_from = $(this).children('td:eq(1)').text();
            var valid_to = $(this).children('td:eq(2)').text();
            var time_from = $(this).children('td:eq(4)').text();
            var time_to = $(this).children('td:eq(5)').text();
            var energy_total_value = $(this).children('td:eq(6)').text();
            $('#energy_search_record').val(name_val);
            
            // console.log(energy_total_value);
            if(energy_total_value == '0')
            {
                var tr = "<tr><td colspan='50' class='text-center text-muted'>No Record Found</td></tr>";
                $('#energy_select_table_entries').html(tr);
                $('#pagination_html_energy').html('');
            }
            else{
                rowClickEnergyLayer(name_val,valid_from,valid_to,time_from,time_to); 
            }
            // rowClickEnergyTableDataLayer(valid_from,valid_to,click_row_array)
        }
        else if(energy_type == 'automatic'){
            $('#back_energy_btn_table').show();
            var name_val = $(this).children('td:eq(0)').text();
            var dateValue = $(this).children('td:eq(1)').text();
            var totalSumValue = $(this).children('td:eq(1)').text();
            $('#energy_search_record').val(name_val);
            if(totalSumValue == '0')
            {
                var tr = "<tr><td colspan='50' class='text-center text-muted'>No Record Found</td></tr>";
                $('#energy_select_table_entries').html(tr);
                $('#pagination_html_energy').html('');
            }
            else{
                rowClickEnergyAutomatic(name_val,dateValue);
            }
        }
        else {
            var data_type = $(this).attr('data-type');
            var mst_id = $(this).attr('data-mst');
            var name_val = $(this).children('td:first').text();
            $('#energy_search_record').val(name_val);
            $('#energy_records_order_by option:contains("Order By Max Units Consumed")').text('Maximum');
            $('#energy_records_order_by option:contains("Order By Min Units Consumed")').text('Minimum');
            rowClickEnergyTableData(mst_id,data_type);
        }
    })


    $(document).on('click', '.page_count_val_energy', function(){
        var id = $(this).attr('id');
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        var page_value = $('div').find('li.active').find('input').val();
        if(id != undefined && id == 'previous_pagination_val_energy'){
            var find_prev_val = $('div').find('li.active').prev('li').prev('li').find('input').val();
            page_value = find_prev_val;
        }
        else if(id != undefined && id == 'next_pagination_val_energy'){
            var find_next_val = $('div').find('li.active').next('li').find('input').val();
            page_value = find_next_val;

        }
        if(data_type != '' && mst_id != '' && data_type != undefined && mst_id != undefined){
            rowClickEnergyPaginationTableData(mst_id,data_type,page_value);
        }
        else{
            getNumberRecordsEnergyPagination(page_value); 
        }
      
    });

    // <----17-1-2022-
    $(document).on('click', '.page_count_val_energy_layer', function(){
        var id = $(this).attr('id');
        var page_value = $('div').find('li.active').find('input').val();
        if(id != undefined && id == 'previous_pagination_val_energy_layer'){
            var find_prev_val = $('#pagination_html_energy div').find('li.active').prev('li').prev('li').find('input').val();
            page_value = find_prev_val;
        }
        else if(id != undefined && id == 'next_pagination_val_energy_layer'){
            var find_next_val = $('div').find('li.active').next('li').find('input').val();
            page_value = find_next_val;

        }
        getNumberRecordsEnergyLayerModalPagination(page_value); 
      
    });
    // -end--->


    $(document).on('blur','.pagination_input_val_energy', function(){
        var page_value = $(this).val(); //$(this).val();
        var id = $(this).attr('id');
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        var last_input_val = $('#last_input_val_energy').text();
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
            rowClickEnergyPaginationTableData(mst_id,data_type,page_value);
        }
        else{
            getNumberRecordsEnergyPagination(page_value); 
        }

    })

    // <---17-01-2022--
    $(document).on('blur','.pagination_input_val_energy_layer', function(){
        var page_value = $(this).val(); //$(this).val();
        var id = $(this).attr('id');
        var last_input_val = $('#last_input_val_energy_layer').text();
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
        getNumberRecordsEnergyLayerModalPagination(page_value); 

    })
    // --end-->

    $(document).on('change','#energy_number_record', function(){
        var page_value = $('div').find('li.active').find('input').val();
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        var val = $(this).val();
        localStorage.setItem('selected_number_record_energy',val);
        if(data_type != '' && mst_id != '' && data_type != undefined && mst_id != undefined){
            rowClickEnergyPaginationTableData(mst_id,data_type,page_value,selected_number_record_energy = 'true');
        }
        else{
            getNumberRecordsEnergyPagination(page_value,energy_search_record = 'true'); 
        }

    })

    $(document).on('change','#energy_number_record_layer', function(){
        var page_value = $('div').find('li.active').find('input').val();
        getNumberRecordsEnergyLayerModalPagination(page_value,energy_search_record = 'true'); 
    });


    // ---end--->



    //Energy Select Table
    $(document).on('change','#energy_number_record',function(){
        // getNumberRecordsEnergy();
    });

    //Product
    $(document).on('change','#product_number_record',function(){
        // getNumberRecordsProduct();
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
        // var div_id = $(this).attr('class');
        // console.log($(this).attr('data-i'));
        // $("#"+div_id).fadeOut("20");
        var id=$(this).attr('class');
        div_id =id.split(" ")[0];
        $('.'+div_id+'.tiles-click').fadeOut("20");
        $(".small-table_"+$(this).attr('data-i')).hide();
        tiles_click(div_id,prd_automatic_tile = false);
    });

    // <----28-12-2021--
    $(document).on('click', '.product_automatic_tile', function(){
        // var div_id = $(this).attr('id');
        // console.log($(this).attr('data-i'));
        // $("#"+div_id).fadeOut("20");
        var id=$(this).attr('class');
        div_id =id.split(" ")[0];
        $('.'+div_id+'.product_automatic_tile').fadeOut("20");
        $(".small-table_"+$(this).attr('data-i')).hide();
        tiles_click(div_id,prd_automatic_tile = true);
    });
    // --end-->

    //<--15-8-2021--
    $(document).on('click','#save_table_btn', function(){
        var valIsChecked = $('#expand_view_table_measurement').is(":checked");
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count' && ar['record_type_of_tile'] == 'measurement')
        {
            saveOverallCountTile();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'measurement' && valIsChecked == true){
            alert('entert here 1 ');
            saveTableFormatMeasurementExpandView();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'measurement'){
            var type = $(this).attr('data-type');
            alert('entert here 2 ');
            saveTableFormat(type);
        }
    })
    //-end-->

    // <---22-11-2021---
    $(document).on('click','#save_table_btn_energy', function(){
        var valIsChecked = $('#expand_view_table').is(":checked");
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count' && ar['record_type_of_tile'] == 'energy')
        {
            saveOverallCountTileEnergy();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'energy' && valIsChecked == true){
            saveTableFormatEnergyExpandView();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'energy'){
            // alert('work here');
            saveTableFormatEnergy();
        }
        setTimeout(function () {
            showexpandedchart();
        },1000);
    })
    //--end--->

    $(document).on('click','#save_table_btn_product', function(){
        var valIsChecked = $('#expand_view_table_product').is(":checked");
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count' && ar['record_type_of_tile'] == 'product')
        {
            saveOverallCountTileProduct();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'product' && valIsChecked == true){
            saveTableFormatProductExpandView();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'product'){
            var product_type = $('#product_type').val();
            if(product_type == 'automatic')
            {
                saveTableFormatProductAutomatic();
            }
            else{
                saveTableFormatProduct();
            }
        }
    })
    
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

        $('.energy_tile_modal').modal('hide'); //Energy Modal Hide
      
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


                // <---10-11-2021---
                var query_data_row_click = localStorage.getItem('query_data');
                query_data_row_click = JSON.parse(query_data_row_click);

                if(query_data_row_click['row_click'] == 'true')
                {
                    var date_data = $('#row_click_last_date').val();
                    var total_sum = $('#overall_count').val();

                    $('.measurement_html_modal_'+last_div_index+' .small-table #td_table_tile_text_'+last_div_index).text(date_data);
                    $('.measurement_html_modal_'+last_div_index+' .small-table #td_table_tile_two_text_'+last_div_index).text(total_sum);

                    $('.measurement_html_modal_'+last_div_index+' .small-table').addClass('tile_table_small_table');
                }
                else{
                    $('.measurement_html_modal_'+last_div_index+' .small-table').html('');
                }
                // --end-->

            }
            else{
                alert('Records are Always be less than 5');
            }

            $('#expand_view_table_product').prop('checked',false);
            $('#expand_view_table_product').val(0);

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

                // <---10-11-2021---
                var query_data_row_click = localStorage.getItem('query_data');
                query_data_row_click = JSON.parse(query_data_row_click);

                if(query_data_row_click['row_click'] == 'true')
                {
                    var date_data = $('#row_click_last_date').val();
                    var total_sum = $('#overall_count').val();

                    $('.measurement_html_modal_'+last_div_index+' .small-table #td_table_tile_text_'+last_div_index).text(date_data);
                    $('.measurement_html_modal_'+last_div_index+' .small-table #td_table_tile_two_text_'+last_div_index).text(total_sum);
                    
                    $('.measurement_html_modal_'+last_div_index+' .small-table').addClass('tile_table_small_table');
                }
                else{
                    $('.measurement_html_modal_'+last_div_index+' .small-table').html('');
                }
                // --end-->
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

    // <----22-11-2021----
    $(document).on('blur change','#modal-height-input-energy,#modal-width-input-energy', function(){
        var id_val = $(this).attr('id');
        var total_records = $('#total_records').val();
        var ar = [];
        if(id_val == "modal-height-input-energy"){
            $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).removeClass('col-md-3');
            $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).removeClass('actual_tile_height');
            var height_val = $('#modal-height-input-energy').val();
            if(height_val <= 0){
                $('#modal-height-input-energy').val('');
                height_value = 145;
                $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).css('height',height_value);
                $('#modal-height-input-energy-hidden').val(height_value);

            }
            else{
                // height_val = parseInt(height_val)+1;
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }

                $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).css('height',height_value);
                $('#modal-height-input-energy-hidden').val(height_value);
            }
        }
        else if(id_val == "modal-width-input-energy")
        {
            $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).removeClass('col-md-3');
            $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).removeClass('actual_tile_width');
            var width_val = $('#modal-width-input-energy').val();
            if(width_val <=0 ){
                $('#modal-width-input-energy').val('');
                width_value = 285;
                $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-energy-hidden').val(width_value);
                // alert('Width Always be equal to greater than to actual Width');
                // $('#modal-width-input-measurement').val(width_val);
            }
            else{
                // width_val = parseInt(width_val) + 1;
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-energy-hidden').val(width_value);
            }
            
        }
        
    });


    $(document).on('click','#energy_modal_open_button', function(){
        var edit_id = localStorage.getItem('edit-measurement-tile');
        var tile_edit_value = $(this).attr('tile-edit');
        var ar = localStorage.getItem('dashboard_tile_data');
        dashboard_tile_data = JSON.parse(ar);
        var type_data_tile = dashboard_tile_data['type_data_tile'];
        var energy_type = $('#energy_type').val();
        $('.bd-example-modal-lg').modal('hide'); //Measurement Modal Hide
      
        if(tile_edit_value == 'false' && type_data_tile == "overall_count"){
            $('#save_table_btn_energy').removeClass('display-none');
            $('#update_table_btn_measurement_energy').addClass('display-none');
            $('.energy_tile_modal').modal('show');
            // <----08-9--2021---
            var type = "Energy";
            generateHtmlEnergyTiles(type);

            // --end-->
            var countValue = $('#overall_count_energy').val();
            var record_name = $('#mst_id_hidden_energy').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.energy_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.energy_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            // <----17-9-2021----
            $('.energy_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.energy_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.energy_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');

            // --end--->

            $('#modal-height-input-energy').attr('disabled',true);
            $('#modal-width-input-energy').attr('disabled',true);

            $('#modal-height-input-energy').val('1');
            $('#modal-width-input-energy').val('1');
            $('#modal-height-input-energy-hidden').val(145);
            $('#modal-width-input-energy-hidden').val(285);

            setTimeout(()=>{
                $('.energy_html_modal_'+last_div_index+' .count_result_tile').text(energy_type);
            },1100);

        }
        else if(tile_edit_value == 'false' && type_data_tile == 'table'){
            $('#save_table_btn_energy').removeClass('display-none');
            $('#update_table_btn_energy').addClass('display-none');
            var tableLength = $('#energy_select_table_entries tr').length;
            var energyType = $('#energy_type').val();
            if(parseInt(tableLength) <= 5 || energyType == 'layer_modal' || energyType == 'automatic'){
                $('.energy_tile_modal').modal('show');
                // <----20-8--2021---
                var type = "Energy";
                generateHtmlEnergyTiles(type);
                // --end-->
                var last_div_index = $('#total_records').val();
                var table_html = $('#energy_record_tb').html();
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table').html(table_html);
                $('.energy_html_modal_'+last_div_index+' #energyt_modal_table thead ,.energy_html_modal_'+last_div_index+' #energy_modal_table tbody tr').removeAttr('class');
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table tbody').removeAttr('id');

                // <---23-8-2021---
                $('#modal-height-input-energy-hidden').val(145);
                $('#modal-height-input-energy').val('');
                $('#modal-width-input-energy-hidden').val(285);
                $('#modal-width-input-energy').val('');
                // --end-->

                $('#modal-height-input-energy').attr('disabled',false);
                $('#modal-width-input-energy').attr('disabled',false);


                // <---10-11-2021---
                var query_data_row_click = localStorage.getItem('query_data');
                query_data_row_click = JSON.parse(query_data_row_click);

                if(query_data_row_click['row_click'] == 'true' && energy_type != 'layer_modal')
                {
                    var date_data = $('#row_click_last_date_energy').val();
                    var total_sum = $('#overall_count_energy').val();

                    $('.energy_html_modal_'+last_div_index+' .small-table #td_table_tile_text_'+last_div_index).text(date_data);
                    $('.energy_html_modal_'+last_div_index+' .small-table #td_table_tile_two_text_'+last_div_index).text(total_sum);

                    $('.energy_html_modal_'+last_div_index+' .small-table').addClass('tile_table_small_table');
                }
                else{
                    $('.energy_html_modal_'+last_div_index+' .small-table').html('');
                }
                // --end-->
                
            }
            else{
                alert('Records are Always be less than 5');
            }
            $('#table_outside_tile_structure').prop('checked',false);
            $('.table_outisde_tile_controls').hide();
            $('#expand_view_table').prop('checked',false);
            $('#expand_view_table').val(0);
          
        }
        else if(tile_edit_value == 'true' && type_data_tile == 'table'){ //Table Edit Case
            var tableLength = $('#energy_select_table_entries tr').length;
            var energyType = $('#energy_type').val();
            if(parseInt(tableLength) <= 5 || energy_type == 'layer_modal' || energyType == 'automatic'){
                $('#save_table_btn_energy').addClass('display-none');
                $('#update_table_btn_energy').removeClass('display-none');
                $('.energy_tile_modal').modal('show');
                var type = "Energy";
                edit_tile_energy(type,edit_id);
                var last_div_index = $('#total_records').val();
                var table_html = $('#energy_record_tb').html();
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table').html(table_html);
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table thead ,.energy_html_modal_'+last_div_index+' #energy_modal_table tbody tr').removeAttr('class');
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table tbody').removeAttr('id');

                $('#modal-height-input-energy').attr('disabled',false);
                $('#modal-width-input-measurement').attr('disabled',false);
         
                // <---10-11-2021---
                var query_data_row_click = localStorage.getItem('query_data');
                query_data_row_click = JSON.parse(query_data_row_click);

                if(query_data_row_click['row_click'] == 'true' && energy_type != 'layer_modal')
                {
                    var date_data = $('#row_click_last_date_energy').val();
                    var total_sum = $('#overall_count_energy').val();

                    $('.energy_html_modal_'+last_div_index+' .small-table #td_table_tile_text_'+last_div_index).text(date_data);
                    $('.energy_html_modal_'+last_div_index+' .small-table #td_table_tile_two_text_'+last_div_index).text(total_sum);
                    
                    $('.energy_html_modal_'+last_div_index+' .small-table').addClass('tile_table_small_table');
                }
                else{
                    $('.energy_html_modal_'+last_div_index+' .small-table').html('');
                }
                // --end-->
            }
            else{
                alert('Records are Always be less than 5');
            }
            $('#table_outside_tile_structure').prop('checked',false);
        }
        else if(tile_edit_value == 'true' && type_data_tile == 'overall_count'){ //Overall Tile Edit
            $('#save_table_btn_energy').addClass('display-none');
            $('#update_table_btn_energy').removeClass('display-none');
            $('.energy_tile_modal').modal('show');
            var type = "Energy";
            edit_tile_energy(type,edit_id);
            var countValue = $('#overall_count_energy').val();
            var record_name = $('#mst_id_hidden_energy').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.energy_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.energy_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

             // <----17-9-2021----
             $('.energy_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
             $('.energy_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
             $('.energy_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');
 

            $('#modal-height-input-energy').attr('disabled',true);
            $('#modal-width-input-energy').attr('disabled',true);

            $('#modal-height-input-energy').val('1');
            $('#modal-width-input-energy').val('1');
            $('#modal-height-input-energy-hidden').val(145);
            $('#modal-width-input-energy-hidden').val(285);

            setTimeout(()=>{
                $('.energy_html_modal_'+last_div_index+' .count_result_tile').text(energy_type);
            },1100);
        }
        $('#table_outisde_tile_controls').hide();
        // if (energy_automatic_input > 10) {
        //     alert("last line");
        // }
    })
    // ---end-->

    // <---20-8-2021----

    $(document).on('click', function (event) {
        
        // if(!$(event.target).closest('.chart_tile_outside_structure').length){
        //    console.log('Outside click');
        // }
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
            $('.dashboard_count_div .stretch-card.product_automatic_tile ').removeClass('tiles-click');

            // $('.dashboard_count_div .stretch-card.chart_tile_expand_view').removeClass('tiles-click');
           
            // <----03-03-2022--
            // $('.dashboard_count_div .stretch-card').addClass('hide_table_main');
            // ---end--->        

            $('.save_table_div_show').hide();
            $('.action-modal-button-div').removeClass('col-md-12');

            // $('.dashboard_count_div .stretch-card .small-table').show();

            // <----25-10-2021---
            $('.dashboard_count_div .movetile .overall_value_tile .card-body').removeClass('row');
            $('.dashboard_count_div .movetile .overall_value_tile .card-body div:first-child').removeClass('col-md-12');
            // --end-->

            // <--26-10-2021--
            $('.dashboard_count_div .movetile .table_tile .card-body').removeClass('row');
            $('.dashboard_count_div .movetile .table_tile .card-body div:first-child').removeClass('col-md-12');
            // ---end-->

            var tile_click_data = localStorage.getItem('tile_click_data');
            if(tile_click_data != null && tile_click_data != undefined)
            {
                tile_click_data = JSON.parse(tile_click_data);
                var id = tile_click_data['id'];
                var outside_tile_height = tile_click_data['outside_tile_height'];
                var outside_tile_width = tile_click_data['outside_tile_width'];
                $('.'+id+'.tiles-click').attr('style', "height: "+outside_tile_height+" !important; width: "+outside_tile_width+" !important;");
                localStorage.removeItem('tile_click_data');
            }

            // <--9-11-2021---
            var x = document.querySelectorAll(".chart_tile_outside_structure");
            if(x.length > 0){
                for(var i = 0; i < x.length; i++){
                    var height_outer = x[i].classList[4];
                    height_outer = height_outer.split('_');
                    height_outer = height_outer[3];
                    
                    var width_outer = x[i].classList[5];
                    width_outer = width_outer.split('_');
                    width_outer = width_outer[3];

                    x[i].style.setProperty("height",height_outer+"px", "important");
                    x[i].style.setProperty("width", width_outer+"px", "important");
                }
            }
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

        $('#energy_modal_open_button').val('Save & Preview'); //Default attr. False Energy
        $('#energy_modal_open_button').attr('tile-edit','false');

        $('#product_modal_open_button').val('Save & Preview'); //Default attr. False Product
        $('#product_modal_open_button').attr('tile-edit','false');

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
            localStorage.setItem('measurement_title_modal_tile',title_modal_tile);
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));

            $('#tables_sidebar').click();
            $('#measurement_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');
            
            var edit_value = $(this).attr('data-edit');
            if(edit_value == 'true'){
                $('#modal_open_button').val('Update & Preview');
                $('#modal_open_button').attr('tile-edit','true');
            }
        }
        else if(record_type_of_tile == "product" && (type_data_tile == "table" || type_data_tile == 'overall_count') ){
            localStorage.setItem('product_title_modal_tile',title_modal_tile);
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            
            $('#tables_sidebar').click();
            $('#product_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');

            var edit_value = $(this).attr('data-edit');
            if(edit_value == 'true'){
                $('#product_modal_open_button').val('Update & Preview');
                $('#product_modal_open_button').attr('tile-edit','true');

                //For Edit Case
                var edit_tile_db_name = $('#edit_product_tile_automatic').attr('db_name');
                var all_column = $('#edit_product_tile_automatic').attr('all_column');
                var edit_tile_db_table = $('#edit_product_tile_automatic').attr('db_table');
                var tile_click_manually = $('#edit_tile_click_manually').attr('data_click');
                if(edit_tile_db_name != '' && all_column != '' && edit_tile_db_table != '')
                {
                    $('#dashboard_database_list option[dashboardbvalue=' + edit_tile_db_name + ']').prop('selected', 'selected');
                    // $('#dashboard_database_list').trigger('change');
                    // $('#all_tables_product option[value=' + edit_tile_db_table + ']').prop('selected', 'selected');
                    // getAllColumnProductTables(all_column);
                    // getAllColumnProductTables();
                    // getNumberRecordsProductAutomatic();
                }
                else if(tile_click_manually != '' && tile_click_manually == 'true'){
                    $("#product_type option[value='mannual']").prop('selected','selecetd');
                    $('#product_type').trigger('change');
                }
            }
        }
        else if(record_type_of_tile == "energy" && (type_data_tile == "table" || type_data_tile == 'overall_count') ){
            localStorage.setItem('energy_title_modal_tile',title_modal_tile);
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));

            //Automatic Case Active Check
            $('#energy_type option[value=automatic]').prop('selected','selected');
            $("#energy_records_order_by option[value= 'order_by_desc']").text('Maximum');
            $("#energy_records_order_by option[value= 'order_by_asc']").text('Minimum');
            $('.auto_man_div').hide();
            $('.energy_automatic_filter_div').show();
            $('.layer_modal_filter_div').hide();
            $('#energy_search_record').attr('readonly',true);
            // $('#energy_type').trigger('change');


            $('#tables_sidebar').click();
            $('#energy_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');
         
            var edit_value = $(this).attr('data-edit');
            if(edit_value == 'true'){
                $('#energy_modal_open_button').val('Update & Preview');
                $('#energy_modal_open_button').attr('tile-edit','true');
            }
            
        }
        //Chart 
        else if((record_type_of_tile == "measurement" || record_type_of_tile == "energy")  && type_data_tile == "chart" && data_edit_chart == 'false')
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getChartTileDashboard();                                   
            $('#time_interval_chart option[value=1]').prop('selected','selected');
            getChartTimeIntervalRecord();
            // dashboardChart();
            $('#measurement-height-chart').val('2');
            $('#measurement-height-chart-hidden').val('290');
            $('#measurement-width-chart').val('2');
            $('#measurement-width-chart-hidden').val('570');
            $('#dashboard_tile_modal_chart').modal('show');
            $("#energy_chart_measurement_automatic").prop("checked", false);
            $('#chart_records_label').text('Select '+record_type_of_tile);
            $('#update_and_proceed_btn_dashboard_chart').hide();
            $('#save_and_proceed_btn_dashboard_chart').show();
            $('#dashboard_loader_div').hide();

            // <---1-11-2021---
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');

            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');

            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');
            // --end-->

            // <--7-12-2021--
            $('.chart_product_div').hide();
            $('#chart_record_div').show();
            $('#time_interval_div').show();
            // --end--->

            // <---18-02-2021--
            if(record_type_of_tile == "energy")
            {
                
                $('#energy_type_dashboard_chart_div').show();
                // $('#energy_type_dashboard_chart option[value=manually').prop('selected','selected');
                $('#energy_type_dashboard_chart option[value=automatic').prop('selected','selected');
                $('#energy_type_dashboard_chart').trigger('change');

            }
            else{
                $('.energy_automatic_div').hide();
                $('#energy_type_dashboard_chart_div').hide();
                $('.energy_chart_layer_div').hide();
            }
            // --end-->

        }
        else if((record_type_of_tile == "measurement" || record_type_of_tile == "energy") && type_data_tile == "chart" && data_edit_chart == 'true')
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            //getChartTimeIntervalRecord();
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');

            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');

            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');

            if(record_type_of_tile == 'measurement')
            {
                getEditChartTileDashboard();
                $('#chart_record_div').show();
                $('#time_interval_div').show();

                $('#energy_type_dashboard_chart_div').hide();
                $('.energy_chart_layer_div').hide();
                $('.energy_automatic_div').hide();
            }
            else if(record_type_of_tile == 'energy'){
                var energy_chart_type = $('#save_and_proceed_btn_dashboard').attr('energy_chart_type');
                if(energy_chart_type == 'layer_modal'){
                    getEditChartTileDashboardEnergyLayer();
                    $('#energy_type_dashboard_chart option[value=layer_modal]').prop('selected','selected');
                    $('#chart_record_div').hide();
                    $('#time_interval_div').hide();

                    $('#energy_type_dashboard_chart_div').show();
                    $('.energy_chart_layer_div').show();

                    $('.energy_automatic_div').hide();
                }
                else if(energy_chart_type == 'automatic')
                {
                    getEditChartDataDashboardEnergyAutomatic();
                    $('#energy_type_dashboard_chart option[value=automatic]').prop('selected','selected');
                    $('#chart_record_div').hide();
                    $('#time_interval_div').hide();

                    $('#energy_type_dashboard_chart_div').show();
                    $('.energy_chart_layer_div').hide();

                    $('.energy_automatic_div').show();

                }
                else{
                    getEditChartTileDashboardEnergy();
                    $('#energy_type_dashboard_chart option[value=manually]').prop('selected','selected');
                    $('#chart_record_div').show();
                    $('#time_interval_div').show();
                    $('#energy_type_dashboard_chart_div').show();
                    $('.energy_chart_layer_div').hide();

                    $('.energy_automatic_div').hide();
                }
                
            }
        
            $('#dashboard_tile_modal_chart').modal('show');
            $("#energy_chart_measurement_automatic").prop("checked", false);
            $('#update_and_proceed_btn_dashboard_chart').show();
            $('#save_and_proceed_btn_dashboard_chart').hide();
            $('#chart_records_label').text('Select '+record_type_of_tile);
            $('#dashboard_loader_div').hide();

            // <--7-12-2021--
            
            $('.chart_product_div').hide();
           
            // --end--->
            

        }
        else if(record_type_of_tile == "product" && type_data_tile == "chart" && data_edit_chart == 'false')
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getChartTileDashboard();
            $('#time_interval_chart option[value=1]').prop('selected','selected');
            getChartTimeIntervalRecordProduct();
            // dashboardChart();
            $('#measurement-height-chart').val('2');
            $('#measurement-height-chart-hidden').val('290');
            $('#measurement-width-chart').val('2');
            $('#measurement-width-chart-hidden').val('570');
            $('#dashboard_tile_modal_chart').modal('show');
            $("#energy_chart_measurement_automatic").prop("checked", false);
            $('#chart_records_label_product').text('Select '+record_type_of_tile);
            $('#update_and_proceed_btn_dashboard_chart').hide();
            $('#save_and_proceed_btn_dashboard_chart').show();
            $('#dashboard_loader_div').hide();

            // <---1-11-2021---
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');

            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');

            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');
            // --end-->

            // <--7-12-2021--
            $('.chart_product_div').show();
            $('#chart_record_div').hide();
            $('#time_interval_div').hide();
            // --end--->

            // <----23-2-2022--
            $('#energy_type_dashboard_chart_div').hide();
            $('.energy_chart_layer_div').hide();
            $('.energy_automatic_div').hide();
            // --end--->

        }
        else if(record_type_of_tile == "product" && type_data_tile == "chart" && data_edit_chart == 'true')
        {
            $('#dashboard_tile_modal').modal('hide');
            // $('#dashboard_add_tile_chart').click();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));

            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');

            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');

            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');

            getEditChartTileDashboardProduct();
        
            $('#dashboard_tile_modal_chart').modal('show');
            $("#energy_chart_measurement_automatic").prop("checked", false);
            $('#update_and_proceed_btn_dashboard_chart').show();
            $('#save_and_proceed_btn_dashboard_chart').hide();
            $('#chart_records_label_product').text('Select '+record_type_of_tile);
            $('#dashboard_loader_div').hide();

            // <--7-12-2021--
            $('.chart_product_div').show();
            $('#chart_record_div').hide();
            $('#time_interval_div').hide();
            // --end--->


            // <----23-2-2022--
            $('#energy_type_dashboard_chart_div').hide();
            $('.energy_chart_layer_div').hide();
            $('.energy_automatic_div').hide();
            // --end--->
            

        }
        

        $('#title_modal_tile').val('');
        $('#record_type_of_tile option[value=energy]').prop('selected','selected');
        $('#type_data_tile option[value=table').prop('selected', 'selected');
        // $('#dashboard_loader_div').hide();
    });
    // --end-->

    // 23-8-2021---
    $(document).on('click','.delete_btn_tile',function(){
        var confResult = confirm('Are you sure want to Delete');
        if(confResult == true){
            var id=$(this).attr('class');
            id_val =id.split(" ")[0];
            var product_automatic_tile = $(this).hasClass('product_automatic_tile_delete');
            deleteTile(id_val,product_automatic_tile);
            setTimeout(function () {
                showexpandedchart();
            
            },1000);
        }
        
    })
    //--end-->

    // <----30-8-2021---
    $(document).on('click','.edit_btn_tile',function(){
     
        var id=$(this).attr('class');
        var i_value = $(this).attr('data-i-value');
        id_val =id.split(" ")[0];
        var product_automatic_tile = $(this).hasClass('product_automatic_tile_edit');
        getEditDataDashboard(id_val,i_value,product_automatic_tile);
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


    // <----30-11-2021---
    $(document).on('click','#update_table_btn_energy', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'table')
        {
            updateTileRecordEnergy();
        }
        else if(ar['type_data_tile'] == 'overall_count')
        {
            updateTileRecordOverallCountEnergy();
        }
        
    })
    // --end--


    // <---6-12-2021---
    $(document).on('click','#update_table_btn_product', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'table')
        {
            var product_type = $('#product_type').val();
            if(product_type == 'automatic')
            {
                updateTileRecordProductAutomatic();
            }
            else{
                updateTileRecordProduct();
            }
        }
        else if(ar['type_data_tile'] == 'overall_count')
        {
            updateTileRecordOverallCountProduct();
        }
        
    })
    // --end-->

    // <----01-9-2021---
    $(document).on('click','#dashboard_add_tile', function(){
        
        $('#save_and_proceed_btn_dashboard').val('Save & Proceed');
        $('#save_and_proceed_btn_dashboard').attr('data-edit','false');
        $('#save_and_proceed_btn_dashboard').attr('data-edit-chart','false');
        

        $("#type_data_tile").removeAttr('disabled');
        $("#record_type_of_tile").removeAttr('disabled');
        $("#product_type").removeAttr('disabled');

        //Product Edit Fields
        $('#edit_product_tile_automatic').attr('db_name','');
        $('#edit_product_tile_automatic').attr('db_table','');
        $('#edit_product_tile_automatic').attr('all_column','');
        $('#edit_tile_click_manually').attr('data_click','');
        
    });
    // --end-->

    // <----02-9-2021---
    $(document).on('blur change','#measurement-height-chart,#measurement-width-chart', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records_chart').val();
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        if(id == 'measurement-height-chart')
        {
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_chart_tiles #energy_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #energy_count_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_chart_tiles #product_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #product_count_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            }
            
            var height_val = $('#measurement-height-chart').val();
            if(height_val <= 1){
                $('#measurement-height-chart').val(2);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_chart_tiles #energy_count_tile_modal_chart_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_chart_tiles #product_count_tile_modal_chart_'+total_records).css('height',height_value);
                }
                
                $('#measurement-height-chart-hidden').val(height_value);
            }
            
            
            
        }
        else if(id == 'measurement-width-chart'){
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_chart_tiles #energy_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #energy_count_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_chart_tiles #product_count_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #product_count_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            }

            var width_val = $('#measurement-width-chart').val();
            if(width_val <= 1){
                $('#measurement-width-chart').val(2);
            }
            else{
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }

                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'energy'){
                    $('.dashboard_chart_tiles #energy_count_tile_modal_chart_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'product'){
                    $('.dashboard_chart_tiles #product_count_tile_modal_chart_'+total_records).css('width',width_value);
                }
                $('#measurement-width-chart-hidden').val(width_value);
            }

        }
    })
    // --end-->

    // <---02-8-2021----
    $(document).on('click', '#save_and_proceed_btn_dashboard_chart', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var energy_chart_measurement = $('#energy_type_dashboard_chart').val();
        if(ar['record_type_of_tile'] == 'product')
        {
            saveDashboardTileChartProduct();
            setTimeout(function () {
                showexpandedchart();
            },1000);
        }
        else if(ar['record_type_of_tile'] == 'energy' && energy_chart_measurement == 'layer_modal')
        {
            saveDashboardTileChartEnergyLayer();
            setTimeout(function () {
                showexpandedchart();
            },1000);   
        }
        else if(ar['record_type_of_tile'] == 'energy' && energy_chart_measurement == 'automatic')
        {
           
            saveDashboardTileChartEnergyAutomatic();   
            setTimeout(function () {
                showexpandedchart();
            },1000);
        }
        else{
            saveDashboardTileChart();
            setTimeout(function () {
                showexpandedchart();
            },1000);
        }
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

    // <---17-11-2021---
    $(document).on('change','#energy_type', function(){
        var val = $(this).val();
        $('#energy_record_order_by_label').text('Filter Units Consumed');
        $('#energy_search_record').val('');
        if(val == 'automatic'){
            $("#energy_records_order_by option[value= 'order_by_desc']").text('Maximum');
            $("#energy_records_order_by option[value= 'order_by_asc']").text('Minimum');

            $("#energy_automatic_order_by option[value='desc']").text('Maximum');
            $("#energy_automatic_order_by option[value='asc']").text('Minimum');
            
            $('.auto_man_div').hide();
            $('.energy_automatic_filter_div').show();
            $('.layer_modal_filter_div').hide()
            $('#energy_search_record').attr('readonly',true);
            // getNumberRecordsEnergy();
            $('#energy_automatic_input').val('');
            getAllMeasurementEnergyAutomatic();

        }
        else if(val == 'layer_modal'){
            $('#energy_record_order_by_label').text('Filter Quantity');
            $("#energy_records_order_by option[value= 'order_by_desc']").text('Maximum Quantity');
            $("#energy_records_order_by option[value= 'order_by_asc']").text('Minimum Quantity');
            $('.auto_man_div').hide();
            $('.energy_automatic_filter_div').hide();
            $('.layer_modal_filter_div').show();
            $('#energy_search_record').attr('readonly',true);
            $("#select_day_week option[value='']").prop('selected','selected');
            $('#input_val_week_day').val('');
            getAllMeasurementEnergy();
        }else{
            $("#energy_records_order_by option[value= 'order_by_desc']").text('Order By Max Units Consumed');
            $("#energy_records_order_by option[value= 'order_by_asc']").text('Order By Min Units Consumed');   
            $('.auto_man_div').show();
            $('.energy_automatic_filter_div').hide();
            $('.layer_modal_filter_div').hide()
            $('#energy_search_record').attr('readonly',false);
            getNumberRecordsEnergy();
        }
       
    })
    // ---end--->

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
    // $(document).on('click','.dashboard_menu_click', function(){
    //     var id_val = $(this).attr('id');
    //     localStorage.setItem('dashboard_menu_click_option',id_val);
    //     var pathname = window.location.pathname;
    //     var arPathname = pathname.split('/');
    //     if(arPathname.length > 3){
    //         window.open('/'+arPathname[1]+'/main.html','_self');
    //     }
    //     else{
    //         window.open('/main.html','_self');
    //     }
    // });
    // --end-->

    // 11-03-2022
    $(document).on('click','.dashboard_menu_click',function(){

        var dataTab=$(this).attr('data-tab');
        // console.log(dataTab);
            if(dataTab=='dashboardMain'){
        $('.dashboardDiv').show();
        $('#main').hide();
        }else{
        $('.dashboardDiv').hide();
        $('#main').show();
        }
        });
    // <---30-9-2021---
    $(document).on('change','#dashboard_database_list',function(){
        var val = $(this).val();
        // var dashboardDbName = $(this).attr("dashboardbValue");
        var dashboardDbName = $('option:selected', this).attr('dashboardbValue');
        // console.log(dashboardDbName);
        localStorage.setItem('dashboardDBName',val);
        localStorage.setItem('dashboardDB',dashboardDbName);
        $("#nameDashboardDB").val(dashboardDbName);
        getAllProductTables();
        // getTableFormatDashboard();
        $('#dashboard_sidebar').click();
        storeDBValueSession();

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
        setTimeout(function () {
            showexpandedchart();
        
        },1000);
    });
    // --end---->
    
    // <---7-10-2021--
    $(document).on('click','#update_and_proceed_btn_dashboard_chart', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var energy_type_dashboard_chart = $('#energy_type_dashboard_chart').val();
        if(ar['record_type_of_tile'] == 'product')
        {
            updateDashboardChartProduct();
        }
        else if(ar['record_type_of_tile'] == 'energy' && energy_type_dashboard_chart == 'layer_modal') 
        {

            updateDashboardChartEnergyLayer();
        }
        else if(ar['record_type_of_tile'] == 'energy' && energy_type_dashboard_chart == 'automatic') 
        {
            updateDashboardChartEnergyAutomatic();
        }
        else{
            updateDashboardChart();
        }
    });
    // --end--->

    // <----20-10-2021---
    $(document).on('click','#expand_view_chart', ()=>{
        var valIsChecked = $('#expand_view_chart').is(":checked");
        if(valIsChecked == true){
            $('#expand_view_chart').val("1");
            $('.chart_outisde_tile_controls').hide();
            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');
            
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');

            var id = $('#total_records_chart').val();
            $('#measurement_count_outer_tile_modal_chart_'+id).css('height',145);
            $('#measurement_count_outer_tile_modal_chart_'+id).css('width',285);
            $('.outer_chart_tile_structure').hide();


        }
        else{
            $('#expand_view_chart').val("0");
            $('.outer_chart_tile_structure').show();
        }
    });
    // --end-->

    // <----23-03-2023---

// Expand view table for Energy Case

    $(document).on('click','#expand_view_table', ()=>{
    // let data_i_value = $(this).attr('data-i');
    var valIsChecked = $('#expand_view_table').is(":checked");
    var total_records = $('#total_records').val();
    if(valIsChecked == true){
        $('#expand_view_table').val("1");
        $("#modal-height-input-energy").attr("disabled", true);
        $("#modal-width-input-energy").attr("disabled", true);
        $('#modal-height-input-energy').val('');
        $('#modal-width-input-energy').val('');
        $('.table_outisde_tile_controls').hide();
        $('#table_outside_tile_structure').prop('checked',false);
        $('#table_outside_tile_structure').val('0');
        
        $('#table_height_outer_structure').val('');
        $('#table_width_outer_structure').val('');

        var id = $('#total_records_chart').val();
        $('#measurement_count_outer_tile_modal_table_'+id).css('height',145);
        $('#measurement_count_outer_tile_modal_table_'+id).css('width',285);
        
        $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('height',290);
        $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('width',580);

        $('#energy_count_tile_modal_'+total_records).css('height',290);
        $('#energy_count_tile_modal_'+total_records).css('width',570);
        // saveTableFormatEnergyExpandView();
    }
    else{
        $('#expand_view_table').val("0");
        $("#modal-width-input-energy").removeAttr("disabled");
        $("#modal-height-input-energy").removeAttr("disabled");
        $('#energy_count_tile_modal_'+total_records).css('height',145);
        $('#energy_count_tile_modal_'+total_records).css('width',285);
        $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('height',145);
        $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('width',290);
    }
});

// Expand view table for Product Case

$(document).on('click','#expand_view_table_product', ()=>{
    // let data_i_value = $(this).attr('data-i');
    var valIsChecked = $('#expand_view_table_product').is(":checked");
    var total_records = $('#total_records').val();
    if(valIsChecked == true){
        $('#expand_view_table_product').val("1");
        $("#modal-height-input-product").attr("disabled", true);
        $("#modal-width-input-product").attr("disabled", true);
        $('#modal-height-input-product').val('');
        $('#modal-width-input-product').val('');
        $('.table_outisde_tile_controls').hide();
        $('#table_outside_tile_structure').prop('checked',false);
        $('#table_outside_tile_structure').val('0');
        
        $('#table_height_outer_structure').val('');
        $('#table_width_outer_structure').val('');

        var id = $('#total_records_chart').val();
        $('#measurement_count_outer_tile_modal_table_'+id).css('height',145);
        $('#measurement_count_outer_tile_modal_table_'+id).css('width',285);
        
        $('.gernerated_product_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('height',290);
        $('.gernerated_product_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('width',580);

        $('#product_count_tile_modal_'+total_records).css('height',290);
        $('#product_count_tile_modal_'+total_records).css('width',570);
        // saveTableFormatEnergyExpandView();
    }
    else{
        $('#expand_view_table_product').val("0");
        $("#modal-width-input-product").removeAttr("disabled");
        $("#modal-height-input-product").removeAttr("disabled");
        $('#product_count_tile_modal_'+total_records).css('height',145);
        $('#product_count_tile_modal_'+total_records).css('width',285);
        $('.gernerated_product_modal_tiles .outer_table_tile_structure #product_count_outer_tile_modal_table_'+total_records).css('height',145);
        $('.gernerated_product_modal_tiles .outer_table_tile_structure #product_count_outer_tile_modal_table_'+total_records).css('width',290);
    }
});


// Expand view table for Measurement Case

$(document).on('click','#expand_view_table_measurement', ()=>{
    // let data_i_value = $(this).attr('data-i');
    var valIsChecked = $('#expand_view_table_measurement').is(":checked");
    var total_records = $('#total_records').val();
    if(valIsChecked == true){
        $('#expand_view_table_measurement').val("1");
        $("#modal-height-input-measurement").attr("disabled", true);
        $("#modal-width-input-measurement").attr("disabled", true);
        $('#modal-height-input-measurement').val('');
        $('#modal-width-input-measurement').val('');
        $('.table_outisde_tile_controls').hide();
        $('#table_outside_tile_structure').prop('checked',false);
        $('#table_outside_tile_structure').val('0');
        
        $('#table_height_outer_structure').val('');
        $('#table_width_outer_structure').val('');

        var id = $('#total_records_chart').val();
        $('#measurement_count_outer_tile_modal_table_'+id).css('height',145);
        $('#measurement_count_outer_tile_modal_table_'+id).css('width',285);
        
        $('.gernerated_energy_modal_tiles .outer_table_tile_structure #measurement_count_outer_tile_modal_table_'+total_records).css('height',290);
        $('.gernerated_energy_modal_tiles .outer_table_tile_structure #measurement_count_outer_tile_modal_table_'+total_records).css('width',580);

        $('#measurement_count_tile_modal_'+total_records).css('height',290);
        $('#measurement_count_tile_modal_'+total_records).css('width',570);
        // saveTableFormatEnergyExpandView();
    }
    else{
        $('#expand_view_table_measurement').val("0");
        $("#modal-width-input-measurement").removeAttr("disabled");
        $("#modal-height-input-measurement").removeAttr("disabled");
        $('#measurement_count_tile_modal_'+total_records).css('height',145);
        $('#measurement_count_tile_modal_'+total_records).css('width',285);
        $('.gernerated_measurement_modal_tiles .outer_table_tile_structure #measurement_count_outer_tile_modal_table_'+total_records).css('height',145);
        $('.gernerated_measurement_modal_tiles .outer_table_tile_structure #measurement_count_outer_tile_modal_table_'+total_records).css('width',290);
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
            
        }
    });
    // --end-->

    // <---29-10-2021--
    $(document).on('click','#table_outside_tile_structure', ()=>{
        var valIsChecked = $('#table_outside_tile_structure').is(":checked");
        if(valIsChecked == true){
            $('#table_outside_tile_structure').val("1");
            $('.table_outisde_tile_controls').show();
            $('#expand_view_table').val("0");
            $('#expand_view_table').prop("checked",false);
            // alert("work here");
        }
        else{
            $('#table_outside_tile_structure').val("0");
            $('.table_outisde_tile_controls').hide();

            $('#table_height_outer_structure').val('');
            $('#table_width_outer_structure').val('');

            var id = $('#total_records_chart').val();
            $('#measurement_count_outer_tile_modal_table_'+id).css('height',145);
            $('#measurement_count_outer_tile_modal_table_'+id).css('width',285);
        }
    });

    $(document).on('blur change','#table_height_outer_structure,#table_width_outer_structure', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records_table').val();
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        if(id == 'table_height_outer_structure')
        {
                $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            var height_val = $('#table_height_outer_structure').val();
            if(height_val <= 0){
                $('#table_height_outer_structure').val(1);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                
                // console.log('Height Value', height_value);
                $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('height',height_value);
              
                // $('#measurement-height-chart-hidden').val(height_value);
            }
        }
        else if(id == 'table_width_outer_structure'){
            $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
            $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            var width_val = $('#table_width_outer_structure').val();
            if(width_val <= 0){
                $('#table_width_outer_structure').val(1);
            }
            else{
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                // console.log('Height Value', width_value);
               
                $('.gernerated_energy_modal_tiles .outer_table_tile_structure #energy_count_outer_tile_modal_table_'+total_records).css('width',width_value);
             
                // $('#measurement-width-chart-hidden').val(width_value);
            }

        }
    })
    // --end--->
    $(document).on('click','#chart_outside_tile_structure', ()=>{
        var valIsChecked = $('#chart_outside_tile_structure').is(":checked");
        if(valIsChecked == true){
            $('#chart_outside_tile_structure').val("1");
            $('.chart_outisde_tile_controls').show();
            $('#expand_view_chart').val("0");
            $('#expand_view_chart').prop("checked",false);
            
        }
        else{
            $('#chart_outside_tile_structure').val("0");
            $('.chart_outisde_tile_controls').hide();

            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');

            

            var id = $('#total_records_chart').val();
            $('#measurement_count_outer_tile_modal_chart_'+id).css('height',145);
            $('#measurement_count_outer_tile_modal_chart_'+id).css('width',285);
        }
    });

    $(document).on('blur change','#chart_height_outer_structure,#chart_width_outer_structure', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records_chart').val();
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        if(id == 'chart_height_outer_structure')
        {
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_chart_tiles #measurement_count_outer_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #measurement_count_outer_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_chart_tiles #energy_count_outer_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #energy_count_outer_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_chart_tiles #product_count_outer_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #product_count_outer_tile_modal_chart_'+total_records).removeClass('actual_tile_height');
            }
            var height_val = $('#chart_height_outer_structure').val();
            if(height_val <= 0){
                $('#chart_height_outer_structure').val(1);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_chart_tiles #measurement_count_outer_tile_modal_chart_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_chart_tiles #energy_count_outer_tile_modal_chart_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_chart_tiles #product_count_outer_tile_modal_chart_'+total_records).css('height',height_value);
                }
                // $('#measurement-height-chart-hidden').val(height_value);
            }
        }
        else if(id == 'chart_width_outer_structure'){
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_chart_tiles #measurement_count_outer_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #measurement_count_outer_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_chart_tiles #energy_count_outer_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #energy_count_outer_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_chart_tiles #product_count_outer_tile_modal_chart_'+total_records).removeClass('col-md-3');
                $('.dashboard_chart_tiles #product_count_outer_tile_modal_chart_'+total_records).removeClass('actual_tile_width');
            }
            var width_val = $('#chart_width_outer_structure').val();
            if(width_val <= 0){
                $('#chart_width_outer_structure').val(1);
            }
            else{
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_chart_tiles #measurement_count_outer_tile_modal_chart_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_chart_tiles #energy_count_outer_tile_modal_chart_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_chart_tiles #product_count_outer_tile_modal_chart_'+total_records).css('width',width_value);
                }

                // $('#measurement-width-chart-hidden').val(width_value);
            }

        }
    })
    // --end--->

    // <---8-11-2021---
    $(document).on('click','.dashboard_redirect_option', ()=>{
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
    });

    $(document).on('click', '#display_chart_outside_tile', ()=>{
        var valChecked = $('#display_chart_outside_tile').is(":checked");
        if(valChecked == true){
            $('#chart_outer_tile_div').show();
            $('#display_chart_outside_tile').val(1);
        }
        else{
            $('#chart_outer_tile_div').hide();
            $('#display_chart_outside_tile').val(0);
        }
    })
    // -end--->


    // <---12-11-2021---
    $(document).on('blur change', '#chart_outer_table_limit_column', function(){
        var val = $('#chart_outer_table_limit_column').val();
        if(val < 1)
        {
            $('#chart_outer_table_limit_column').val('1');
        }
        else if(val > 10){
            $('#chart_outer_table_limit_column').val('10');
        }
        chartRecordFilter();
    });
    // --end-->


    // <--24-11-2021--
    $('.modal_close').click(()=>{ 
        $('.bd-example-modal-lg').hide(); 
        $('.energy_tile_modal').modal('hide');
    });
    // --end-->



    // <-----26-11-2021---
    $(document).on('click','#all_product_image', function(){
        $('.modal_all_products').modal('show');
        getNumberRecordsProduct();
    });
    // --end--->

    // <---29-11-2021---
    $(document).on('click','.page_count_val_all_product,.pagination_input_val_all_product', function(){
        var id = $(this).attr('id');
        var class_btn = $(this).hasClass('pagination_input_val_all_product');
        if(id == 'previous_pagination_val_all_product'){
            var page_val = $('#pagination_all_product').find('li.active').find('input').val();
            page_val = parseInt(page_val) - 1;
            getNumberRecordsProduct(page_val);

        }
        else if(id == 'next_pagination_val_all_product'){
            var page_val = $('#pagination_all_product').find('li.active').find('input').val();
            page_val = parseInt(page_val) + 1;
            getNumberRecordsProduct(page_val);
        }
        else if(class_btn == true){
            var page_val = $(this).val();
            getNumberRecordsProduct(page_val);
        }
    });


    $(document).on('click','.all_product_table_row_click' , function(){
        var prd_id  = $(this).attr('prd_id');
        var prd_name  = $(this).attr('prd_name');
        // console.log('prd_id',prd_id);
        // console.log('Name',prd_name);
        var textNoRecord = $('.modal_all_products  table #all_product_table_entries tr').children('td:first').text();
        if(textNoRecord != 'No Data')
        {
            $('#all_product_input_text_field').val(prd_name);
            getAllProductClickTableHTML(prd_id);
            $('.modal_all_products').modal('hide');
        }
        else{
            $('#all_product_input_text_field').val('');
            $('#product_select_table_entries').html('');
            $('#product_select_table_entries_pagination').html('');
            $('.modal_all_products').modal('hide');

        }
        
    });


    $(document).on('click','.page_count_val_particluar_product,.pagination_input_val_particular_product', function(){
        var id = $(this).attr('id');
        var prd_id = $(this).attr('prd_id');
        var class_btn = $(this).hasClass('pagination_input_val_particular_product');
        var analgen_config_id = $('#prd_id_hidden').attr('analgen_config_id');
        var order_by = $('#product_records_order_by').val();
        if(analgen_config_id == '') //All Product Case
        {
            if(id == 'previous_pagination_val_particular_product'){
                var page_val = $('#product_select_table_entries_pagination').find('li.active').find('input').val();
                page_val = parseInt(page_val) - 1;
                getAllProductClickTableHTML(prd_id,page_val,order_by);

            }
            else if(id == 'next_pagination_val_particular_product'){
                var page_val = $('#product_select_table_entries_pagination').find('li.active').find('input').val();
                page_val = parseInt(page_val) + 1;
                getAllProductClickTableHTML(prd_id,page_val,order_by);
            }
            else if(class_btn == true){
                var page_val = $(this).val();
                getAllProductClickTableHTML(prd_id,page_val,order_by);
            } 
        }
        else{
            if(id == 'previous_pagination_val_particular_product'){
                var page_val = $('#product_select_table_entries_pagination').find('li.active').find('input').val();
                page_val = parseInt(page_val) - 1;
                rowClickParticularProductEntry(analgen_config_id,page_val,order_by);

            }
            else if(id == 'next_pagination_val_particular_product'){
                var page_val = $('#product_select_table_entries_pagination').find('li.active').find('input').val();
                page_val = parseInt(page_val) + 1;
                rowClickParticularProductEntry(analgen_config_id,page_val,order_by);
            }
            else if(class_btn == true){
                var page_val = $(this).val();
                rowClickParticularProductEntry(analgen_config_id,page_val,order_by);
            }
        } 
    })

    // <--14-12-2021--
    $(document).on('click','.page_count_product_automatic,.pagination_input_val_product_automatic', function(){
        var id = $(this).attr('id');
        var class_btn = $(this).hasClass('pagination_input_val_product_automatic');
        // var order_by = $('#product_records_order_by').val();
        if(id == 'previous_pagination_val_product_automatic'){
            var page_val = $('#product_select_table_entries_pagination').find('li.active').find('input').val();
            page_val = parseInt(page_val) - 1;
            getNumberRecordsProductAutomatic(page_val);

        }
        else if(id == 'next_pagination_product_automatic'){
            var page_val = $('#product_select_table_entries_pagination').find('li.active').find('input').val();
            page_val = parseInt(page_val) + 1;
            getNumberRecordsProductAutomatic(page_val);
        }
        else if(class_btn == true){
            var page_val = $(this).val();
            getNumberRecordsProductAutomatic(page_val);
        } 
       
    })
    // --end--->

    $(document).on('change','#product_records_order_by', function(){
        var textNoRecord = $('#product_select_table_entries_table_div table #product_select_table_entries tr').children('td:first').text();
        if(textNoRecord == 'No Data')
        {
            return false;
        }
        var prd_id = $('#prd_id_hidden').attr('prd_id');
        var analgen_config_id = $('#prd_id_hidden').attr('analgen_config_id');
        var order_by = $(this).val();
        if(analgen_config_id == ''){
            getAllProductClickTableHTML(prd_id,1,order_by);
        }else{
            rowClickParticularProductEntry(analgen_config_id,1,order_by);
        }
    })

    $(document).on('click','.row_click_particular_product_entry', function(){
        var analgen_config_id =  $(this).attr('analgen_config_id');
        rowClickParticularProductEntry(analgen_config_id);
    });
    // --end--->


    // <---2-12-2021---
    $(document).on('click','#product_modal_open_button', function(){
        var edit_id = localStorage.getItem('edit-measurement-tile');
        var tile_edit_value = $(this).attr('tile-edit');
        var ar = localStorage.getItem('dashboard_tile_data');
        dashboard_tile_data = JSON.parse(ar);
        var type_data_tile = dashboard_tile_data['type_data_tile'];
        var product_type = 'Mannual';
      
        if(tile_edit_value == 'false' && type_data_tile == "overall_count"){
            $('#save_table_btn_product').removeClass('display-none');
            $('#update_table_btn_measurement_product').addClass('display-none');
            $('.product_tile_modal').modal('show');
            // <----08-9--2021---
            var type = "Product";
            generateHtmlProductTiles(type);

            // --end-->
            var countValue = $('#overall_count_product').val();
            var record_name = $('#analgen_config_id_input').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.product_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.product_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            // <----17-9-2021----
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');

            // --end--->

            $('#modal-height-input-product').attr('disabled',true);
            $('#modal-width-input-product').attr('disabled',true);

            $('#modal-height-input-product').val('1');
            $('#modal-width-input-product').val('1');
            $('#modal-height-input-product-hidden').val(145);
            $('#modal-width-input-product-hidden').val(285);

            setTimeout(()=>{
                $('.product_html_modal_'+last_div_index+' .count_result_tile').text(product_type);
            },1100);

        }
        else if(tile_edit_value == 'false' && type_data_tile == 'table'){
            $('#save_table_btn_product').removeClass('display-none');
            $('#update_table_btn_product').addClass('display-none');
            var tableLength = $('#product_select_table_entries tr').length;
            if(parseInt(tableLength) <= 5){
                $('.product_tile_modal').modal('show');
                // <----20-8--2021---
                var type = "Product";
                generateHtmlProductTiles(type);
                // --end-->
                var last_div_index = $('#total_records').val();
                var table_html = $('#product_select_table_entries_table').html();
                $('.product_html_modal_'+last_div_index+' #product_modal_table').html(table_html);
                $('.product_html_modal_'+last_div_index+' #product_modal_table thead ,.product_html_modal_'+last_div_index+' #product_modal_table tbody tr').removeAttr('class');
                $('.product_html_modal_'+last_div_index+' #product_modal_table tbody').removeAttr('id');

                // <---23-8-2021---
                $('#modal-height-input-product-hidden').val(145);
                $('#modal-height-input-product').val('');
                $('#modal-width-input-product-hidden').val(285);
                $('#modal-width-input-product').val('');
                // --end-->

                $('#modal-height-input-product').attr('disabled',false);
                $('#modal-width-input-product').attr('disabled',false);


                // <---10-11-2021---
                var query_data_row_click = localStorage.getItem('query_data');
                query_data_row_click = JSON.parse(query_data_row_click);

                if(query_data_row_click['row_click'] == 'true')
                {
                    var date_data = $('#row_click_last_date_product').val();
                    var total_sum = $('#overall_count_product').val();

                    $('.product_html_modal_'+last_div_index+' .small-table #td_table_tile_text_'+last_div_index).text(date_data);
                    $('.product_html_modal_'+last_div_index+' .small-table #td_table_tile_two_text_'+last_div_index).text(total_sum);

                    $('.product_html_modal_'+last_div_index+' .small-table').addClass('tile_table_small_table');
                }
                else{
                    $('.product_html_modal_'+last_div_index+' .small-table').html('');
                }
                // --end-->

            }
            else{
                alert('Records are Always be less than 5');
            }
            $('#expand_view_table_product').prop('checked',false);
            $('#expand_view_table_product').val(0);
        }
        else if(tile_edit_value == 'true' && type_data_tile == 'table'){ //Table Edit Case
            var tableLength = $('#product_select_table_entries tr').length;
            if(parseInt(tableLength) <= 5){
                $('#save_table_btn_product').addClass('display-none');
                $('#update_table_btn_product').removeClass('display-none');
                $('.product_tile_modal').modal('show');
                var type = "Product";
                edit_tile_product(type,edit_id);
                var last_div_index = $('#total_records').val();
                var table_html = $('#product_select_table_entries_table').html();
                $('.product_html_modal_'+last_div_index+' #product_modal_table').html(table_html);
                $('.product_html_modal_'+last_div_index+' #product_modal_table thead ,.product_html_modal_'+last_div_index+' #product_modal_table tbody tr').removeAttr('class');
                $('.product_html_modal_'+last_div_index+' #product_modal_table tbody').removeAttr('id');

                $('#modal-height-input-product').attr('disabled',false);
                $('#modal-width-input-product').attr('disabled',false);

                // <---10-11-2021---
                var query_data_row_click = localStorage.getItem('query_data');
                query_data_row_click = JSON.parse(query_data_row_click);

                if(query_data_row_click['row_click'] == 'true')
                {
                    var date_data = $('#row_click_last_date_product').val();
                    var total_sum = $('#overall_count_product').val();

                    $('.product_html_modal_'+last_div_index+' .small-table #td_table_tile_text_'+last_div_index).text(date_data);
                    $('.product_html_modal_'+last_div_index+' .small-table #td_table_tile_two_text_'+last_div_index).text(total_sum);
                    
                    $('.product_html_modal_'+last_div_index+' .small-table').addClass('tile_table_small_table');
                }
                else{
                    $('.product_html_modal_'+last_div_index+' .small-table').html('');
                }
                // --end-->
            }
            else{
                alert('Records are Always be less than 5');
            }
        }
        else if(tile_edit_value == 'true' && type_data_tile == 'overall_count'){ //Overall Tile Edit
            $('#save_table_btn_product').addClass('display-none');
            $('#update_table_btn_product').removeClass('display-none');
            $('.product_tile_modal').modal('show');
            var type = "Product";
            edit_tile_product(type,edit_id);
            var countValue = $('#overall_count_product').val();
            var record_name = $('#analgen_config_id_input').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.product_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.product_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            $('.product_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');

            $('#modal-height-input-product').attr('disabled',true);
            $('#modal-width-input-product').attr('disabled',true);

            $('#modal-height-input-product').val('1');
            $('#modal-width-input-product').val('1');
            $('#modal-height-input-product-hidden').val(145);
            $('#modal-width-input-product-hidden').val(285);

            setTimeout(()=>{
                $('.product_html_modal_'+last_div_index+' .count_result_tile').text(product_type);
            },1100);
        }

    })


    // <---17-8-2021---
    $(document).on('blur change','#modal-height-input-product,#modal-width-input-product', function(){
        var id_val = $(this).attr('id');
        var total_records = $('#total_records').val();
        var ar = [];
        if(id_val == "modal-height-input-product"){
            $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).removeClass('col-md-3');
            $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).removeClass('actual_tile_height');
            var height_val = $('#modal-height-input-product').val();
            if(height_val <= 0){
                $('#modal-height-input-product').val('');
                height_value = 145;
                $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).css('height',height_value);
                $('#modal-height-input-product-hidden').val(height_value);

            }
            else{
                // height_val = parseInt(height_val)+1;
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }

                $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).css('height',height_value);
                $('#modal-height-input-product-hidden').val(height_value);
            }
        }
        else if(id_val == "modal-width-input-product")
        {
            $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).removeClass('col-md-3');
            $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).removeClass('actual_tile_width');
            var width_val = $('#modal-width-input-product').val();
            if(width_val <=0 ){
                $('#modal-width-input-product').val('');
                width_value = 285;
                $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-product-hidden').val(width_value);
                // alert('Width Always be equal to greater than to actual Width');
                // $('#modal-width-input-measurement').val(width_val);
            }
            else{
                // width_val = parseInt(width_val) + 1;
                width_value = parseInt(width_val)*285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-product-hidden').val(width_value);
            }
            
        }
        
    });
    // --end-->

    // <---7-12-2021--
    $(document).on('change','#chart_records_product', function(){
        getChartSelectProductItem();
    });

    $(document).on('change','#chart_records_product_item', function(){
        chartRecordFilterProduct();
    });
    // --end-->


    // <---14-12-2021----
    $(document).on('change','#product_type', function(){
        var prdTypeVal= $(this).val();
        $('#all_product_input_text_field').val('');
        if(prdTypeVal == 'automatic')
        {
            $('#product_field_div').hide();
            $('#product_records_order_by_div').hide();
            getAllProductTables();
            $('#production_btn_table').show();
            // getNumberRecordsProductAutomatic();
        }else {
            var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Product</td></tr>";
            $('#product_select_table_entries').html(tr);
            $('#product_select_table_entries_pagination').html('');
            $('#product_field_div').show();
            $('.automatic_product_div').hide();
            getNumberRecordsProduct();
            $('#production_btn_table').hide();
        }
    })
    // --end-->


    // <---20-12-2021---
    // $(document).on('click','#open_end_layer', function(){
    //     var layer_val_checked = $(this).is(":checked");
    //     if(layer_val_checked == true){
    //         $('#open_end_layer').val('1');
    //         $('#open_end_layer').prop('checked',true);
    //     }
    //     else{
    //         $('#open_end_layer').val('0');
    //         $('#open_end_layer').prop('checked',false);
    //     }
    //     getNumberRecordsEnergy();
    // })
    // ----end--->

    // <----22-11-2021---
    $(document).on('change','#all_tables_product', function(){
        var val = $(this).val();
        $('#product_field_div').hide();
        getAllColumnProductTables();
    });
    
    $(document).on('change','#all_columns_product', function(){
        $('#product_field_div').hide();
        getNumberRecordsProductAutomatic();
    });

    $(document).on('change blur', '#product_total_number_record', function(){
        var val = $(this).val();
        if(val <=0){
            $('.product_number_record_error').text('Value always be greater than 0');
            $('#product_total_number_record').val('');
           
            var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Total No. of Records</td></tr>";
            $('#product_select_table_entries').html(tr);
            $('#product_select_table_entries_pagination').html('');
            localStorage.removeItem('number_record_product');
           
            $('.product_number_record_error').fadeIn('slow');
            setTimeout( function(){
                $('.product_number_record_error').fadeOut('slow');
            },3000);
        }
        else{
            $('.product_number_record_error').text('');
            localStorage.setItem('number_record_product',val);
            // getNumberRecordsProductAutomatic();
        }
        
    });


    //<---12-1-2022--
    $(document).on('change','.modal_day_filter',function(){
        var id = $(this).attr('id');
        var day_from_val = $('#day_from').val();
        var day_to_val = $('#day_to').val();
        if(day_from_val != '' && day_to_val != '')
        {
            // if(day_from_val == day_to_val)
            // {
            //     $('.energy_number_layer_day_filter_error').text('Day From and Day To Cannot be same');
            //     $('.energy_number_layer_day_filter_error').fadeIn('slow');
            //     setTimeout( function(){
            //         $('.energy_number_layer_day_filter_error').fadeOut('slow');
            //     },3000);
            //     $("#day_from option[value='']").prop('selected','selected')
            //     $("#day_to option[value='']").prop('selected','selected')
            // }
            // else{
                getNumberRecordsEnergyLayerModal();
            // }
            // else
            // if(id == 'day_from')
            // {

            // }
            // else if(id == 'day_to')
            // {

            // }
        }
        else if(day_from_val == '' || day_to_val == ''){
            var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
            $('#energy_select_table_entries').html(tr);
            $('#pagination_html_energy').html('');
        }
    })
    // --end--->

    // <---13-1-2022--
    $(document).on('change','#layer_modal_date', function(){
        getNumberRecordsEnergyLayerModal();
    });
    
    // --end-->

    // --end--->


    // <----25-1-2022---
    $(document).on('blur', '#input_val_week_day', function(){
        var input_val = $(this).val();
        var select_day_week = $('#select_day_week').val();
        if(select_day_week == '')
        {
            $('.energy_day_week_filter_error').text('Please Select Filter');
            $('.energy_day_week_filter_error').fadeIn('slow');
            setTimeout( function(){
                $('.energy_day_week_filter_error').fadeOut('slow');
            },3000);
            $('#input_val_week_day').val('');
        }
        else if(select_day_week == 'day')
        {
            if(input_val > 7 || input_val < 1)
            {
                $('.energy_input_day_week_error').text('Value Cannot be Greater than 7 and less than 0');
                $('.energy_input_day_week_error').fadeIn('slow');
                setTimeout( function(){
                    $('.energy_input_day_week_error').fadeOut('slow');
                },3000);
                $('#input_val_week_day').val('');
            }
        }
        else if(select_day_week == 'week')
        {
            if(input_val > 52 || input_val < 1)
            {
                $('.energy_input_day_week_error').text('Value Cannot be Greater than 52 and less than 0');
                $('.energy_input_day_week_error').fadeIn('slow');
                setTimeout( function(){
                    $('.energy_input_day_week_error').fadeOut('slow');
                },3000);
                $('#input_val_week_day').val('');
            }
        }
        // getNumberRecordsEnergyLayerModal();
    });
    
    // ---end--->


    // <----03-3-2022-----
    $(document).on('blur', '#energy_automatic_input', function(){
        var input_val = $(this).val();
        if(input_val > 10 || input_val < 1)
        {
            // alert("Value Cannot be Greater than 10 and less than 0 ");
            $('.energy_automatic_input_error').text('Value Cannot be Greater than 10 and less than 0');
            $('.energy_automatic_input_error').fadeIn('slow');
            setTimeout( function(){
                $('.energy_automatic_input_error').fadeOut('slow');
            },3000);
            $('#energy_automatic_input').val('');
        }
        // getNumberRecordsEnergyAutomatic();
    });
    // --end----->

 


    // <----04-03-2022--
    $(document).on('change','#energy_measurement_automatic', function(){
        getNumberRecordsEnergyAutomatic();
    })
    // --end--->


    // <---27-01-2022---
    $(document).on('change','#energy_measurement,#select_day_week', function(){
        // $('#input_val_week_day').trigger('blur');
        $('#input_val_week_day').val('');
        getNumberRecordsEnergyLayerModal();
    })

    // ---end--->


    // <----18-02-2022--
    $(document).on('change','#energy_type_dashboard_chart', function(){
        var val = $(this).val();
        if(val == 'layer_modal')
        {
            getEnergyMeasurementChart();
        }
        else if(val == 'automatic')
        {
            getEnergyMeasurementChartAutomatic();
        }
        else{
            getChartTimeIntervalRecord();
            $('.energy_chart_layer_div').hide();
            $('#time_interval_div').show();
            $('#chart_record_div').show();
            $('#chart_record_filter_div').show();
            $('.energy_automatic_div').hide();
        }
    });

    $(document).on('blur', '#energy_chart_layer_range', function(){
        var input_val = $(this).val();
        var select_day_week = $('#energy_chart_layer_filter').val();
        if(select_day_week == '')
        {
            $('.energy_chart_layer_filter_error').text('Please Select Filter');
            $('.energy_chart_layer_filter_error').fadeIn('slow');
            setTimeout( function(){
                $('.energy_chart_layer_filter_error').fadeOut('slow');
            },3000);
            $('#energy_chart_layer_range').val('');
        }
        else if(select_day_week == 'day')
        {
            if(input_val > 7 || input_val < 1)
            {
                $('.energy_chart_layer_range_error').text('Value Cannot be Greater than 7 and less than 0');
                $('.energy_chart_layer_range_error').fadeIn('slow');
                setTimeout( function(){
                    $('.energy_chart_layer_range_error').fadeOut('slow');
                },3000);
                $('#energy_chart_layer_range').val('');
            }
        }
        else if(select_day_week == 'week')
        {
            if(input_val > 52 || input_val < 1)
            {
                $('.energy_chart_layer_range_error').text('Value Cannot be Greater than 52 and less than 0');
                $('.energy_chart_layer_range_error').fadeIn('slow');
                setTimeout( function(){
                    $('.energy_chart_layer_range_error').fadeOut('slow');
                },3000);
                $('#energy_chart_layer_range').val('');
            }
        }
        chartRecordFilter();
        // getNumberRecordsEnergyLayerModal();
    });
    // --end--->


    // <----22-2-2022--
    $(document).on('change', '#energy_chart_measurement' , function(){
        $('#energy_chart_layer_range').val('');
        chartRecordFilter();
    });

    $(document).on('change', '#energy_chart_layer_filter' , function(){
        $('#energy_chart_layer_range').val('');
        chartRecordFilter();
    });
    // --end--->


    // <----24-2-2022-
    $(document).on('click','.energy_layer_row_click', function(){
        var tile_id = $(this).attr('tile_id');
        var mst_id = $(this).attr('mst_id');
        var energy_layer_filter = $(this).attr('energy_layer_filter');
        var input_val_week_day = $(this).attr('input_val_week_day');
        var name_val = $(this).children('td:eq(0)').text();
        var valid_from = $(this).children('td:eq(1)').text();
        var valid_to = $(this).children('td:eq(2)').text();
        var time_from = $(this).children('td:eq(4)').text();
        var time_to = $(this).children('td:eq(5)').text();
        var energy_total_value = $(this).children('td:eq(6)').text();

        if(energy_total_value == '0')
        {
            var energy_header = "<tr>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Schichtname</th>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Von Zeit</th>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeit zum</th>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Energieverbrauch</th>";
            energy_header+= "</tr>";

            var energy_html ="<tr>";
            energy_html +="<td colspan='50' class='text-center'>No Record Found</td>";
            energy_html +="</tr>";

           
            $('.'+tile_id+' .save_table_div_show_table .table thead').html(energy_header);
            $('.'+tile_id+' .save_table_div_show_table .table tbody').html(energy_html);

            var table_html = $('.'+tile_id+' .save_table_div_show_table .table').html();
            var chart_tile_click_data = {'table_html' : table_html,'tile_click_type' : 'table'}
            localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));

        }
        else{
            rowClickEnergyDashboardLayer(tile_id,mst_id,energy_layer_filter,input_val_week_day,name_val,valid_from,valid_to,time_from,time_to); 
        }
    });
    // --end-->


    // <----02-03-2022--
    $(document).on('click','#logout' , function(){
        logout();
    });
    // --end--->


    // <----04-3-2022--
    $(document).on('click','.energy_automatic_row_click', function(){
        var tile_id = $(this).attr('tile_id');
        var mst_id = $(this).attr('mst_id');
        var name_val = $(this).children('td:eq(0)').text();
        var date_val = $(this).children('td:eq(1)').text();
        var energy_total_value = $(this).children('td:eq(2)').text();

        if(energy_total_value == '0')
        {
            var energy_header = "<tr>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            energy_header+= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
            energy_header+= "</tr>";

            var energy_html ="<tr>";
            energy_html +="<td colspan='50' class='text-center'>No Record Found</td>";
            energy_html +="</tr>";

           
            $('.'+tile_id+'.tiles-click .save_table_div_show_table .table thead').html(energy_header);
            $('.'+tile_id+'.tiles-click .save_table_div_show_table .table tbody').html(energy_html);

            var table_html = $('.'+tile_id+'.tiles-click .save_table_div_show_table .table').html();
            var chart_tile_click_data = {'table_html' : table_html,'tile_click_type' : 'table'}
            localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));

        }
        else{
            rowClickEnergyDashboardAutomatic(tile_id,mst_id,name_val,date_val); 
        }
    });
    // --end--->


    // <---04-03-2022--
    $(document).on('click','.inner_table_energy_automatic' , function(){
        $(this).removeClass('inner_table_energy_automatic');
        $(this).addClass('hide_table_main');
    });
    // --end-->


    // <----07-3-2022----
    // *** Energy Table Case
    $(document).on('click','#energy_btn_table', function(){
        var energy_type= $('#energy_type').val();
        if(energy_type == 'automatic')
        {
            var energy_measurement_automatic = $('#energy_measurement_automatic').val();
            var energy_automatic_input = $('#energy_automatic_input').val();
            if(energy_measurement_automatic == '' || energy_automatic_input == '' )
            {
                alert('Please Select All Filters');
            }
            else{
                getNumberRecordsEnergyAutomatic();
            }
        }
        else if(energy_type == 'manually'){
            var energy_total_number_record = $('#energy_total_number_record').val();
            if(energy_total_number_record == '')
            {
                alert('Please Select All Filters');
            }
            else{
                getNumberRecordsEnergy();
            }
        }
        else if(energy_type == 'layer_modal'){
            var energy_measurement = $('#energy_measurement').val();
            var select_day_week = $('#select_day_week').val();
            var input_val_week_day = $('#input_val_week_day').val();
            if(energy_measurement == '' || select_day_week == '' || input_val_week_day == '')
            {
                alert('Please Select All Filters');
            }else{
                getNumberRecordsEnergyLayerModal();
            }
        }
        // $('#back_energy_btn_table').show();
    });


    //Product Case
    $(document).on('click','#production_btn_table', function(){
        var product_type = $('#product_type').val();
        if(product_type == 'automatic')
        {
            var all_tables_product = $('#all_tables_product').val();
            var all_columns_product = $('#all_columns_product').val();
            var product_total_number_record = $('#product_total_number_record').val();
            if(all_tables_product == '' || all_columns_product == '' || product_total_number_record == '')
            {
                alert('Please Select All Filters');
            }
            else{
                getNumberRecordsProductAutomatic();
            }
        }
    });


    //Measuement Case
    $(document).on('click', '#measurement_btn_table' , function(){
        var measurement_type = $('#measurement_type').val();
        if(measurement_type == 'automatic')
        {
            var measurement_total_number_record = $('#measurement_total_number_record').val();
            if(measurement_total_number_record == '')
            {
                alert('Please Select All Filters');
            }
            else{
                getNumberRecordsMesurement();
            }
        }
        else if(measurement_type == 'manually')
        {
            var measurement_total_number_record = $('#measurement_total_number_record').val();
            if(measurement_total_number_record == '')
            {
                alert('Please Select All Filters');
            }
            else{
                getNumberRecordsMesurement();
            } 
        }
    }); 

    // --end--->


    $(document).on('blur', '#energy_chart_layer_range_automatic', function(){
        var input_val = $(this).val();
        if(input_val > 30 || input_val < 1)
        {
            $('.energy_chart_layer_automatic_range_error').text('Value Cannot be Greater than 30 and less than 0');
            $('.energy_chart_layer_automatic_range_error').fadeIn('slow');
            setTimeout( function(){
                $('.energy_chart_layer_automatic_range_error').fadeOut('slow');
            },3000);
            $('#energy_chart_layer_range_automatic').val('');
        }
        // chartRecordFilter();
    });

    $(document).on('change','#energy_chart_measurement_automatic', function(){
        // chartRecordFilter();
    });


    $(document).on('click','#back_energy_btn_table', function(){
        $('#energy_btn_table').trigger('click');
        $('#back_energy_btn_table').hide();
    });

    $(document).on('click','#dashboard_sidebar', function(){
        setTimeout(function () {
            showexpandedchart();
        },1000);   
    });
    
    $('#chart_btn_click').click(function(){
        // alert("working");
        chartRecordFilter();
    });

    $('#close-btn').click(function(){
        showexpandedchart();
    });
    $(document).on('click','#refresh-btn', function(){
        setTimeout(function () {
            showexpandedchart();
        },1000);
    });

    $(document).on('click', '#chartModelCancelButton', function(){
        $('#dashboard_sidebar').click();
    })

    $(document).on('click','#settings', function(){
        $('#help_nav_bar').trigger('click');
    });

    $(document).on('click','#switch_mode', function(){
        $('#dashboard_sidebar').trigger('click');
    });
    
    $('#save_default_reload_time').click(function(){
        
    });

    $(document).on('click','#energy_chart_measurement_div_automatic',function(){
        
    });

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

    //  Greater than 5 value restriction in chart multiselector 
        $('#energy_chart_measurement_automatic').change(function(event) {

          $('#energy_chart_measurement_automatic').val();
          if ($(this).val().length > 5) {
            alert('Please Select maximum 5');
            // $('#energy_chart_measurement_automatic').prop('checked', false);
            // // $('#energy_chart_measurement_automatic').val('');
            // $(this).removeAttr('checked');
            // $(this).val(last_valid_selection);
            
            //$(this).prop('selected',false);
            var val = $('#energy_chart_measurement_automatic').val();
            $("#energy_chart_measurement_automatic option[value='"+val[5]+"'").prop('selected',false);
            $("#energy_chart_measurement_automatic").multiselect('reload');
            
          } 
          
        });
    // Hide another types of chart on multiple select 
        $('#energy_chart_measurement_automatic').change(function(event) {

          if ($(this).val().length > 1) {
              $('#area_chart').hide();
              $('#pie_chart').hide();
              $('#bar_chart').hide();
          } 
          
        });

    // Show another types of chart on single select 

        $('#energy_chart_measurement_automatic').change(function(event) {

            if ($(this).val().length < 2) {
                $('#area_chart').show();
                $('#pie_chart').show();
                $('#bar_chart').show();
            } 
            
          });

   

})