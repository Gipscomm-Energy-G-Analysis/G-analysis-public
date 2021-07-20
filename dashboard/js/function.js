//Count Dashboard Boxes 
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
           
        }
    });
}

//Selected Number of Records Mesurement
function getNumberRecordsMesurement(){
    var number_records = $('#measurement_number_record').val();
    $.ajax({
        type: "POST",
        url: "php/retreive.php",
        async: false,
        dataType: 'json',
        data: {
            action: "getNumberRecordsMesurement",
            nameDB: $("#nameDashboardDB").val(),
            number_records : number_records
        },
        fail: function() {
            alert("failed!!")
        },
        success: function(a) {
           $('#mesurement_select_table_entries').html(a['measurement_html']);
        }
    });
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
        }
    });
}