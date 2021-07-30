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
                countDashboard();
                dashboardChart();
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
    dashboardChart();
    energy_consumed_five_days();
    // getDashboardSelectOption();


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


    // <---27-7-2021----
    $(document).on('change', '#dashboard_select_tag',function(){
        $('.dashboard_count_div .stretch-card').hide();
        $("#dashboard_select_tag :selected").each(function(index) {
            var current_id_val = $(this).val();
            if(current_id_val =='energy_count_div'){
                $('#energy_graph_chart').show();
                $('#energy_circle_chart').show();
                $('#five_days_energy_consumed').show();
                $('#energy_consumed_div').show();
                $('#five_days_energy_consumed_table_div').show();
                energy_consumed_five_days();
            }
            if(current_id_val =='five_days_energy_consumed'){
                $('#five_days_energy_consumed').show();
                $('#five_days_energy_consumed_table_div').show();
                energy_consumed_five_days();  
            }
            $('#'+this.value).show(); 
        });
    })
    //---end--->

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


    // <---22-7-2021--
    // $('div').removeClass('act_background');
    // $('nav div').addClass('background-image');
    $('.container-fluid nav').addClass('background-image');
    $('#dashboard_main_div .content-wrapper').addClass('background-image');
    $('.footer').addClass('background-image');
    $('.sidebar_redirect').addClass('text-dark');
    // --end-->

})