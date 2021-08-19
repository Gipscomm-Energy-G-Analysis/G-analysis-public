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
                getTableFormatDashboard();
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
        var type = $(this).attr('data-type');
        saveTableFormat(type);
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
        var ar = [];
        if(id_val == "modal-height-input-measurement"){
            $('#measurement_count_tile_modal').removeClass('col-md-3');
            $('#measurement_count_tile_modal').removeClass('actual_tile_height');
            var height_val = $('#modal-height-input-measurement').val();
            if(height_val <= 0){
                height_value = 145;
                $('#measurement_count_tile_modal').css('height',height_value);
                $('#modal-height-input-measurement-hidden').val(height_value);

            }
            else{
                
                height_value = parseInt(height_val)+145;
                if(height_value >=450){
                    height_value = 450;
                }

                $('#measurement_count_tile_modal').css('height',height_value);
                $('#modal-height-input-measurement-hidden').val(height_value);
            }
        }
        else if(id_val == "modal-width-input-measurement")
        {
            $('#measurement_count_tile_modal').removeClass('col-md-3');
            $('#measurement_count_tile_modal').removeClass('actual_tile_width');
            var width_val = $('#modal-width-input-measurement').val();
            if(width_val <=0 ){
                width_value = 285;
                $('#measurement_count_tile_modal').css('width',width_value);
                $('#modal-width-input-measurement-hidden').val(width_value);
                // alert('Width Always be equal to greater than to actual Width');
                // $('#modal-width-input-measurement').val(width_val);
            }
            else{
                width_value = parseInt(width_val)+285;
                if(width_value >=1130){
                    width_value = 1130;
                }
                $('#measurement_count_tile_modal').css('width',width_value);
                $('#modal-width-input-measurement-hidden').val(width_value);
            }
            
        }
        
    });


    $(document).on('click','#modal_open_button', function(){
        var tableLength = $('#mesurement_select_table_entries tr').length;
        if(parseInt(tableLength) <= 5){
            $('.bd-example-modal-lg').modal('show');
            var table_html = $('#measurement_record_tb').html();
            $('#measurement_modal_table').html(table_html);
            $('#measurement_modal_table thead ,#measurement_modal_table tbody tr').removeAttr('class');
            $('#measurement_modal_table tbody').removeAttr('id');

            //<--Height width Set --
            var measurement_preview_data =  localStorage.getItem('measurement_preview_data');
            if(measurement_preview_data != null && measurement_preview_data != undefined)
            {   
                measurement_preview_data = JSON.parse(measurement_preview_data);
                height =  measurement_preview_data[0]['height'];
                width = measurement_preview_data[0]['width'];
                if(height <=145){
                    var  height_input = "";
                }
                else{
                    var  height_input = parseInt(height) - 145;
                   
                }

                if(width <= 285)
                {
                    var  width_input = "";
                }
                else{
                    var  width_input =  parseInt(width) - 285;
                }
                
                $('#modal-height-input-measurement').val(height_input);
                $('#measurement_count_tile_modal').css('height',height);
                $('#modal-width-input-measurement').val(width_input);
                $('#measurement_count_tile_modal').css('width',width);
                //console.log(JSON.parse(measurement_preview_data['height']));
            }
            //--end-->

        }
        else{
            alert('Records are Always be less than 5');
        }
    })
    // --end->


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