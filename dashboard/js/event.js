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
                // dashboardChart();
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
                getNumberRecordsMesurement();
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
    // getDashboardSelectOption();


    //Mesurement
    $(document).on('change','#measurement_time_interval,#measurement_records_order_by',function(){
        getNumberRecordsMesurement();
    });
    $(document).on('blur change', '#measurement_number_record', function(){
        // getNumberRecordsMesurement(); 
        var val = $(this).val();
        if(val <=0){
            $('.measurement_number_record_error').text('Value always be greater than 0');
            $('#measurement_number_record').val('');
           
            var tr = "<tr><td colspan='5' class='text-center text-muted'>Please Select No. of Records</td></tr>";
            $('#mesurement_select_table_entries').html(tr);
            $('#pagination_html').html('');
           
            $('.measurement_number_record_error').fadeIn('slow');
            setTimeout( function(){
                $('.measurement_number_record_error').fadeOut('slow');
            },3000);
        }
        else{
            $('.measurement_number_record_error').text('');
        }
    });

    $(document).on('keypress keyup blur', '#measurement_search_record', function(){
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
        var page_value = $(this).text();
        var id = $(this).attr('id');
        var data_type = $(this).attr('data_type');
        var mst_id = $(this).attr('data_mst');
        
        if(id != undefined && id == 'previous_pagination_val'){
            var find_prev_val = $('.page_count_val.active').prev('li').text();
            var active_text = $('.page_count_val.active').text();
            if(active_text == "1"){
                page_value = active_text;    
            }
            else{
                page_value = find_prev_val;
            }
            // console.log('Prev',find_prev_val);
        }
        else if(id != undefined && id == 'next_pagination_val'){
            var find_next_val = $('.page_count_val.active').next('li').text();
            page_value = find_next_val;

        }
        // console.log('Id', id);
        if(data_type != '' && mst_id != ''){
            rowClickMeasurementPaginationTableData(mst_id,data_type,page_value);
        }
        else{
            getNumberRecordsMesurementPagination(page_value); 
        }
      
    });

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
        switch(div_id){
            case'mesurement_count_div':
                $('#tables_sidebar').click();
                $('#measurement_sidebar_option').click();
            break;

            case'product_count_div':
                $('#tables_sidebar').click();
                $('#product_sidebar_option').click();
            break;

            case'energy_count_div':
                $('#tables_sidebar').click();
                $('#energy_sidebar_option').click();
            break;

        }
    }); 


   

})