/**
 * Main initialization block for the dashboard.
 * Sets up initial UI state, loads session/local storage data, and register core event listeners.
 */
$(document).ready( function(){
    var username = sessionStorage.getItem("username");
    $("#username").val(username);

    var dashboardDBStorage = localStorage.getItem('dashboardDB');
    $('#nameDashboardDB').val(dashboardDBStorage);
    sessionStorage.setItem("nameDB", dashboardDBStorage);
    //Hide All Div
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
     $('.container-fluid nav').addClass('background-image');
     $('#dashboard_main_div .content-wrapper').addClass('background-image');
     $('.footer').addClass('background-image');
     $('.sidebar_redirect').addClass('text-dark');
    // Edit Local Storage Remove
    localStorage.removeItem('edit-measurement-tile');
    localStorage.removeItem('edit-i-value');

    /**
     * Handles navigation between different dashboard views (Graph, Table, Chart, etc.).
     * These handlers update the UI visibility, trigger data counts, and reset relevant local storage items.
     */
    $('#gfg1_li').on('click', function(){
        $('#gfg1').show();
        $('#gfg2').hide();
        $('#gfg3').hide();
        $('#gfg4').hide();
        $('#gfg5').hide();
        $('#gfg6').hide();
        $('#gfg7').hide();
        $('#gfg8').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").show();
        $(".graphhide").show();
        countDashboard();
        energy_consumed_five_days();
        getTableFormatDashboard('Graph');
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
        
    });
     $('#gfg2_li').on('click', function(){
        $('#gfg2').show();
        $('#gfg1').hide();
        $('#gfg3').hide();
        $('#gfg4').hide();
        $('#gfg5').hide();
        $('#gfg6').hide();
        $('#gfg7').hide();
        $('#gfg8').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").show();
        $(".graphhide").show();
        countDashboard();
        energy_consumed_five_days();
        getTableFormatDashboard('table');
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
        
    });
     $('#gfg3_li').on('click', function(){
        $('#gfg3').show();
        $('#gfg2').hide();
        $('#gfg1').hide();
        $('#gfg4').hide();
        $('#gfg5').hide();
        $('#gfg6').hide();
        $('#gfg7').hide();
        $('#gfg8').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").show();
        $(".graphhide").show();
        countDashboard();
        energy_consumed_five_days();
        getTableFormatDashboard('chart');
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
        
    });
    /**
     * Initialize DataTables for various listing views.
     * Configuration includes copy/csv/print buttons and pagination settings.
     */
    messstellenDiagrammeListe = $("#messstellenDiagrammeListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    zeitvergleichDiagrammeListe = $("#zeitvergleichDiagrammeListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    kennzahlenDiagrammeListe = $("#kennzahlenDiagrammeListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    importManuellDataDayListe = $("#importManuellDataDayListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    importManuellDataHourListe = $("#importManuellDataHourListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    importManuellDataMonthListe = $("#importManuellDataMonthListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    importManuellDataYearListe = $("#importManuellDataYearListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    importManuell15minDataListe = $("#importManuell15minDataListe").DataTable({
        dom: "Bfrtip",
        buttons: [{
            extend: "copy",
            text: "Kopieren",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "csv",
            text: "CSV-Export",
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "print",
            text: "Drucken",
            exportOptions: {
                columns: ":visible"
            }
        }],
        pageLength: 15,
        bAutoWidth: !1,
        colReorder: !0
    }),
    $('#gfg4_li').on('click', function(){
        $('#gfg4').show();
        $('#gfg3').hide();
        $('#gfg2').hide();
        $('#gfg1').hide();
        $('#gfg5').hide();
        $('#gfg6').hide();
        $('#gfg7').hide();
        $('#gfg8').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").hide();
        $(".graphhide").hide();
        messstellenSavedGraphListing('messstellenvergleich');
        sessionStorage.setItem("saved_graph_popup_module", 'messstellenvergleich');
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
        
    });
    $('#gfg5_li').on('click', function(){
        $('#gfg5').show();
        $('#gfg3').hide();
        $('#gfg2').hide();
        $('#gfg1').hide();
        $('#gfg4').hide();
        $('#gfg6').hide();
        $('#gfg7').hide();
        $('#gfg8').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").hide();
        $(".graphhide").hide();
        zeitvergleichSavedGraphListing('zeitvergleich');
        sessionStorage.setItem("saved_graph_popup_module", 'zeitvergleich');
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
        
    });
    $('#gfg6_li').on('click', function(){
        $('#gfg6').show();
        $('#gfg8').hide();
        $('#gfg7').hide();
        $('#gfg3').hide();
        $('#gfg2').hide();
        $('#gfg1').hide();
        $('#gfg4').hide();
        $('#gfg5').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").hide();
        $(".graphhide").hide();
        kennzahlenSavedGraphListing('Kennzahlendarstellung');
        sessionStorage.setItem("saved_graph_popup_module", 'Kennzahlendarstellung');
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
        
    });
    $('#gfg7_li').on('click', function(){
        $('#gfg7').show();
        $('#gfg8').hide();
        $('#gfg6').hide();
        $('#gfg3').hide();
        $('#gfg2').hide();
        $('#gfg1').hide();
        $('#gfg4').hide();
        $('#gfg5').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").hide();
        $(".graphhide").hide();
        importManuellDataListing('day');
        
    });
    $('#gfg8_li').on('click', function(){
        $('#gfg8').show();
        $('#gfg7').hide();
        $('#gfg6').hide();
        $('#gfg3').hide();
        $('#gfg2').hide();
        $('#gfg1').hide();
        $('#gfg4').hide();
        $('#gfg5').hide();
        $('#charts_main_div').hide();
        $('#dashboard_main_div').show();
        $('#energy_table_main_div').hide();
        $('#measurement_table_main_div').hide();
        $('#production_data_table_main_div').hide();
        $('#production_table_main_div').hide();
        $('#wert_main_div').hide();
        $('#alerts_table_main_div').hide();
        $('#help_table_main_div').hide();
        $(".movetile").hide();
        $(".graphhide").hide();
        importManuell15minDataListing();
        
    });
    //Start Dashboard manuell data tabs code
    // Get all tabs and content
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    // Add click event to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs and contents
            tabs.forEach(tab => tab.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-target')).classList.add('active');
        });
    });
    //End Dashboard manuell data tabs code
    /**
     * Secondary tab click handler for manual data import types.
     * Triggers listing based on the target tab ID (Day, Hour, Month, Year).
     */
    $('.tab').on('click', function(){
        var tabId = $(this).attr('data-target');
        if(tabId=='tab1'){
            importManuellDataListing('day');
        }else if(tabId=='tab2'){
            importManuellDataListing('hour');
        }else if(tabId=='tab3'){
            importManuellDataListing('month');
        }else if(tabId=='tab4'){
            importManuellDataListing('year');
        }
    });
    /**
     * Sidebar and Navigation Bar redirection handler.
     * Manages high-level view switching between Dashboard, Charts, Measurements, Products, Energy, etc.
     */
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
                $(".movetile").show();
                $(".graphhide").show();
                countDashboard();
                energy_consumed_five_days();
                $('#gfg1_li').trigger('click');
                // Edit Local Storage Remove
                localStorage.removeItem('edit-measurement-tile');
                localStorage.removeItem('edit-i-value');
                break;
            
            case "charts_sidebar":
                var dashboardDBChart = localStorage.getItem('dashboardDBName');
                localStorage.setItem('dashboardDBChart',dashboardDBChart);
                localStorage.removeItem('dashboardDBName');
                $('#gfg1_li').trigger('click');
                var pathname = window.location.pathname;
                var arPathname = pathname.split('/');
                var mainDirectory = arPathname.length > 2 ? '/'+arPathname[1] : arPathname[0];
                //show only graph type tiles on diagramm buuton click
                var child = $(".graph"); // Assume this is the child element class
                child.parents("#dashboard_count_div_tile .movetile");
                $(".movetile").hide();
                $(".graphhide").hide();
                // Get all parent elements with the class "parent-class"
                var parentElements = child.parents(".movetile");
                parentElements.each(function() {
                    $(this).show();
                });
                
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
                var number_record_local_val = localStorage.getItem('number_record_measurement');
                if(number_record_local_val != undefined && number_record_local_val != null){
                    $('#measurement_total_number_record').val(number_record_local_val);
                    $('#measurement_search_record').val('');
                    getNumberRecordsMesurement();
                }
                else{
                    $('#measurement_total_number_record').val('');
                }
                break;

            case "product_sidebar_option":
                $('.tile_name_product_div').show();
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').hide();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').show();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();

                var tr= "<tr><td colspan='5' class='text-center' style='padding: 6px;'>Please Select Product</td></tr>";
                $('#product_select_table_entries').html(tr);
                $('#product_select_table_entries_pagination').html('');
                $('#all_product_input_text_field').val('');
                $('#product_records_order_by_div').hide();
                $("#product_type option[value='automatic']").prop('selected','selecetd');
                var number_record_local_val = localStorage.getItem('number_record_product');
                if(number_record_local_val != undefined && number_record_local_val != null){
                    $('#product_total_number_record').val(number_record_local_val);
                }
                getAllProductTables();
                break;

            case "energy_sidebar_option":
                $('.tile_name_energy_div').show();
                $('#charts_main_div').hide();
                $('#dashboard_main_div').hide();
                $('#energy_table_main_div').show();
                $('#measurement_table_main_div').hide();
                $('#production_data_table_main_div').hide();
                $('#production_table_main_div').hide();
                $('#wert_main_div').hide();
                $('#alerts_table_main_div').hide();
                $('#help_table_main_div').hide();
                var number_record_local_val = localStorage.getItem('number_record_energy');
                if(number_record_local_val != undefined && number_record_local_val != null){
                    $('#energy_total_number_record').val(number_record_local_val);
                    $('#energy_search_record').val('');
                    $('#energy_automatic_input').val('');
                    getAllMeasurementEnergyAutomatic();
                }
                else{
                    $('#energy_total_number_record').val('');
                    $('#energy_search_record').val('');
                    $('#energy_automatic_input').val('');
                    getAllMeasurementEnergyAutomatic();
                }
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
    energy_consumed_five_days();
    getDatabaseList();
    setTimeout( ()=>{
        $('#dashboard_database_list').trigger('change');
        $('#dashboard_main_div').click();
    },500);

    /**
     * Change handler for measurement table filters (Interval and Order By).
     * Refreshes table data based on selected criteria.
     */
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

    /**
     * Change handler for energy table filters (Interval and Order By).
     * Refreshes energy data based on selected criteria.
     */
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

    $(document).on('blur change', '#measurement_total_number_record', function(){ 
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
            var data_type = $('#row_click_table').attr('data_type');
            var data_mst = $('#row_click_table').attr('data_mst');
            if(data_type != undefined && data_mst != undefined && data_type != '' && data_mst != ''){
            }
            else{
            }
        }
    });

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
            }
            else{
            }
        }
    });

    /**
     * Keypress and focus handlers for measurement search records.
     * Updates label terminology and triggers record retrieval.
     */
    $(document).on('keypress keyup blur focusin', '#measurement_search_record', function(){
        $('#measurement_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
        $('#measurement_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');
        getNumberRecordsMesurement(); 
    });

    $(document).on('keypress keyup blur focusin', '#energy_search_record', function(){
        $('#energy_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
        $('#energy_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');
        var energy_type = $('#energy_type').val();
        if(energy_type == 'manually')
        {
            getNumberRecordsEnergy(); 
        }
        
    });

    /**
     * Handles clicks on measurement table rows.
     * Selects the record, updates labels, and retrieves detailed measurement data.
     */
    $(document).on('click','.row_click', function(){
        var data_type = $(this).attr('data-type');
        var mst_id = $(this).attr('data-mst');
        var name_val = $(this).children('td:first').text();
        $('#measurement_search_record').val(name_val);
        $('#measurement_records_order_by option:contains("Order By Max Units Consumed")').text('Maximum');
        $('#measurement_records_order_by option:contains("Order By Min Units Consumed")').text('Minimum');
        rowClickMeasurementTableData(mst_id,data_type);
    })

    /**
     * Handles pagination button clicks for measurement and general table data.
     * Manages Previous/Next navigation and active page state.
     */
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
    /**
     * Triggered when a pagination input field loses focus (blur)
     * Used to validate or apply the entered page number for navigation
     */
    $(document).on('blur','.pagination_input_val', function(){
        var page_value = $(this).val();
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
    /**
     * Triggered when the measurement number of records selection changes
     * Used to update or reload data based on the selected record count
     */
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

    /**
     * Handles clicks on energy table rows.
     * Depending on energy type (layer_modal, automatic, or manual), triggers specific data retrieval.
     */
    $(document).on('click','.row_click_energy', function(){
        var energy_type = $('#energy_type').val();

        if(energy_type == 'layer_modal')
        {
            var name_val = $(this).children('td:eq(0)').text();
            var valid_from = $(this).children('td:eq(1)').text();
            var valid_to = $(this).children('td:eq(2)').text();
            var time_from = $(this).children('td:eq(4)').text();
            var time_to = $(this).children('td:eq(5)').text();
            var energy_total_value = $(this).children('td:eq(6)').text();
            $('#energy_search_record').val(name_val);
            if(energy_total_value == '0')
            {
                var tr = "<tr><td colspan='50' class='text-center text-muted'>No Record Found</td></tr>";
                $('#energy_select_table_entries').html(tr);
                $('#pagination_html_energy').html('');
            }
            else{
                rowClickEnergyLayer(name_val,valid_from,valid_to,time_from,time_to); 
            }
        }
        else if(energy_type == 'automatic'){
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

    /**
     * Triggered when an energy pagination page count element is clicked
     * Calls function to fetch/update records based on selected energy page count
     */
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
    /**
     * Determines the correct page value (including previous/next navigation) 
     * calls function to fetch/update records for the selected page
     */
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
    $(document).on('blur','.pagination_input_val_energy', function(){
        var page_value = $(this).val();
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
    $(document).on('blur','.pagination_input_val_energy_layer', function(){
        var page_value = $(this).val();
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
    /**
     * Triggered when the energy number of records selection changes
     * Stores selected value in localStorage and updates pagination data
     */
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

    //Production Data 
    $(document).on('change','#production_data_number_record',function(){
        getNumberRecordsProductionData();
    });

    $(document).on('click', '#save_select_changes' , function(){
        var arData = [];
        $('#dashboard_select_tag :selected').each(function(index){
            var div_id = $(this).val();
            var description = $(this).attr('description');
            arData.push({
                'div_id_val' : div_id, 'description_val' : description 
            })
        })     
    });

    /**
     * Generic modal close handler.
     * Resets opacity and hides the large modal.
     */
    $(".close").click(function(){
      $('.bd-example-modal-lg .modal-content').css('opacity','1');
              $('.bd-example-modal-lg').modal('hide');
    });  
    /**
     * Handles clicks on dashboard tiles.
     * Manages tile expansion, table visibility, and toggles small vs large tile UI states.
     */
    $(document).on('click', '.tiles-click', function(){
        setTimeout(() => {
        const checkTable = $(this).hasClass('hide_table_main');
        if($(this).hasClass('table_tile_expand_view')) {
            return false;
        } else{
            if(checkTable) {
                if(($(this).width() == 225) && ($(this).height() == 145)){
                    $(this).find('.save_table_div_show_table .table').css("display", "none");
                    $(this).find('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
                    $(this).find('.small-table-tile-icon .count_result_tile').css("display", "none");
                    $(this).find('.small-table-tile-icon').addClass('dashboard-small-table-tile');
                }else{
                    $(this).find('.save_table_div_show_table .table').css("display", "table");
                    $(this).find('.count_result_tile').css("display", "block");
                    $(this).find('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
                    $(this).find('.small-table-tile-icon').removeClass('dashboard-small-table-tile');
                }
            } else {
                
                if(($(this).width() == 225) && ($(this).height() == 145)){
                    $(this).find('.save_table_div_show_table .table').css("display", "none");
                    $(this).find('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
                    $(this).find('.small-table-tile-icon .count_result_tile').css("display", "none");
                    $(this).find('.small-table-tile-icon').addClass('dashboard-small-table-tile');
                }else{
                    $(this).find('.save_table_div_show_table .table').css("display", "table");
                    $(this).find('.count_result_tile').css("display", "block");
                    $(this).find('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
                    $(this).find('.small-table-tile-icon').removeClass('dashboard-small-table-tile');
                }
            }
            
            var id=$(this).attr('class');
            div_id =id.split(" ")[0];
            $(".small-table_"+$(this).attr('data-i')).hide();
            tiles_click(div_id,prd_automatic_tile = false);
        }
      }, 100);
        
        
    });
    $(document).on("click",".chart_tile",function() {
        $(this).find(".card-body").addClass("set-tile");
    });

    $(document).on('click', '.product_automatic_tile', function(){
        var id=$(this).attr('class');
        div_id =id.split(" ")[0];
        $('.'+div_id+'.product_automatic_tile').fadeOut("20");
        $(".small-table_"+$(this).attr('data-i')).hide();
        tiles_click(div_id,prd_automatic_tile = true);
    });

    /**
     * Handler for the save table button in modals.
     * Saves overall count or table format tiles based on the current dashboard tile data.
     */
    $(document).on('click','#save_table_btn', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count' && ar['record_type_of_tile'] == 'measurement')
        {
            saveOverallCountTile();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'measurement'){
            var type = $(this).attr('data-type');
            saveTableFormat(type);
        }
    })
    /**
     * Triggered when the save button for the energy table is clicked
     * Used to save or persist the current energy table configuration/data
     */
    $(document).on('click','#save_table_btn_energy', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count' && ar['record_type_of_tile'] == 'energy')
        {
            saveOverallCountTileEnergy();
        }
        else if(ar['type_data_tile'] == 'table' && ar['record_type_of_tile'] == 'energy'){
            saveTableFormatEnergy();
        }
    })
    /**
     * Triggered when the save button for the product table is clicked
     * Used to save or persist the current product table configuration/data
     */
    $(document).on('click','#save_table_btn_product', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        if(ar['type_data_tile'] == 'overall_count' && ar['record_type_of_tile'] == 'product')
        {
            saveOverallCountTileProduct();
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
    /**
     * Triggered when a dashboard tile is clicked
     * Navigates to the corresponding table section (measurement, product, or energy)
     * by triggering sidebar menu actions based on the clicked tile ID
     */
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
    /**
     * Triggered when measurement modal height or width inputs lose focus (blur) or their value changes
     * Used to update or validate the modal dimensions for the measurement view
     */
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
                width_value = 250;
                $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-measurement-hidden').val(width_value);
            }
            else{
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
                }
                $('.gernerated_measurement_modal_tiles #measurement_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-measurement-hidden').val(width_value);
            }
            
        }
        
    });

    /**
     * Main handler for opening the measurement tile configuration modal.
     * Prepares the modal with default or existing (edit mode) data for measurement tiles.
     */
    $(document).on('click','#modal_open_button', function(){
        setTimeout(function () {
            if ($(".modal-backdrop").length > 1) {
                $(".modal-backdrop").first().remove();
            }
        }, 300);
        var edit_id = localStorage.getItem('edit-measurement-tile');
        var tile_edit_value = $(this).attr('tile-edit');
        var ar = localStorage.getItem('dashboard_tile_data');
        dashboard_tile_data = JSON.parse(ar);
        var type_data_tile = dashboard_tile_data['type_data_tile'];
        var measurement_type = $('#measurement_type').val();

        $('.energy_tile_modal').modal('hide'); //Energy Modal Hide
        $('#expand_view_table').prop('checked',false);
        $('#expand_view_table').val(0);
        $('#table_outside_tile_structure').prop('checked',false);
        $('#table_outside_tile_structure').val(0);
        $('.table_outisde_tile_controls').hide();
      
        if(tile_edit_value == 'false' && type_data_tile == "overall_count"){
            $('#save_table_btn').removeClass('display-none');
            $('#update_table_btn_measurement').addClass('display-none');
            $('.bd-example-modal-lg').modal('show');
            var type = "Measurement";
            generateHtmlMeasurementTiles(type);
            var countValue = $('#overall_count').val();
            var record_name = $('#mst_id_hidden').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.measurement_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.measurement_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            $('.measurement_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.measurement_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);
            $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');         
            $('#modal-height-input-measurement').attr('disabled',true);
            $('#modal-width-input-measurement').attr('disabled',true);

            $('#modal-height-input-measurement').val('1');
            $('#modal-width-input-measurement').val('1');
            $('#modal-height-input-measurement-hidden').val(145);
            $('#modal-width-input-measurement-hidden').val(250);

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
                var type = "Measurement";
                generateHtmlMeasurementTiles(type);
                var last_div_index = $('#total_records').val();
                var table_html = $('#measurement_record_tb').html();
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table').html(table_html);
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table thead ,.measurement_html_modal_'+last_div_index+' #measurement_modal_table tbody tr').removeAttr('class');
                $('.measurement_html_modal_'+last_div_index+' #measurement_modal_table tbody').removeAttr('id');

                $('.measurement_table_outer_html_modal_'+last_div_index+' #measurement_outer_modal_table').html(table_html);
                $('.measurement_table_outer_html_modal_'+last_div_index+' #measurement_outer_modal_table thead ,.measurement_html_modal_'+last_div_index+' #measurement_outer_modal_table tbody tr').removeAttr('class');
                $('.measurement_table_outer_html_modal_'+last_div_index+' #measurement_outer_modal_table tbody').removeAttr('id');

                $('.measurement_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table #measurement_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
                $(".gernerated_measurement_modal_tiles").find('[data-type-tile="Measurement"]').first().hide();

                $('#modal-height-input-measurement-hidden').val(290);
                $('#modal-height-input-measurement').val('2');
                $('#modal-width-input-measurement-hidden').val(500);
                $('#modal-width-input-measurement').val('2');
                $('#modal-height-input-measurement').attr('disabled',false);
                $('#modal-width-input-measurement').attr('disabled',false);
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

                $('.measurement_table_outer_html_modal_'+last_div_index+' #measurement_outer_modal_table').html(table_html);
                $('.measurement_table_outer_html_modal_'+last_div_index+' #measurement_outer_modal_table thead ,.measurement_table_outer_html_modal_'+last_div_index+' #measurement_modal_table tbody tr').removeAttr('class');
                $('.measurement_table_outer_html_modal_'+last_div_index+' #measurement_outer_modal_table tbody').removeAttr('id');

                $('.measurement_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table #measurement_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
                $(".gernerated_measurement_modal_tiles").find('[data-type-tile="Measurement"]').first().hide();

                $('#modal-height-input-measurement').attr('disabled',false);
                $('#modal-width-input-measurement').attr('disabled',false);
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
             $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
             $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
             $('.measurement_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');          
            $('#modal-height-input-measurement').attr('disabled',true);
            $('#modal-width-input-measurement').attr('disabled',true);

            $('#modal-height-input-measurement').val('1');
            $('#modal-width-input-measurement').val('1');
            $('#modal-height-input-measurement-hidden').val(145);
            $('#modal-width-input-measurement-hidden').val(250);

            setTimeout(()=>{
                $('.measurement_html_modal_'+last_div_index+' .count_result_tile').text(measurement_type);
            },1100);
        }

    })
    /**
     * Triggered when energy modal height or width inputs lose focus (blur) or their value changes
     * Used to update or validate the modal dimensions for the energy view
     */
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
                width_value = 250;
                $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-energy-hidden').val(width_value);
            }
            else{
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
                }
                $('.gernerated_energy_modal_tiles #energy_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-energy-hidden').val(width_value);
            }
            
        }
        
    });

    /**
     * Main handler for opening the energy tile configuration modal.
     * Checks tile limits and prepares the energy modal UI for new or edited tiles.
     */
    $(document).on('click','#energy_modal_open_button', function(){
        var tile_edit_value = $(this).attr('tile-edit');
        if(tile_edit_value == 'false'){
            var dashboardcountTiles='';
                $.ajax({
                        type: "POST",
                        url: "php/retreive.php",
                        async: false,
                        dataType: 'json',
                        data: {
                        action: "dashboardTileCount",
                        username: $("#username").val(),
                        nameDB: $("#nameDashboardDB").val(),
                    },
                    fail: function() {
                        alert("failed!!")
                    },
                    success: function(a) {
                        if (a >= 16) {
                            dashboardcountTiles=a;
                            toastr.warning('Maximum 16 tiles can be added!');
                        }  
                    }
                });
            if(dashboardcountTiles >= 16){
                return false;
            }
        }
        var edit_id = localStorage.getItem('edit-measurement-tile');
        var tile_edit_value = $(this).attr('tile-edit');
        var ar = localStorage.getItem('dashboard_tile_data');
        dashboard_tile_data = JSON.parse(ar);
        var type_data_tile = dashboard_tile_data['type_data_tile'];
        var energy_type = $('#energy_type').val();
        $('.bd-example-modal-lg').modal('hide'); //Measurement Modal Hide
        $('#expand_view_energy_table').prop('checked',false);
        $('#expand_view_energy_table').val(0);
        $('#energy_table_outside_tile_structure').prop('checked',false);
        $('#energy_table_outside_tile_structure').prop(0);
        $('.table_outisde_tile_controls').hide();
      
        if(tile_edit_value == 'false' && type_data_tile == "overall_count"){
            $('#save_table_btn_energy').removeClass('display-none');
            $('#update_table_btn_measurement_energy').addClass('display-none');
            $('.energy_tile_modal').modal('show');
            var type = "Energy";
            generateHtmlEnergyTiles(type);
            var countValue = $('#overall_count_energy').val();
            var record_name = $('#mst_id_hidden_energy').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.energy_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.energy_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            $('.energy_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.energy_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);
            $('.energy_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.energy_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.energy_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');

            $('#modal-height-input-energy').attr('disabled',true);
            $('#modal-width-input-energy').attr('disabled',true);

            $('#modal-height-input-energy').val('1');
            $('#modal-width-input-energy').val('1');
            $('#modal-height-input-energy-hidden').val(145);
            $('#modal-width-input-energy-hidden').val(250);

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
                var type = "Energy";
                generateHtmlEnergyTiles(type);
                var last_div_index = $('#total_records').val();
                var table_html = $('#energy_record_tb').html();
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table').html(table_html);
                $('.energy_html_modal_'+last_div_index+' #energyt_modal_table thead ,.energy_html_modal_'+last_div_index+' #energy_modal_table tbody tr').removeAttr('class');
                $('.energy_html_modal_'+last_div_index+' #energy_modal_table tbody').removeAttr('id');

                $('.energy_table_outer_html_modal_'+last_div_index+' #energy_outer_modal_table').html(table_html);
                $('.energy_table_outer_html_modal_'+last_div_index+' #energy_outer_modal_table thead ,.energy_html_modal_'+last_div_index+' #energy_outer_modal_table tbody tr').removeAttr('class');
                $('.energy_table_outer_html_modal_'+last_div_index+' #energy_outer_modal_table tbody').removeAttr('id');

                $('.energy_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table #energy_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
                $(".gernerated_energy_modal_tiles").find('[data-type-tile="Energy"]').first().hide();
                $('#modal-height-input-energy-hidden').val(290);
                $('#modal-height-input-energy').val('2');
                $('#modal-width-input-energy-hidden').val(500);
                $('#modal-width-input-energy').val('2');
                $('#modal-height-input-energy').attr('disabled',false);
                $('#modal-width-input-energy').attr('disabled',false);
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
            }
            else{
                alert('Records are Always be less than 5');
            }
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

                $('.energy_table_outer_html_modal_'+last_div_index+' #energy_outer_modal_table').html(table_html);
                $('.energy_table_outer_html_modal_'+last_div_index+' #energy_outer_modal_table thead ,.energy_html_modal_'+last_div_index+' #energy_outer_modal_table tbody tr').removeAttr('class');
                $('.energy_table_outer_html_modal_'+last_div_index+' #energy_outer_modal_table tbody').removeAttr('id');

                $('.energy_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table #energy_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
                $(".gernerated_energy_modal_tiles").find('[data-type-tile="Energy"]').first().hide();

                $('#modal-height-input-energy').attr('disabled',false);
                $('#modal-width-input-measurement').attr('disabled',false);
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
            }
            else{
                alert('Records are Always be less than 5');
            }
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
             $('.energy_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
             $('.energy_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
             $('.energy_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');
            $('#modal-height-input-energy').attr('disabled',true);
            $('#modal-width-input-energy').attr('disabled',true);

            $('#modal-height-input-energy').val('1');
            $('#modal-width-input-energy').val('1');
            $('#modal-height-input-energy-hidden').val(145);
            $('#modal-width-input-energy-hidden').val(250);

            setTimeout(()=>{
                $('.energy_html_modal_'+last_div_index+' .count_result_tile').text(energy_type);
            },1100);
        }

    })

  setTimeout( function(){
        $(".small-table table").css('display','none')
    },1000);
    $(document).on('click', function (event) {
        if (!$(event.target).closest('#mesurement_count_div,#product_count_div,#energy_count_div,#energy_consumed_div,#five_days_energy_consumed').length) {
            $('.dashboard_count_div .stretch-card .card-body').addClass('row');
            $('.dashboard_count_div .stretch-card .card-body div:first-child').addClass('col-md-12');

            $('.dashboard_count_div .stretch-card .card-body').removeClass('overflow-hide display-flex');
            $('.dashboard_count_div .stretch-card .card-body').removeClass('ml-3');

            
            $('.dashboard_count_div .stretch-card').removeClass('tile-click-table');
            $('.dashboard_count_div .stretch-card').addClass('tiles-click');
            $('.dashboard_count_div .stretch-card.product_automatic_tile ').removeClass('tiles-click'); 
            $('.save_table_div_show').hide();
            $('.action-modal-button-div').removeClass('col-md-12');
            $('.dashboard_count_div .movetile .overall_value_tile .card-body').removeClass('row');
            $('.dashboard_count_div .movetile .overall_value_tile .card-body div:first-child').removeClass('col-md-12');
            $('.dashboard_count_div .movetile .table_tile .card-body').removeClass('row');
            $('.dashboard_count_div .movetile .table_tile .card-body div:first-child').removeClass('col-md-12');
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
            var energy = $("#dashboard_count_div_tile").find('[data-type-tile="energy"]');
            if (energy) {
            
            }else{
                var x = document.querySelectorAll(".table_tile_outside_structure");
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
            }

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
        }
        
    });

    /**
     * Primary handler for "Save & Proceed" button within the dashboard tile modal.
     * Redirects users to relevant configuration screens (Measurement, Product, Energy) based on selection.
     */
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
            $('.tile_name_product_div').hide();

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
                     $('#all_tables_product option[value=' + edit_tile_db_table + ']').prop('selected', 'selected');
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
            $('#tables_sidebar').click();
            $('#energy_sidebar_option').click();
            $('#dashboard_tile_modal').modal('hide');
            $('.tile_name_energy_div').hide();
         
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
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getChartTileDashboard();                                   
            $('#time_interval_chart option[value=1]').prop('selected','selected');
            getChartTimeIntervalRecord();
            $('#measurement-height-chart').val('1');
            $('#measurement-height-chart-hidden').val('145');
            $('#measurement-width-chart').val('1');
            $('#measurement-width-chart-hidden').val('250');
            $('#dashboard_tile_modal_chart').modal('show');
            $('#chart_records_label').text('Select '+record_type_of_tile);
            $('#update_and_proceed_btn_dashboard_chart').hide();
            $('#save_and_proceed_btn_dashboard_chart').show();
            $('#dashboard_loader_div').hide();
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');

            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');

            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');
            $('.chart_product_div').hide();
            $('#chart_record_div').show();
            $('#time_interval_div').show();
            if(record_type_of_tile == "energy")
            {               
                $('#energy_type_dashboard_chart_div').show();
                $('#energy_type_dashboard_chart option[value=automatic').prop('selected','selected');
                $('#energy_type_dashboard_chart').trigger('change');
            }
            else{
                $('.energy_automatic_div').hide();
                $('#energy_type_dashboard_chart_div').hide();
                $('.energy_chart_layer_div').hide();
            }
        }
        else if((record_type_of_tile == "measurement" || record_type_of_tile == "energy") && type_data_tile == "chart" && data_edit_chart == 'true')
        {
            $('#dashboard_tile_modal').modal('hide');
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
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
            $('#update_and_proceed_btn_dashboard_chart').show();
            $('#save_and_proceed_btn_dashboard_chart').hide();
            $('#chart_records_label').text('Select '+record_type_of_tile);
            $('#dashboard_loader_div').hide();            
            $('.chart_product_div').hide();
        }
        else if(record_type_of_tile == "product" && type_data_tile == "chart" && data_edit_chart == 'false')
        {
            $('#dashboard_tile_modal').modal('hide');
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':record_type_of_tile,'type_data_tile':type_data_tile};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getChartTileDashboard();
            $('#time_interval_chart option[value=1]').prop('selected','selected');
            getChartTimeIntervalRecordProduct();
            $('#measurement-height-chart').val('1');
            $('#measurement-height-chart-hidden').val('145');
            $('#measurement-width-chart').val('1');
            $('#measurement-width-chart-hidden').val('250');
            $('#dashboard_tile_modal_chart').modal('show');
            $('#chart_records_label_product').text('Select '+record_type_of_tile);
            $('#update_and_proceed_btn_dashboard_chart').hide();
            $('#save_and_proceed_btn_dashboard_chart').show();
            $('#dashboard_loader_div').hide();
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');
            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');
            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');
            $('.chart_product_div').show();
            $('#chart_record_div').hide();
            $('#time_interval_div').hide();
            $('#energy_type_dashboard_chart_div').hide();
            $('.energy_chart_layer_div').hide();
            $('.energy_automatic_div').hide();
        }
        else if(record_type_of_tile == "product" && type_data_tile == "chart" && data_edit_chart == 'true')
        {
            $('#dashboard_tile_modal').modal('hide');
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
            $('#update_and_proceed_btn_dashboard_chart').show();
            $('#save_and_proceed_btn_dashboard_chart').hide();
            $('#chart_records_label_product').text('Select '+record_type_of_tile);
            $('#dashboard_loader_div').hide();
            $('.chart_product_div').show();
            $('#chart_record_div').hide();
            $('#time_interval_div').hide();
            $('#energy_type_dashboard_chart_div').hide();
            $('.energy_chart_layer_div').hide();
            $('.energy_automatic_div').hide();           
        }
        else if(record_type_of_tile == "graph" && $(this).attr('data-edit') == 'false')
        {
            $('#chart_record_product_div').hide();
            $('#chart_record_product_item_div').hide();
            $('#chart_record_filter_div').hide();
            $('#chart_record_type_div').hide();
            $('#save_graph_div').show();
            $('#newGraph').show();
            $('#graph_table_div').show();
            $('#measurement_point_div').hide();
            $('#measurement_point_year_div').hide();
            $('#isLiveGraph').hide();
            $('#auto_refresh_div').hide();
            $('#refreshTile').hide();
            $('#numberofday').hide();
            $('#graph_table_chart').prop('selectedIndex',0);
            $('#measurement_point_chart').prop('selectedIndex',0);
            $('#measurement_point_year').prop('selectedIndex',0);
            $('#chart_btn_click').hide();
            $('.expandViewChart').hide();
            $('.outsideView').hide();
            savedGraphList();
            $('#dashboard_tile_modal').modal('hide');
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':'graph','type_data_tile':'Graph'};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getGraphChartTileDashboard();
            $('#time_interval_chart option[value=1]').prop('selected','selected');
            $('#measurement-height-chart').val('2');
            $('#measurement-height-chart-hidden').val('290');
            $('#measurement-width-chart').val('2');
            $('#measurement-width-chart-hidden').val('500');
            $('#dashboard_tile_modal_chart').modal('show');
            $('#chart_records_label_product').text('Select '+record_type_of_tile);
            $('#update_and_proceed_btn_dashboard_chart').hide();
            $('#save_and_proceed_btn_dashboard_chart').show();
            $('#dashboard_loader_div').hide();
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');
            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');
            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');
            $('#chart_record_div').hide();
            $('#time_interval_div').hide();
            $('#energy_type_dashboard_chart_div').hide();
            $('.energy_chart_layer_div').hide();
            $('.energy_automatic_div').hide();
            $('.outer_chart_tile_structure').hide();
            $('.default').hide();
            $('.msgGraph').show();
        }
        else if(record_type_of_tile == "graph" && $(this).attr('data-edit') == 'true')
        {
            $('.msgGraph').hide();
            $('.default').show();
            $('#chart_record_product_div').hide();
            $('#chart_record_product_item_div').hide();
            $('#chart_record_filter_div').hide();
            $('#chart_record_type_div').hide();
            $('#save_graph_div').show();
            $('#newGraph').show();
            $('#graph_table_div').show();
            $('#measurement_point_year_div').hide();
            $('#chart_btn_click').hide();
            $('.expandViewChart').hide();
            $('.outsideView').hide();
            savedGraphList();
            var ar = {'title_modal_tile':title_modal_tile,'record_type_of_tile':'graph','type_data_tile':'Graph'};
            localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
            getEditGraphChartTileDashboard();
            $('#dashboard_tile_modal').modal('hide');
            $('#dashboard_tile_modal_chart').modal('show');
            $('#update_and_proceed_btn_dashboard_chart').show();
            $('#save_and_proceed_btn_dashboard_chart').hide();
            $('#dashboard_loader_div').hide();
            $('#expand_view_chart').prop('checked',false);
            $('#expand_view_chart').val('0');
            $('#chart_outside_tile_structure').prop('checked',false);
            $('#chart_outside_tile_structure').val('0');
            $('.chart_outisde_tile_controls').hide();
            $('#chart_height_outer_structure').val('');
            $('#chart_width_outer_structure').val('');
            $('#chart_record_div').hide();
            $('#time_interval_div').hide();
            $('#energy_type_dashboard_chart_div').hide();
            $('.energy_chart_layer_div').hide();
            $('.energy_automatic_div').hide();
            $('.outer_chart_tile_structure').hide();
        }  
        if(record_type_of_tile != "graph"){
            $('#save_graph_div').hide();
            $('#isLiveGraph').hide();
            $('#newGraph').hide();
            $('#graph_table_div').hide();
            $('#measurement_point_div').hide();
            $('#measurement_point_year_div').hide();
            $('#auto_refresh_div').hide();
            $('#refreshTile').hide();
            $('.expandViewChart').show();
            $('.outsideView').show();
        }       
        $('#title_modal_tile').val('');
        $('#record_type_of_tile option[value=energy]').prop('selected','selected');
        $('#type_data_tile option[value=table').prop('selected', 'selected');
    });

    /**
     * Delete button handler for dashboard tiles.
     * Prompts for confirmation and triggers the delete operation.
     */
    $(document).on('click','.delete_btn_tile',function(){
        var confResult = confirm('Are you sure want to Delete');
        if(confResult == true){
            var id=$(this).attr('class');
            id_val =id.split(" ")[0];
            var product_automatic_tile = $(this).hasClass('product_automatic_tile_delete');
            deleteTile(id_val,product_automatic_tile);
        }
        
    })
    
    /**
     * Edit button handler for dashboard tiles (Table/Count tiles).
     * Retrieves existing tile data and opens the configuration modal in edit mode.
     */
    $(document).on('click','.edit_btn_tile',function(){
     
        var id=$(this).attr('class');
        var i_value = $(this).attr('data-i-value');
        id_val =id.split(" ")[0];
        var product_automatic_tile = $(this).hasClass('product_automatic_tile_edit');
        getEditDataDashboard(id_val,i_value,product_automatic_tile);
        $('#dashboard_tile_modal').modal('show');   
    });

    /**
     * Update button handler for measurement tiles.
     * Triggers update for either table format or overall count records.
     */
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
    /**
     * Update button handler for energy tiles.
     * Triggers update for either table format or overall count records.
     */
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
    /**
     * Update button handler for product tiles.
     */
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
    /**
     * Triggered when the "Add Tile" button on the dashboard is clicked
     * Used to open or initialize the process of adding a new dashboard tile
     */
    $(document).on('click','#dashboard_add_tile', function(){
        $("#dashboard_add_tile").attr('data-target','#dashboard_tile_modal');
        $('#save_and_proceed_btn_dashboard').val('Save & Proceed');
        $('#save_and_proceed_btn_dashboard').attr('data-edit','false');
        $('#save_and_proceed_btn_dashboard').attr('data-edit-chart','false');
        $('.modal-header h5').text('Dashboard');
        $("#record_type_of_tile").parents('.form-group.col-md-3').show();
        $("#type_data_tile").parents('.form-group.col-md-3').show();
        $('#title_modal_tile').val('');
        $('#record_type_of_tile option[value=energy]').prop('selected','selected');
        $('#type_data_tile option[value=table').prop('selected', 'selected');
        if($('#record_type_of_tile').val() != 'graph'){
            $('.tile-type').show();
        }else{
            $('.tile-type').hide();
        }

        $("#type_data_tile").removeAttr('disabled');
        $("#record_type_of_tile").removeAttr('disabled');
        $("#product_type").removeAttr('disabled');

        //Product Edit Fields
        $('#edit_product_tile_automatic').attr('db_name','');
        $('#edit_product_tile_automatic').attr('db_table','');
        $('#edit_product_tile_automatic').attr('all_column','');
        $('#edit_tile_click_manually').attr('data_click','');
        
    });

    /**
     * Handles dimension changes (height/width) for chart tiles in modals.
     * Adjusts the preview tile size and redraws charts if necessary.
     */
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
                else if(record_type_of_tile == 'graph')
                {
                    let graph_height_value='';
                    if(height_value=='290'){
                        graph_height_value='260';
                    }else if(height_value=='435'){
                        graph_height_value='400';
                    }else if(height_value=='580'){
                        graph_height_value='550';
                    }

                    var scrollYValue='175px';
                    var scrollHeight =$('#measurement-height-chart').val();
                    if(scrollHeight == 2){
                        scrollYValue='175px';
                    }else if(scrollHeight == 3){
                        scrollYValue='320px';
                    }else if(scrollHeight == 4){
                        scrollYValue='460px';
                    }else{
                        scrollYValue='175px';
                    }
                    $('#measurement_point_chart').trigger('change');
                    $('#measurement_point_year').trigger('change');
                    $('#graph_table_chart').trigger('change');

                    var graphTileWidth = $(".default #container").css("width");
                    var graphTileHeight = $(".default #container").css("height");
                    var displayTableData1 = $(".default").find("#table-chart-data-container_1").css("display");
                    var displayTableData2 = $(".default").find("#table-chart-data-container_2").css("display");
                    var displayTableData3 = $(".default").find("#table-chart-data-container_3").css("display");
                    var displayTableData = $(".default").find("#table-chart-data-container").css("display");
                    $(".default").find("#table-chart-data-container_1").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData1+";");
                    $(".default").find("#table-chart-data-container_2").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData2+";");
                    $(".default").find("#table-chart-data-container_3").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData3+";");
                    $(".default").find("#table-chart-data-container").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData+";");
                    $(".default .dataTables_scrollBody").css("max-height", scrollYValue);
                    $(".default .dataTables_scrollHeadInner").css("width", '100%');
                    $(".default .dataTables_scrollHeadInner table").css("width", '100%');
                    $(".default #tblChartData_1").css("width", '100%');
                    $(".default #tblChartData_2").css("width", '100%');
                    $(".default #tblChartData_3").css("width", '100%');
                    $(".default #tblChartData").css("width", '100%');
                    $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).css('height',height_value);
                    $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).find('#container').css('height',graph_height_value);
                    $("#container").ejChart("redraw");
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
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
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
                else if(record_type_of_tile == 'graph'){
                     var scrollYValue='175px';
                    var scrollHeight =$('#measurement-height-chart').val();
                    if(scrollHeight == 2){
                        scrollYValue='175px';
                    }else if(scrollHeight == 3){
                        scrollYValue='320px';
                    }else if(scrollHeight == 4){
                        scrollYValue='460px';
                    }else{
                        scrollYValue='175px';
                    }
                    $('#measurement_point_chart').trigger('change');
                    $('#measurement_point_year').trigger('change');
                    $('#graph_table_chart').trigger('change');

                    var graphTileWidth = $(".default #container").css("width");
                    var graphTileHeight = $(".default #container").css("height");
                    var displayTableData1 = $(".default").find("#table-chart-data-container_1").css("display");
                    var displayTableData2 = $(".default").find("#table-chart-data-container_2").css("display");
                    var displayTableData3 = $(".default").find("#table-chart-data-container_3").css("display");
                    var displayTableData = $(".default").find("#table-chart-data-container").css("display");
                    $(".default").find("#table-chart-data-container_1").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData1+";");
                    $(".default").find("#table-chart-data-container_2").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData2+";");
                    $(".default").find("#table-chart-data-container_3").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData3+";");
                    $(".default").find("#table-chart-data-container").removeAttr("style","width: ''; height: '';").attr("style", "width: "+graphTileWidth+"; height: "+graphTileHeight+"; display: "+displayTableData+";");
                    $(".default .dataTables_scrollBody").css("max-height", scrollYValue);
                    $(".default .dataTables_scrollHeadInner").css("width", '100%');
                    $(".default .dataTables_scrollHeadInner table").css("width", '100%');
                    $(".default #tblChartData_1").css("width", '100%');
                    $(".default #tblChartData_2").css("width", '100%');
                    $(".default #tblChartData_3").css("width", '100%');
                    $(".default #tblChartData").css("width", '100%');

                    $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).css('width',width_value);
                    $('.dashboard_chart_tiles #measurement_count_tile_modal_chart_'+total_records).find('#container').css('width',width_value=='500' ? '430' : width_value-70);
                    $("#container").ejChart("redraw");
                }
                $('#measurement-width-chart-hidden').val(width_value);
            }

        }
    })

    /**
     * Save button handler for chart tiles.
     * Routes to specific save functions based on record type (Product, Energy, Measurement).
     */
    $(document).on('click', '#save_and_proceed_btn_dashboard_chart', function(){
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var energy_chart_measurement = $('#energy_type_dashboard_chart').val();
        if(ar['record_type_of_tile'] == 'product')
        {
            saveDashboardTileChartProduct();
        }
        else if(ar['record_type_of_tile'] == 'energy' && energy_chart_measurement == 'layer_modal')
        {
            saveDashboardTileChartEnergyLayer();   
        }
        else if(ar['record_type_of_tile'] == 'energy' && energy_chart_measurement == 'automatic')
        {
            saveDashboardTileChartEnergyAutomatic();   
        }
        else{
            saveDashboardTileChart();
        }
    })

    $(document).on('change','#time_interval_chart',function(){
        getChartTimeIntervalRecord();
        chartRecordFilter();
    });

    $(document).on('change','#chart_record_filter',function(){
       chartRecordFilter(); 
    });

    $(document).on('change','#measurement_type', function(){
        var val = $(this).val();
        if(val == 'automatic'){
            $('#measurement_records_order_by option:contains("Order By Max Units Consumed")').text('Maximum');
            $('#measurement_records_order_by option:contains("Order By Min Units Consumed")').text('Minimum');
        }else{
            $('#measurement_records_order_by option:contains("Maximum")').text('Order By Max Units Consumed');
            $('#measurement_records_order_by option:contains("Minimum")').text('Order By Min Units Consumed');   
        }
        getNumberRecordsMesurement();
    })

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
    /**
     * Triggered when the save position button for dashboard tiles is clicked
     * Used to persist or update the current tile layout/positions on the dashboard
     */
    $(document).on('click','#save_position_tile', function(){
        let tilelength = $('#dashboard_count_div_tile .grid-margin').length;
        if(tilelength > 0){
            var ar = [];
            $('#dashboard_count_div_tile .grid-margin').each(function(i,val){
                var id = $(this).attr('class');
                id_val =id.split(" ")[0];
                ar.push({'id': id_val , 'position' : i});
            });
            saveDashboardTilePosititon(ar);
        }
    });
    /**
     * Triggered when a dashboard menu item is clicked
     * Stores selected menu option in localStorage and redirects to the main dashboard page
     */
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
    /**
     * Triggered when the dashboard database selection changes
     * Used to load or update dashboard data based on the selected database
     */
    $(document).on('change','#dashboard_database_list',function(){
        var val = $(this).val();
        var dashboardDbName = $('option:selected', this).attr('dashboardbValue');
        localStorage.setItem('dashboardDBName',val);
        localStorage.setItem('dashboardDB',dashboardDbName);
        $("#nameDashboardDB").val(dashboardDbName);
        sessionStorage.setItem("nameDB", dashboardDbName);
        getAllProductTables();
        setTimeout( ()=>{
            $('#dashboard_sidebar').click();
        },500);
        storeDBValueSession();
    });
    $(document).on('change','#chart_records,#chart_type', function(){
        chartRecordFilter();
    });

    $(document).on('click','.edit_btn_tile_chart',function(){
        var id=$(this).attr('class');
        var i_value = $(this).attr('data-i-value');
        id_val =id.split(" ")[0];
        getEditDataDashboard(id_val,i_value);
        $('#dashboard_tile_modal').modal('show');   
    });

    /**
     * Update button handler for existing chart tiles.
     * Routes to specific update functions based on record type and chart mode.
     */
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
        else if(ar['record_type_of_tile'] == 'graph')
        {
            updateDashboardGraphChart();
        }
        else{
            updateDashboardChart();
        }
    });

    /**
     * Toggle handler for expanded view in charts.
     * Manages UI state and resets manual dimension settings when toggled.
     */
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
        }
        else{
            $('#expand_view_chart').val("0");
        }
    });

    $(document).on('click','#expand_view_table', ()=>{
        var valIsChecked = $('#expand_view_table').is(":checked");
        if(valIsChecked == true){
            $('#expand_view_table').val("1");
            $('.table_outisde_tile_controls').hide();
            $('#table_outside_tile_structure').prop('checked',false);
            $('#table_outside_tile_structure').val('0');
            
            $('#table_height_outer_structure').val('');
            $('#table_width_outer_structure').val('');

            var id = $('#total_records').val();
            $('#measurement_count_outer_tile_modal_table_'+id).css('height',145);
            $('#measurement_count_outer_tile_modal_table_'+id).css('width',250);
            $(".gernerated_measurement_modal_tiles").find(".outer_table_tile_structure").hide();
            $(".gernerated_measurement_modal_tiles").find("[data-type-tile='Measurement']").first().show();
        }
        else{
            $('#expand_view_table').val("0");
            $(".gernerated_measurement_modal_tiles").find("[data-type-tile='Measurement']").first().hide();
            $(".gernerated_measurement_modal_tiles").find(".outer_table_tile_structure").show();
        }
    });
    
    $(document).on('click','#table_outside_tile_structure', ()=>{
        var valIsChecked = $('#table_outside_tile_structure').is(":checked");
        if(valIsChecked == true){
            $('#table_outside_tile_structure').val("1");
            $('.table_outisde_tile_controls').show();
            $('#expand_view_table').val("0");
            $('#expand_view_table').prop("checked",false);
            $(".gernerated_measurement_modal_tiles").find(".outer_table_tile_structure").show();
            $(".gernerated_measurement_modal_tiles").find('[data-type-tile="Measurement"]').first().hide();
        }
        else{
            $('#table_outside_tile_structure').val("0");
            $('.table_outisde_tile_controls').hide();

            $('#table_height_outer_structure').val('');
            $('#table_width_outer_structure').val('');

            var id = $('#total_records_table').val();
            $('#measurement_count_outer_tile_modal_table_'+id).css('height',145);
            $('#measurement_count_outer_tile_modal_table_'+id).css('width',250);
            $(".gernerated_measurement_modal_tiles").find("[data-type-tile='Measurement']").first().hide();
            $(".gernerated_measurement_modal_tiles").find(".outer_table_tile_structure").show();
        }
    });

    /**
     * Toggle handler for expanded view in product tables.
     * Adjusts modal tile visibility and handles complex UI updates for product table previews.
     */
    $(document).on('click','#expand_view_product_table', ()=>{
        var valIsChecked = $('#expand_view_product_table').is(":checked");
        if(valIsChecked == true){
            $('#expand_view_product_table').val("1");
            $('.table_outisde_tile_controls').hide();
            $('#product_table_outside_tile_structure').prop('checked',false);
            $('#product_table_outside_tile_structure').val('0');
            
            $('#table_height_outer_structure').val(1);
            $('#table_width_outer_structure').val(1);

            var id = $('#total_records').val();
            $('#product_count_outer_tile_modal_table_'+id).css('height',145);
            $('#product_count_outer_tile_modal_table_'+id).css('width',250);
            $(".gernerated_product_modal_tiles").find(".outer_table_tile_structure").hide();
            $(".gernerated_product_modal_tiles").find("[data-type-tile='Product']").first().show();
            let modalHeightInputProduct = $('#modal-height-input-product').val();
            let modalWidthInputProduct = $('#modal-width-input-product').val();
            $('#modal-height-input-product').attr('disabled',false);
            $('#modal-width-input-product').attr('disabled',false);
            if((modalHeightInputProduct == 1) && (modalWidthInputProduct == 1)){
                $('.tiles-custom-table').show();
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
                $('.small-table-tile-icon .count_result_tile').css('display', 'none');
                $('.small-table-tile-icon').addClass('one-by-one-tile');
            }else{
                $('.tiles-custom-table').hide();
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
                $('.small-table-tile-icon .count_result_tile').css('display', 'block');
                $('.small-table-tile-icon .save_table_div_show_table').css('display', 'block');
                $('.small-table-tile-icon').removeClass('one-by-one-tile');
            }
        }
        else{
            $('#expand_view_product_table').val("0");
            $(".gernerated_product_modal_tiles").find(".outer_table_tile_structure").show();
            $(".gernerated_product_modal_tiles").find("[data-type-tile='Product']").first().hide();
            $('.tiles-custom-table').show();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'none');
            $('.small-table-tile-icon .save_table_div_show_table').show();
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }
    });

    $(document).on('click','#product_table_outside_tile_structure', ()=>{
        var valIsChecked = $('#product_table_outside_tile_structure').is(":checked");
        if(valIsChecked == true){
            $('#product_table_outside_tile_structure').val("1");
            $('.table_outisde_tile_controls').show();
            $('#expand_view_product_table').val("0");
            $('#expand_view_product_table').prop("checked",false);
            $(".gernerated_product_modal_tiles").find("[data-type-tile='Product']").first().hide();
            $(".gernerated_product_modal_tiles").find(".outer_table_tile_structure").show();
            $('#product_table_height_outer_structure').val(1).trigger("change");
            $('#product_table_width_outer_structure').val(1).trigger("change");
            $('#modal-height-input-product').attr('disabled',true);
            $('#modal-width-input-product').attr('disabled',true);
            let product_table_height_outer_structure = $('#product_table_height_outer_structure').val();
            let product_table_width_outer_structure = $('#product_table_width_outer_structure').val();
            let product_table_outside_tile_structure = $('#product_table_outside_tile_structure').val();
            if((product_table_height_outer_structure == 1) && (product_table_width_outer_structure == 1) && (product_table_outside_tile_structure == 1)){
                $('.tiles-custom-table').show();
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
                $('.small-table-tile-icon .save_table_div_show_table').hide();
                $('.small-table-tile-icon .count_result_tile').css('display', 'none');
                $('.small-table-tile-icon').addClass('one-by-one-tile');
            }
            if((product_table_height_outer_structure != 1) && (product_table_width_outer_structure != 1) && (product_table_outside_tile_structure == 1)){
                $('.tiles-custom-table').hide();
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
                $('.small-table-tile-icon .count_result_tile').css('display', 'block');
                $('.small-table-tile-icon').removeClass('one-by-one-tile');
            }
        }
        else{
            $('#product_table_outside_tile_structure').val("0");
            $('.table_outisde_tile_controls').hide();

            $('#table_height_outer_structure').val('');
            $('#table_width_outer_structure').val('');

            var id = $('#total_records_table').val();
            $('#product_count_outer_tile_modal_table_'+id).css('height',145);
            $('#product_count_outer_tile_modal_table_'+id).css('width',250);
            $(".gernerated_product_modal_tiles").find(".outer_table_tile_structure").show();
            $(".gernerated_product_modal_tiles").find("[data-type-tile='Product']").first().hide();
            $('#product_table_height_outer_structure').val('');
            $('#product_table_width_outer_structure').val('');
            $('#modal-height-input-product').trigger("change").attr('disabled',false);
            $('#modal-width-input-product').trigger("change").attr('disabled',false);
            let modalHeightInputProduct = $('#modal-height-input-product').val();
            let modalWidthInputProduct = $('#modal-width-input-product').val();
            let product_table_outside_tile_structure = $('#product_table_outside_tile_structure').val();
            if((modalHeightInputProduct == 1) && (modalWidthInputProduct == 1) && (product_table_outside_tile_structure == 0)){
                $('.tiles-custom-table').show();
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
                $('.small-table-tile-icon .count_result_tile').css('display', 'none');
                $('.small-table-tile-icon').addClass('one-by-one-tile');
            }else if((modalHeightInputProduct != 1) && (modalWidthInputProduct != 1) && (product_table_outside_tile_structure == 0)){
                $('.tiles-custom-table').hide();
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
                $('.small-table-tile-icon .save_table_div_show_table').show();
                $('.small-table-tile-icon .count_result_tile').css('display', 'block');
                $('.small-table-tile-icon').removeClass('one-by-one-tile');
            }
        }
    });

    /**
     * Toggle handler for expanded view in energy tables.
     * Manages UI state and visibility for energy table previews in modals.
     */
    $(document).on('click','#expand_view_energy_table', ()=>{
        var valIsChecked = $('#expand_view_energy_table').is(":checked");
        if(valIsChecked == true){
            $('#expand_view_energy_table').val("1");
            $('.table_outisde_tile_controls').hide();
            $('#energy_table_outside_tile_structure').prop('checked',false);
            $('#energy_table_outside_tile_structure').val('0');
            
            $('#table_height_outer_structure').val('');
            $('#table_width_outer_structure').val('');

            var id = $('#total_records').val();
            $('#energy_count_outer_tile_modal_table_'+id).css('height',145);
            $('#energy_count_outer_tile_modal_table_'+id).css('width',250);
            $(".gernerated_energy_modal_tiles").find(".outer_table_tile_structure").hide();
            $(".gernerated_energy_modal_tiles").find("[data-type-tile='Energy']").first().show();
        }
        else{
            $('#expand_view_energy_table').val("0");
            $(".gernerated_energy_modal_tiles").find(".outer_table_tile_structure").show();
            $(".gernerated_energy_modal_tiles").find("[data-type-tile='Energy']").first().hide();
        }
    });

    /**
     * Toggle handler for showing energy tables outside of the standard tile structure.
     * Manages control visibility and resets dimensions when toggled.
     */
    $(document).on('click','#energy_table_outside_tile_structure', ()=>{
        var valIsChecked = $('#energy_table_outside_tile_structure').is(":checked");
        if(valIsChecked == true){
            $('#energy_table_outside_tile_structure').val("1");
            $('.table_outisde_tile_controls').show();
            $('#expand_view_energy_table').val("0");
            $('#expand_view_energy_table').prop("checked",false);
            $(".gernerated_energy_modal_tiles").find("[data-type-tile='Energy']").first().hide();
            $(".gernerated_energy_modal_tiles").find(".outer_table_tile_structure").show();
        }
        else{
            $('#energy_table_outside_tile_structure').val("0");
            $('.table_outisde_tile_controls').hide();

            $('#table_height_outer_structure').val('');
            $('#table_width_outer_structure').val('');

            var id = $('#total_records_table').val();
            $('#energy_count_outer_tile_modal_table_'+id).css('height',145);
            $('#energy_count_outer_tile_modal_table_'+id).css('width',250);
            $(".gernerated_energy_modal_tiles").find("[data-type-tile='Energy']").first().hide();
            $(".gernerated_energy_modal_tiles").find(".outer_table_tile_structure").show();
        }
    });

    /**
     * Toggle handler for live graph updates.
     * Sets numerical value (1 or 0) for the live graph state.
     */
    $(document).on('click','#is_live_graph', ()=>{
        var valIsChecked = $('#is_live_graph').is(":checked");
        if(valIsChecked == true){
            $('#is_live_graph').val("1");
        }
        else{
            $('#is_live_graph').val("0");
        }
    });

    /**
     * Secondary catch-all click handler for resetting dashboard UI elements.
     * Checks if a click is within specific dashboard components.
     */
    $(document).on('click', function (event) {
        if (!$(event.target).closest('#dashboard_count_div_tile .movetile .tiles-click').length) {            
        }
    });

    /**
     * Toggle handler for chart outside tile structure in modals.
     * Shows/hides advanced dimension controls.
     */
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
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
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
            }

        }
    })

    /**
     * Handles dimension changes (height/width) for tables placed outside the tile structure.
     * Dynamically updates preview table size in the modal.
     */
    $(document).on('blur change','#table_height_outer_structure,#table_width_outer_structure', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records').val();
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        if(id == 'table_height_outer_structure')
        {
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            var height_val = $('#table_height_outer_structure').val();
            if(height_val != 1){
                $('.save_table_div_show_table #measurement_outer_modal_table').css("display", "table");
                $('.outer_table_tile_structure .count_result_tile').css("display", "block"); 
            }else{
                $('.save_table_div_show_table #measurement_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
            }

            if(height_val <= 0){
                $('#table_height_outer_structure').val(1);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                 $('#modal-height-input-measurement-hidden').val(height_value);
            }
        }
        else if(id == 'table_width_outer_structure'){
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            var width_val = $('#table_width_outer_structure').val();
            if(width_val != 1){
                $('.save_table_div_show_table #measurement_outer_modal_table').css("display", "table");
                $('.outer_table_tile_structure .count_result_tile').css("display", "block"); 
            }else{
                $('.save_table_div_show_table #measurement_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
            }
            if(width_val <= 0){
                $('#table_width_outer_structure').val(1);
            }
            else{
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }

                 $('#modal-width-input-measurement-hidden').val(width_value);
            }

        }
    })
    /**
     * Triggered when height or width input fields value changes.
     * Used to handle updates for outer structure dimensions of the product table.
     */
    $(document).on('blur change','#product_table_height_outer_structure,#product_table_width_outer_structure', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records').val();
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        if(id == 'product_table_height_outer_structure')
        {
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            var height_val = $('#product_table_height_outer_structure').val();

            if(height_val != 1){
                $('.save_table_div_show_table #product_outer_modal_table').css("display", "table"); 
            }else{
                $('.save_table_div_show_table #product_outer_modal_table').css("display", "none");
            }

            if(height_val <= 0){
                $('#product_table_height_outer_structure').val(1);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                 $('#modal-height-input-product-hidden').val(height_value);
            }
        }
        else if(id == 'product_table_width_outer_structure'){
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            var width_val = $('#product_table_width_outer_structure').val();
            if(width_val != 1){
                $('.save_table_div_show_table #product_outer_modal_table').css("display", "table"); 
            }else{
                $('.save_table_div_show_table #product_outer_modal_table').css("display", "none");
            }
            
            if(width_val <= 0){
                $('#product_table_width_outer_structure').val(1);
            }
            else{
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }

                 $('#modal-width-input-product-hidden').val(width_value);
            }

        }
        let productTableHeightOuterStructure = $('#product_table_height_outer_structure').val();
        let productTableWidthOuterStructure = $('#product_table_width_outer_structure').val();
        let product_table_outside_tile_structure = $('#product_table_outside_tile_structure').val();
        if((productTableHeightOuterStructure == 1) && (productTableWidthOuterStructure == 1) && (product_table_outside_tile_structure == 1)){
            $('.tiles-custom-table').show();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'none');
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }else{
            $('.tiles-custom-table').hide();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'block');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if((productTableHeightOuterStructure != 1) && (productTableWidthOuterStructure == 1) && (product_table_outside_tile_structure == 1)){
            $('.small-table-tile-icon .save_table_div_show_table').show();
            $('.small-table-tile-icon .save_table_div_show_table table').show();
            $('.small-table-tile-icon .count_result_tile').css('display', 'block');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if((productTableHeightOuterStructure == 1) && (productTableWidthOuterStructure != 1) && (product_table_outside_tile_structure == 1)){
            $('.small-table-tile-icon .save_table_div_show_table').show();
            $('.small-table-tile-icon .save_table_div_show_table table').show();
            $('.small-table-tile-icon .count_result_tile').css('display', 'block');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
    })
    /**
    * Triggered when energy table height or width fields value changes
    * Used to handle updates related to the outer structure dimensions of the energy table
    */
    $(document).on('blur change','#energy_table_height_outer_structure,#energy_table_width_outer_structure', function(){
        var id = $(this).attr('id');
        var total_records = $('#total_records').val();
        var ar = localStorage.getItem('dashboard_tile_data');
        ar = JSON.parse(ar);
        var record_type_of_tile = ar['record_type_of_tile'];
        if(id == 'energy_table_height_outer_structure')
        {
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_height');
            }
            var height_val = $('#energy_table_height_outer_structure').val();
            if(height_val != 1){
                $('.save_table_div_show_table #energy_outer_modal_table').css("display", "table");
                $('.outer_table_tile_structure .count_result_tile').css("display", "block"); 
            }else{
                $('.save_table_div_show_table #energy_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
            }

            if(height_val <= 0){
                $('#energy_table_height_outer_structure').val(1);
            }
            else{
                height_value = parseInt(height_val)*145;
                if(height_value >=580){
                    height_value = 580;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).css('height',height_value);
                }
                 $('#modal-height-input-energy-hidden').val(height_value);
            }
        }
        else if(id == 'energy_table_width_outer_structure'){
            if(record_type_of_tile == 'measurement')
            {
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'energy')
            {
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            else if(record_type_of_tile == 'product')
            {
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('col-md-3');
                $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).removeClass('actual_tile_width');
            }
            var width_val = $('#energy_table_width_outer_structure').val();
            if(width_val != 1){
                $('.save_table_div_show_table #energy_outer_modal_table').css("display", "table");
                $('.outer_table_tile_structure .count_result_tile').css("display", "block"); 
            }else{
                $('.save_table_div_show_table #energy_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
            }

            if(width_val <= 0){
                $('#energy_table_width_outer_structure').val(1);
            }
            else{
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
                }
                if(record_type_of_tile == 'measurement')
                {
                    $('.dashboard_modal_tile #measurement_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'energy')
                {
                    $('.dashboard_modal_tile #energy_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }
                else if(record_type_of_tile == 'product')
                {
                    $('.dashboard_modal_tile #product_count_outer_tile_modal_table_'+total_records).css('width',width_value);
                }

                 $('#modal-width-input-energy-hidden').val(width_value);
            }

        }
    })

    /**
     * Redirects to the dashboard and triggers a refresh of dashboard components.
     */
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
        $('#gfg1_li').trigger('click');
        // Edit Local Storage Remove
        localStorage.removeItem('edit-measurement-tile');
        localStorage.removeItem('edit-i-value');
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

    $('.modal_close').click(()=>{ 
        $('.bd-example-modal-lg').hide(); 
        $('.energy_tile_modal').modal('hide');
    });

    /**
     * Opens the product selection modal and triggers product record retrieval.
     */
    $(document).on('click','#all_product_image', function(){
        $('.modal_all_products').modal('show');
        getNumberRecordsProduct();
    });

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

    /**
     * Handles row clicks in the product selection modal.
     * Selects a product and retrieves its specific data for the dashboard.
     */
    $(document).on('click','.all_product_table_row_click' , function(){
        var prd_id  = $(this).attr('prd_id');
        var prd_name  = $(this).attr('prd_name');
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

    /**
     * Triggered when pagination elements are clicked for a particular product
     * Handles page count selection or direct pagination input interaction
    */
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
    /**
     * Triggered when automatic product pagination elements are clicked
     * Handles page count selection or direct pagination input for automatic product listing
     */
    $(document).on('click','.page_count_product_automatic,.pagination_input_val_product_automatic', function(){
        var id = $(this).attr('id');
        var class_btn = $(this).hasClass('pagination_input_val_product_automatic');
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
    /**
     * Triggered when the product records "order by" dropdown value changes
     */
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
    /**
     * Triggered when the product modal open button is clicked
     */
    $(document).on('click','#product_modal_open_button', function(){
        var tile_edit_value = $(this).attr('tile-edit');
        if(tile_edit_value == 'false'){
            var dashboardcountTiles='';
            $.ajax({
                    type: "POST",
                    url: "php/retreive.php",
                    async: false,
                    dataType: 'json',
                    data: {
                    action: "dashboardTileCount",
                    username: $("#username").val(),
                    nameDB: $("#nameDashboardDB").val(),
                },
                fail: function() {
                    alert("failed!!")
                },
                success: function(a) {
                    if (a >= 16) {
                        dashboardcountTiles=a;
                        toastr.warning('Maximum 16 tiles can be added!');
                    }  
                }
            });
            if(dashboardcountTiles >= 16){
                return false;
            }
        }
        var edit_id = localStorage.getItem('edit-measurement-tile');
        var tile_edit_value = $(this).attr('tile-edit');
        var ar = localStorage.getItem('dashboard_tile_data');
        dashboard_tile_data = JSON.parse(ar);
        var type_data_tile = dashboard_tile_data['type_data_tile'];
        var product_type = 'Mannual';
        $('#expand_view_product_table').prop('checked',false);
        $('#expand_view_product_table').val(0);
        $('#product_table_outside_tile_structure').prop('checked',false);
        $('#product_table_outside_tile_structure').val(0);
        $('.table_outisde_tile_controls').hide();
        $('.tiles-custom-table').show();
      
        if(tile_edit_value == 'false' && type_data_tile == "overall_count"){
            $('#save_table_btn_product').removeClass('display-none');
            $('#update_table_btn_measurement_product').addClass('display-none');
            $('.product_tile_modal').modal('show');
            var type = "Product";
            generateHtmlProductTiles(type);
            var countValue = $('#overall_count_product').val();
            var record_name = $('#analgen_config_id_input').attr('data-name');
            var count_html = "<h4 class='text-muted record-name-overall-count font-weight-bold mb-2'>"+record_name+"</h4>";
            count_html += "<h4 class='text-muted text-overall-count'>"+countValue+"(value)</h4>";
            
            var last_div_index = $('#total_records').val();
            $('.product_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.product_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);

            $('.product_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table').html('');
            $('.product_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table').html(count_html);
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').attr('src','images/sum_logo.png');
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').removeClass('tile-image-icon-table');
            $('.product_html_modal_'+last_div_index+' .tile-image-icon').addClass('tile-image-icon-count');
            $('#modal-height-input-product').attr('disabled',true);
            $('#modal-width-input-product').attr('disabled',true);

            $('#modal-height-input-product').val('1');
            $('#modal-width-input-product').val('1');
            $('#modal-height-input-product-hidden').val(145);
            $('#modal-width-input-product-hidden').val(250);

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
                var type = "Product";
                generateHtmlProductTiles(type);
                var last_div_index = $('#total_records').val();
                var tiles_table_html = $('#tiles_product_select_table_entries_table').html();
                var table_html = $('#product_select_table_entries_table').html();
                $('.product_html_modal_'+last_div_index+' #product_modal_table').html(table_html);
                $('.product_html_modal_'+last_div_index+' .tiles-custom-table').html(tiles_table_html);
                $('.product_html_modal_'+last_div_index+' #product_modal_table thead ,.product_html_modal_'+last_div_index+' #product_modal_table tbody tr').removeAttr('class');
                $('.product_html_modal_'+last_div_index+' #product_modal_table tbody').removeAttr('id');

                $('.product_table_outer_html_modal_'+last_div_index+' #product_outer_modal_table').html(table_html);
                $('.product_table_outer_html_modal_'+last_div_index+' .tiles-custom-table').html(tiles_table_html);
                $('.product_table_outer_html_modal_'+last_div_index+' #product_outer_modal_table thead ,.product_html_modal_'+last_div_index+' #product_outer_modal_table tbody tr').removeAttr('class');
                $('.product_table_outer_html_modal_'+last_div_index+' #product_outer_modal_table tbody').removeAttr('id');

                $('.product_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table #product_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
                $(".gernerated_product_modal_tiles").find('[data-type-tile="Product"]').first().hide();
                $('#modal-height-input-product-hidden').val(290);
                $('#modal-height-input-product').val('2');
                $('#modal-width-input-product-hidden').val(500);
                $('#modal-width-input-product').val('2');
                $('.card-body').addClass('small-table-tile-icon one-by-one-tile');
                $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
                $('.small-table-tile-icon .count_result_tile').css('display', 'none');

                $('#modal-height-input-product').attr('disabled',false);
                $('#modal-width-input-product').attr('disabled',false);
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
            }
            else{
                alert('Records are Always be less than 5');
            }
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

                $('.product_table_outer_html_modal_'+last_div_index+' #product_outer_modal_table').html(table_html);
                $('.product_table_outer_html_modal_'+last_div_index+' #product_outer_modal_table thead ,.product_html_modal_'+last_div_index+' #product_outer_modal_table tbody tr').removeAttr('class');
                $('.product_table_outer_html_modal_'+last_div_index+' #product_outer_modal_table tbody').removeAttr('id');

                $('.product_table_outer_html_modal_'+last_div_index+' .save_table_div_show_table #product_outer_modal_table').css("display", "none");
                $('.outer_table_tile_structure .count_result_tile').css("display", "none");
                $(".gernerated_product_modal_tiles").find('[data-type-tile="Product"]').first().hide();

                $('#modal-height-input-product').attr('disabled',false);
                $('#modal-width-input-product').attr('disabled',false);
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
            $('#modal-width-input-product-hidden').val(250);

            setTimeout(()=>{
                $('.product_html_modal_'+last_div_index+' .count_result_tile').text(product_type);
            },1100);
        }

    })
    /**
     * Triggered when product modal height or width inputs value changes
     */
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
                width_value = 250;
                $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-product-hidden').val(width_value);
            }
            else{
                width_value = parseInt(width_val)*250;
                if(width_value >=1000){
                    width_value = 1000;
                }
                $('.gernerated_product_modal_tiles #product_count_tile_modal_'+total_records).css('width',width_value);
                $('#modal-width-input-product-hidden').val(width_value);
            }
            
        }
        let modalHeightInputProduct = $('#modal-height-input-product').val();
        let modalWidthInputProduct = $('#modal-width-input-product').val();
        let expand_view_product_table = $('#expand_view_product_table').val();
        let product_table_outside_tile_structure = $('#product_table_outside_tile_structure').val();
        if((modalHeightInputProduct != 1) || (modalWidthInputProduct != 1)  && (expand_view_product_table == 0) && (product_table_outside_tile_structure == 0)){
            $('.tiles-custom-table').show();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'none');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if((modalHeightInputProduct == 1) && (modalWidthInputProduct == 1)  && (expand_view_product_table == 0) && (product_table_outside_tile_structure == 0)){
            $('.tiles-custom-table').show();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'none');
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }
        if((modalHeightInputProduct == 1) && (modalWidthInputProduct == 1) && (expand_view_product_table == 1)){
            $('.tiles-custom-table').show();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'none');
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }
        if((modalHeightInputProduct != 1) && (modalWidthInputProduct != 1) && (expand_view_product_table == 1)){
            $('.tiles-custom-table').hide();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'block');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if(product_table_outside_tile_structure == 1){
            $('.tiles-custom-table').show();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').addClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'none');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if((modalHeightInputProduct != 1) && (modalWidthInputProduct == 1) && (expand_view_product_table == 1)){
            $('.tiles-custom-table').hide();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'block');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if((modalHeightInputProduct != 1) && (modalWidthInputProduct != 1) && (expand_view_product_table == 1)){
            $('.small-table-tile-icon .save_table_div_show_table').show();
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
            $('.small-table-tile-icon').removeClass('dashboard-small-table-tile');
        }
        if((modalHeightInputProduct == 1) && (modalWidthInputProduct != 1) && (expand_view_product_table == 1)){
            $('.tiles-custom-table').hide();
            $('.small-table-tile-icon .logo-image-main-div .tile-image-icon-table').removeClass('display-none');
            $('.small-table-tile-icon .count_result_tile').css('display', 'block');
            $('.small-table-tile-icon').removeClass('one-by-one-tile');
        }
        if((modalHeightInputProduct != 1) && (modalWidthInputProduct != 1) && (expand_view_product_table == 0) && (product_table_outside_tile_structure == 0)){
            $('.small-table-tile-icon .save_table_div_show_table').show();
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }
        if((modalHeightInputProduct == 1) && (modalWidthInputProduct != 1) && (expand_view_product_table == 0) && (product_table_outside_tile_structure == 0)){
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }
        if((modalHeightInputProduct != 1) && (modalWidthInputProduct == 1) && (expand_view_product_table == 0) && (product_table_outside_tile_structure == 0)){
            $('.small-table-tile-icon').addClass('one-by-one-tile');
        }

    });

    $(document).on('change','#chart_records_product', function(){
        getChartSelectProductItem();
    });

    $(document).on('change','#chart_records_product_item', function(){
        chartRecordFilterProduct();
    });
    /**
     * // Triggered when the product type selection changes
    */
    $(document).on('change','#product_type', function(){
        var prdTypeVal= $(this).val();
        $('#all_product_input_text_field').val('');
        if(prdTypeVal == 'automatic')
        {
            $('.product-small-table-tiles').show();
            $('#product_field_div').hide();
            $('#product_records_order_by_div').hide();
            getAllProductTables();
            $('#production_btn_table').show();
        }else {
            $('.product-small-table-tiles').hide();
            var tr = "<tr><td colspan='50' style='padding: 12px !important; font-size: small' class='text-center'>Please Select Product</td></tr>";
            $('#product_select_table_entries').html(tr);
            $('#product_select_table_entries_pagination').html('');
            $('#product_field_div').show();
            $('.automatic_product_div').hide();
            getNumberRecordsProduct();
            $('#production_btn_table').hide();
        }
    })
    /**
     * // Triggered when the "all tables" dropdown for product selection changes
     */
    $(document).on('change','#all_tables_product', function(){
        var val = $(this).val();
        $('#product_field_div').hide();
        getAllColumnProductTables();
    });
    
    $(document).on('change','#all_columns_product', function(){
        $('#product_field_div').hide();
        getNumberRecordsProductAutomatic();
    });

    $(document).on('change','#tiles_columns_product', function(){
        $('#product_field_div').hide();
        var tiles_columns_product = $('#tiles_columns_product').val();
        if(tiles_columns_product != '' || tiles_columns_product.length != 0){
        $('#tiles_product_select_table_entries_table_div').show();
        }else{
        $('#tiles_product_select_table_entries_table_div').hide();    
        }
        getTilesColumnsNumberRecordsProductAutomatic();
    });
    /**
     * Triggered when the total number of product records input value changes
     */
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
        }
        
    });
    /**
     * Triggered when the modal day filter selection changes
     */
    $(document).on('change','.modal_day_filter',function(){
        var id = $(this).attr('id');
        var day_from_val = $('#day_from').val();
        var day_to_val = $('#day_to').val();
        if(day_from_val != '' && day_to_val != '')
        {
           getNumberRecordsEnergyLayerModal();
        }
        else if(day_from_val == '' || day_to_val == ''){
            var tr = "<tr><td colspan='50' class='text-center text-muted'>Please Select All Filters</td></tr>";
            $('#energy_select_table_entries').html(tr);
            $('#pagination_html_energy').html('');
        }
    })
    /**
     * Triggered when the layer modal date value changes
     * Calls function to fetch/update the number of records for the selected energy layer date
     */
    $(document).on('change','#layer_modal_date', function(){
        getNumberRecordsEnergyLayerModal();
    });
    /**
     * Triggered when the weekday input field loses focus (blur)
     */
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
    });
    
    $(document).on('blur', '#energy_automatic_input', function(){
        var input_val = $(this).val();
        if(input_val > 5 || input_val < 1)
        {
            $('.energy_automatic_input_error').text('Sie können nur zwischen 1 und 5 Ergebniszeilen wählen!');
            $('.energy_automatic_input_error').fadeIn('slow');
            setTimeout( function(){
                $('.energy_automatic_input_error').fadeOut('slow');
            },3000);
            $('#energy_automatic_input').val('');
        }
    });
    /**
     * Triggered when the automatic energy measurement selection changes
     * Calls function to fetch/update the number of records for automatic energy data
     */
    $(document).on('change','#energy_measurement_automatic', function(){
        getNumberRecordsEnergyAutomatic();
    })
    /**
     * Triggered when energy measurement or day/week selection changes
     * Resets weekday input and updates record count for the energy layer modal
     */
    $(document).on('change','#energy_measurement,#select_day_week', function(){
        $('#input_val_week_day').val('');
        getNumberRecordsEnergyLayerModal();
    })
    /**
     * Triggered when the energy type selection for the dashboard chart changes
     * Used to update or reload the chart data based on the selected energy type
     */
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
    /**
     * Triggered when the energy chart layer range input loses focus (blur)
     * Used to validate or apply the entered range for the energy chart layer
     */
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
    });
    /**
     * Triggered when the energy chart measurement selection changes
     * Resets the layer range input and updates the chart based on the selected measurement
     */
    $(document).on('change', '#energy_chart_measurement' , function(){
        $('#energy_chart_layer_range').val('');
        chartRecordFilter();
    });
    /**
     * Triggered when the energy chart layer filter selection changes
     * Resets the layer range input and updates the chart based on the selected layer filter
     */
    $(document).on('change', '#energy_chart_layer_filter' , function(){
        $('#energy_chart_layer_range').val('');
        chartRecordFilter();
    });
    /**
     * Triggered when an energy layer table row is clicked
     * Used to handle row selection and load/display related layer data
     */
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

           
            $('.'+tile_id+'.tiles-click .save_table_div_show_table .table thead').html(energy_header);
            $('.'+tile_id+'.tiles-click .save_table_div_show_table .table tbody').html(energy_html);

            var table_html = $('.'+tile_id+'.tiles-click .save_table_div_show_table .table').html();
            var chart_tile_click_data = {'table_html' : table_html,'tile_click_type' : 'table'}
            localStorage.setItem('chart_tile_click_data',JSON.stringify(chart_tile_click_data));

        }
        else{
            rowClickEnergyDashboardLayer(tile_id,mst_id,energy_layer_filter,input_val_week_day,name_val,valid_from,valid_to,time_from,time_to); 
        }
    });
    /**
     * Triggered when the logout button is clicked
     * Calls the logout function to end the user session
     */
    $(document).on('click','#logout' , function(){
        logout();
    });
    /**
     * Triggered when an automatic energy table row is clicked
     * Used to handle row selection and load/display related energy data
     */
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

    $(document).on('click','.inner_table_energy_automatic' , function(){
        $(this).removeClass('inner_table_energy_automatic');
        $(this).addClass('hide_table_main');
    });

    /**
     * General handler for retrieving energy records based on selected filters (Automatic, Manual, Layer).
     */
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
    });

    /**
     * General handler for retrieving product records based on selected filters.
     */
    $(document).on('click','#production_btn_table', function(){
        var product_type = $('#product_type').val();
        if(product_type == 'automatic')
        {
            var all_tables_product = $('#all_tables_product').val();
            var all_columns_product = $('#all_columns_product').val();
            var tiles_columns_product = $('#tiles_columns_product').val();
            var product_total_number_record = $('#product_total_number_record').val();
            if(all_tables_product == '' || all_columns_product == '' || product_total_number_record == '' || tiles_columns_product == '')
            {
                alert('Please Select All Filters');
            }
            else{
                getNumberRecordsProductAutomatic();
            }
        }
    });

    /**
     * General handler for retrieving measurement records based on selected filters.
     */
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
    /**
     * Triggered when the energy chart layer range input loses focus (blur)
     * Used to validate or apply the entered range for automatic chart data
    */
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
        chartRecordFilter();
    });

    $(document).on('change','#energy_chart_measurement_automatic', function(){
        chartRecordFilter();
    });
    
    /**
     * Cancel button handler. Returns to the main dashboard sidebar.
     */
    $(document).on('click', '.cancel', function(event) { 
        event.preventDefault(); 
        $("#dashboard_sidebar").click(); 
    });

    $(document).on('change','#record_type_of_tile', function(){
        var record_type_of_tile = $('#record_type_of_tile').val();
        if(record_type_of_tile=="graph"){
            $('.tile-type').hide();     
        }else{
            $('.tile-type').show(); 
        }
    });

    /**
     * Double-click handler for graphs. Retrieves and displays the full saved graph.
     */
    $(document).on('dblclick', '.graph', function(){
        var className = $(this).attr("class");
        var st = className.split(' ');
        var graphClass = st[2].split('_');
        var savedGraphId = graphClass[1];
        getSavedGraph(savedGraphId);
    });
})
/**
 * Menu click handlers for graph views.
 */
