$(document).on('change', '#graphModeSelector', function(){
    if ($(this).prop('checked')) {
        $('.graph-mode').show();
        $('.history-mode').hide();
    } else {
        $('.graph-mode').hide();
        $('.history-mode').show();
    }
});

$("#start_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#end_date').val()}
);
$("#end_date").datepicker(
    {changeMonth: true,
    changeYear: true,
    minDate:$('#start_date').val()}
);

$(document).on('change', '#periodFilterInterval', function(){
    if ($(this).val() == 'custom') {
        $('.custom_filter').show();
        $('.month_filter').hide();
        $('.year_filter').hide();
    } else if($(this).val() == 'year') {
        $('.custom_filter').hide();
        $('.month_filter').hide();
        $('.year_filter').show();
    } else if($(this).val() == 'month') {
        $('.custom_filter').hide();
        $('.month_filter').show();
        $('.year_filter').show();
    } else {
        $('.custom_filter').hide();
        $('.month_filter').hide();
        $('.year_filter').hide();
    }
});

$(document).on('submit', '#historicGraphData', function(e) {
    e.preventDefault();
    createEnergyDataGraph(false);
});

$(document).on('click', '#create_graph_window', function(e) {
    createEnergyDataGraph(true);
});

function createEnergyDataGraph(windowTrue) { 
    // if($('#msgraphData').val() === undefined || $('#msgraphData').val() === ''){
    //     toastr.warning('No measuring points found for the particular record.');
    //     return false;
    // }
    $("#loader_image_history_charts").show();
    $("#historyChartdiv").hide();
    $.ajax({
        url: "production_dashboard/production_php/GraphController.php",
        type:"POST",
        async: false,
        dataType: 'json',
        data: {
            action: "historicData",
            nameDB: $("#nameDashboardDB").val(),
            periodFilter: $("#periodFilterInterval").val(),
            typeFilter: $("#typeFilterInterval").val(),
            yearFilter: $("#yearFilterInterval").val(),
            monthFilter: $("#monthFilterInterval").val(),
            startDate: $("#start_date").val(),
            endDate: $("#end_date").val(),
            graphPoints: $(".navigation-production").attr("data-graph-points")
        },
        success:function(result) {
            if(result.code == 200) {
                $("#loader_image_history_charts").hide();
                $("#historyChartdiv").show();
                if(windowTrue) {
                    localStorage.setItem('graphData', JSON.stringify(result.graphData));
                    localStorage.setItem('graphType', result.type);
                    window.open('history_graph.html', '_blank');
                } else {
                    $('.historyGraphDiv').show();
                    createAmChart(historic_root, result.graphData, true);
                }
                
            }
        },
        error:function(result) {
            $("#loader_image_history_charts").hide();
            $("#historyChartdiv").show();
            toastr.error(result);
        }
    });
}

function jsFunction(value, points) {

    $.ajax({
        url: "production_dashboard/production_php/GraphController.php",
        type:"POST",
        async: false,
        dataType: 'json',
        data: {
            action: "getPointsData",
            nameDB: $("#nameDashboardDB").val(),
            limit:value,
            points:points
        },
        success:function(data){
            if(data.code == 200) {
                console.log('showrecord',showRecord(data.graphData));
                if(showRecord(data.graphData)){
                    console.log('here');
                    $('.energy_graph_msg').hide();
                    $(".energy_graph_div").show();
                    createAmChart(root, data.graphData, true);
                    
                }else{
                    $('.energy_graph_msg').show();
                }
            }
        },
    });
}

function hideAllcharts() {
    //hide energy charts
    $(".energy_graph_div").hide();
    $('.energy_graph_msg').show();
}


function showRecord(graphData) {
 for(const key in graphData){
     if(graphData[key].record){
         return true; 
     }
 }
 return false;
}
  
    
