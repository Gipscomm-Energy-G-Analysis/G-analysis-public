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
                break;
            
            case "charts_sidebar":
                var dashboardDBChart = localStorage.getItem('dashboardDBName');
                localStorage.setItem('dashboardDBChart',dashboardDBChart);
                localStorage.removeItem('dashboardDBName');
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/'); 
                var mainDirectory = arPathname[1];
                // window.open('/'+mainDirectory+'/main.html','_blank');
                window.open('/'+mainDirectory+'/main.html','_self')
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
                
        }
    });

    // <---Count Dashboard Entries--
    countDashboard();


    //Mesurement
    $(document).on('change','#measurement_number_record',function(){
        getNumberRecordsMesurement();
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

})