$(".messstellen_graph").click(function(){
    sessionStorage.setItem('menuClick','messstellen_graph'); 
});
$(".zeitvergleich_graph").click(function(){
    sessionStorage.setItem('menuClick','zeitvergleich_graph'); 
});
$(".kennzahlen_graph").click(function(){
    sessionStorage.setItem('menuClick','kennzahlen_graph'); 
});

$('.tile_name_product_div #title_modal_tile').on('input', function() {
    var value = $(this).val();
    localStorage.setItem('product_title_modal_tile',value);
    var ar = {'title_modal_tile':value,'record_type_of_tile':'product','type_data_tile':'table'};
    localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
    $('.modal-body #title_modal_tile').val(value);
});

$('.tile_name_energy_div #title_modal_tile').on('input', function() {
    var value = $(this).val();
    localStorage.setItem('energy_title_modal_tile',value);
    var ar = {'title_modal_tile':value,'record_type_of_tile':'energy','type_data_tile':'table'};
    localStorage.setItem('dashboard_tile_data',JSON.stringify(ar));
    $('.modal-body #title_modal_tile').val(value);
});

/**
 * Dynamic handlers for auto-refresh interval changes.
 * Updates the preview tile label with the selected refresh rate.
 */
$(document).on('change','#measurement_auto_refresh_hourly',function(){
    var hourValue= $(this).val();
    var textValue= $(this).find(":selected").text().split(' ');
    $('.gernerated_measurement_modal_tiles .action-modal-button-div').find('.measurementautorefresh').remove();
    $('.gernerated_measurement_modal_tiles .action-modal-button-div').prepend("<div class='measurementautorefresh'>Auto Refresh <span class='measurement-refresh-hours'>"+hourValue+"</span> "+textValue[1]+"</div>");
});

/**
 * Updates the energy tile preview with the selected auto-refresh rate.
 */
$(document).on('change','#energy_auto_refresh_hourly',function(){
    var hourValue= $(this).val();
    var textValue= $(this).find(":selected").text().split(' ');
    $('.gernerated_energy_modal_tiles .action-modal-button-div').find('.energyautorefresh').remove();
    $('.gernerated_energy_modal_tiles .action-modal-button-div').prepend("<div class='energyautorefresh'>Auto Refresh <span class='energy-refresh-hours'>"+hourValue+"</span> "+textValue[1]+"</div>");
});

/**
 * Updates the product tile preview with the selected auto-refresh rate.
 */
$(document).on('change','#product_auto_refresh_hourly',function(){
    var hourValue= $(this).val();
    var textValue= $(this).find(":selected").text().split(' ');
    $('.gernerated_product_modal_tiles .action-modal-button-div').find('.productautorefresh').remove();
    $('.gernerated_product_modal_tiles .action-modal-button-div').prepend("<div class='productautorefresh'>Auto Refresh <span class='product-refresh-hours'>"+hourValue+"</span> "+textValue[1]+"</div>");
});